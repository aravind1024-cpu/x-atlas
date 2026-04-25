import Head from 'next/head'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { LOCALITIES, SAL_BANDS, INV_BANDS, FOOD_BANDS, CLOTH_BANDS, ROI_TARGETS, INV_BUDGETS, INCOME_ROLES, PERSONAS } from '../lib/data'
import { computeIncomeScore, computeInvestScore, computeLifeScore, computeMatchScore, matchColor, matchLabel, computeBreakEven, computeEMI } from '../lib/scoring'

const MAP_W = 100
const MAP_H = 100

function LocalityBubble({ loc, score, color, isSelected, onClick, onHover, onLeave, showRank, rank }) {
  const r = 4 + Math.sqrt(score / 100) * 8
  return (
    <g style={{ cursor: 'pointer' }} onClick={() => onClick(loc)} onMouseEnter={() => onHover(loc, score)} onMouseLeave={onLeave}>
      {isSelected && (
        <circle cx={loc.mapX} cy={loc.mapY} r={r + 5} fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      )}
      <circle cx={loc.mapX} cy={loc.mapY} r={r} fill={color} fillOpacity={score < 30 ? 0.2 : isSelected ? 1 : 0.75} />
      <text x={loc.mapX} y={loc.mapY + 2} textAnchor="middle" fontSize="5" fill="white" fontWeight="500" style={{ pointerEvents: 'none' }}>
        {score}
      </text>
      {showRank && rank <= 1 && (
        <text x={loc.mapX + r - 1} y={loc.mapY - r + 2} fontSize="7" style={{ pointerEvents: 'none' }}>★</text>
      )}
      <text x={loc.mapX} y={loc.mapY + r + 6} textAnchor="middle" fontSize="5" fill="rgba(238,236,230,0.5)" style={{ pointerEvents: 'none' }}>
        {loc.name.split(' ')[0]}
      </text>
    </g>
  )
}

