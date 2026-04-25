import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { LAYERS, LAYER_IDS, LOCALITIES, PERSONAS } from '../lib/data'

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

function bubbleColor(loc, activeLayers, score) {
  const dom = dominantLayer(loc, activeLayers)
  if (!dom) return `rgba(255,255,255,${0.1 + score / 100 * 0.3})`
  const base = { jobs: [20,184,166], rentbuy: [129,140,248], restaurants: [249,115,22] }
  const [r,g,b] = base[dom]
  const a = 0.35 + (score / 100) * 0.65
  return `rgba(${r},${g},${b},${a})`
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
  const [hoveredLoc, setHoveredLoc] = useState(null)
  const chatEndRef = useRef(null)

  const selectedLoc = LOCALITIES.find(l => l.id === selected)

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const toggleLayer = (id) => setActiveLayers(p => ({ ...p, [id]: !p[id] }))

  const fetchBrief = useCallback(async (loc) => {
    setBriefLoading(true)
    setBrief(null)
    try {
      const res = await fetch('/api/ai-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locality: loc.name, persona, activeLayers, locData: { jobs: loc.jobs?.score, rentbuy: loc.rentbuy?.score, restaurants: loc.restaurants?.score, tag: loc.tag, summary: loc.summary } }),
      })
      const data = await res.json()
      setBrief(data.brief)
    } catch {
      setBrief(null)
    }
    setBriefLoading(false)
  }, [persona, activeLayers])

  function selectLoc(loc) {
    if (loc.id === selected) { setSelected(null); setBrief(null); return }
    setSelected(loc.id)
    fetchBrief(loc)
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

  const sorted = [...LOCALITIES].sort((a, b) => compositeScore(b, activeLayers, persona) - compositeScore(a, activeLayers, persona))
  const topLoc = sorted[0]

  const starterPrompts = [
    'Best area for a software engineer in Bangalore?',
    'Where should I invest ₹80L?',
    'Compare Koramangala vs HSR Layout',
    'Which area has the best food & nightlife?',
    'Where should a family with kids move?',
  ]

  return (
    <>
      <Head>
        <title>X Atlas — Bangalore Living Intelligence</title>
        <meta name="description" content="Explore jobs, rent and restaurants for every locality in Bangalore. AI-powered insights." />
      </Head>

      <div className="h-screen flex flex-col bg-[#0e0c08] overflow-hidden select-none">

        {/* ── NAV ─────────────────────────────────────────────────────────── */}
        <nav className="flex-shrink-0 flex items-center gap-4 px-5 py-3 border-b border-white/8 bg-[#0e0c08]/95 backdrop-blur z-50 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-xl" style={{ fontFamily: 'Georgia, serif', color: '#f59e0b', fontStyle: 'italic' }}>X</span>
            <span className="font-display text-xl" style={{ fontFamily: 'Georgia, serif', color: 'rgba(238,236,230,0.7)' }}>Atlas</span>
          </div>
          <span className="text-white/10 text-lg">|</span>
          <span className="text-xs text-white/30 font-mono">Bangalore</span>

          <div className="flex-1" />

          {/* Persona */}
          <select value={persona} onChange={e => setPersona(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none focus:border-yellow-500/40 cursor-pointer">
            {Object.entries(PERSONAS).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}
          </select>

          <button onClick={() => { setChatOpen(o => !o); if (!chatOpen && messages.length === 0) {} }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${chatOpen ? 'bg-amber-500 text-[#0e0c08] border-transparent' : 'border-white/15 text-white/50 hover:text-white/80 hover:border-white/25'}`}>
            <span style={{ fontSize: '10px' }}>✦</span> Ask AI
          </button>

          <Link href="/contribute"
            className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
            + Contribute
          </Link>
        </nav>

        {/* ── LAYER TOGGLES ───────────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2 border-b border-white/5 flex-wrap">
          <span className="text-xs text-white/20 uppercase tracking-widest font-mono flex-shrink-0">Layers</span>
          {LAYER_IDS.map(id => {
            const L = LAYERS[id]
            const on = activeLayers[id]
            return (
              <button key={id} onClick={() => toggleLayer(id)}
                style={on ? { color: L.color, borderColor: L.color + '60', background: L.color + '12' } : {}}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border transition-all ${on ? '' : 'border-white/8 text-white/25'}`}>
                <span>{L.emoji}</span>{L.label}
              </button>
            )
          })}
          {topLoc && (
            <span className="ml-auto text-xs text-white/25 font-mono">
              Top match: <span style={{ color: '#f59e0b' }}>{topLoc.name}</span>
            </span>
          )}
        </div>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div className="flex-1 flex min-h-0">

          {/* ── MAP ─────────────────────────────────────────────────────── */}
          <div className="flex-1 relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="bg" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(20,184,166,0.05)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                {LAYER_IDS.map(id => (
                  <filter key={id} id={`glow-${id}`}>
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                ))}
              </defs>
              <rect width="100" height="100" fill="url(#bg)" />

              {/* Grid */}
              {[20, 40, 60, 80].map(v => (
                <g key={v}>
                  <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(238,236,230,0.02)" strokeWidth="0.3" />
                  <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(238,236,230,0.02)" strokeWidth="0.3" />
                </g>
              ))}

              {/* Compass */}
              {[['N',50,4],['S',50,97],['W',3,51],['E',97,51]].map(([d,x,y]) => (
                <text key={d} x={x} y={y} fontSize="2.8" fill="rgba(238,236,230,0.1)" textAnchor="middle">{d}</text>
              ))}

              {/* Bubbles */}
              {LOCALITIES.map(loc => {
                const score = compositeScore(loc, activeLayers, persona)
                const col = bubbleColor(loc, activeLayers, score)
                const r = 3.5 + (score / 100) * 8
                const isSel = selected === loc.id
                const isTop = loc.id === topLoc?.id
                const isHov = hoveredLoc === loc.id

                return (
                  <g key={loc.id} style={{ cursor: 'pointer' }}
                    onClick={() => selectLoc(loc)}
                    onMouseEnter={() => setHoveredLoc(loc.id)}
                    onMouseLeave={() => setHoveredLoc(null)}>

                    {/* Outer glow ring for selected */}
                    {isSel && (
                      <>
                        <circle cx={loc.mapX} cy={loc.mapY} r={r + 6} fill="none" stroke={col} strokeWidth="0.4" opacity="0.25" />
                        <circle cx={loc.mapX} cy={loc.mapY} r={r + 3} fill="none" stroke={col} strokeWidth="0.6" opacity="0.45" />
                      </>
                    )}

                    {/* Hover pulse */}
                    {isHov && !isSel && (
                      <circle cx={loc.mapX} cy={loc.mapY} r={r + 2} fill="none" stroke={col} strokeWidth="0.5" opacity="0.3" />
                    )}

                    {/* Main bubble */}
                    <circle cx={loc.mapX} cy={loc.mapY} r={r} fill={col} />

                    {/* Inner layer dots showing relative scores */}
                    {LAYER_IDS.filter(l => activeLayers[l]).map((l, i, arr) => {
                      const angle = -Math.PI / 2 + (i / arr.length) * 2 * Math.PI
                      const dr = r * 0.5
                      const s = loc[l]?.score || 0
                      const dotR = Math.max(0.3, 1.4 * s / 100)
                      return (
                        <circle key={l}
                          cx={loc.mapX + Math.cos(angle) * dr}
                          cy={loc.mapY + Math.sin(angle) * dr}
                          r={dotR} fill={LAYERS[l].color} opacity="0.85"
                          style={{ pointerEvents: 'none' }} />
                      )
                    })}

                    {/* Score label */}
                    <text x={loc.mapX} y={loc.mapY + 1.3} textAnchor="middle" fontSize="3.6"
                      fill="rgba(255,255,255,0.95)" fontWeight="700" style={{ pointerEvents: 'none' }}>{score}</text>

                    {/* Top badge */}
                    {isTop && (
                      <text x={loc.mapX + r - 0.5} y={loc.mapY - r + 0.5} fontSize="4"
                        style={{ pointerEvents: 'none' }}>★</text>
                    )}

                    {/* Name label */}
                    <text x={loc.mapX} y={loc.mapY + r + 5}
                      textAnchor="middle" fontSize="2.6"
                      fill={isSel ? 'rgba(245,158,11,0.9)' : isHov ? 'rgba(238,236,230,0.8)' : 'rgba(238,236,230,0.4)'}
                      fontWeight={isSel ? '600' : '400'}
                      style={{ pointerEvents: 'none' }}>
                      {loc.name.split(/[\s\/]/)[0]}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Bottom-left legend */}
            <div className="absolute bottom-4 left-4 bg-[#0e0c08]/80 backdrop-blur rounded-2xl p-3 border border-white/6 flex flex-col gap-1.5">
              {LAYER_IDS.filter(l => activeLayers[l]).map(id => (
                <div key={id} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(238,236,230,0.45)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: LAYERS[id].color }} />
                  {LAYERS[id].label}
                </div>
              ))}
              <div className="text-xs pt-1 border-t border-white/6 mt-0.5" style={{ color: 'rgba(238,236,230,0.2)' }}>
                bubble size = match score
              </div>
            </div>

            {/* Hover tooltip */}
            {hoveredLoc && !selected && (() => {
              const loc = LOCALITIES.find(l => l.id === hoveredLoc)
              if (!loc) return null
              return (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#0e0c08]/95 backdrop-blur border border-white/10 rounded-xl px-4 py-2.5 pointer-events-none">
                  <div className="text-sm font-medium text-white/80">{loc.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{loc.tag} · Click to explore</div>
                </div>
              )
            })()}
          </div>

          {/* ── LOCALITY DETAIL PANEL ───────────────────────────────────── */}
          {selectedLoc && (
            <div className="w-72 flex-shrink-0 border-l border-white/8 bg-[#111008]/98 overflow-y-auto">
              <div className="p-4">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: 'rgba(238,236,230,0.95)' }}>{selectedLoc.name}</h2>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(238,236,230,0.35)' }}>{selectedLoc.zone} · {selectedLoc.tag}</p>
                  </div>
                  <button onClick={() => { setSelected(null); setBrief(null) }}
                    className="text-xl leading-none transition-colors ml-2" style={{ color: 'rgba(238,236,230,0.25)' }}>×</button>
                </div>

                {/* Layer score pills */}
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  {LAYER_IDS.map(id => {
                    const L = LAYERS[id]
                    const s = selectedLoc[id]?.score || 0
                    return (
                      <div key={id} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs"
                        style={{ background: L.color + '14', color: L.color, border: `1px solid ${L.color}35` }}>
                        {L.emoji} <span className="font-mono">{s}</span>
                      </div>
                    )
                  })}
                </div>

                {/* ── AI BRIEF ── */}
                <div className="rounded-xl border border-amber-500/15 bg-amber-500/4 p-3.5 mb-4">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span style={{ color: '#f59e0b', fontSize: '10px' }}>✦</span>
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'rgba(245,158,11,0.7)' }}>AI Analysis</span>
                  </div>
                  {briefLoading ? (
                    <div className="space-y-2">
                      {[95, 82, 88, 68, 78].map((w, i) => (
                        <div key={i} className="h-1.5 rounded-full animate-pulse" style={{ width: `${w}%`, background: 'rgba(255,255,255,0.06)' }} />
                      ))}
                    </div>
                  ) : brief ? (
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(238,236,230,0.6)' }}>{brief}</p>
                  ) : (
                    <p className="text-xs" style={{ color: 'rgba(238,236,230,0.25)' }}>Loading analysis…</p>
                  )}
                </div>

                {/* ── TOP 3 PER LAYER ── */}
                {LAYER_IDS.filter(l => activeLayers[l]).map(id => {
                  const L = LAYERS[id]
                  const data = selectedLoc[id]
                  if (!data) return null
                  return (
                    <div key={id} className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider" style={{ color: L.color + 'cc' }}>
                          {L.emoji} {L.label}
                        </div>
                        <span className="text-xs font-mono" style={{ color: L.color + '80' }}>{data.score}/100</span>
                      </div>
                      <div className="space-y-1.5">
                        {(data.listings || []).slice(0, 3).map((item, i) => (
                          <div key={i} className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="text-xs font-medium leading-snug" style={{ color: 'rgba(238,236,230,0.82)' }}>
                              {item.role || item.name}
                            </div>
                            <div className="text-xs mt-0.5 flex gap-1 flex-wrap" style={{ color: 'rgba(238,236,230,0.35)' }}>
                              <span>{item.company || item.type}</span>
                              <span>·</span>
                              <span style={{ color: L.color + 'bb' }}>{item.pay || item.price}</span>
                              {item.yield && <span style={{ color: '#14b8a6' }}>· {item.yield}</span>}
                            </div>
                            {item.note && <div className="text-xs mt-0.5" style={{ color: 'rgba(238,236,230,0.22)' }}>{item.note}</div>}
                          </div>
                        ))}
                      </div>
                      {/* Extra layer context */}
                      {id === 'jobs' && data.jobDensity && (
                        <div className="mt-1.5 text-xs" style={{ color: 'rgba(238,236,230,0.28)' }}>📍 {data.jobDensity}</div>
                      )}
                      {id === 'rentbuy' && data.verdict && (
                        <div className="mt-1.5 text-xs italic" style={{ color: 'rgba(238,236,230,0.3)' }}>{data.verdict}</div>
                      )}
                      {id === 'restaurants' && data.vibe && (
                        <div className="mt-1.5 text-xs italic" style={{ color: 'rgba(238,236,230,0.3)' }}>{data.vibe}</div>
                      )}
                    </div>
                  )
                })}

                {/* ── KEY STATS ── */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: 'Appreciation', val: `+${selectedLoc.rentbuy.appreciation}%/yr`, col: '#818cf8' },
                    { label: 'Rental yield',  val: `${selectedLoc.rentbuy.rentalYield}%`, col: '#14b8a6' },
                    { label: '2BHK rent', val: `₹${selectedLoc.rentbuy.rentRanges.twoBHK}k/mo`, col: 'rgba(238,236,230,0.7)' },
                    { label: 'Break-even', val: `${selectedLoc.rentbuy.breakEvenYrs} yrs`, col: '#f59e0b' },
                  ].map(s => (
                    <div key={s.label} className="text-center rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="text-sm font-medium" style={{ color: s.col, fontFamily: 'Georgia, serif' }}>{s.val}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(238,236,230,0.3)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Metro */}
                <div className="rounded-lg px-3 py-2 mb-3 text-xs" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)', color: 'rgba(20,184,166,0.7)' }}>
                  🚇 {selectedLoc.metro}
                </div>

                {/* CTA */}
                <button onClick={() => { setChatOpen(true); setInput(`Tell me more about ${selectedLoc.name}`) }}
                  className="w-full py-2 rounded-full text-xs transition-all"
                  style={{ border: '1px solid rgba(245,158,11,0.2)', color: 'rgba(245,158,11,0.8)', background: 'rgba(245,158,11,0.05)' }}
                  onMouseEnter={e => e.target.style.background = 'rgba(245,158,11,0.1)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(245,158,11,0.05)'}>
                  Deep dive with AI ↗
                </button>
              </div>
            </div>
          )}

          {/* ── AI CHAT SIDEBAR ─────────────────────────────────────────── */}
          {chatOpen && (
            <div className="w-72 flex-shrink-0 border-l border-white/8 bg-[#111008]/98 flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#f59e0b', fontSize: '12px' }}>✦</span>
                  <span className="text-sm font-medium" style={{ color: 'rgba(238,236,230,0.75)' }}>X Atlas AI</span>
                  <span className="text-xs" style={{ color: 'rgba(238,236,230,0.2)' }}>· Bangalore</span>
                </div>
                <button onClick={() => setChatOpen(false)}
                  className="text-xl transition-colors" style={{ color: 'rgba(238,236,230,0.2)' }}>×</button>
              </div>

              {/* Starter prompts */}
              {messages.length === 0 && (
                <div className="p-4 space-y-1.5 flex-shrink-0">
                  <p className="text-xs mb-3" style={{ color: 'rgba(238,236,230,0.2)' }}>Try asking:</p>
                  {starterPrompts.map((q, i) => (
                    <button key={i} onClick={() => setInput(q)}
                      className="w-full text-left text-xs p-2.5 rounded-lg transition-all leading-relaxed"
                      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'rgba(238,236,230,0.4)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(238,236,230,0.7)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'rgba(238,236,230,0.4)' }}>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed"
                      style={m.role === 'user'
                        ? { background: 'rgba(245,158,11,0.1)', color: 'rgba(245,224,177,0.9)', border: '1px solid rgba(245,158,11,0.15)' }
                        : { background: 'rgba(255,255,255,0.04)', color: 'rgba(238,236,230,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-xl px-3 py-2.5 flex gap-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {[0,1,2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: 'rgba(245,158,11,0.5)', animationDelay: `${i * 0.12}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={sendChat} className="border-t border-white/6 p-3 flex gap-2 flex-shrink-0">
                <input value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Ask about any locality…"
                  className="flex-1 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(238,236,230,0.8)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.35)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                <button type="submit" disabled={!input.trim() || aiLoading}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-30"
                  style={{ background: '#f59e0b', color: '#0e0c08' }}>→</button>
              </form>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
