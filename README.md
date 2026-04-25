# X Atlas — City Living Intelligence Platform

> Know before you move. Salary data, property ROI, lifestyle scores — locality-level intelligence for Bangalore. Community-powered and continuously enriched.

## What it is

X Atlas is a full-stack web platform that maps Bangalore's 7 key localities across 3 dimensions:

- **Income** — job market scores, salary bands by role, freelance rate intelligence
- **Investment** — property appreciation, rental yield, EMI calculator, break-even projections  
- **Lifestyle** — food scene scores, nightlife, shopping, real spend bands

Users explore via interactive three-map views, set their persona + budget filters, click into locality detail pages — and **contribute their own anonymous data** to enrich the scores for everyone.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with animated locality ticker and feature overview |
| `/explore` | Main three-map explorer with persona + filter system |
| `/contribute` | 5-step anonymous data contribution form |
| `/locality/[id]` | Full locality profile — scores, listings, commute matrix, rent ranges |
| `/api/contribute` | API endpoint for form submissions |

---

## Tech stack

- **Next.js 14** — React framework with file-based routing
- **Tailwind CSS** — utility-first styling
- **Recharts** — data visualisation
- **Framer Motion** — animations
- **DM Serif Display + DM Sans** — typography

---

## Quick start (local dev)

```bash
# Clone or unzip the project
cd x-atlas

# Install dependencies
npm install

# Start dev server
npm run dev
# → Open http://localhost:3000
```

---

## Deploy to Vercel (5 minutes)

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel auto-detects Next.js. Your site is live at `https://x-atlas.vercel.app` (or your custom domain).

### Option B — GitHub + Vercel dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select your repo — Vercel auto-configures everything
4. Click **Deploy**

### Option C — Netlify

```bash
npm run build
# Upload the `.next` folder to Netlify, or use netlify-plugin-nextjs
```

---

## Custom domain setup

After deploying to Vercel:

1. Buy your domain (recommended: `x-atlas.in`, `x-atlas.co`, or `locatein.co`)
   - Namecheap, GoDaddy, or directly from Google Domains
2. In Vercel dashboard → Project → Settings → Domains
3. Add your domain → Vercel gives you DNS records to add
4. Update your domain registrar's DNS with Vercel's nameservers
5. SSL is automatic — live in ~5 minutes

---

## Adding a real database (production)

Currently, contributions are logged to console. To persist data:

### Option A — Supabase (recommended, free tier)

```bash
npm  install @supabase/supabase-js
```

Create a `contributions` table in Supabase, then update `/pages/api/contribute.js`:

```js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('contributions')
    .insert([submission])
  
  if (error) return res.status(500).json({ error })
  return res.status(200).json({ success: true })
}
```

Add to Vercel env vars:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### Option B — PlanetScale (MySQL, serverless)
### Option C — MongoDB Atlas (document store)
### Option D — Simple: Airtable API (no backend needed)

---

## How scores work

Scores are computed in `/lib/scoring.js`:

- **Income score** = weighted average of job score × salary slider + freelance score × rate slider, with skill-match penalty
- **Investment score** = appreciation match % + rental yield × 8 + budget fit % + hold period bonus
- **Lifestyle score** = food score × food budget slider + clothing score × clothing budget slider
- **Match score** = Income × 35% + Investment × 35% + Lifestyle × 30%

All scores are 0–100. Update the base data in `/lib/data.js` to reflect new community inputs.

---

## Data enrichment flow

```
User submits form → /api/contribute → validate → strip PII → store in DB
                                                              ↓
                                            Aggregation job runs (cron/edge fn)
                                                              ↓
                                            Locality scores recalculated from median values
                                                              ↓
                                            /lib/data.js updated (or live DB query)
```

For production, move the locality data from `/lib/data.js` into your database and query it at build time (SSG) or request time (SSR/ISR).

---

## Adding more cities

The platform is city-agnostic. To add Mumbai, Pune, Hyderabad:

1. Add locality data to `/lib/data.js` with appropriate coordinates
2. Create `/pages/[city]/explore.js` — clone explore.js, pass city filter
3. Update the homepage to support city selection

---

## Folder structure

```
x-atlas/
├── pages/
│   ├── index.js          # Landing page
│   ├── explore.js        # Three-map explorer
│   ├── contribute.js     # Data contribution form
│   ├── locality/
│   │   └── [id].js       # Dynamic locality profile
│   └── api/
│       └── contribute.js # API endpoint
├── lib/
│   ├── data.js           # All locality data + bands
│   └── scoring.js        # Score computation logic
├── styles/
│   └── globals.css       # Global styles + design tokens
├── public/               # Static assets
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

---

## Roadmap ideas

- [ ] City selector (Mumbai, Pune, Hyderabad)
- [ ] User accounts (optional) with saved preferences
- [ ] Real-time score updates as submissions come in
- [ ] WhatsApp bot for quick locality queries
- [ ] Mobile app (React Native)
- [ ] Data API for third-party integrations
- [ ] Newsletter with monthly locality score changes

---

Built for Bangalore, by Bangalore.
