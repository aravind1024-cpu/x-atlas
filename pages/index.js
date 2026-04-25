import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { LOCALITIES } from '../lib/data'

const STATS = [
  { value: '7', label: 'Localities mapped' },
  { value: '4', label: 'Data dimensions' },
  { value: '2.4k+', label: 'Community data points' },
  { value: 'Live', label: 'Crowdsourced' },
]

const FEATURES = [
  {
    icon: '◎',
    title: 'Three-map explorer',
    desc: 'Income, investment and lifestyle — each locality scored and ranked separately. Toggle layers, filter by your profile.',
    href: '/explore',
    color: '#f59e0b',
  },
  {
    icon: '⬡',
    title: 'Salary intelligence',
    desc: 'Real salary bands by role and locality, enriched by the community. See what your peers actually earn.',
    href: '/contribute',
    color: '#14b8a6',
  },
  {
    icon: '▲',
    title: 'Investment ROI engine',
    desc: 'Appreciation rates, rental yields, EMI calculators and break-even projections — by building, by block.',
    href: '/explore?tab=invest',
    color: '#97C459',
  },
  {
    icon: '◈',
    title: 'Living plan builder',
    desc: 'Input your profile. Get a 5-year financial roadmap, best streets, commute matrix and honest trade-offs.',
    href: '/explore?tab=plan',
    color: '#fb7185',
  },
]

