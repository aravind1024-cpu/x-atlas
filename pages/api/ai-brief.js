export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { locality, persona, activeLayers, locData } = req.body
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return res.status(200).json({
      brief: `${locality} is one of Bangalore's key localities. Add your ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables to enable AI-powered insights.`
    })
  }

  const personaMap = {
    fresher: 'fresh graduate entering the workforce',
    midlevel: 'mid-level professional (3–6 years experience)',
    senior: 'senior professional or team lead',
    freelancer: 'freelancer or consultant',
    investor: 'real estate investor',
    family: 'family looking to relocate',
  }

  const activeLayerNames = Object.entries(activeLayers)
    .filter(([, v]) => v)
    .map(([k]) => k === 'rentbuy' ? 'rent/buy property' : k === 'restaurants' ? 'restaurants & nightlife' : 'jobs')
    .join(', ')

  const prompt = `You are a hyper-local Bangalore living expert. Write a punchy 3-sentence insider brief about ${locality} for a ${personaMap[persona] || 'professional'}.

Context scores: Jobs ${locData?.jobs}/100, Rent/Buy ${locData?.rentbuy}/100, Restaurants ${locData?.restaurants}/100.
This person cares about: ${activeLayerNames}.
One-line summary to build on: "${locData?.summary || ''}"

Rules:
- Be specific and honest — mention real trade-offs
- Include one insight most people don't know
- No generic advice, no fluff
- Under 75 words
- No bullet points`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 180,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    const brief = data.content?.[0]?.text?.trim() || 'Could not generate brief.'
    return res.status(200).json({ brief })
  } catch {
    return res.status(200).json({ brief: `${locality} is a key Bangalore locality. Add your ANTHROPIC_API_KEY to Vercel to enable live AI analysis.` })
  }
}
