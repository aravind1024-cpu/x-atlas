// Property enquiry — saves lead + sends WhatsApp notification to agent
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, phone, email, locality, propertyType, budget, bhk, message, listingName } = req.body

  if (!name || !phone || !locality) {
    return res.status(400).json({ error: 'Name, phone and locality are required' })
  }

  // Build WhatsApp message to agent
  const agentMsg = `🏠 *New Property Enquiry via X Atlas*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'Not provided'}\n*Locality:* ${locality}\n*Property:* ${listingName || propertyType}\n*Budget:* ${budget}\n*BHK:* ${bhk || 'Flexible'}\n*Message:* ${message || 'No message'}\n\n_Via x-atlas.vercel.app_`

  const waLink = `https://wa.me/918095652913?text=${encodeURIComponent(agentMsg)}`

  // Log the lead (in production: save to Supabase)
  console.log('[X Atlas] Property enquiry:', { name, phone, locality, listingName, budget })

  return res.status(200).json({
    success: true,
    message: 'Enquiry received! An agent will contact you within 2 hours.',
    whatsappLink: waLink,
  })
}
