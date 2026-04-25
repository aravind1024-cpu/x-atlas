import { LOCALITIES, PERSONAS } from '../../lib/data'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message, persona, history, selectedLocality } = req.body
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return res.status(200).json({
      reply: `AI chat needs an ANTHROPIC_API_KEY. Go to Vercel → your project → Settings → Environment Variables → add ANTHROPIC_API_KEY → redeploy.`
    })
  }

  const personaMap = {
    fresher: 'fresh graduate entering the workforce (low budget, career-first)',
    midlevel: 'mid-level professional (₹15–30 LPA, starting to invest)',
    senior: 'senior professional (₹35+ LPA, property buyer)',
    freelancer: 'freelancer (variable income, values flexibility)',
    investor: 'real estate investor (ROI-first mindset)',
    family: 'family relocating (schools, safety, space priority)',
  }

  // Build a compact locality context string
  const locContext = LOCALITIES.map(l => (
    `${l.name} (${l.zone}): Jobs ${l.jobs.score}/100 [${l.jobs.salaryRange}], RentBuy ${l.rentbuy.score}/100 [₹${l.rentbuy.avgPropertyPrice}L avg, ${l.rentbuy.appreciation}% appr, ${l.rentbuy.rentalYield}% yield], Restaurants ${l.restaurants.score}/100. 2BHK rent: ₹${l.rentbuy.rentRanges.twoBHK}k/mo. ${l.tag}. ${l.summary}`
  )).join('\n')

  const system = `You are X Atlas AI — Bangalore's sharpest hyper-local living intelligence. You have deep, specific knowledge of every major Bangalore locality.

USER PROFILE: ${personaMap[persona] || 'professional'}${selectedLocality ? `\nCURRENTLY VIEWING: ${selectedLocality}` : ''}

LOCALITY DATA:
${locContext}

RULES:
- Be direct, specific, and honest. No generic advice.
- Quote real numbers (salary bands, rent, property prices, appreciation %).
- Name specific streets, buildings, companies where relevant.
- Keep replies under 100 words unless the question genuinely needs more.
- If comparing localities, be opinionated — give a clear recommendation.
- Acknowledge trade-offs honestly.
- Never say "it depends" without immediately saying what it depends on.`

  const messages = [
    ...(history || []).slice(-10),
    { role: 'user', content: message },
  ]

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 450,
        system,
        messages,
      }),
    })
    const data = await response.json()
    const reply = data.content?.[0]?.text?.trim() || 'Sorry, something went wrong.'
    return res.status(200).json({ reply })
  } catch {
    return res.status(200).json({ reply: 'Something went wrong. Please try again.' })
  }
}
