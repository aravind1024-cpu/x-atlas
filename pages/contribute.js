import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { LOCALITIES, INCOME_ROLES } from '../lib/data'

const STEPS = ['Your info', 'Salary & income', 'Housing & rent', 'Lifestyle', 'Review']

function ProgressBar({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono transition-all"
            style={{
              background: i < step ? '#f59e0b' : i === step ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
              color: i <= step ? '#f59e0b' : 'rgba(238,236,230,0.3)',
              border: i === step ? '1px solid rgba(245,158,11,0.5)' : '1px solid transparent',
            }}
          >
            {i < step ? '✓' : i + 1}
          </div>
          {i < total - 1 && (
            <div className="h-px w-8 transition-all" style={{ background: i < step ? '#f59e0b' : 'rgba(255,255,255,0.08)' }} />
          )}
        </div>
      ))}
      <span className="ml-2 text-xs text-ink-500">{STEPS[step]}</span>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-ink-200 mb-1">{label}</label>
      {hint && <p className="text-xs text-ink-500 mb-2">{hint}</p>}
      {children}
    </div>
  )
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-200 focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value || o} value={o.value || o}>{o.label || o}</option>
      ))}
    </select>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ink-200 placeholder-ink-600 focus:outline-none focus:border-amber-500/50"
    />
  )
}

