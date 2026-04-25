import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LOCALITIES } from '../../lib/data'
import { computeBreakEven, computeEMI } from '../../lib/scoring'

export default function LocalityPage() {
  const router = useRouter()
  const { id } = router.query
  const loc = LOCALITIES.find(l => l.id === id)

  if (!loc) {
    return (
      <div className="min-h-screen bg-ink-950 text-ink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-6xl text-ink-700 mb-4">404</div>
          <Link href="/" className="text-amber-400 hover:underline">← Back to atlas</Link>
        </div>
      </div>
    )
  }

  const beYr = computeBreakEven(loc.invest.appreciation)
  const emi = computeEMI(loc.invest.avgPropertyPrice)

  const scores = [
    { label: 'Job market', value: loc.income.jobScore, color: '#14b8a6' },
    { label: 'Freelance', value: loc.income.freelanceScore, color: '#14b8a6' },
    { label: 'Residential invest', value: loc.invest.resScore, color: '#97C459' },
    { label: 'Commercial invest', value: loc.invest.comScore, color: '#97C459' },
    { label: 'Food scene', value: loc.lifestyle.foodScore, color: '#fb7185' },
    { label: 'Shopping', value: loc.lifestyle.clothScore, color: '#fb7185' },
  ]

  return (
    <>
      <Head>
        <title>{loc.name} — X Atlas</title>
        <meta name="description" content={`${loc.name}: ${loc.tagline}. Income, investment and lifestyle intelligence.`} />
      </Head>
      <div className="min-h-screen bg-ink-950 text-ink-100">
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-ink-950/80">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg text-amber-400">X/span>
            <span className="font-display text-lg text-ink-400">Atlas</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/explore" className="text-ink-400 hover:text-ink-100 transition-colors">← Explore</Link>
          </div>
        </nav>

        <div className="pt-24 max-w-5xl mx-auto px-6 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-start justify-between flex-wrap gap-6 mb-6">
              <div>
                <div className="font-mono text-xs text-amber-500 mb-2 uppercase tracking-widest">{loc.zone} Bangalore</div>
                <h1 className="font-display text-6xl text-ink-100 mb-3">{loc.name}</h1>
                <p className="text-ink-400 text-lg">{loc.tagline}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="tag-pill">{loc.tag}</span>
                  <span className="tag-pill">{loc.metro}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-7xl font-display text-amber-400">{loc.income.jobScore}</div>
                <div className="text-xs text-ink-500 mt-1">income score</div>
              </div>
            </div>
            <p className="text-sm text-ink-400 italic border-l-2 border-amber-500/40 pl-4 max-w-xl">{loc.summary}</p>
          </div>

          {/* Score bars */}
          <section className="mb-12">
            <h2 className="font-display text-2xl text-ink-200 mb-6">Dimension scores</h2>
            <div className="grid gap-3">
              {scores.map(s => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="w-36 text-sm text-ink-400">{s.label}</div>
                  <div className="flex-1 h-2 rounded-full bg-white/6 overflow-hidden">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${s.value}%`, background: s.color }} />
                  </div>
                  <div className="w-8 text-sm font-mono text-right" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Income */}
            <section className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <h3 className="font-display text-xl text-teal-400">Income</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Salary range</span>
                  <span className="text-ink-200">₹{loc.income.avgSalaryLPA.min}–{loc.income.avgSalaryLPA.max} LPA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Freelance rate</span>
                  <span className="text-ink-200">{loc.income.freelanceRate}</span>
                </div>
              </div>
              <div className="text-xs font-mono text-ink-500 mb-2 uppercase">Top employers</div>
              {loc.income.topEmployers.map(e => (
                <div key={e} className="text-sm text-ink-300 py-1 border-b border-white/4">{e}</div>
              ))}
              <div className="mt-3 text-xs font-mono text-ink-500 mb-2 uppercase">In-demand roles</div>
              <div className="flex flex-wrap gap-1.5">
                {loc.income.topRoles.map(r => <span key={r} className="tag-pill income text-xs">{r}</span>)}
              </div>
            </section>

            {/* Investment */}
            <section className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <h3 className="font-display text-xl text-green-400">Investment</h3>
              </div>
              <div className="space-y-3 mb-4">
                {[
                  ['Price/sqft', `₹${loc.invest.pricePerSqft.toLocaleString()}`],
                  ['Appreciation', `+${loc.invest.appreciation}%/yr`],
                  ['Rental yield', `${loc.invest.rentalYield}%`],
                  ['Break-even', `${beYr} years`],
                  ['EMI (₹90L prop)', `₹${emi}k/mo`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-ink-500">{k}</span>
                    <span className="text-ink-200">{v}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs font-mono text-ink-500 mb-2 uppercase">Top projects</div>
              {loc.invest.topProjects.map(p => (
                <div key={p} className="text-sm text-ink-300 py-1 border-b border-white/4">{p}</div>
              ))}
            </section>

            {/* Lifestyle */}
            <section className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: '#fb7185' }} />
                <h3 className="font-display text-xl" style={{ color: '#fb7185' }}>Lifestyle</h3>
              </div>
              <div className="space-y-3 mb-4">
                {[
                  ['Food range', loc.lifestyle.foodRange],
                  ['Clothing', loc.lifestyle.clothRange],
                  ['Food score', `${loc.lifestyle.foodScore}/100`],
                  ['Nightlife', `${loc.lifestyle.nightlifeScore}/100`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-ink-500">{k}</span>
                    <span className="text-ink-200">{v}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs font-mono text-ink-500 mb-2 uppercase">Top spots</div>
              {loc.lifestyle.topSpots.map(s => (
                <div key={s} className="text-sm text-ink-300 py-1 border-b border-white/4">{s}</div>
              ))}
              <div className="mt-3 text-xs text-ink-400 italic">{loc.lifestyle.vibe}</div>
            </section>
          </div>

          {/* Rent ranges */}
          <section className="rounded-2xl border border-white/8 bg-white/2 p-6 mb-8">
            <h3 className="font-display text-2xl text-ink-200 mb-6">Rental ranges (current market)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'Studio', rent: loc.rent.studio },
                { type: '1 BHK', rent: loc.rent.oneBHK },
                { type: '2 BHK', rent: loc.rent.twoBHK },
                { type: '3 BHK', rent: loc.rent.threeBHK },
              ].map(r => (
                <div key={r.type} className="text-center">
                  <div className="text-2xl font-display text-amber-400">₹{r.rent}k</div>
                  <div className="text-xs text-ink-500 mt-1">{r.type}/mo</div>
                </div>
              ))}
            </div>
          </section>

          {/* Commute matrix */}
          <section className="rounded-2xl border border-white/8 bg-white/2 p-6 mb-8">
            <h3 className="font-display text-2xl text-ink-200 mb-6">Commute from {loc.name}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(loc.commute).map(([dest, mins]) => (
                <div key={dest} className="flex items-center justify-between py-2 border-b border-white/4">
                  <span className="text-sm text-ink-400 capitalize">{dest.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className={`text-sm font-mono ${mins <= 20 ? 'text-teal-400' : mins <= 40 ? 'text-amber-400' : 'text-coral-400'}`} style={{ color: mins <= 20 ? '#14b8a6' : mins <= 40 ? '#f59e0b' : '#fb7185' }}>
                    {mins} min
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-ink-500">* Peak hour estimates · {loc.metro}</div>
          </section>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap">
            <Link href="/contribute" className="px-6 py-3 rounded-full bg-amber-500 text-ink-950 font-medium text-sm hover:bg-amber-400 transition-all">
              Add your data for {loc.name} →
            </Link>
            <Link href="/explore" className="px-6 py-3 rounded-full border border-white/15 text-ink-300 text-sm hover:border-white/30 transition-all">
              Compare on map →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: LOCALITIES.map(l => ({ params: { id: l.id } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return { props: {} }
}
