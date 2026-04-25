// pages/api/contribute.js
// In production: connect to your database (Supabase, PlanetScale, etc.)
// This stub validates and logs contributions

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const data = req.body

  // Validate required fields
  if (!data.locality) {
    return res.status(400).json({ error: 'Locality is required' })
  }

  // Sanitize — never store anything PII
  const submission = {
    locality: data.locality,
    yearsExp: data.yearsExp,
    workMode: data.workMode,
    persona: data.persona,
    role: data.role,
    companyType: data.companyType,
    salaryLPA: data.salaryLPA ? parseFloat(data.salaryLPA) : null,
    freelanceRate: data.freelanceRate ? parseFloat(data.freelanceRate) : null,
    salaryGrowthYoY: data.salaryGrowthYoY,
    rentType: data.rentType,
    monthlylRent: data.monthlylRent ? parseFloat(data.monthlylRent) : null,
    bhkType: data.bhkType,
    block: data.block,
    rentSatisfaction: data.rentSatisfaction,
    foodSpend: data.foodSpend,
    clothSpend: data.clothSpend,
    transportSpend: data.transportSpend,
    foodRating: data.foodRating,
    nightlifeRating: data.nightlifeRating,
    shoppingRating: data.shoppingRating,
    commuteTime: data.commuteTime,
    commuteDest: data.commuteDest,
    overallRating: data.overallRating,
    biggestPro: data.biggestPro,
    biggestCon: data.biggestCon,
    wouldRecommend: data.wouldRecommend,
    submittedAt: new Date().toISOString(),
  }

  // TODO: In production, save to database:
  // await db.collection('contributions').insertOne(submission)
  // Then recalculate locality scores from aggregated data

  console.log('[X Atlas] New contribution:', JSON.stringify(submission, null, 2))

  return res.status(200).json({ success: true, message: 'Contribution received' })
}
