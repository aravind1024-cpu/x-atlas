import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { LOCALITIES, LAYERS, LAYER_IDS } from '../../lib/data'

// ── Action helpers ──────────────────────────────────────────────────────────
function jobApplyLinks(role, locality) {
  const q = encodeURIComponent(`${role} ${locality} Bangalore`)
  return {
    linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}&location=Bangalore%2C+Karnataka`,
    wellfound: `https://wellfound.com/jobs?q=${encodeURIComponent(role)}&l=Bangalore`,
    naukri: `https://www.naukri.com/${role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-jobs-in-bangalore-1`,
  }
}

function propertySearchLinks(locality) {
  const loc = locality.toLowerCase().replace(/\s+/g, '-')
  return {
    magicbricks: `https://www.magicbricks.com/property-for-sale/residential-real-estate?cityName=Bangalore&Area=${encodeURIComponent(locality)}`,
    ninetynine: `https://www.99acres.com/search/property/buy/bangalore/${loc}`,
    housing: `https://housing.com/in/buy/searches/bangalore/${loc}`,
    nobroker: `https://www.nobroker.in/property/sale/bangalore/${loc}`,
  }
}

function restaurantLinks(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    zomato: `https://www.zomato.com/bangalore/restaurants?q=${encodeURIComponent(name)}`,
    swiggy: `https://www.swiggy.com/search?query=${encodeURIComponent(name)}`,
    dineout: `https://www.dineout.co.in/bangalore-restaurants?q=${encodeURIComponent(name)}`,
  }
}

// ── Reusable components ─────────────────────────────────────────────────────
const A = ({ href, label, icon, bg, fg = 'white', small }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: small ? '5px 10px' : '7px 13px',
    borderRadius: 8, fontSize: small ? 11 : 12, fontWeight: 500,
    textDecoration: 'none', background: bg, color: fg,
    border: `1px solid ${bg}`, transition: 'opacity 0.15s', whiteSpace: 'nowrap',
  }}
    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
    {icon && <span>{icon}</span>}{label}
  </a>
) : null

function Input({ label, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, color: 'rgba(238,236,230,0.45)', marginBottom: 4 }}>
        {label}{required && <span style={{ color: '#f97316' }}> *</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(238,236,230,0.85)', fontSize: 13, outline: 'none' }}
        onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.4)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, color: 'rgba(238,236,230,0.45)', marginBottom: 4 }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(18,15,10,0.95)', color: 'rgba(238,236,230,0.85)', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
      </select>
    </div>
  )
}