function MiniMap({ title, color, scoreFn, selected, onSelect, palette }) {
  const [hovered, setHovered] = useState(null)
  const sorted = useMemo(() => [...LOCALITIES].sort((a, b) => scoreFn(b) - scoreFn(a)), [scoreFn])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span className="text-sm font-medium text-ink-200">{title}</span>
        </div>
        <span className="text-xs font-mono text-ink-500">
          ★ {sorted[0].name} ({scoreFn(sorted[0])})
        </span>
      </div>
      <div className="relative rounded-xl border border-white/8 bg-white/3 overflow-hidden" style={{ aspectRatio: '1/0.9' }}>
        <svg viewBox="0 0 100 90" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="90" fill="transparent" />
          <line x1="0" y1="45" x2="100" y2="45" stroke="rgba(238,236,230,0.04)" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="90" stroke="rgba(238,236,230,0.04)" strokeWidth="0.5" />
          {['N', 'S', 'W', 'E'].map((d, i) => {
            const pos = [{ x: 49, y: 6 }, { x: 49, y: 87 }, { x: 4, y: 46 }, { x: 93, y: 46 }][i]
            return <text key={d} x={pos.x} y={pos.y} fontSize="5" fill="rgba(238,236,230,0.2)" textAnchor="middle">{d}</text>
          })}
          {LOCALITIES.map((loc, i) => {
            const s = scoreFn(loc)
            const rank = sorted.findIndex(l => l.id === loc.id)
            return (
              <LocalityBubble
                key={loc.id}
                loc={{ ...loc, mapY: loc.mapY * 0.9 }}
                score={s}
                color={color}
                isSelected={selected === loc.id}
                onClick={() => onSelect(loc.id === selected ? null : loc.id)}
                onHover={(l, sc) => setHovered({ loc: l, score: sc })}
                onLeave={() => setHovered(null)}
                showRank
                rank={rank}
              />
            )
          })}
        </svg>
        {hovered && (
          <div className="absolute bottom-2 left-2 right-2 rounded-lg border border-white/10 bg-ink-900/95 p-2 pointer-events-none">
            <div className="text-xs font-medium text-ink-100">{hovered.loc.name}</div>
            <div className="text-xs mt-0.5" style={{ color }}>{title} score: {hovered.score}/100</div>
          </div>
        )}
      </div>
      {/* Mini ranking */}
      <div className="flex flex-col gap-1.5">
        {sorted.slice(0, 4).map((loc, i) => {
          const s = scoreFn(loc)
          const pct = Math.round(s / scoreFn(sorted[0]) * 100)
          return (
            <div
              key={loc.id}
              onClick={() => onSelect(loc.id === selected ? null : loc.id)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="text-xs font-mono w-4 text-ink-600">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-ink-300 group-hover:text-ink-100 transition-colors">{loc.name}</span>
                  <span className="text-xs font-mono" style={{ color }}>{s}</span>
                </div>
                <div className="h-1 rounded-full bg-white/6 overflow-hidden">
                  <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DetailPanel({ locId, filters, onClose }) {
  if (!locId) return null
  const loc = LOCALITIES.find(l => l.id === locId)
  if (!loc) return null

  const incScore = computeIncomeScore(loc, filters)
  const invScore = computeInvestScore(loc, filters)
  const lifScore = computeLifeScore(loc, filters)
  const matchScore = computeMatchScore(loc, filters)
  const col = matchColor(matchScore)
  const emi = computeEMI(loc.invest.avgPropertyPrice)
  const rental = Math.round(loc.invest.avgPropertyPrice * 1e5 * loc.invest.rentalYield / 100 / 12 / 1000)
  const beYr = computeBreakEven(loc.invest.appreciation)

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/80 backdrop-blur p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-display text-2xl text-ink-100">{loc.name}</h3>
          <p className="text-sm text-ink-400 mt-1">{loc.zone} · {loc.tagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-display" style={{ color: col }}>{matchScore}</div>
            <div className="text-xs text-ink-500">{matchLabel(matchScore)}</div>
          </div>
          <button onClick={onClose} className="text-ink-600 hover:text-ink-300 text-lg transition-colors">×</button>
        </div>
      </div>

      {/* Score strips */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Income fit', score: incScore, color: '#14b8a6' },
          { label: 'Invest fit', score: invScore, color: '#97C459' },
          { label: 'Lifestyle fit', score: lifScore, color: '#fb7185' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-white/6 bg-white/3 p-3 text-center">
            <div className="text-xl font-display" style={{ color: s.color }}>{s.score}</div>
            <div className="text-xs text-ink-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Three columns of top-3 */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* Jobs */}
        <div>
          <div className="text-xs font-mono text-teal-500 mb-2 uppercase tracking-wider">Top jobs</div>
          <div className="space-y-2">
            {loc.income.topEmployers.slice(0, 3).map((emp, i) => (
              <div key={i} className="rounded-lg border border-white/6 bg-white/3 p-2">
                <div className="text-xs font-medium text-ink-200">{emp}</div>
                <div className="text-xs text-ink-500 mt-0.5">{loc.income.avgSalaryLPA.min}–{loc.income.avgSalaryLPA.max} LPA</div>
              </div>
            ))}
          </div>
        </div>

        {/* Investments */}
        <div>
          <div className="text-xs font-mono text-green-500 mb-2 uppercase tracking-wider">Top investments</div>
          <div className="space-y-2">
            {loc.invest.topProjects.slice(0, 3).map((proj, i) => (
              <div key={i} className="rounded-lg border border-white/6 bg-white/3 p-2">
                <div className="text-xs font-medium text-ink-200">{proj}</div>
                <div className="text-xs text-teal-500 mt-0.5">+{loc.invest.appreciation}%/yr · {loc.invest.rentalYield}% yield</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle */}
        <div>
          <div className="text-xs font-mono text-coral-400 mb-2 uppercase tracking-wider">Top lifestyle</div>
          <div className="space-y-2">
            {loc.lifestyle.topSpots.slice(0, 3).map((spot, i) => (
              <div key={i} className="rounded-lg border border-white/6 bg-white/3 p-2">
                <div className="text-xs font-medium text-ink-200">{spot}</div>
                <div className="text-xs text-ink-500 mt-0.5">{loc.lifestyle.foodRange}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI snapshot */}
      <div className="rounded-xl border border-white/6 bg-white/2 p-4 mb-4">
        <div className="text-xs font-mono text-ink-500 mb-3 uppercase tracking-wider">Investment snapshot</div>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-base font-display text-green-400">+{loc.invest.appreciation}%</div>
            <div className="text-xs text-ink-500">appr/yr</div>
          </div>
          <div>
            <div className="text-base font-display text-teal-400">{loc.invest.rentalYield}%</div>
            <div className="text-xs text-ink-500">yield</div>
          </div>
          <div>
            <div className="text-base font-display text-amber-400">₹{emi}k/mo</div>
            <div className="text-xs text-ink-500">EMI est.</div>
          </div>
          <div>
            <div className="text-base font-display text-coral-400">{beYr}y</div>
            <div className="text-xs text-ink-500">break-even</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-ink-500 italic border-t border-white/6 pt-4">{loc.summary}</div>

      <div className="flex gap-3 mt-4">
        <Link href={`/locality/${loc.id}`} className="flex-1 text-center py-2 rounded-full border border-white/15 text-ink-300 text-sm hover:border-white/30 transition-all">
          Full profile →
        </Link>
        <Link href="/contribute" className="flex-1 text-center py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm hover:bg-amber-500/30 transition-all">
          Contribute data
        </Link>
      </div>
    </div>
  )
}

export default function Explore() {
  const [persona, setPersona] = useState('midlevel')
  const [skill, setSkill] = useState('Product Manager')
  const [salIdx, setSalIdx] = useState(3)
  const [freeIdx, setFreeIdx] = useState(2)
  const [invIdx, setInvIdx] = useState(3)
  const [roiIdx, setRoiIdx] = useState(3)
  const [holdIdx, setHoldIdx] = useState(3)
  const [foodIdx, setFoodIdx] = useState(3)
  const [clothIdx, setClothIdx] = useState(2)
  const [selIncome, setSelIncome] = useState(null)
  const [selInvest, setSelInvest] = useState(null)
  const [selLife, setSelLife] = useState(null)

  const filters = { salIdx, freeIdx, invIdx, roiIdx, holdIdx, foodIdx, clothIdx, skill }

  const incFn = (loc) => computeIncomeScore(loc, filters)
  const invFn = (loc) => computeInvestScore(loc, filters)
  const lifFn = (loc) => computeLifeScore(loc, filters)

  const applyPersona = (key) => {
    setPersona(key)
    const p = PERSONAS[key]
    setSalIdx(p.sal); setFreeIdx(p.inv)
    setInvIdx(p.inv); setRoiIdx(p.roi)
    setHoldIdx(3); setFoodIdx(p.food); setClothIdx(p.cloth)
    setSkill(p.skill)
  }

  return (
    <>
      <Head><title>Explore — X Atlas</title></Head>
      <div className="min-h-screen bg-ink-950 text-ink-100">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-ink-950/80">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg text-amber-400">X/span>
            <span className="font-display text-lg text-ink-400">Atlas</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-amber-400">Explore</span>
            <Link href="/contribute" className="text-ink-400 hover:text-ink-100 transition-colors">Contribute</Link>
          </div>
        </nav>

        <div className="pt-20 max-w-7xl mx-auto px-4 pb-16">
          <div className="py-8">
            <h1 className="font-display text-4xl text-ink-100 mb-2">Explore Bangalore</h1>
            <p className="text-ink-400 text-sm">Set your profile. Three maps update live.</p>
          </div>

          {/* PERSONA */}
          <div className="mb-6">
            <div className="text-xs font-mono text-ink-500 uppercase tracking-wider mb-3">Your persona</div>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(PERSONAS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => applyPersona(key)}
                  className={`tag-pill ${persona === key ? 'active' : ''}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* FILTERS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Income */}
            <div className="rounded-2xl border border-white/8 bg-white/2 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-sm font-medium text-teal-400">Income</span>
              </div>
              <div className="mb-3">
                <label className="text-xs text-ink-500 block mb-1.5">Skill / role</label>
                <input
                  type="text"
                  value={skill}
                  onChange={e => setSkill(e.target.value)}
                  placeholder="e.g. Product, React, Data..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-ink-200 placeholder-ink-600 focus:outline-none focus:border-teal-500/50"
                />
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {['Software Eng', 'Product', 'Data', 'Design', 'Finance'].map(r => (
                    <button key={r} onClick={() => setSkill(r)} className={`tag-pill income text-xs py-1 ${skill.toLowerCase().includes(r.toLowerCase().split(' ')[0].toLowerCase()) ? 'active' : ''}`}>{r}</button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-ink-500 mb-1.5">
                  <span>Salary expectation</span>
                  <span className="text-teal-400">{SAL_BANDS[Math.min(salIdx - 1, 7)].label}</span>
                </div>
                <input type="range" min="1" max="8" value={salIdx} onChange={e => setSalIdx(+e.target.value)} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-ink-500 mb-1.5">
                  <span>Freelance day rate</span>
                  <span className="text-teal-400">₹{[1, 2, 3, 5, 8, 15][Math.min(freeIdx - 1, 5)]}–{[2, 4, 8, 15, 25, 50][Math.min(freeIdx - 1, 5)]}k/day</span>
                </div>
                <input type="range" min="1" max="6" value={freeIdx} onChange={e => setFreeIdx(+e.target.value)} className="w-full" />
              </div>
            </div>

            {/* Investment */}
            <div className="rounded-2xl border border-white/8 bg-white/2 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm font-medium text-green-400">Investment</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-ink-500 mb-1.5">
                  <span>Target ROI %/yr</span>
                  <span className="text-green-400">{ROI_TARGETS[Math.min(roiIdx - 1, 7)]}</span>
                </div>
                <input type="range" min="1" max="8" value={roiIdx} onChange={e => setRoiIdx(+e.target.value)} className="w-full" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-ink-500 mb-1.5">
                  <span>Budget</span>
                  <span className="text-green-400">{INV_BANDS[Math.min(invIdx - 1, 7)]}</span>
                </div>
                <input type="range" min="1" max="8" value={invIdx} onChange={e => setInvIdx(+e.target.value)} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-ink-500 mb-1.5">
                  <span>Hold period</span>
                  <span className="text-green-400">{['1–2y', '3y', '5y', '7y', '10y', '15y'][Math.min(holdIdx - 1, 5)]}</span>
                </div>
                <input type="range" min="1" max="6" value={holdIdx} onChange={e => setHoldIdx(+e.target.value)} className="w-full" />
              </div>
            </div>

            {/* Lifestyle */}
            <div className="rounded-2xl border border-white/8 bg-white/2 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-coral-400" style={{ background: '#fb7185' }} />
                <span className="text-sm font-medium" style={{ color: '#fb7185' }}>Lifestyle</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-ink-500 mb-1.5">
                  <span>Food budget/mo</span>
                  <span style={{ color: '#fb7185' }}>{FOOD_BANDS[Math.min(foodIdx - 1, 6)]}</span>
                </div>
                <input type="range" min="1" max="7" value={foodIdx} onChange={e => setFoodIdx(+e.target.value)} className="w-full" />
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-ink-500 mb-1.5">
                  <span>Clothing budget/mo</span>
                  <span style={{ color: '#fb7185' }}>{CLOTH_BANDS[Math.min(clothIdx - 1, 5)]}</span>
                </div>
                <input type="range" min="1" max="6" value={clothIdx} onChange={e => setClothIdx(+e.target.value)} className="w-full" />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['Fine dining', 'Casual', 'Budget eats', 'Nightlife', 'Boutique'].map(t => (
                  <span key={t} className="tag-pill lifestyle text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* THREE MAPS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MiniMap title="Income map" color="#14b8a6" scoreFn={incFn} selected={selIncome} onSelect={setSelIncome} />
            <MiniMap title="Investment map" color="#97C459" scoreFn={invFn} selected={selInvest} onSelect={setSelInvest} />
            <MiniMap title="Lifestyle map" color="#fb7185" scoreFn={lifFn} selected={selLife} onSelect={setSelLife} />
          </div>

          {/* DETAIL PANELS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selIncome && <DetailPanel locId={selIncome} filters={filters} onClose={() => setSelIncome(null)} />}
            {selInvest && <DetailPanel locId={selInvest} filters={filters} onClose={() => setSelInvest(null)} />}
            {selLife && <DetailPanel locId={selLife} filters={filters} onClose={() => setSelLife(null)} />}
          </div>

          {!selIncome && !selInvest && !selLife && (
            <div className="text-center py-12 text-ink-600 text-sm">
              Click any bubble on the maps above to open a full locality breakdown
            </div>
          )}
        </div>
      </div>
    </>
  )
}
