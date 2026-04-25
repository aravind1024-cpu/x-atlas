import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { LOCALITIES } from '../lib/data'

const STEPS = ['About you', 'Income', 'Housing', 'Lifestyle', 'Review']

function Field({ label, hint, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-ink-200 mb-1">{label}</label>
      {hint && <p className="text-xs text-ink-500 mb-2">{hint}</p>}
      {children}
    </div>
  )
}

function TagSelect({ options, value, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          className={`tag-pill ${value === o ? 'active' : ''}`}>{o}</button>
      ))}
    </div>
  )
}

function SliderField({ label, value, onChange, min=1, max=10, formatVal }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-ink-400">{label}</span>
        <span className="text-amber-400 font-medium">{formatVal ? formatVal(value) : value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)} className="w-full" />
    </div>
  )
}

function StarRating({ value, onChange, label }) {
  return (
    <div className="mb-4">
      <div className="text-xs text-ink-400 mb-2">{label}</div>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(s => (
          <button key={s} onClick={() => onChange(s)} className="text-2xl transition-all hover:scale-110"
            style={{ color: s <= value ? '#f59e0b' : 'rgba(255,255,255,0.12)' }}>★</button>
        ))}
      </div>
    </div>
  )
}

export default function Contribute() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    city: 'bangalore', locality: '', persona: '', yearsExp: '', workMode: '',
    role: '', companyType: '', salaryLPA: 5, freelanceRate: 2,
    rentType: '', bhkType: '', monthlyRent: '', block: '', rentSatisfaction: 3,
    foodSpend: 3, clothSpend: 2, foodRating: 3, nightlifeRating: 3, shoppingRating: 3,
    commuteTime: '', commuteDest: '', overallRating: 4, biggestPro: '', biggestCon: '', wouldRecommend: '',
  })
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }))


  const submit = async () => {
    await fetch('/api/contribute', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setDone(true)
  }

  if (done) return (
    <div className="min-h-screen bg-ink-950 text-ink-100 flex flex-col items-center justify-center px-6">
      <div className="text-5xl mb-5">✦</div>
      <h1 className="font-display text-4xl text-amber-400 mb-3">Thank you.</h1>
      <p className="text-ink-400 text-center max-w-md mb-8 text-sm leading-relaxed">
        Your anonymous data enriches the scores for <strong className="text-ink-200">{LOCALITIES.find(l=>l.id===form.locality)?.name || 'your locality'}</strong>.
        The more people contribute, the sharper the intelligence gets.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="px-6 py-2.5 rounded-full bg-amber-500 text-ink-950 text-sm font-medium hover:bg-amber-400 transition-all">Back to map →</Link>
        <button onClick={() => { setDone(false); setStep(0) }} className="px-6 py-2.5 rounded-full border border-white/15 text-ink-300 text-sm">Submit more</button>
      </div>
    </div>
  )

  return (
    <>
      <Head><title>Contribute — X Atlas</title></Head>
      <div className="min-h-screen bg-ink-950 text-ink-100">
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-ink-950/80">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg text-amber-400">X</span>
            <span className="font-display text-lg text-ink-400">Atlas</span>
          </Link>
          <Link href="/" className="text-ink-400 hover:text-ink-100 text-sm transition-colors">← Back to map</Link>
        </nav>

        <div className="pt-24 max-w-lg mx-auto px-6 pb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 border border-amber-500/25 rounded-full px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />100% anonymous
            </div>
            <h1 className="font-display text-4xl text-ink-100 mb-2">Enrich the atlas</h1>
            <p className="text-ink-400 text-sm leading-relaxed">Your salary, rent and lifestyle data — anonymised — makes scores sharper for everyone. ~3 minutes.</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono transition-all"
                  style={{ background: i < step ? '#f59e0b' : i === step ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)', color: i <= step ? '#f59e0b' : 'rgba(238,236,230,0.3)', border: i === step ? '1px solid rgba(245,158,11,0.4)' : '1px solid transparent' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className="h-px w-6 transition-all" style={{ background: i < step ? '#f59e0b' : 'rgba(255,255,255,0.08)' }} />}
              </div>
            ))}
            <span className="ml-2 text-xs text-ink-500">{STEPS[step]}</span>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/2 p-8">
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">About you</h2>
                <Field label="City">
                  <TagSelect options={["Bangalore"]} value={'Bangalore'} onChange={v => u('city', 'bangalore')} />
                </Field>
                <Field label="Locality">
                  <select value={form.locality} onChange={e => u('locality', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-200 focus:outline-none focus:border-amber-500/50">
                    <option value="">Select locality</option>
                    {LOCALITIES.filter(l => l.city === 'bangalore').map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </Field>
                <Field label="Years of experience">
                  <TagSelect options={['0–1 yr', '1–3 yrs', '3–5 yrs', '5–8 yrs', '8–12 yrs', '12+ yrs']} value={form.yearsExp} onChange={v => u('yearsExp', v)} />
                </Field>
                <Field label="Work mode">
                  <TagSelect options={['Full-time employee', 'Freelancer', 'Founder', 'Student', 'Not working']} value={form.workMode} onChange={v => u('workMode', v)} />
                </Field>
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Income</h2>
                <Field label="Role / function">
                  <TagSelect options={['Software Engineer', 'Product Manager', 'Data / ML', 'Design', 'Marketing', 'Finance', 'Sales', 'Operations', 'Consulting', 'Other']} value={form.role} onChange={v => u('role', v)} />
                </Field>
                <Field label="Company type">
                  <TagSelect options={['Early startup', 'Series A–C', 'Unicorn / late-stage', 'MNC', 'Consulting / agency', 'Freelance / self']} value={form.companyType} onChange={v => u('companyType', v)} />
                </Field>
                <SliderField label="Annual CTC (LPA)" value={form.salaryLPA} onChange={v => u('salaryLPA', v)} min={3} max={80} formatVal={v => `₹${v} LPA`} />
                <SliderField label="Freelance day rate (₹k)" value={form.freelanceRate} onChange={v => u('freelanceRate', v)} min={1} max={30} formatVal={v => `₹${v}k/day`} />
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Housing</h2>
                <Field label="Living situation">
                  <TagSelect options={['Renting solo', 'Renting shared', 'Own property', 'PG / hostel', 'Company accommodation']} value={form.rentType} onChange={v => u('rentType', v)} />
                </Field>
                <Field label="BHK type">
                  <TagSelect options={['Studio', '1 BHK', '2 BHK', '3 BHK', '4+ BHK']} value={form.bhkType} onChange={v => u('bhkType', v)} />
                </Field>
                <Field label="Monthly rent (₹)" hint="Your actual rent paid">
                  <input type="number" value={form.monthlyRent} onChange={e => u('monthlyRent', e.target.value)} placeholder="e.g. 35000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-200 placeholder-ink-600 focus:outline-none focus:border-amber-500/50" />
                </Field>
                <Field label="Block / street" hint="e.g. 5th Block, 27th Main, Linking Road">
                  <input type="text" value={form.block} onChange={e => u('block', e.target.value)} placeholder="Specific block or street"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-200 placeholder-ink-600 focus:outline-none focus:border-amber-500/50" />
                </Field>
                <StarRating value={form.rentSatisfaction} onChange={v => u('rentSatisfaction', v)} label="Housing value for money" />
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Lifestyle</h2>
                <SliderField label="Food & dining spend/mo" value={form.foodSpend} onChange={v => u('foodSpend', v)} min={1} max={10} formatVal={v => ['<₹3k','₹3–5k','₹5–8k','₹8–12k','₹12–18k','₹18–25k','₹25–35k','₹35–50k','₹50–75k','₹75k+'][v-1]} />
                <SliderField label="Clothing & shopping/mo" value={form.clothSpend} onChange={v => u('clothSpend', v)} min={1} max={8} formatVal={v => ['<₹2k','₹2–4k','₹4–8k','₹8–15k','₹15–25k','₹25–40k','₹40–60k','₹60k+'][v-1]} />
                <StarRating value={form.foodRating} onChange={v => u('foodRating', v)} label="Food & restaurant scene" />
                <StarRating value={form.nightlifeRating} onChange={v => u('nightlifeRating', v)} label="Nightlife & events" />
                <StarRating value={form.shoppingRating} onChange={v => u('shoppingRating', v)} label="Shopping & retail" />
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Your review</h2>
                <Field label="Commute time (one-way)">
                  <TagSelect options={['<15 min', '15–30 min', '30–45 min', '45–60 min', '60–90 min', '90+ min']} value={form.commuteTime} onChange={v => u('commuteTime', v)} />
                </Field>
                <Field label="Biggest pro" hint="One thing you love about this locality">
                  <input type="text" value={form.biggestPro} onChange={e => u('biggestPro', e.target.value)} placeholder="e.g. Walking distance to startups"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-200 placeholder-ink-600 focus:outline-none focus:border-amber-500/50" />
                </Field>
                <Field label="Biggest con" hint="One honest complaint">
                  <input type="text" value={form.biggestCon} onChange={e => u('biggestCon', e.target.value)} placeholder="e.g. Silk Board traffic is brutal"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-200 placeholder-ink-600 focus:outline-none focus:border-amber-500/50" />
                </Field>
                <Field label="Would you recommend this area?">
                  <TagSelect options={['Definitely yes', 'Probably yes', 'Depends', 'Probably not', 'No']} value={form.wouldRecommend} onChange={v => u('wouldRecommend', v)} />
                </Field>
                <StarRating value={form.overallRating} onChange={v => u('overallRating', v)} label="Overall locality rating" />
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-white/6">
              {step > 0
                ? <button onClick={() => setStep(s => s-1)} className="px-5 py-2 rounded-full border border-white/15 text-ink-400 text-sm hover:text-ink-200 transition-all">← Back</button>
                : <div />}
              {step < STEPS.length - 1
                ? <button onClick={() => setStep(s => s+1)} className="px-6 py-2 rounded-full bg-amber-500 text-ink-950 text-sm font-medium hover:bg-amber-400 transition-all">Continue →</button>
                : <button onClick={submit} className="px-6 py-2 rounded-full bg-teal-500 text-ink-950 text-sm font-medium hover:bg-teal-400 transition-all">Submit anonymously ✓</button>}
            </div>
          </div>
          <p className="text-xs text-ink-600 text-center mt-4">No account. No email. Fully anonymous. Data aggregated only.</p>
        </div>
      </div>
    </>
  )
}
