import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LOCALITIES, LAYERS, LAYER_IDS } from '../../lib/data'

export default function LocalityPage() {
  const { query } = useRouter()
  const loc = LOCALITIES.find(l => l.id === query.id)

  if (!loc) return (
    <div style={{ minHeight: '100vh', background: '#0e0c08', color: '#eeece6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, opacity: 0.2, fontFamily: 'Georgia', marginBottom: 16 }}>404</div>
        <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: 14 }}>← Back to map</Link>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>{loc.name} — X Atlas Bangalore</title>
        <meta name="description" content={`${loc.name}: ${loc.tagline}. Jobs, rent and lifestyle intelligence.`} />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0e0c08', color: '#eeece6', fontFamily: 'system-ui, sans-serif' }}>
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(14,12,8,0.9)', backdropFilter: 'blur(8px)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#f59e0b', fontStyle: 'italic' }}>X</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: 'rgba(238,236,230,0.6)' }}>Atlas</span>
          </Link>
          <Link href="/" style={{ color: 'rgba(238,236,230,0.4)', fontSize: 13, textDecoration: 'none' }}>← Map</Link>
        </nav>

        <div style={{ paddingTop: 96, maxWidth: 900, margin: '0 auto', padding: '96px 24px 64px' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{loc.zone} · Bangalore</div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 400, color: 'rgba(238,236,230,0.95)', marginBottom: 8 }}>{loc.name}</h1>
            <p style={{ fontSize: 18, color: 'rgba(238,236,230,0.45)', marginBottom: 16 }}>{loc.tagline}</p>
            <p style={{ fontSize: 13, color: 'rgba(238,236,230,0.35)', fontStyle: 'italic', borderLeft: '2px solid rgba(245,158,11,0.3)', paddingLeft: 12, maxWidth: 560, lineHeight: 1.6 }}>{loc.summary}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {LAYER_IDS.map(id => {
              const L = LAYERS[id]
              const data = loc[id]
              if (!data) return null
              return (
                <div key={id} style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{L.emoji}</span>
                      <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: L.color }}>{L.label}</span>
                    </div>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, color: L.color + '99' }}>{data.score}/100</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(data.listings || []).slice(0, 3).map((item, i) => (
                      <div key={i} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.025)', padding: '8px 10px' }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(238,236,230,0.8)', marginBottom: 2 }}>{item.role || item.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.35)' }}>
                          {item.company || item.type} · <span style={{ color: L.color + 'bb' }}>{item.pay || item.price}</span>
                          {item.yield && <span style={{ color: '#14b8a6' }}> · {item.yield}</span>}
                        </div>
                        {item.note && <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.2)', marginTop: 2 }}>{item.note}</div>}
                      </div>
                    ))}
                  </div>
                  {id === 'rentbuy' && data.verdict && <div style={{ marginTop: 10, fontSize: 11, fontStyle: 'italic', color: 'rgba(238,236,230,0.28)', lineHeight: 1.5 }}>{data.verdict}</div>}
                  {id === 'restaurants' && data.vibe && <div style={{ marginTop: 10, fontSize: 11, fontStyle: 'italic', color: 'rgba(238,236,230,0.28)', lineHeight: 1.5 }}>{data.vibe}</div>}
                  {id === 'jobs' && data.jobDensity && <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(238,236,230,0.28)' }}>📍 {data.jobDensity}</div>}
                </div>
              )
            })}
          </div>

          {/* Investment stats */}
          <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'rgba(238,236,230,0.8)', marginBottom: 20 }}>Investment snapshot</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, textAlign: 'center' }}>
              {[
                { label: 'Price / sqft', val: `₹${loc.rentbuy.pricePerSqft.toLocaleString()}`, col: '#818cf8' },
                { label: 'Appreciation', val: `+${loc.rentbuy.appreciation}%/yr`, col: '#14b8a6' },
                { label: 'Rental yield', val: `${loc.rentbuy.rentalYield}%`, col: '#14b8a6' },
                { label: 'Break-even', val: `${loc.rentbuy.breakEvenYrs} yrs`, col: '#f59e0b' },
              ].map(s => (
                <div key={s.label} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)', padding: '14px 8px' }}>
                  <div style={{ fontSize: 20, fontFamily: 'Georgia, serif', color: s.col, marginBottom: 4 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rent ranges */}
          <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'rgba(238,236,230,0.8)', marginBottom: 16 }}>Rental ranges (current market)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, textAlign: 'center' }}>
              {[['Studio', 'studio'], ['1 BHK', 'oneBHK'], ['2 BHK', 'twoBHK'], ['3 BHK', 'threeBHK']].map(([label, key]) => (
                <div key={key} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)', padding: '12px 6px' }}>
                  <div style={{ fontSize: 18, fontFamily: 'Georgia, serif', color: '#818cf8', marginBottom: 3 }}>₹{loc.rentbuy.rentRanges[key]}k</div>
                  <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.3)' }}>{label}/mo</div>
                </div>
              ))}
            </div>
          </div>

          {/* Commute */}
          {loc.commute && (
            <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: 24, marginBottom: 32 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'rgba(238,236,230,0.8)', marginBottom: 16 }}>Commute from {loc.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {Object.entries(loc.commute).map(([dest, info]) => {
                  const t = info.time
                  const col = t <= 20 ? '#14b8a6' : t <= 40 ? '#f59e0b' : '#f97316'
                  return (
                    <div key={dest} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 13, color: 'rgba(238,236,230,0.55)', textTransform: 'capitalize' }}>{dest.replace(/_/g,' ')}</div>
                        <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.22)', marginTop: 2 }}>{info.mode}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 13, fontFamily: 'monospace', color: col }}>{t} min</div>
                        {info.note && <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.2)', marginTop: 1, maxWidth: 120, textAlign: 'right' }}>{info.note}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(238,236,230,0.2)' }}>* Peak hour estimates · {loc.metro}</div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contribute" style={{ padding: '10px 24px', borderRadius: 999, background: '#f59e0b', color: '#0e0c08', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>Add your data →</Link>
            <Link href="/" style={{ padding: '10px 24px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(238,236,230,0.5)', fontSize: 13, textDecoration: 'none' }}>Back to map →</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const { LOCALITIES } = require('../../lib/data')
  return { paths: LOCALITIES.map(l => ({ params: { id: l.id } })), fallback: false }
}
export async function getStaticProps() { return { props: {} } }