// ── Property Enquiry Modal ──────────────────────────────────────────────────
function PropertyEnquiryModal({ listing, locality, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', budget: listing?.price || '', bhk: '', message: '', propertyType: listing?.type || 'Buy' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [waLink, setWaLink] = useState(null)
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/property-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locality, listingName: listing?.name }),
      })
      const data = await res.json()
      if (data.success) { setStatus('success'); setWaLink(data.whatsappLink) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ width: '100%', maxWidth: 480, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: '#0e0c08', padding: 28, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'rgba(238,236,230,0.95)', margin: 0, marginBottom: 4 }}>Property Enquiry</h3>
            {listing && <p style={{ fontSize: 13, color: 'rgba(238,236,230,0.4)', margin: 0 }}>{listing.name} · {listing.price}</p>}
          </div>
          <button onClick={onClose} style={{ fontSize: 22, color: 'rgba(238,236,230,0.25)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>✓</div>
            <h4 style={{ fontFamily: 'Georgia', fontSize: 20, color: '#14b8a6', marginBottom: 8 }}>Enquiry sent!</h4>
            <p style={{ fontSize: 13, color: 'rgba(238,236,230,0.5)', lineHeight: 1.6, marginBottom: 20 }}>
              An agent will contact you on <strong style={{ color: 'rgba(238,236,230,0.8)' }}>{form.phone}</strong> within 2 hours. You can also reach them instantly on WhatsApp.
            </p>
            {waLink && <A href={waLink} label="Chat with agent on WhatsApp" icon="💬" bg="#25D366" />}
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Your name" value={form.name} onChange={v => u('name', v)} placeholder="Aravind Kumar" required />
              </div>
              <Input label="Phone" value={form.phone} onChange={v => u('phone', v)} placeholder="+91 98765 43210" type="tel" required />
              <Input label="Email" value={form.email} onChange={v => u('email', v)} placeholder="you@email.com" type="email" />
              <Select label="Looking to" value={form.propertyType} onChange={v => u('propertyType', v)}
                options={[{ value: 'Buy', label: 'Buy' }, { value: 'Rent', label: 'Rent' }, { value: 'Lease', label: 'Lease commercial' }]} />
              <Select label="BHK preference" value={form.bhk} onChange={v => u('bhk', v)}
                options={[{ value: '', label: 'Flexible' }, 'Studio', '1 BHK', '2 BHK', '3 BHK', '4+ BHK']} />
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Budget" value={form.budget} onChange={v => u('budget', v)} placeholder="e.g. ₹80L or ₹35k/mo" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, color: 'rgba(238,236,230,0.45)', marginBottom: 4 }}>Additional requirements</label>
              <textarea value={form.message} onChange={e => u('message', e.target.value)} placeholder="Floor preference, parking, pet-friendly, furnishing, move-in date..."
                style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(238,236,230,0.85)', fontSize: 13, outline: 'none', minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={status === 'loading' || !form.name || !form.phone}
                style={{ flex: 1, padding: '11px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: form.name && form.phone ? '#f59e0b' : 'rgba(245,158,11,0.3)', color: '#0e0c08', transition: 'all 0.15s' }}>
                {status === 'loading' ? 'Sending...' : 'Send enquiry →'}
              </button>
              {status === 'error' && <div style={{ fontSize: 11, color: '#f97316', alignSelf: 'center' }}>Error — try again</div>}
            </div>
            <p style={{ fontSize: 10, color: 'rgba(238,236,230,0.2)', marginTop: 10, textAlign: 'center' }}>Your details are shared only with verified agents for this locality. No spam.</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ── Post a Job Modal ────────────────────────────────────────────────────────
function PostJobModal({ locality, onClose }) {
  const [form, setForm] = useState({ company: '', role: '', salary: '', type: 'Full-time', exp: '', skills: '', description: '', contact: '', website: '' })
  const [status, setStatus] = useState(null)
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/post-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locality }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ width: '100%', maxWidth: 500, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: '#0e0c08', padding: 28, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'rgba(238,236,230,0.95)', margin: 0, marginBottom: 4 }}>Post a Job</h3>
            <p style={{ fontSize: 13, color: 'rgba(238,236,230,0.35)', margin: 0 }}>Free · Appears on X Atlas {locality} map after review</p>
          </div>
          <button onClick={onClose} style={{ fontSize: 22, color: 'rgba(238,236,230,0.25)', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
            <h4 style={{ fontFamily: 'Georgia', fontSize: 20, color: '#14b8a6', marginBottom: 8 }}>Job submitted!</h4>
            <p style={{ fontSize: 13, color: 'rgba(238,236,230,0.5)', lineHeight: 1.6 }}>
              Your listing will appear on the X Atlas {locality} map within 24 hours after review. We'll contact you at <strong style={{ color: 'rgba(238,236,230,0.7)' }}>{form.contact}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Company name" value={form.company} onChange={v => u('company', v)} placeholder="e.g. Zepto, Your Startup" required />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Role / title" value={form.role} onChange={v => u('role', v)} placeholder="e.g. Senior Software Engineer" required />
              </div>
              <Input label="Salary / pay" value={form.salary} onChange={v => u('salary', v)} placeholder="e.g. ₹18–28 LPA" />
              <Select label="Job type" value={form.type} onChange={v => u('type', v)}
                options={['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote']} />
              <Input label="Experience required" value={form.exp} onChange={v => u('exp', v)} placeholder="e.g. 2–5 years" />
              <Input label="Key skills (comma separated)" value={form.skills} onChange={v => u('skills', v)} placeholder="React, Node.js, SQL" />
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 11, color: 'rgba(238,236,230,0.45)', marginBottom: 4 }}>Job description</label>
                  <textarea value={form.description} onChange={e => u('description', e.target.value)} placeholder="What does this role involve? What are you looking for?"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(238,236,230,0.85)', fontSize: 13, outline: 'none', minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Contact email or phone" value={form.contact} onChange={v => u('contact', v)} placeholder="hr@company.com or +91 98765..." required />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Company website (optional)" value={form.website} onChange={v => u('website', v)} placeholder="https://yourcompany.com" />
              </div>
            </div>
            <button type="submit" disabled={status === 'loading' || !form.company || !form.role || !form.contact}
              style={{ width: '100%', padding: '11px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: form.company && form.role && form.contact ? '#14b8a6' : 'rgba(20,184,166,0.3)', color: '#0e0c08', transition: 'all 0.15s' }}>
              {status === 'loading' ? 'Submitting...' : 'Post job for free →'}
            </button>
            <p style={{ fontSize: 10, color: 'rgba(238,236,230,0.2)', marginTop: 10, textAlign: 'center' }}>Free for all companies. Reviewed within 24 hours. No spam.</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ── Job card ────────────────────────────────────────────────────────────────
function JobCard({ job, locality }) {
  const [open, setOpen] = useState(false)
  const links = jobApplyLinks(job.role, locality)
  return (
    <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', overflow: 'hidden', marginBottom: 8 }}>
      <div style={{ padding: '12px 14px', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(238,236,230,0.92)', marginBottom: 3 }}>{job.role}</div>
            <div style={{ fontSize: 12, color: 'rgba(238,236,230,0.42)', marginBottom: 5 }}>{job.company}</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(20,184,166,0.12)', color: '#14b8a6', border: '1px solid rgba(20,184,166,0.2)' }}>{job.pay}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: 'rgba(238,236,230,0.45)' }}>{job.type}</span>
              {job.exp && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: 'rgba(238,236,230,0.45)' }}>{job.exp}</span>}
            </div>
          </div>
          <span style={{ color: 'rgba(238,236,230,0.2)', fontSize: 14, flexShrink: 0, alignSelf: 'flex-start' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 14px', background: 'rgba(255,255,255,0.02)' }}>
          {job.skills?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skills needed</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {job.skills.map(s => <span key={s} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(245,158,11,0.08)', color: 'rgba(245,158,11,0.7)', border: '1px solid rgba(245,158,11,0.15)' }}>{s}</span>)}
              </div>
            </div>
          )}
          <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Apply directly on</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <A href={links.linkedin} label="LinkedIn" icon="in" bg="#0077b5" />
            <A href={links.wellfound} label="Wellfound" icon="⊕" bg="#f43f5e" />
            <A href={links.naukri} label="Naukri" icon="◈" bg="#ef6c00" />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Property card ───────────────────────────────────────────────────────────
function PropertyCard({ prop, onEnquire }) {
  const isBuy = prop.type === 'Buy' || prop.type === 'Lease'
  return (
    <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', padding: '14px', marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(238,236,230,0.92)', marginBottom: 4 }}>{prop.name}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#818cf8' }}>{prop.price}</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: isBuy ? 'rgba(129,140,248,0.12)' : 'rgba(20,184,166,0.12)', color: isBuy ? '#818cf8' : '#14b8a6', border: `1px solid ${isBuy ? 'rgba(129,140,248,0.2)' : 'rgba(20,184,166,0.2)'}` }}>{prop.type}</span>
            {prop.yield && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(20,184,166,0.08)', color: '#14b8a6' }}>🔁 {prop.yield}</span>}
          </div>
          {prop.note && <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.32)', marginTop: 4 }}>{prop.note}</div>}
        </div>
      </div>
      {/* CTA row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => onEnquire(prop)}
          style={{ flex: 1, minWidth: 140, padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#f59e0b', color: '#0e0c08', transition: 'opacity 0.15s' }}
          onMouseEnter={e => e.target.style.opacity = '0.85'} onMouseLeave={e => e.target.style.opacity = '1'}>
          📩 Enquire — agent connects you
        </button>
        <A href={`https://wa.me/918095652913?text=${encodeURIComponent(`Hi, I'm interested in ${prop.name} in ${prop.type === 'Rent' ? 'renting' : 'buying'} — ${prop.price}. Can you help?`)}`}
          label="WhatsApp agent" icon="💬" bg="#25D366" />
      </div>
    </div>
  )
}

// ── Restaurant card ─────────────────────────────────────────────────────────
function RestaurantCard({ spot }) {
  const [open, setOpen] = useState(false)
  const links = restaurantLinks(spot.name)
  const isEvent = ['live music', 'nightlife', 'brewery', 'events', 'bar'].some(t => spot.type?.toLowerCase().includes(t))
  return (
    <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', overflow: 'hidden', marginBottom: 8 }}>
      <div style={{ padding: '12px 14px', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(238,236,230,0.92)', marginBottom: 3 }}>{spot.name}</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: '#f97316', fontWeight: 500 }}>{spot.price}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(249,115,22,0.1)', color: 'rgba(249,115,22,0.8)', border: '1px solid rgba(249,115,22,0.2)' }}>{spot.type}</span>
            </div>
            {spot.note && <div style={{ fontSize: 11, color: 'rgba(238,236,230,0.32)', marginTop: 3 }}>{spot.note}</div>}
          </div>
          <span style={{ color: 'rgba(238,236,230,0.2)', fontSize: 14, flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 14px', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: isEvent ? 10 : 0 }}>
            <A href={links.zomato} label="View on Zomato" icon="🍴" bg="#e23744" />
            <A href={links.swiggy} label="Order Swiggy" icon="🛵" bg="#fc8019" />
            <A href={links.dineout} label="Reserve table" icon="🪑" bg="#e91e63" />
          </div>
          {isEvent && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Events & tickets</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <A href="https://in.bookmyshow.com/explore/events-bangalore" label="BookMyShow" icon="🎫" bg="#e71e24" />
                <A href="https://insider.in/bangalore" label="Insider.in" icon="🎭" bg="#6c3483" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LocalityPage() {
  const { query } = useRouter()
  const [activeTab, setActiveTab] = useState('jobs')
  const [skillFilter, setSkillFilter] = useState('')
  const [enquiryListing, setEnquiryListing] = useState(null)
  const [showPostJob, setShowPostJob] = useState(false)
  const [aiInsight, setAiInsight] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  const loc = LOCALITIES.find(l => l.id === query.id)

  const fetchAI = useCallback(async () => {
    if (!loc) return
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locality: loc.name, persona: 'midlevel',
          activeLayers: { jobs: true, rentbuy: true, restaurants: true },
          locData: { jobs: loc.jobs?.score, rentbuy: loc.rentbuy?.score, restaurants: loc.restaurants?.score, tag: loc.tag, summary: loc.summary }
        }),
      })
      const data = await res.json()
      setAiInsight(data.brief)
    } catch {}
    setAiLoading(false)
  }, [loc?.id])

  useEffect(() => { if (loc) fetchAI() }, [loc?.id])

  if (!loc) return (
    <div style={{ minHeight: '100vh', background: '#0e0c08', color: '#eeece6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia', fontSize: 56, opacity: 0.15, marginBottom: 16 }}>404</div>
        <Link href="/" style={{ color: '#f59e0b', fontSize: 14, textDecoration: 'none' }}>← Back to map</Link>
      </div>
    </div>
  )

  const filteredJobs = skillFilter
    ? (loc.jobs?.listings || []).filter(j =>
        j.skills?.some(s => s.toLowerCase().includes(skillFilter.toLowerCase())) ||
        j.role.toLowerCase().includes(skillFilter.toLowerCase()) ||
        j.company.toLowerCase().includes(skillFilter.toLowerCase()))
    : (loc.jobs?.listings || [])

  const tabs = [
    { id: 'jobs', label: '💼 Jobs', count: loc.jobs?.listings?.length },
    { id: 'rentbuy', label: '🏠 Rent / Buy', count: loc.rentbuy?.listings?.length },
    { id: 'restaurants', label: '🍜 Restaurants', count: loc.restaurants?.listings?.length },
  ]

  const propLinks = propertySearchLinks(loc.name)

  return (
    <>
      <Head>
        <title>{loc.name} — X Atlas Bangalore</title>
        <meta name="description" content={`${loc.name} Bangalore: apply to jobs, enquire about properties, discover restaurants. AI-powered living intelligence.`} />
      </Head>

      {enquiryListing && <PropertyEnquiryModal listing={enquiryListing} locality={loc.name} onClose={() => setEnquiryListing(null)} />}
      {showPostJob && <PostJobModal locality={loc.name} onClose={() => setShowPostJob(false)} />}

      <div style={{ minHeight: '100vh', background: '#0e0c08', color: '#eeece6', fontFamily: 'system-ui, sans-serif' }}>
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(14,12,8,0.95)', backdropFilter: 'blur(12px)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#f59e0b', fontStyle: 'italic' }}>X</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: 'rgba(238,236,230,0.5)' }}>Atlas</span>
          </Link>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(238,236,230,0.35)', fontSize: 13, textDecoration: 'none' }}>← Map</Link>
            <button onClick={() => setShowPostJob(true)}
              style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(20,184,166,0.3)', background: 'rgba(20,184,166,0.08)', color: '#14b8a6', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
              + Post a job
            </button>
            <Link href="/contribute" style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(238,236,230,0.4)', fontSize: 12, textDecoration: 'none' }}>+ Add data</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 820, margin: '0 auto', padding: '80px 20px 60px' }}>

          {/* Hero */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>{loc.zone} · Bangalore</div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 38, fontWeight: 400, color: 'rgba(238,236,230,0.95)', margin: '0 0 6px' }}>{loc.name}</h1>
            <p style={{ fontSize: 15, color: 'rgba(238,236,230,0.38)', margin: '0 0 14px' }}>{loc.tagline}</p>

            {/* Score pills + metro */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 14 }}>
              {LAYER_IDS.map(id => {
                const L = LAYERS[id]; const s = loc[id]?.score || 0
                return (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 999, fontSize: 12, background: L.color + '14', color: L.color, border: `1px solid ${L.color}30` }}>
                    {L.emoji} {L.label} <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{s}</span>
                  </div>
                )
              })}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 999, fontSize: 11, background: 'rgba(20,184,166,0.07)', color: 'rgba(20,184,166,0.65)', border: '1px solid rgba(20,184,166,0.14)' }}>
                🚇 {loc.metro}
              </div>
            </div>

            {/* AI brief */}
            <div style={{ borderRadius: 14, border: '1px solid rgba(245,158,11,0.14)', background: 'rgba(245,158,11,0.04)', padding: '13px 15px' }}>
              <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(245,158,11,0.55)', marginBottom: 7 }}>✦ AI Analysis</div>
              {aiLoading
                ? <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>{[90,75,85].map((w,i) => <div key={i} style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)', width: `${w}%`, animation: `pulse 1.5s ease-in-out ${i*0.15}s infinite` }} />)}</div>
                : <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(238,236,230,0.6)', margin: 0 }}>{aiInsight || loc.summary}</p>}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 20 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ padding: '9px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer', background: 'none', border: 'none', color: activeTab === t.id ? '#f59e0b' : 'rgba(238,236,230,0.32)', borderBottom: activeTab === t.id ? '2px solid #f59e0b' : '2px solid transparent', marginBottom: -1, transition: 'color 0.15s' }}>
                {t.label}{t.count ? <span style={{ fontSize: 10, opacity: 0.55, marginLeft: 4 }}>({t.count})</span> : ''}
              </button>
            ))}
          </div>

          {/* ── JOBS TAB ── */}
          {activeTab === 'jobs' && (
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={skillFilter} onChange={e => setSkillFilter(e.target.value)}
                  placeholder="Filter by skill or role — e.g. React, Product, DevOps, Data"
                  style={{ flex: 1, minWidth: 220, padding: '8px 13px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(238,236,230,0.8)', fontSize: 13, outline: 'none' }} />
                {skillFilter && <button onClick={() => setSkillFilter('')} style={{ fontSize: 11, color: 'rgba(238,236,230,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>Clear ×</button>}
                <button onClick={() => setShowPostJob(true)}
                  style={{ padding: '8px 14px', borderRadius: 9, border: '1px solid rgba(20,184,166,0.3)', background: 'rgba(20,184,166,0.08)', color: '#14b8a6', fontSize: 12, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  + Post a job here
                </button>
              </div>

              <div style={{ fontSize: 12, color: 'rgba(238,236,230,0.28)', marginBottom: 10 }}>
                {filteredJobs.length} listing{filteredJobs.length !== 1 ? 's' : ''} · Expand to apply on LinkedIn, Wellfound or Naukri
              </div>

              {filteredJobs.map((j, i) => <JobCard key={i} job={j} locality={loc.name} />)}

              {filteredJobs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(238,236,230,0.28)' }}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>🔍</div>
                  <div style={{ fontSize: 14, marginBottom: 5 }}>No matches for "{skillFilter}"</div>
                  <div style={{ fontSize: 12, marginBottom: 14 }}>Top roles here: {loc.jobs?.topRoles?.join(', ')}</div>
                  <button onClick={() => setSkillFilter('')} style={{ padding: '6px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', background: 'none', color: 'rgba(238,236,230,0.45)', fontSize: 12, cursor: 'pointer' }}>Show all</button>
                </div>
              )}

              {/* Salary context */}
              <div style={{ marginTop: 16, padding: '13px 15px', borderRadius: 14, border: '1px solid rgba(20,184,166,0.1)', background: 'rgba(20,184,166,0.04)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div><div style={{ fontSize: 10, color: 'rgba(238,236,230,0.3)', marginBottom: 2 }}>Salary range</div><div style={{ fontSize: 16, color: '#14b8a6', fontFamily: 'Georgia' }}>{loc.jobs?.salaryRange}</div></div>
                <div><div style={{ fontSize: 10, color: 'rgba(238,236,230,0.3)', marginBottom: 2 }}>Freelance rate</div><div style={{ fontSize: 16, color: '#14b8a6', fontFamily: 'Georgia' }}>{loc.jobs?.freelanceRate}</div></div>
                <div style={{ flex: 1, minWidth: 180 }}><div style={{ fontSize: 10, color: 'rgba(238,236,230,0.3)', marginBottom: 2 }}>Job density</div><div style={{ fontSize: 12, color: 'rgba(238,236,230,0.45)', lineHeight: 1.4 }}>{loc.jobs?.jobDensity}</div></div>
              </div>

              {/* Broad search */}
              <div style={{ marginTop: 14, padding: '13px 15px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 9, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Search all {loc.name} jobs on</div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  <A href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(loc.jobs?.topRoles?.[0] || '')}&location=Bangalore`} label="LinkedIn" icon="in" bg="#0077b5" />
                  <A href={`https://wellfound.com/jobs?l=Bangalore`} label="Wellfound (startups)" icon="⊕" bg="#f43f5e" />
                  <A href={`https://www.naukri.com/jobs-in-bangalore`} label="Naukri" icon="◈" bg="#ef6c00" />
                  <A href="https://internshala.com/internships/internship-in-bangalore" label="Internshala" icon="🎓" bg="#00bfa5" />
                </div>
              </div>
            </div>
          )}

          {/* ── RENT/BUY TAB ── */}
          {activeTab === 'rentbuy' && (
            <div>
              {/* Rent ranges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 18 }}>
                {[['Studio', 'studio'], ['1 BHK', 'oneBHK'], ['2 BHK', 'twoBHK'], ['3 BHK', 'threeBHK']].map(([label, key]) => (
                  <div key={key} style={{ textAlign: 'center', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)', padding: '11px 6px' }}>
                    <div style={{ fontSize: 17, fontFamily: 'Georgia, serif', color: '#818cf8', marginBottom: 2 }}>₹{loc.rentbuy?.rentRanges?.[key]}k</div>
                    <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.32)' }}>{label}/mo</div>
                  </div>
                ))}
              </div>

              {/* Key investment metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 16 }}>
                {[
                  { label: 'Avg price', val: `₹${loc.rentbuy?.avgPropertyPrice}L`, col: '#818cf8' },
                  { label: 'Appreciation', val: `+${loc.rentbuy?.appreciation}%/yr`, col: '#14b8a6' },
                  { label: 'Rental yield', val: `${loc.rentbuy?.rentalYield}%`, col: '#14b8a6' },
                  { label: '₹/sqft', val: `₹${loc.rentbuy?.pricePerSqft?.toLocaleString()}`, col: '#f59e0b' },
                  { label: 'Break-even', val: `${loc.rentbuy?.breakEvenYrs} yrs`, col: '#f59e0b' },
                  { label: 'Best street', val: loc.rentbuy?.bestStreets?.[0]?.split('–')[0] || '—', col: 'rgba(238,236,230,0.5)' },
                ].map(s => (
                  <div key={s.label} style={{ borderRadius: 11, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)', padding: '9px 11px' }}>
                    <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 14, color: s.col, fontFamily: 'Georgia, serif' }}>{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Verdict */}
              {loc.rentbuy?.verdict && (
                <div style={{ marginBottom: 16, padding: '11px 13px', borderRadius: 11, border: '1px solid rgba(245,158,11,0.14)', background: 'rgba(245,158,11,0.04)', fontSize: 13, color: 'rgba(238,236,230,0.58)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  💡 {loc.rentbuy.verdict}
                </div>
              )}

              <div style={{ fontSize: 12, color: 'rgba(238,236,230,0.28)', marginBottom: 10 }}>
                {loc.rentbuy?.listings?.length} listings · Click "Enquire" — agent contacts you within 2 hrs
              </div>

              {(loc.rentbuy?.listings || []).map((prop, i) => (
                <PropertyCard key={i} prop={prop} onEnquire={listing => setEnquiryListing(listing)} />
              ))}

              {/* Open enquiry for whole locality */}
              <div style={{ marginTop: 14, padding: '13px 15px', borderRadius: 14, border: '1px solid rgba(245,158,11,0.14)', background: 'rgba(245,158,11,0.04)' }}>
                <div style={{ fontSize: 12, color: 'rgba(238,236,230,0.55)', marginBottom: 10 }}>Can't find the right listing? Tell an agent your requirements and they'll search for you.</div>
                <button onClick={() => setEnquiryListing(null)}
                  style={{ padding: '9px 20px', borderRadius: 999, background: '#f59e0b', color: '#0e0c08', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => { setEnquiryListing({}); }}>
                  📩 Send open enquiry for {loc.name}
                </button>
              </div>

              {/* Portal links */}
              <div style={{ marginTop: 14, padding: '13px 15px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 9, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Also search on property portals</div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  <A href={propLinks.magicbricks} label="MagicBricks" icon="🏠" bg="#e74c3c" small />
                  <A href={propLinks.ninetynine} label="99acres" icon="◉" bg="#27ae60" small />
                  <A href={propLinks.housing} label="Housing.com" icon="⌂" bg="#2980b9" small />
                  <A href={propLinks.nobroker} label="NoBroker" icon="🔑" bg="#ff6b35" small />
                </div>
              </div>
            </div>
          )}

          {/* ── RESTAURANTS TAB ── */}
          {activeTab === 'restaurants' && (
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                {[
                  { label: 'Food score', val: `${loc.restaurants?.score}/100`, col: '#f97316' },
                  { label: 'Price range', val: loc.restaurants?.foodRange, col: '#f97316' },
                  { label: 'Nightlife', val: `${loc.restaurants?.nightlifeScore}/100`, col: '#f97316' },
                ].map(s => (
                  <div key={s.label} style={{ flex: 1, minWidth: 120, padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(249,115,22,0.14)', background: 'rgba(249,115,22,0.05)' }}>
                    <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.3)', marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 16, color: s.col, fontFamily: 'Georgia' }}>{s.val}</div>
                  </div>
                ))}
              </div>

              {loc.restaurants?.vibe && (
                <div style={{ marginBottom: 14, padding: '11px 13px', borderRadius: 11, border: '1px solid rgba(249,115,22,0.1)', background: 'rgba(249,115,22,0.04)', fontSize: 13, color: 'rgba(238,236,230,0.55)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  🍴 {loc.restaurants.vibe}
                </div>
              )}

              <div style={{ fontSize: 12, color: 'rgba(238,236,230,0.28)', marginBottom: 10 }}>
                {loc.restaurants?.listings?.length} top picks · Expand to order or reserve
              </div>

              {(loc.restaurants?.listings || []).map((spot, i) => <RestaurantCard key={i} spot={spot} />)}

              {/* Broad discovery */}
              <div style={{ marginTop: 16, padding: '13px 15px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 9, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Discover all {loc.name} restaurants</div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 }}>
                  <A href={`https://www.zomato.com/bangalore/${loc.name.toLowerCase().replace(/\s+/g, '-')}-restaurants`} label="Zomato" icon="🍴" bg="#e23744" />
                  <A href={`https://www.swiggy.com/restaurants`} label="Swiggy" icon="🛵" bg="#fc8019" />
                  <A href={`https://www.dineout.co.in/bangalore-restaurants/${loc.name.toLowerCase().replace(/\s+/g, '-')}`} label="Dineout reserve" icon="🪑" bg="#e91e63" />
                </div>
                <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.28)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Events & things to do</div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  <A href="https://in.bookmyshow.com/explore/events-bangalore" label="BookMyShow" icon="🎫" bg="#e71e24" />
                  <A href="https://insider.in/bangalore" label="Insider.in" icon="🎭" bg="#6c3483" />
                  <A href="https://www.eventbrite.com/d/india--bangalore/events/" label="Eventbrite" icon="📅" bg="#f05537" />
                </div>
              </div>
            </div>
          )}

          {/* Commute */}
          {loc.commute && (
            <div style={{ marginTop: 30, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 22 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: 'rgba(238,236,230,0.7)', marginBottom: 12 }}>Commute from {loc.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {Object.entries(loc.commute).map(([dest, info]) => {
                  const t = info.time
                  const col = t <= 20 ? '#14b8a6' : t <= 40 ? '#f59e0b' : '#f97316'
                  return (
                    <div key={dest} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 12, color: 'rgba(238,236,230,0.52)', textTransform: 'capitalize' }}>{dest.replace(/_/g, ' ')}</div>
                        <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.22)', marginTop: 1 }}>{info.mode}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 13, fontFamily: 'monospace', color: col, fontWeight: 600 }}>{t} min</div>
                        {info.note && <div style={{ fontSize: 10, color: 'rgba(238,236,230,0.18)', maxWidth: 130, textAlign: 'right', marginTop: 1, lineHeight: 1.3 }}>{info.note}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: 'rgba(238,236,230,0.18)' }}>* Peak hour estimates · {loc.metro}</div>
            </div>
          )}

          {/* Footer CTAs */}
          <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/" style={{ padding: '10px 22px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(238,236,230,0.45)', fontSize: 13, textDecoration: 'none' }}>← Back to map</Link>
            <Link href="/contribute" style={{ padding: '10px 22px', borderRadius: 999, background: '#f59e0b', color: '#0e0c08', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>Add your data for {loc.name} →</Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.85} }`}</style>
    </>
  )
}

export async function getStaticPaths() {
  const { LOCALITIES } = require('../../lib/data')
  return { paths: LOCALITIES.map(l => ({ params: { id: l.id } })), fallback: false }
}
export async function getStaticProps() { return { props: {} } }
