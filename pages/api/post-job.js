// Job posting — companies post directly on X Atlas
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { company, role, locality, salary, type, exp, skills, description, contact, website } = req.body

  if (!company || !role || !locality || !contact) {
    return res.status(400).json({ error: 'Company, role, locality and contact are required' })
  }

  const submission = {
    company, role, locality, salary, type, exp,
    skills: skills?.split(',').map(s => s.trim()).filter(Boolean),
    description, contact, website,
    postedAt: new Date().toISOString(),
    status: 'pending_review',
  }

  // In production: save to Supabase jobs table
  console.log('[X Atlas] New job posting:', submission)

  return res.status(200).json({
    success: true,
    message: 'Job posted! It will appear on the map after review (usually within 24 hours).',
  })
}
