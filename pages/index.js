import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { LAYERS, LAYER_IDS, LOCALITIES, PERSONAS } from '../lib/data'

// Real Bangalore lat/lng for each locality
const LATLNG = {
  koramangala:     [77.627, 12.935],
  indiranagar:     [77.641, 12.978],
  whitefield:      [77.748, 12.969],
  hsr:             [77.640, 12.911],
  sarjapur:        [77.696, 12.899],
  electronic_city: [77.677, 12.845],
  manyata:         [77.597, 13.045],
  // New localities
  jayanagar:       [77.593, 12.925],
  jp_nagar:        [77.585, 12.908],
  marathahalli:    [77.701, 12.959],
  bellandur:       [77.679, 12.926],
  yelahanka:       [77.596, 13.099],
  rajajinagar:     [77.552, 12.987],
  malleshwaram:    [77.570, 13.003],
  bannerghatta:    [77.599, 12.890],
  kr_puram:        [77.694, 13.002],
  banashankari:    [77.564, 12.920],
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

function compositeScore(loc, activeLayers, persona) {
  const active = LAYER_IDS.filter(l => activeLayers[l])
  if (!active.length) return 0
  const p = PERSONAS[persona]
  const wMap = { jobs: p.jobW, rentbuy: p.rentbuyW, restaurants: p.restW }
  const totalW = active.reduce((s, l) => s + wMap[l], 0)
  return Math.min(100, Math.round(
    active.reduce((s, l) => s + (loc[l]?.score || 0) * wMap[l], 0) / totalW
  ))
}

function dominantLayer(loc, activeLayers) {
  const active = LAYER_IDS.filter(l => activeLayers[l])
  if (!active.length) return null
  return active.reduce((a, b) => (loc[a]?.score || 0) > (loc[b]?.score || 0) ? a : b)
}

function bubbleColor(loc, activeLayers) {
  const dom = dominantLayer(loc, activeLayers)
  const base = { jobs: '#14b8a6', rentbuy: '#818cf8', restaurants: '#f97316' }
  return dom ? base[dom] : '#f59e0b'
}

export default function Home() {
  const [activeLayers, setActiveLayers] = useState({ jobs: true, rentbuy: true, restaurants: true })
  const [persona, setPersona] = useState('midlevel')
  const [selected, setSelected] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [brief, setBrief] = useState(null)
  const [briefLoading, setBriefLoading] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [markers, setMarkers] = useState({})
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const chatEndRef = useRef(null)

  const selectedLoc = LOCALITIES.find(l => l.id === selected)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Init Mapbox
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    import('mapbox-gl').then(({ default: mapboxgl }) => {
      import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = MAPBOX_TOKEN

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [77.620, 12.960],
        zoom: 11.2,
        pitch: 0,
        bearing: 0,
        antialias: true,
      })

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')
      map.scrollZoom.enable()

      mapRef.current = map
      map.on('load', () => {
        // Add custom map styling — highlight key roads
        map.setPaintProperty('road-primary', 'line-color', '#2a2820')
        updateMarkers(mapboxgl, map)
      })
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  function updateMarkers(mapboxgl, map) {
    // Remove old markers
    Object.values(markersRef.current).forEach(m => m.remove())
    markersRef.current = {}
  }

  // Update bubble overlays whenever scores/layers change
  const getScore = useCallback((loc) => compositeScore(loc, activeLayers, persona), [activeLayers, persona])

  const sorted = [...LOCALITIES].sort((a, b) => getScore(b) - getScore(a))
  const topLoc = sorted[0]

  const toggleLayer = (id) => setActiveLayers(p => ({ ...p, [id]: !p[id] }))

  const fetchBrief = useCallback(async (loc) => {
    setBriefLoading(true)
    setBrief(null)
    try {
      const res = await fetch('/api/ai-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locality: loc.name, persona, activeLayers,
          locData: { jobs: loc.jobs?.score, rentbuy: loc.rentbuy?.score, restaurants: loc.restaurants?.score, tag: loc.tag, summary: loc.summary }
        }),
      })
      const data = await res.json()
      setBrief(data.brief)
    } catch { setBrief(null) }
    setBriefLoading(false)
  }, [persona, activeLayers])

  function selectLoc(loc) {
    if (loc.id === selected) { setSelected(null); setBrief(null); return }
    setSelected(loc.id)
    fetchBrief(loc)
    // Pan map to selected locality
    if (mapRef.current && LATLNG[loc.id]) {
      mapRef.current.flyTo({
        center: LATLNG[loc.id],
        zoom: 13,
        duration: 800,
        essential: true,
      })
    }
  }

  function deselectLoc() {
    setSelected(null)
    setBrief(null)
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [77.620, 12.960], zoom: 11.2, duration: 600 })
    }
  }

  async function sendChat(e) {
    e.preventDefault()
    if (!input.trim() || aiLoading) return
    const msg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, persona, history: messages.slice(-8), selectedLocality: selectedLoc?.name }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    }
    setAiLoading(false)
  }

  const starterPrompts = [
    'Best area for a software engineer?',
    'Where to invest ₹80L in Bangalore?',
    'Compare Koramangala vs HSR Layout',
    'Best food & nightlife area?',
    'Best area for a family with kids?',
  ]

  // Convert lng/lat to pixel position on map container
  function getPixelPos(lngLat) {
    if (!mapRef.current) return null
    try {
      const pt = mapRef.current.project(lngLat)
      return pt
    } catch { return null }
  }

  return (
    <>
      <Head>
        <title>X Atlas — Bangalore Living Intelligence</title>
        <meta name="description" content="Explore jobs, rent and restaurants for every locality in Bangalore. AI-powered insights." />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet" />
      </Head>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0e0c08', fontFamily: 'system-ui, sans-serif', color: '#eeece6' }}>

        {/* NAV */}
        <nav style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(14,12,8,0.96)', backdropFilter: 'blur(12px)', zIndex: 100, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#f59e0b', fontStyle: 'italic' }}>X</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'rgba(238,236,230,0.55)' }}>Atlas</span>
            <span style={{ color: 'rgba(255,255,255,0.1)', margin: '0 8px' }}>|</span>
            <span style={{ fontSize: 12, color: 'rgba(238,236,230,0.3)', fontFamily: 'monospace' }}>Bangalore</span>
          </div>
          <div style={{ flex: 1 }} />
          <select value={persona} onChange={e => setPersona(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: 'rgba(238,236,230,0.65)', cursor: 'pointer', outline: 'none' }}>
            {Object.entries(PERSONAS).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}
          </select>
          <button onClick={() => setChatOpen(o => !o)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: chatOpen ? 'none' : '1px solid rgba(255,255,255,0.15)', background: chatOpen ? '#f59e0b' : 'transparent', color: chatOpen ? '#0e0c08' : 'rgba(238,236,230,0.5)', transition: 'all 0.2s' }}>
            <span>✦</span> Ask AI
          </button>
          <Link href="/contribute" style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(238,236,230,0.4)', fontSize: 12, textDecoration: 'none' }}>
            + Contribute
          </Link>
        </nav>

        {/* LAYER TOGGLES */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '7px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(14,12,8,0.92)', zIndex: 99, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, color: 'rgba(238,236,230,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace', flexShrink: 0 }}>Layers</span>
          {LAYER_IDS.map(id => {
            const L = LAYERS[id]; const on = activeLayers[id]
            return (
              <button key={id} onClick={() => toggleLayer(id)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s', border: on ? `1px solid ${L.color}55` : '1px solid rgba(255,255,255,0.08)', background: on ? L.color + '14' : 'transparent', color: on ? L.color : 'rgba(238,236,230,0.25)', fontWeight: on ? 500 : 400 }}>
                <span>{L.emoji}</span>{L.label}
              </button>
            )
          })}
          {topLoc && (
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(238,236,230,0.22)', fontFamily: 'monospace' }}>
              ★ <span style={{ color: '#f59e0b' }}>{topLoc.name}</span> · {getScore(topLoc)}/100
            </span>
          )}
        </div>

        {/* BODY */}
        <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>

          {/* MAPBOX MAP */}
          <div style={{ flex: 1, position: 'relative' }}>
            <div ref={mapContainerRef} style={{ position: 'absolute', inset: 0 }} />

            {/* SVG BUBBLE OVERLAY — renders on top of Mapbox */}
            <MapBubbles
              localities={LOCALITIES}
              latlng={LATLNG}
              activeLayers={activeLayers}
              persona={persona}
              selected={selected}
              hovered={hovered}
              topLoc={topLoc}
              getScore={getScore}
              bubbleColor={bubbleColor}
              onSelect={selectLoc}
              onHover={setHovered}
              mapRef={mapRef}
            />

            {/* Hover tooltip */}
            {hovered && !selected && (() => {
              const loc = LOCALITIES.find(l => l.id === hovered)
              if (!loc) return null
              return (
                <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: 'rgba(14,12,8,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '8px 16px', pointerEvents: 'none', backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(238,236,230,0.9)' }}>{loc.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.4)', marginTop: 2 }}>{loc.tag} · Score {getScore(loc)}/100 · Click to explore</div>
                </div>
              )
            })()}

            {/* Legend */}
            <div style={{ position: 'absolute', bottom: 40, left: 14, zIndex: 10, background: 'rgba(14,12,8,0.88)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '10px 14px', backdropFilter: 'blur(8px)' }}>
              {LAYER_IDS.filter(l => activeLayers[l]).map(id => (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, fontSize: 11, color: 'rgba(238,236,230,0.45)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: LAYERS[id].color, flexShrink: 0 }} />
                  {LAYERS[id].label}
                </div>
              ))}
              <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.2)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 5, marginTop: 3 }}>bubble size = match score</div>
            </div>
          </div>

          {/* DETAIL PANEL */}
          {selectedLoc && (
            <div style={{ width: 290, flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.07)', background: 'rgba(11,9,6,0.98)', overflowY: 'auto', zIndex: 50 }}>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: 'rgba(238,236,230,0.95)', margin: 0 }}>{selectedLoc.name}</h2>
                    <p style={{ fontSize: 11, color: 'rgba(238,236,230,0.32)', marginTop: 3 }}>{selectedLoc.zone} · {selectedLoc.tag}</p>
                  </div>
                  <button onClick={deselectLoc} style={{ fontSize: 20, color: 'rgba(238,236,230,0.2)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
                </div>

                {/* Score pills */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                  {LAYER_IDS.map(id => {
                    const L = LAYERS[id]; const s = selectedLoc[id]?.score || 0
                    return (
                      <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, fontSize: 11, background: L.color + '14', color: L.color, border: `1px solid ${L.color}30` }}>
                        {L.emoji} <span style={{ fontFamily: 'monospace' }}>{s}</span>
                      </div>
                    )
                  })}
                </div>

                {/* AI Brief */}
                <div style={{ borderRadius: 12, border: '1px solid rgba(245,158,11,0.15)', background: 'rgba(245,158,11,0.04)', padding: '12px 14px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <span style={{ color: '#f59e0b', fontSize: 10 }}>✦</span>
                    <span style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,158,11,0.65)' }}>AI Analysis</span>
                  </div>
                  {briefLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[95,80,88,68].map((w,i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', width: `${w}%`, animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i*0.15}s` }} />
                      ))}
                    </div>
                  ) : brief ? (
                    <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(238,236,230,0.6)', margin: 0 }}>{brief}</p>
                  ) : null}
                </div>

                {/* Top 3 per layer */}
                {LAYER_IDS.filter(l => activeLayers[l]).map(id => {
                  const L = LAYERS[id]; const data = selectedLoc[id]
                  if (!data) return null
                  return (
                    <div key={id} style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: L.color + 'bb' }}>{L.emoji} {L.label}</span>
                        <span style={{ fontSize: 10, fontFamily: 'monospace', color: L.color + '70' }}>{data.score}/100</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {(data.listings || []).slice(0, 3).map((item, i) => (
                          <div key={i} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.025)', padding: '8px 10px' }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(238,236,230,0.82)', marginBottom: 2 }}>{item.role || item.name}</div>
                            <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.33)' }}>
                              {item.company || item.type} · <span style={{ color: L.color + 'bb' }}>{item.pay || item.price}</span>
                              {item.yield && <span style={{ color: '#14b8a6' }}> · {item.yield}</span>}
                            </div>
                            {item.note && <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.2)', marginTop: 2 }}>{item.note}</div>}
                          </div>
                        ))}
                      </div>
                      {id === 'jobs' && data.jobDensity && <div style={{ marginTop: 6, fontSize: 10, color: 'rgba(238,236,230,0.25)' }}>📍 {data.jobDensity}</div>}
                      {id === 'rentbuy' && data.verdict && <div style={{ marginTop: 6, fontSize: 10, fontStyle: 'italic', color: 'rgba(238,236,230,0.28)', lineHeight: 1.5 }}>{data.verdict}</div>}
                      {id === 'restaurants' && data.vibe && <div style={{ marginTop: 6, fontSize: 10, fontStyle: 'italic', color: 'rgba(238,236,230,0.28)', lineHeight: 1.5 }}>{data.vibe}</div>}
                    </div>
                  )
                })}

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                  {[
                    { label: 'Appreciation', val: `+${selectedLoc.rentbuy.appreciation}%/yr`, col: '#818cf8' },
                    { label: 'Yield', val: `${selectedLoc.rentbuy.rentalYield}%`, col: '#14b8a6' },
                    { label: '2BHK rent', val: `₹${selectedLoc.rentbuy.rentRanges.twoBHK}k/mo`, col: 'rgba(238,236,230,0.7)' },
                    { label: 'Break-even', val: `${selectedLoc.rentbuy.breakEvenYrs} yrs`, col: '#f59e0b' },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.025)', padding: '10px 6px' }}>
                      <div style={{ fontSize: 15, fontFamily: 'Georgia, serif', color: s.col }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Metro */}
                <div style={{ borderRadius: 10, padding: '8px 12px', marginBottom: 12, fontSize: 11, background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)', color: 'rgba(20,184,166,0.7)' }}>
                  🚇 {selectedLoc.metro}
                </div>

                <p style={{ fontSize: 11, color: 'rgba(238,236,230,0.28)', fontStyle: 'italic', lineHeight: 1.55, marginBottom: 12 }}>{selectedLoc.summary}</p>

                <button onClick={() => { setChatOpen(true); setInput(`Tell me more about ${selectedLoc.name}`) }}
                  style={{ width: '100%', padding: '9px', borderRadius: 999, fontSize: 12, cursor: 'pointer', border: '1px solid rgba(245,158,11,0.22)', background: 'rgba(245,158,11,0.05)', color: 'rgba(245,158,11,0.8)', transition: 'all 0.15s' }}>
                  Deep dive with AI ↗
                </button>
              </div>
            </div>
          )}

          {/* AI CHAT */}
          {chatOpen && (
            <div style={{ width: 280, flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.07)', background: 'rgba(11,9,6,0.98)', display: 'flex', flexDirection: 'column', zIndex: 50 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#f59e0b', fontSize: 12 }}>✦</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(238,236,230,0.75)' }}>X Atlas AI</span>
                  <span style={{ fontSize: 11, color: 'rgba(238,236,230,0.2)' }}>· Bangalore</span>
                </div>
                <button onClick={() => setChatOpen(false)} style={{ fontSize: 20, color: 'rgba(238,236,230,0.2)', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
              </div>

              {messages.length === 0 && (
                <div style={{ padding: 14, flexShrink: 0 }}>
                  <p style={{ fontSize: 11, color: 'rgba(238,236,230,0.2)', marginBottom: 10 }}>Try asking:</p>
                  {starterPrompts.map((q, i) => (
                    <button key={i} onClick={() => setInput(q)}
                      style={{ display: 'block', width: '100%', textAlign: 'left', fontSize: 12, padding: '9px 11px', borderRadius: 10, marginBottom: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'rgba(238,236,230,0.42)', cursor: 'pointer', lineHeight: 1.4 }}>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '90%', borderRadius: 12, padding: '8px 12px', fontSize: 12, lineHeight: 1.55, ...(m.role === 'user' ? { background: 'rgba(245,158,11,0.1)', color: 'rgba(245,224,177,0.9)', border: '1px solid rgba(245,158,11,0.15)' } : { background: 'rgba(255,255,255,0.04)', color: 'rgba(238,236,230,0.62)', border: '1px solid rgba(255,255,255,0.06)' }) }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div style={{ display: 'flex', gap: 4, padding: '8px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', width: 'fit-content' }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(245,158,11,0.5)', animation: `bounce 1s infinite ${i*0.12}s` }} />)}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={sendChat} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: 12, display: 'flex', gap: 8, flexShrink: 0 }}>
                <input value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Ask about any locality…"
                  style={{ flex: 1, borderRadius: 10, padding: '8px 12px', fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(238,236,230,0.8)', outline: 'none' }} />
                <button type="submit" disabled={!input.trim() || aiLoading}
                  style={{ padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, background: input.trim() && !aiLoading ? '#f59e0b' : 'rgba(245,158,11,0.2)', color: '#0e0c08', border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}>
                  →
                </button>
              </form>
            </div>
          )}
        </div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
          .mapboxgl-ctrl-bottom-right { bottom: 40px !important; }
          .mapboxgl-ctrl-attrib { display: none !important; }
        `}</style>
      </div>
    </>
  )
}

// Separate component that re-renders bubbles as map moves
function MapBubbles({ localities, latlng, activeLayers, persona, selected, hovered, topLoc, getScore, bubbleColor, onSelect, onHover, mapRef }) {
  const [positions, setPositions] = useState({})
  const rafRef = useRef(null)

  function updatePositions() {
    if (!mapRef.current) return
    const newPos = {}
    localities.forEach(loc => {
      const ll = latlng[loc.id]
      if (!ll) return
      try {
        const pt = mapRef.current.project(ll)
        newPos[loc.id] = { x: pt.x, y: pt.y }
      } catch {}
    })
    setPositions(newPos)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current && mapRef.current.isStyleLoaded()) {
        updatePositions()
        clearInterval(interval)
      }
    }, 100)

    const onMove = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updatePositions)
    }

    const checkMap = setInterval(() => {
      if (mapRef.current) {
        mapRef.current.on('move', onMove)
        mapRef.current.on('zoom', onMove)
        mapRef.current.on('load', updatePositions)
        clearInterval(checkMap)
      }
    }, 200)

    return () => {
      clearInterval(interval)
      clearInterval(checkMap)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => { updatePositions() }, [activeLayers, persona])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
      {localities.map(loc => {
        const pos = positions[loc.id]
        if (!pos) return null
        const score = getScore(loc)
        const col = bubbleColor(loc, activeLayers)
        const size = 38 + (score / 100) * 38
        const isSel = selected === loc.id
        const isHov = hovered === loc.id
        const isTop = topLoc?.id === loc.id

        return (
          <div key={loc.id}
            style={{
              position: 'absolute',
              left: pos.x, top: pos.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto',
              cursor: 'pointer',
              zIndex: isSel ? 20 : isHov ? 15 : 10,
            }}
            onClick={() => onSelect(loc)}
            onMouseEnter={() => onHover(loc.id)}
            onMouseLeave={() => onHover(null)}>

            {/* Selected rings */}
            {isSel && <>
              <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: `1.5px solid ${col}`, opacity: 0.2 }} />
              <div style={{ position: 'absolute', inset: -7, borderRadius: '50%', border: `1.5px solid ${col}`, opacity: 0.45 }} />
            </>}

            {/* Hover ring */}
            {isHov && !isSel && (
              <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: `1px solid ${col}`, opacity: 0.35 }} />
            )}

            {/* Bubble */}
            <div style={{
              width: size, height: size, borderRadius: '50%',
              background: col,
              opacity: isSel ? 1 : 0.82,
              boxShadow: `0 0 ${isSel ? 28 : 14}px ${col}55, 0 4px 16px rgba(0,0,0,0.5)`,
              border: `1.5px solid ${isSel ? col : 'rgba(255,255,255,0.18)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              transform: isHov || isSel ? 'scale(1.1)' : 'scale(1)',
              position: 'relative',
            }}>
              <span style={{ fontSize: size * 0.27, fontWeight: 700, color: 'white', lineHeight: 1 }}>{score}</span>
              {isTop && <span style={{ position: 'absolute', top: -3, right: -1, fontSize: 10 }}>★</span>}

              {/* Layer dots */}
              {LAYER_IDS.filter(l => activeLayers[l]).map((l, i, arr) => {
                const angle = -Math.PI / 2 + (i / arr.length) * 2 * Math.PI
                const dr = size * 0.28
                const s = loc[l]?.score || 0
                const ds = Math.max(3, 5.5 * s / 100)
                return (
                  <div key={l} style={{
                    position: 'absolute', width: ds, height: ds, borderRadius: '50%',
                    background: LAYERS[l].color, opacity: 0.92,
                    top: '50%', left: '50%',
                    transform: `translate(calc(-50% + ${Math.cos(angle) * dr}px), calc(-50% + ${Math.sin(angle) * dr}px))`,
                  }} />
                )
              })}
            </div>

            {/* Name label */}
            <div style={{
              position: 'absolute', top: '100%', left: '50%',
              transform: 'translateX(-50%)', marginTop: 5,
              whiteSpace: 'nowrap', fontSize: 11, fontWeight: isSel ? 600 : 400,
              color: isSel ? '#f59e0b' : isHov ? 'rgba(238,236,230,0.9)' : 'rgba(238,236,230,0.55)',
              textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)',
              pointerEvents: 'none', transition: 'color 0.15s',
            }}>
              {loc.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