function StarRating({ value, onChange, label }) {
  return (
    <div className="mb-3">
      <div className="text-xs text-ink-400 mb-2">{label}</div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(s => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className="text-2xl transition-all hover:scale-110"
            style={{ color: s <= value ? '#f59e0b' : 'rgba(255,255,255,0.15)' }}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Contribute() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // Form state
  const [form, setForm] = useState({
    // Step 0: About you
    persona: '',
    yearsExp: '',
    workMode: '',
    locality: '',

    // Step 1: Salary
    role: '',
    companyType: '',
    salaryLPA: '',
    freelanceRate: '',
    salaryGrowthYoY: '',

    // Step 2: Housing
    rentType: '',
    monthlylRent: '',
    bhkType: '',
    block: '',
    rentSatisfaction: 3,

    // Step 3: Lifestyle
    foodSpend: '',
    clothSpend: '',
    transportSpend: '',
    foodRating: 3,
    nightlifeRating: 3,
    shoppingRating: 3,

    // Step 4: Review
    commuteTime: '',
    commuteDest: '',
    overallRating: 4,
    biggestPro: '',
    biggestCon: '',
    wouldRecommend: '',
  })

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async () => {
    // In production: POST to /api/contribute
    // For now simulate a submission
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Head><title>Thank you — X Atlas</title></Head>
        <div className="min-h-screen bg-ink-950 text-ink-100 flex flex-col items-center justify-center px-6">
          <div className="text-6xl mb-6">✦</div>
          <h1 className="font-display text-4xl text-amber-400 mb-4">Thank you.</h1>
          <p className="text-ink-400 text-center max-w-md mb-8">
            Your data has been received anonymously. It will be aggregated with other submissions
            to sharpen the scores for <strong className="text-ink-200">{LOCALITIES.find(l => l.id === form.locality)?.name || 'your locality'}</strong>.
          </p>
          <div className="flex gap-4">
            <Link href="/explore" className="px-6 py-2.5 rounded-full bg-amber-500 text-ink-950 text-sm font-medium hover:bg-amber-400 transition-all">
              See the updated map →
            </Link>
            <button onClick={() => { setSubmitted(false); setStep(0) }} className="px-6 py-2.5 rounded-full border border-white/15 text-ink-300 text-sm hover:border-white/30 transition-all">
              Submit another
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>Contribute data — X Atlas</title></Head>
      <div className="min-h-screen bg-ink-950 text-ink-100">
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-ink-950/80">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg text-amber-400">X/span>
            <span className="font-display text-lg text-ink-400">Atlas</span>
          </Link>
          <Link href="/explore" className="text-ink-400 hover:text-ink-100 text-sm transition-colors">← Back to map</Link>
        </nav>

        <div className="pt-24 max-w-xl mx-auto px-6 pb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 border border-amber-500/30 rounded-full px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              100% anonymous
            </div>
            <h1 className="font-display text-4xl text-ink-100 mb-2">Enrich the atlas</h1>
            <p className="text-ink-400 text-sm leading-relaxed">
              Your salary, rent and lifestyle data — anonymised and aggregated — makes the scores sharper for everyone.
              Takes about 3 minutes.
            </p>
          </div>

          <ProgressBar step={step} total={STEPS.length} />

          <div className="rounded-2xl border border-white/8 bg-white/2 p-8">

            {/* STEP 0: About you */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Tell us a bit about yourself</h2>
                <Field label="Which locality do you live or work in?" hint="Your primary Bangalore area">
                  <Select value={form.locality} onChange={v => update('locality', v)} placeholder="Select locality"
                    options={LOCALITIES.map(l => ({ value: l.id, label: l.name }))} />
                </Field>
                <Field label="Years of experience">
                  <Select value={form.yearsExp} onChange={v => update('yearsExp', v)} placeholder="Select"
                    options={['0–1 year', '1–3 years', '3–5 years', '5–8 years', '8–12 years', '12+ years']} />
                </Field>
                <Field label="How do you work?">
                  <div className="flex gap-2 flex-wrap">
                    {['Full-time employee', 'Freelancer / contract', 'Founder / self-employed', 'Student', 'Not working'].map(w => (
                      <button key={w} onClick={() => update('workMode', w)}
                        className={`tag-pill ${form.workMode === w ? 'active' : ''}`}>{w}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Your persona">
                  <div className="flex gap-2 flex-wrap">
                    {['Fresh graduate', 'Mid-level professional', 'Senior / lead', 'Manager / director', 'Family mover', 'Investor'].map(p => (
                      <button key={p} onClick={() => update('persona', p)}
                        className={`tag-pill ${form.persona === p ? 'active' : ''}`}>{p}</button>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {/* STEP 1: Salary */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Income & salary</h2>
                <Field label="Your primary role / function">
                  <Select value={form.role} onChange={v => update('role', v)} placeholder="Select role"
                    options={INCOME_ROLES} />
                </Field>
                <Field label="Company type">
                  <div className="flex gap-2 flex-wrap">
                    {['Early-stage startup', 'Series A–C startup', 'Late-stage / unicorn', 'MNC / large enterprise', 'Consulting / agency', 'Government / PSU', 'Freelance / self'].map(c => (
                      <button key={c} onClick={() => update('companyType', c)}
                        className={`tag-pill ${form.companyType === c ? 'active' : ''}`}>{c}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Annual CTC (LPA)" hint="In lakhs per annum — only the number, e.g. 18">
                  <TextInput type="number" value={form.salaryLPA} onChange={v => update('salaryLPA', v)} placeholder="e.g. 18" />
                </Field>
                <Field label="Freelance / consulting day rate (₹)" hint="Leave blank if not applicable">
                  <TextInput type="number" value={form.freelanceRate} onChange={v => update('freelanceRate', v)} placeholder="e.g. 5000" />
                </Field>
                <Field label="Salary growth last year (%)">
                  <Select value={form.salaryGrowthYoY} onChange={v => update('salaryGrowthYoY', v)} placeholder="Approximate % hike"
                    options={['0–5%', '5–10%', '10–20%', '20–30%', '30–50%', '50%+']} />
                </Field>
              </div>
            )}

            {/* STEP 2: Housing */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Housing & rent</h2>
                <Field label="Living situation">
                  <div className="flex gap-2 flex-wrap">
                    {['Renting solo', 'Renting shared', 'Own property', 'PG / hostel', 'Company accommodation'].map(t => (
                      <button key={t} onClick={() => update('rentType', t)}
                        className={`tag-pill ${form.rentType === t ? 'active' : ''}`}>{t}</button>
                    ))}
                  </div>
                </Field>
                <Field label="BHK type">
                  <div className="flex gap-2 flex-wrap">
                    {['Studio', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map(b => (
                      <button key={b} onClick={() => update('bhkType', b)}
                        className={`tag-pill ${form.bhkType === b ? 'active' : ''}`}>{b}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Monthly rent (₹)" hint="Your actual rent, not the listed price">
                  <TextInput type="number" value={form.monthlylRent} onChange={v => update('monthlylRent', v)} placeholder="e.g. 35000" />
                </Field>
                <Field label="Block / area within locality" hint="e.g. '5th Block', '27th Main', 'Sector 2'">
                  <TextInput value={form.block} onChange={v => update('block', v)} placeholder="Specific street or block" />
                </Field>
                <StarRating value={form.rentSatisfaction} onChange={v => update('rentSatisfaction', v)} label="How satisfied are you with your housing value for money?" />
              </div>
            )}

            {/* STEP 3: Lifestyle */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Monthly lifestyle spends</h2>
                <Field label="Monthly food & dining spend (₹)">
                  <Select value={form.foodSpend} onChange={v => update('foodSpend', v)} placeholder="Select range"
                    options={['Under ₹5k', '₹5–10k', '₹10–15k', '₹15–20k', '₹20–30k', '₹30–50k', '₹50k+']} />
                </Field>
                <Field label="Monthly clothing & shopping spend (₹)">
                  <Select value={form.clothSpend} onChange={v => update('clothSpend', v)} placeholder="Select range"
                    options={['Under ₹3k', '₹3–6k', '₹6–12k', '₹12–20k', '₹20–35k', '₹35k+']} />
                </Field>
                <Field label="Monthly transport spend (₹)" hint="Uber/Ola + fuel + metro">
                  <Select value={form.transportSpend} onChange={v => update('transportSpend', v)} placeholder="Select range"
                    options={['Under ₹3k', '₹3–5k', '₹5–8k', '₹8–12k', '₹12–20k', '₹20k+']} />
                </Field>
                <div className="mt-4 space-y-1">
                  <StarRating value={form.foodRating} onChange={v => update('foodRating', v)} label="Food scene quality" />
                  <StarRating value={form.nightlifeRating} onChange={v => update('nightlifeRating', v)} label="Nightlife & social scene" />
                  <StarRating value={form.shoppingRating} onChange={v => update('shoppingRating', v)} label="Shopping & retail access" />
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="font-display text-2xl text-ink-100 mb-6">Your honest review</h2>
                <Field label="Where do you commute to?" hint="Primary workplace locality">
                  <Select value={form.commuteDest} onChange={v => update('commuteDest', v)} placeholder="Select destination"
                    options={[...LOCALITIES.map(l => l.name), 'Work from home', 'Multiple locations']} />
                </Field>
                <Field label="Typical one-way commute time">
                  <div className="flex gap-2 flex-wrap">
                    {['<15 min', '15–30 min', '30–45 min', '45–60 min', '60–90 min', '90+ min'].map(t => (
                      <button key={t} onClick={() => update('commuteTime', t)}
                        className={`tag-pill ${form.commuteTime === t ? 'active' : ''}`}>{t}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Biggest pro of living here" hint="One thing you love">
                  <TextInput value={form.biggestPro} onChange={v => update('biggestPro', v)} placeholder="e.g. 'Walking distance to startups'" />
                </Field>
                <Field label="Biggest con" hint="One honest complaint">
                  <TextInput value={form.biggestCon} onChange={v => update('biggestCon', v)} placeholder="e.g. 'Silk Board traffic is brutal'" />
                </Field>
                <Field label="Would you recommend this locality to someone with your profile?">
                  <div className="flex gap-2">
                    {['Definitely yes', 'Probably yes', 'Depends on the person', 'Probably not', 'No'].map(w => (
                      <button key={w} onClick={() => update('wouldRecommend', w)}
                        className={`tag-pill text-xs ${form.wouldRecommend === w ? 'active' : ''}`}>{w}</button>
                    ))}
                  </div>
                </Field>
                <StarRating value={form.overallRating} onChange={v => update('overallRating', v)} label="Overall locality rating" />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/6">
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)} className="px-5 py-2 rounded-full border border-white/15 text-ink-400 text-sm hover:text-ink-200 hover:border-white/30 transition-all">
                  ← Back
                </button>
              ) : <div />}

              {step < STEPS.length - 1 ? (
                <button onClick={() => setStep(s => s + 1)} className="px-6 py-2 rounded-full bg-amber-500 text-ink-950 text-sm font-medium hover:bg-amber-400 transition-all">
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit} className="px-6 py-2 rounded-full bg-teal-500 text-ink-950 text-sm font-medium hover:bg-teal-400 transition-all">
                  Submit anonymously ✓
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-ink-600 text-center mt-4">
            No account required. No email collected. Fully anonymous. Data is aggregated only.
          </p>
        </div>
      </div>
    </>
  )
}