export default function Home() {
  const [activeLocale, setActiveLocale] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveLocale(prev => (prev + 1) % LOCALITIES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const loc = LOCALITIES[activeLocale]

  return (
    <>
      <Head>
        <title>X Atlas — City Living Intelligence</title>
      </Head>

      <div className="grain min-h-screen bg-ink-950 text-ink-100">
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-ink-950/80">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl text-amber-400">X</span>
            <span className="font-display text-xl text-ink-200">Atlas</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/explore" className="animated-underline text-ink-400 hover:text-ink-100 transition-colors">
              Explore
            </Link>
            <Link href="/contribute" className="animated-underline text-ink-400 hover:text-ink-100 transition-colors">
              Contribute data
            </Link>
            <Link href="/explore" className="px-4 py-1.5 rounded-full border border-amber-500/50 text-amber-400 text-sm hover:bg-amber-500/10 transition-all">
              Open map →
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(238,236,230,1) 1px, transparent 1px), linear-gradient(90deg, rgba(238,236,230,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Animated locality ticker */}
          {mounted && (
            <div className="mb-8 flex items-center gap-3 text-sm text-ink-400">
              <div className="w-2 h-2 rounded-full animate-pulse-slow" style={{ background: '#f59e0b' }} />
              <span className="font-mono">
                Currently viewing:{' '}
                <span className="text-amber-400 font-medium transition-all duration-500">
                  {loc.name}
                </span>
                {' '}—{' '}
                <span className="text-ink-300">{loc.tagline}</span>
              </span>
            </div>
          )}

          <h1 className="font-display text-center leading-[0.95] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            <span className="text-ink-100">Know</span>
            <br />
            <span className="text-amber-400 italic">Bangalore</span>
            <br />
            <span className="text-ink-400">before you move.</span>
          </h1>

          <p className="text-center text-ink-400 max-w-xl text-lg leading-relaxed mb-10">
            Hyper-local intelligence on salary bands, property ROI and lifestyle costs —
            by locality, enriched by the community.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/explore"
              className="px-8 py-3 rounded-full bg-amber-500 text-ink-950 font-medium text-sm hover:bg-amber-400 transition-all hover:scale-105 active:scale-95"
            >
              Explore the map →
            </Link>
            <Link
              href="/contribute"
              className="px-8 py-3 rounded-full border border-white/15 text-ink-200 text-sm hover:border-white/30 hover:text-white transition-all"
            >
              Submit your data
            </Link>
          </div>

          {/* Live locality stats */}
          {mounted && (
            <div className="mt-16 grid grid-cols-3 gap-4 w-full max-w-md">
              <div className="rounded-2xl border border-white/8 bg-white/3 p-4 text-center">
                <div className="text-2xl font-display text-teal-400">{loc.income.jobScore}</div>
                <div className="text-xs text-ink-400 mt-1">Income score</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/3 p-4 text-center">
                <div className="text-2xl font-display text-amber-400">+{loc.invest.appreciation}%</div>
                <div className="text-xs text-ink-400 mt-1">Appreciation/yr</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/3 p-4 text-center">
                <div className="text-2xl font-display text-coral-400">{loc.lifestyle.foodScore}</div>
                <div className="text-xs text-ink-400 mt-1">Lifestyle score</div>
              </div>
            </div>
          )}
        </section>

        {/* STATS BAR */}
        <section className="border-y border-white/8 py-8">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl text-amber-400 mb-1">{s.value}</div>
                <div className="text-xs text-ink-400 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <div className="mb-12">
            <div className="section-divider" />
            <h2 className="font-display text-4xl text-ink-100">What X Atlas does</h2>
            <p className="text-ink-400 mt-3 max-w-lg">
              Built for people who want data before decisions — not vibes, not Reddit threads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <Link key={i} href={f.href}>
                <div className="card-hover rounded-2xl border border-white/8 bg-white/2 p-8 h-full group cursor-pointer">
                  <div className="text-2xl mb-4" style={{ color: f.color }}>{f.icon}</div>
                  <h3 className="font-display text-xl text-ink-100 mb-3 group-hover:text-amber-400 transition-colors">{f.title}</h3>
                  <p className="text-ink-400 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-4 text-xs font-mono text-ink-500 group-hover:text-amber-500 transition-colors">
                    Open → {f.href}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* HOW ENRICHMENT WORKS */}
        <section className="border-t border-white/8 py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-12">
              <div className="section-divider" />
              <h2 className="font-display text-4xl text-ink-100">Data gets better with you</h2>
              <p className="text-ink-400 mt-3 max-w-lg">
                Anonymous contributions enrich every score. The more people submit, the sharper the intelligence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Submit your salary',
                  desc: 'Role, years of experience, company type, locality of work. Anonymous. Takes 60 seconds.',
                  color: '#14b8a6',
                },
                {
                  step: '02',
                  title: 'Rate your locality',
                  desc: 'Rent you actually pay, food spend, commute time, what you love and hate. Hyper-local.',
                  color: '#f59e0b',
                },
                {
                  step: '03',
                  title: 'Scores update live',
                  desc: 'Every submission recalibrates the income, investment and lifestyle scores for that locality.',
                  color: '#97C459',
                },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-white/2 p-8">
                  <div className="font-mono text-5xl mb-4 opacity-20">{s.step}</div>
                  <h3 className="font-display text-xl text-ink-100 mb-3" style={{ color: s.color }}>{s.title}</h3>
                  <p className="text-ink-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/contribute"
                className="inline-flex px-8 py-3 rounded-full border border-teal-500/50 text-teal-400 text-sm hover:bg-teal-500/10 transition-all"
              >
                Contribute anonymously →
              </Link>
            </div>
          </div>
        </section>

        {/* LOCALITY QUICK SCAN */}
        <section className="border-t border-white/8 py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-10">
              <div className="section-divider" />
              <h2 className="font-display text-4xl text-ink-100">Quick locality scan</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {LOCALITIES.map((l) => (
                <Link key={l.id} href={`/locality/${l.id}`}>
                  <div className="card-hover rounded-xl border border-white/8 bg-white/2 p-5 group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-medium text-ink-100 group-hover:text-amber-400 transition-colors">{l.name}</div>
                        <div className="text-xs text-ink-500 mt-0.5">{l.zone}</div>
                      </div>
                      <div className="text-xs font-mono text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                    </div>
                    <div className="text-xs font-mono text-ink-500 border border-white/6 rounded-full px-2 py-0.5 inline-block">
                      {l.tag}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-1">
                      <div className="text-center">
                        <div className="text-sm font-medium text-teal-400">{l.income.jobScore}</div>
                        <div className="text-xs text-ink-600">jobs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-amber-400">+{l.invest.appreciation}%</div>
                        <div className="text-xs text-ink-600">appr</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-coral-400">{l.lifestyle.foodScore}</div>
                        <div className="text-xs text-ink-600">life</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/8 py-12 px-6 text-center">
          <div className="font-display text-2xl mb-2">
            <span className="text-amber-400">X</span>
            <span className="text-ink-600"> Atlas</span>
          </div>
          <p className="text-ink-600 text-sm">
            Community-powered living intelligence for Bangalore.
            <br />
            Data enriched by residents. Updated continuously.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-600">
            <Link href="/explore" className="hover:text-ink-300 transition-colors">Explore</Link>
            <Link href="/contribute" className="hover:text-ink-300 transition-colors">Contribute</Link>
            <span>Built with ♥ for Bangalore</span>
          </div>
        </footer>
      </div>
    </>
  )
}
