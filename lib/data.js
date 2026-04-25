export const CITY = { id: 'bangalore', name: 'Bangalore', emoji: '🏙️' }

export const LAYERS = {
  jobs:        { id: 'jobs',        label: 'Jobs',                emoji: '💼', color: '#14b8a6', glow: 'rgba(20,184,166,0.2)'  },
  rentbuy:     { id: 'rentbuy',     label: 'Rent / Buy',          emoji: '🏠', color: '#818cf8', glow: 'rgba(129,140,248,0.2)' },
  restaurants: { id: 'restaurants', label: 'Restaurants & Events', emoji: '🍜', color: '#f97316', glow: 'rgba(249,115,22,0.2)'  },
}

export const LAYER_IDS = ['jobs', 'rentbuy', 'restaurants']

export const LOCALITIES = [
  {
    id: 'koramangala',
    name: 'Koramangala',
    mapX: 54, mapY: 62,
    zone: 'South',
    tag: 'Startup & hip',
    tagline: "The city's beating startup heart",
    summary: "Rent here for the lifestyle and career network. Invest elsewhere for ROI — ₹17k/sqft leaves little room at your budget. But for a PM or designer, this is where careers accelerate fastest.",
    metro: 'Silk Board station — Yellow Line (2.7 km)',
    silkBoard: true,

    jobs: {
      score: 88,
      salaryRange: '₹18–40 LPA',
      freelanceRate: '₹3–15k/day',
      jobDensity: '200+ funded startups in 3km radius',
      topEmployers: ['Swiggy', 'Zepto', 'Meesho', 'Razorpay', 'CRED', 'Dunzo'],
      topRoles: ['Product Manager', 'Software Engineer', 'Design', 'Growth', 'Finance'],
      listings: [
        { role: 'Backend Engineer', company: 'Zepto', pay: '₹20–35 LPA', type: 'Full-time', exp: '3–6 yrs', skills: ['Node.js', 'Go', 'Kafka'] },
        { role: 'Senior PM', company: 'Razorpay', pay: '₹30–50 LPA', type: 'Hybrid', exp: '5+ yrs', skills: ['Payments', 'B2B SaaS'] },
        { role: 'UX Designer', company: 'Swiggy', pay: '₹18–30 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['Figma', 'Research'] },
        { role: 'Growth PM', company: 'Meesho', pay: '₹22–38 LPA', type: 'Full-time', exp: '3+ yrs', skills: ['Analytics', 'A/B testing'] },
        { role: 'Finance Manager', company: 'CRED', pay: '₹18–26 LPA', type: 'Full-time', exp: '4–7 yrs', skills: ['FP&A', 'Excel'] },
        { role: 'UI/UX Freelancer', company: 'Via agencies', pay: '₹5–15k/day', type: 'Freelance', exp: 'Portfolio needed', skills: ['Figma', 'Branding'] },
      ],
    },

    rentbuy: {
      score: 68,
      pricePerSqft: 17000,
      appreciation: 14.7,
      rentalYield: 3.2,
      avgPropertyPrice: 145,
      breakEvenYrs: 10,
      verdict: 'Premium pricing limits ROI — better to rent here, buy in Sarjapur or EC',
      rentRanges: { studio: 22, oneBHK: 30, twoBHK: 44, threeBHK: 78 },
      listings: [
        { name: '3BHK resale – 7th Block', price: '₹1.55 Cr', type: 'Buy', yield: '3.2%', note: 'Ready to move' },
        { name: 'Studio – 6th Block', price: '₹28k/mo', type: 'Rent', note: 'Furnished, near cafes' },
        { name: '2BHK – Ejipura fringe', price: '₹85L', type: 'Buy', yield: '3.0%', note: 'Koramangala spillover pricing' },
        { name: '2BHK – 5th Block gated', price: '₹42k/mo', type: 'Rent', note: 'Prestige property, pool' },
      ],
      bestStreets: ['6th Block – 80 Feet Road', '7th Block – BDA Complex side', '5th Block – startup dense'],
    },

    restaurants: {
      score: 96,
      foodRange: '₹80–2500/meal',
      nightlifeScore: 95,
      vibe: 'Hip, startup-dense, never sleeps. Best bar density in the city.',
      listings: [
        { name: 'Toast & Tonic', type: 'Fine dining', price: '₹1800–2500/cover', note: 'Book 3 days ahead. Pan-Asian, iconic' },
        { name: 'Truffles', type: 'Casual', price: '₹400–900', note: 'Best burgers in Bangalore. Always packed' },
        { name: 'Byg Brewski Brewing Co', type: 'Brewery & bar', price: '₹800–1500', note: 'Rooftop, 1000-seat capacity, live events' },
        { name: 'Third Wave Coffee', type: 'Specialty cafe', price: '₹200–500', note: 'Best WFH cafe in the area' },
        { name: 'Koramangala darshinis', type: 'Budget South Indian', price: '₹60–150', note: '5th Block – daily breakfast staple' },
        { name: 'Hammered – 5th Block', type: 'Bar & events', price: '₹600–1200', note: 'Karaoke, quiz nights, DJ weekends' },
      ],
    },

    commute: {
      indiranagar: { time: 15, mode: 'Cab/bike', note: 'Easy — avoid Intermediate Ring Rd at 6pm' },
      hsr: { time: 12, mode: 'Cab/bike', note: '27th Main – smooth' },
      whitefield: { time: 70, mode: 'Metro via Indiranagar', note: 'Take Purple Line from Indiranagar' },
      electronicCity: { time: 30, mode: 'Yellow Line metro', note: 'Silk Board station 2.7km away' },
      mgRoad: { time: 25, mode: 'Cab or metro', note: 'Take metro if possible' },
      manyata: { time: 45, mode: 'Cab', note: 'Avoid ORR peak hours' },
    },
  },

  {
    id: 'indiranagar',
    name: 'Indiranagar',
    mapX: 58, mapY: 51,
    zone: 'East',
    tag: 'Nightlife capital',
    tagline: "Bangalore's most vibrant social hub",
    summary: "Bangalore's best 100 Feet Road bar strip, walking distance to Purple Line metro. Premium rents — but the career network and social ROI is unmatched for creative and marketing roles.",
    metro: 'Purple Line — Indiranagar station (direct)',

    jobs: {
      score: 74,
      salaryRange: '₹14–35 LPA',
      freelanceRate: '₹3–12k/day',
      jobDensity: 'Strong in creative, media, consultancy',
      topEmployers: ['Creative agencies', 'Media cos', 'Influencer brands', 'Architecture firms'],
      topRoles: ['Marketing', 'Design', 'Content', 'Consulting', 'Architecture'],
      listings: [
        { role: 'Brand Strategist', company: 'Creative agency', pay: '₹12–22 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['Brand', 'Strategy'] },
        { role: 'Senior Designer', company: 'D2C brand', pay: '₹15–25 LPA', type: 'Hybrid', exp: '4+ yrs', skills: ['Visual design', 'Motion'] },
        { role: 'Content Lead', company: 'Media startup', pay: '₹12–18 LPA', type: 'Full-time', exp: '3+ yrs', skills: ['SEO', 'Social', 'Video'] },
        { role: 'Digital Marketing Consultant', company: 'Freelance', pay: '₹4–10k/day', type: 'Freelance', exp: 'Portfolio needed', skills: ['Paid ads', 'Analytics'] },
      ],
    },

    rentbuy: {
      score: 64,
      pricePerSqft: 15000,
      appreciation: 12,
      rentalYield: 2.8,
      avgPropertyPrice: 160,
      breakEvenYrs: 12,
      verdict: 'Low yield, high entry — buy only if you want the address. Rent is the smart move.',
      rentRanges: { studio: 25, oneBHK: 33, twoBHK: 52, threeBHK: 88 },
      listings: [
        { name: '2BHK – 100 Feet Road area', price: '₹1.8 Cr', type: 'Buy', yield: '2.8%', note: 'Premium address' },
        { name: '1BHK – CMH Road', price: '₹33k/mo', type: 'Rent', note: 'Walking to metro' },
        { name: 'Studio – 12th Main', price: '₹26k/mo', type: 'Rent', note: 'Ideal for solos' },
      ],
      bestStreets: ['12th Main – cafe-lined, walkable', 'CMH Road – metro access', '100 Feet Road – premium, noisy'],
    },

    restaurants: {
      score: 98,
      foodRange: '₹200–3500/meal',
      nightlifeScore: 99,
      vibe: 'Best bars, restaurants and social scene in Bangalore. 100 Feet Road is a must.',
      listings: [
        { name: '100 Feet Road bar strip', type: 'Nightlife district', price: '₹800–2500', note: 'Toit, Arbor, The Humming Tree — all here' },
        { name: 'Toit Brewpub', type: 'Microbrewery', price: '₹600–1500', note: 'Legendary. Best craft beer in city' },
        { name: 'Hole in the Wall Cafe', type: 'Brunch', price: '₹400–900', note: 'Iconic weekend spot, long queues' },
        { name: 'Sunny\'s – CMH Road', type: 'Continental', price: '₹700–1500', note: 'Bangalore institution since 1993' },
        { name: 'The Humming Tree', type: 'Live music venue', price: '₹500–1200', note: 'Best live music in south India' },
      ],
    },

    commute: {
      koramangala: { time: 15, mode: 'Cab/bike', note: 'Easy — 3.5km' },
      hsr: { time: 22, mode: 'Cab', note: 'Avoid Intermediate Ring Rd peak' },
      whitefield: { time: 50, mode: 'Purple Line metro', note: 'Direct — game changer' },
      electronicCity: { time: 38, mode: 'Cab or metro combo', note: 'Metro to Silk Board then cab' },
      mgRoad: { time: 15, mode: 'Purple Line metro', note: 'Direct — 3 stops' },
      manyata: { time: 38, mode: 'Cab via ORR', note: 'Painful at peak hours' },
    },
  },

  {
    id: 'whitefield',
    name: 'Whitefield',
    mapX: 87, mapY: 53,
    zone: 'East',
    tag: 'IT hub',
    tagline: "India's largest IT employment cluster",
    summary: "42,000+ active IT job listings in a 5km radius. Property is best ROI in east Bangalore. Lifestyle is mall-dependent — but Purple Line metro now makes the city accessible without a car.",
    metro: 'Purple Line — Kadugodi (end-of-line, direct to Indiranagar in 37 min)',

    jobs: {
      score: 96,
      salaryRange: '₹14–40 LPA',
      freelanceRate: '₹1.5–7k/day',
      jobDensity: 'ITPL, EPIP, Prestige Tech — 100k+ employees in 3km',
      topEmployers: ['Accenture', 'SAP Labs', 'IBM', 'Capgemini', 'Wipro', 'Cisco', 'Dell'],
      topRoles: ['Software Engineer', 'DevOps', 'Data Engineering', 'Product', 'QA'],
      listings: [
        { role: 'Senior Software Engineer', company: 'Accenture', pay: '₹18–28 LPA', type: 'Full-time', exp: '3–6 yrs', skills: ['Java', 'Microservices'] },
        { role: 'Product Manager', company: 'SAP Labs', pay: '₹25–40 LPA', type: 'Full-time', exp: '5+ yrs', skills: ['Enterprise SaaS', 'Roadmap'] },
        { role: 'Data Engineer', company: 'Capgemini', pay: '₹14–22 LPA', type: 'Full-time', exp: '2–5 yrs', skills: ['Spark', 'SQL', 'Airflow'] },
        { role: 'DevOps Engineer', company: 'IBM', pay: '₹12–20 LPA', type: 'Hybrid', exp: '2–4 yrs', skills: ['Kubernetes', 'AWS', 'CI/CD'] },
        { role: 'SAP Consultant', company: 'EPIP firms', pay: '₹3–8k/day', type: 'Contract', exp: 'SAP cert', skills: ['SAP FI/CO', 'S4HANA'] },
      ],
    },

    rentbuy: {
      score: 84,
      pricePerSqft: 9000,
      appreciation: 19,
      rentalYield: 4.1,
      avgPropertyPrice: 90,
      breakEvenYrs: 7,
      verdict: 'Best east Bangalore investment. 19% appreciation + 4.1% yield = strongest combined return.',
      rentRanges: { studio: 16, oneBHK: 22, twoBHK: 32, threeBHK: 52 },
      listings: [
        { name: '2BHK – Godrej Splendour', price: '₹82L', type: 'Buy', yield: '4.1%', note: '2026 possession' },
        { name: 'Grade-A office – ITPL Tower', price: '₹95L/yr', type: 'Lease', note: '2000 sqft, ready' },
        { name: '1BHK – Varthur Main Rd', price: '₹22k/mo', type: 'Rent', note: 'Semi-furnished, walkable' },
        { name: '3BHK – Prestige Lakeside', price: '₹1.15 Cr', type: 'Buy', yield: '4.0%', note: 'Gated township' },
      ],
      bestStreets: ['Varthur Main Road – best value', 'ITPL road – premium', 'Nallurhalli – quieter residential'],
    },

    restaurants: {
      score: 58,
      foodRange: '₹200–1200/meal',
      nightlifeScore: 42,
      vibe: 'Mall-centric food courts, growing cafe scene. Drive to Indiranagar for real nightlife.',
      listings: [
        { name: 'Phoenix Marketcity food court', type: 'Mall dining', price: '₹250–600', note: '15+ cuisines, always crowded lunch' },
        { name: 'The Fatty Bao – Phoenix', type: 'Asian tapas', price: '₹800–1500', note: 'Popular IT crowd dinner spot' },
        { name: 'Forum Value Mall eateries', type: 'Budget dining', price: '₹200–500', note: 'Good value options' },
        { name: 'Whitefield Main Road cafes', type: 'Cafe', price: '₹200–600', note: 'Growing indie scene post-metro' },
      ],
    },

    commute: {
      indiranagar: { time: 37, mode: 'Purple Line metro', note: 'Direct — life-changing for IT workers' },
      mgRoad: { time: 52, mode: 'Purple Line metro', note: 'Direct, no traffic stress' },
      koramangala: { time: 70, mode: 'Metro + cab combo', note: 'Metro to Indiranagar, cab from there' },
      electronicCity: { time: 75, mode: 'Cab via ORR', note: 'ORR can be brutal — allow 90 min at peak' },
      manyata: { time: 60, mode: 'Cab', note: 'Long but workable with metro partial' },
    },
  },

  {
    id: 'hsr',
    name: 'HSR Layout',
    mapX: 57, mapY: 68,
    zone: 'South',
    tag: 'Startup belt',
    tagline: '500+ funded startups in a walkable grid',
    summary: "Calmer, greener alternative to Koramangala — 3km away. Sector grid is bike-friendly, startup density is second only to Koramangala, and freelance rates are the highest in city.",
    metro: 'Silk Board station — Yellow Line (1.5 km walk)',

    jobs: {
      score: 85,
      salaryRange: '₹12–40 LPA',
      freelanceRate: '₹3–15k/day',
      jobDensity: 'Silk Board cluster — highest freelance rate in city',
      topEmployers: ['Razorpay', 'Ola Electric', 'Meesho (nearby)', 'WeWork tenants', 'Series A startups'],
      topRoles: ['Software Engineer', 'Product', 'Data Science', 'Marketing', 'Strategy'],
      listings: [
        { role: 'Founding Engineer', company: 'Stealth startup', pay: '₹20–40 LPA + ESOP', type: 'Full-time', exp: '3–7 yrs', skills: ['Full-stack', 'System design'] },
        { role: 'Senior Data Scientist', company: 'Razorpay', pay: '₹22–35 LPA', type: 'Hybrid', exp: '4+ yrs', skills: ['Python', 'ML', 'SQL'] },
        { role: 'Senior PM', company: 'Ola Electric', pay: '₹25–40 LPA', type: 'Full-time', exp: '5+ yrs', skills: ['Hardware-software', 'EV'] },
        { role: 'Performance Marketer', company: 'D2C brands', pay: '₹4–10k/day', type: 'Freelance', exp: '3+ yrs', skills: ['Meta Ads', 'Google', 'CRO'] },
        { role: 'Strategy Consultant', company: 'Series A–B startups', pay: '₹6–15k/day', type: 'Retainer', exp: 'MBA preferred', skills: ['GTM', 'Ops', 'Finance'] },
      ],
    },

    rentbuy: {
      score: 72,
      pricePerSqft: 12000,
      appreciation: 13,
      rentalYield: 3.0,
      avgPropertyPrice: 120,
      breakEvenYrs: 10,
      verdict: 'Good for self-use. Appreciation is steady but not spectacular — better to buy here to live than as pure investment.',
      rentRanges: { studio: 20, oneBHK: 26, twoBHK: 38, threeBHK: 60 },
      listings: [
        { name: '2BHK resale – Sector 2', price: '₹1.1 Cr', type: 'Buy', yield: '3.0%', note: 'Ready possession' },
        { name: 'Startup office – Sector 6', price: '₹55k/mo', type: 'Lease', note: '800 sqft, plug and play' },
        { name: '1BHK studio – 27th Main', price: '₹26k/mo', type: 'Rent', note: 'Walk to WeWork and cafes' },
        { name: '3BHK – Sector 4', price: '₹1.5 Cr', type: 'Buy', yield: '2.9%', note: 'School zone premium' },
      ],
      bestStreets: ['27th Main – cafe + co-work strip', 'Sector 1 – quieter residential', 'BDA Complex road – green'],
    },

    restaurants: {
      score: 84,
      foodRange: '₹200–2000/meal',
      nightlifeScore: 78,
      vibe: 'Strong local dining scene, growing breweries, calmer than Koramangala but vibrant.',
      listings: [
        { name: 'Truffles – HSR', type: 'Casual dining', price: '₹500–1200', note: 'Burger institution. Long waits worth it' },
        { name: 'Byg Brewski – HSR', type: 'Microbrewery', price: '₹600–1400', note: 'Rooftop, live music, weekend hotspot' },
        { name: 'Social – HSR', type: 'Bar & workspace', price: '₹400–1000', note: 'Good for WFH + evening drinks combo' },
        { name: '27th Main cafe strip', type: 'Cafes', price: '₹200–600', note: 'Multiple specialty coffee options' },
        { name: 'Swiggy dark kitchen cluster', type: 'Delivery', price: '₹150–500', note: '20-min delivery — best zone in city' },
      ],
    },

    commute: {
      koramangala: { time: 12, mode: 'Cab/bike', note: '27th Main – smooth' },
      indiranagar: { time: 22, mode: 'Cab', note: 'Avoid Intermediate Ring Rd at peak' },
      electronicCity: { time: 20, mode: 'Yellow Line metro', note: 'Silk Board metro 1.5km — easy' },
      whitefield: { time: 65, mode: 'Metro combo', note: 'Silk Board → Indiranagar → Kadugodi' },
      mgRoad: { time: 30, mode: 'Cab or metro combo', note: 'Metro from Silk Board recommended' },
      manyata: { time: 50, mode: 'Cab via ORR', note: 'Long — not ideal if your office is north' },
    },
  },

  {
    id: 'sarjapur',
    name: 'Sarjapur Rd',
    mapX: 73, mapY: 72,
    zone: 'Southeast',
    tag: 'Fastest appreciation',
    tagline: 'Highest 5-yr property growth in Bangalore',
    summary: "Best pure investment play in the city — 24% appreciation, 4.4% yield. Wipro SEZ and Amazon anchor major employment. Lifestyle is still developing but Forum Shantiniketan fills the gap. Buy here, live elsewhere until metro Phase 3 arrives (~2029).",
    metro: 'Phase 3 planned — ORR to Sarjapur (2028–30 est.)',

    jobs: {
      score: 76,
      salaryRange: '₹10–25 LPA',
      freelanceRate: '₹2–8k/day',
      jobDensity: 'Wipro SEZ, Amazon Dev Centre, SAP, Cisco — all within 5km',
      topEmployers: ['Wipro SEZ', 'Amazon Development Centre', 'RGA Tech Park', 'Cisco', 'SAP'],
      topRoles: ['Software Engineer', 'DevOps', 'Project Management', 'QA', 'Real Estate advisory'],
      listings: [
        { role: 'Android Developer', company: 'Amazon Dev Centre', pay: '₹22–38 LPA', type: 'Full-time', exp: '3–6 yrs', skills: ['Java', 'Kotlin', 'AWS'] },
        { role: 'Systems Engineer', company: 'Wipro SEZ', pay: '₹8–16 LPA', type: 'Full-time', exp: '1–3 yrs', skills: ['Java', 'Spring Boot'] },
        { role: 'IT Project Manager', company: 'Wipro vendors', pay: '₹3–7k/day', type: 'Contract', exp: 'PMP preferred', skills: ['Agile', 'Delivery'] },
        { role: 'Real Estate Advisor', company: 'Independent', pay: '₹3–8k/day + commission', type: 'Commission', exp: 'Domain exp', skills: ['Negotiation', 'Legal'] },
      ],
    },

    rentbuy: {
      score: 94,
      pricePerSqft: 7800,
      appreciation: 24,
      rentalYield: 4.4,
      avgPropertyPrice: 78,
      breakEvenYrs: 6,
      verdict: 'Top investment in city. 24% appreciation + 4.4% yield + affordable entry = best ROI on ₹70–90L budget.',
      rentRanges: { studio: 16, oneBHK: 20, twoBHK: 28, threeBHK: 44 },
      listings: [
        { name: '2BHK – Provident Sunworth', price: '₹72L', type: 'Buy', yield: '4.4%', note: '2025 possession, gated, amenities' },
        { name: '2BHK under-construction – Carmelram', price: '₹58L', type: 'Buy', yield: '4.3%', note: 'Best entry point, 2026 possession' },
        { name: '3BHK gated community', price: '₹28k/mo', type: 'Rent', note: 'Sarjapur Main Rd, furnished' },
        { name: 'Retail – ORR–Sarjapur junction', price: '₹55k/mo', type: 'Lease', note: 'High IT footfall corner' },
        { name: 'Office block – RGA Tech Park', price: '₹75k/mo', type: 'Lease', note: '1200 sqft, plug and play' },
      ],
      bestStreets: ['Provident corridor – best new launches', 'Carmelram – budget buys', 'Sarjapur Main Rd – established'],
    },

    restaurants: {
      score: 62,
      foodRange: '₹200–1000/meal',
      nightlifeScore: 44,
      vibe: 'Growing rapidly with IT influx. Forum Shantiniketan is the anchor. Weekday evenings quiet.',
      listings: [
        { name: 'Forum Shantiniketan', type: 'Mall dining', price: '₹300–800', note: '10 min from ORR. Best weekend option' },
        { name: 'ORR QSR strip', type: 'Quick serve', price: '₹200–500', note: 'KFC, Dominos, McDonald\'s — all present' },
        { name: 'Carmelram cafe cluster', type: 'Cafe', price: '₹200–600', note: 'New specialty coffee openings weekly' },
        { name: 'Swiggy delivery', type: 'Delivery', price: '₹150–500', note: '25-min delivery, growing cloud kitchens' },
      ],
    },

    commute: {
      hsr: { time: 28, mode: 'Cab via ORR', note: 'Decent — ORR can be hit or miss' },
      electronicCity: { time: 35, mode: 'Cab via Hosur Rd', note: 'Manageable off-peak' },
      whitefield: { time: 42, mode: 'Cab via ORR', note: 'ORR can be 60min at peak — allow buffer' },
      koramangala: { time: 35, mode: 'Cab via Ejipura', note: 'Avoid ORR — cut through Carmelram' },
      indiranagar: { time: 48, mode: 'Cab', note: 'Long — metro Phase 3 will change this' },
      mgRoad: { time: 48, mode: 'Cab', note: 'Not ideal for CBD commuters' },
    },
  },

  {
    id: 'electronic_city',
    name: 'Electronic City',
    mapX: 67, mapY: 86,
    zone: 'South',
    tag: 'Best investment ROI',
    tagline: 'Campus-scale IT, highest rental yield in city',
    summary: "Highest rental yield (4.8%) and fastest appreciation (21%) in south Bangalore at the lowest entry price. Yellow Line metro opened Aug 2025 — Silk Board in 18 min, HSR in 22 min. Lifestyle is still sparse — budget on dining, save aggressively, invest the difference.",
    metro: 'Yellow Line — EC to Silk Board (18 min), opened Aug 2025',

    jobs: {
      score: 88,
      salaryRange: '₹8–25 LPA',
      freelanceRate: '₹1–5k/day',
      jobDensity: 'Infosys campus (65k employees), Wipro campus, HCL — captive IT ecosystem',
      topEmployers: ['Infosys', 'Wipro', 'HCL Technologies', 'Tech Mahindra', 'Bharat Electronics Ltd'],
      topRoles: ['Software Engineer', 'QA Engineer', 'DevOps', 'Data Analyst', 'Manufacturing'],
      listings: [
        { role: 'Software Engineer', company: 'Infosys', pay: '₹8–16 LPA', type: 'Full-time', exp: '0–3 yrs', skills: ['Java', '.NET', 'Testing'] },
        { role: 'Cloud Architect', company: 'HCL Technologies', pay: '₹22–38 LPA', type: 'Hybrid', exp: '6+ yrs', skills: ['AWS', 'Azure', 'Terraform'] },
        { role: 'QA Automation', company: 'Wipro', pay: '₹7–14 LPA', type: 'Full-time', exp: '1–4 yrs', skills: ['Selenium', 'Java', 'JIRA'] },
        { role: 'Data Analyst', company: 'Tech Mahindra', pay: '₹8–16 LPA', type: 'Full-time', exp: '2–5 yrs', skills: ['SQL', 'Tableau', 'Python'] },
      ],
    },

    rentbuy: {
      score: 92,
      pricePerSqft: 6500,
      appreciation: 21,
      rentalYield: 4.8,
      avgPropertyPrice: 65,
      breakEvenYrs: 6,
      verdict: 'Highest yield in city at lowest cost. ₹65L gets you a 2BHK with 4.8% yield — unbeatable for pure investment.',
      rentRanges: { studio: 12, oneBHK: 16, twoBHK: 22, threeBHK: 34 },
      listings: [
        { name: '2BHK – SNN Raj Serenity', price: '₹68L', type: 'Buy', yield: '4.8%', note: 'Ready to move in' },
        { name: 'Studio investment unit – Phase 1', price: '₹38L', type: 'Buy', yield: '4.8%', note: 'Best yield-to-cost in city' },
        { name: '1BHK rental – Phase 2', price: '₹16k/mo', type: 'Rent', note: 'Zero vacancy — campus demand' },
        { name: 'Warehouse – Phase 2 industrial', price: '₹18/sqft/mo', type: 'Lease', note: 'Min 2000 sqft, high availability' },
      ],
      bestStreets: ['EC Phase 1 – established, metro nearby', 'Phase 2 – larger units', 'Hebbagodi – fringe, cheaper'],
    },

    restaurants: {
      score: 44,
      foodRange: '₹60–600/meal',
      nightlifeScore: 20,
      vibe: 'Campus-driven darshinis and QSRs. Yellow Line metro now makes Koramangala/HSR a 30-min dinner option.',
      listings: [
        { name: 'Local darshini chains', type: 'Budget South Indian', price: '₹60–180/meal', note: 'Best value breakfast in city. Abundant.' },
        { name: 'Campus canteens – Infosys/Wipro', type: 'Subsidised', price: '₹40–150', note: 'Employee only. All cuisines, heavily subsidised' },
        { name: 'EC main road QSRs', type: 'Quick serve', price: '₹150–400', note: 'KFC, Pizza Hut, Subway all present' },
        { name: 'HSR via Yellow Line (22 min)', type: 'Nearby escape', price: '₹30 metro', note: 'Truffles, Byg Brewski, cafes all accessible' },
      ],
    },

    commute: {
      hsr: { time: 22, mode: 'Yellow Line metro', note: 'Metro opened Aug 2025 — smooth and direct' },
      koramangala: { time: 30, mode: 'Metro + short cab', note: 'Metro to Silk Board, 10-min cab from there' },
      indiranagar: { time: 40, mode: 'Yellow + Purple Line', note: 'Change at Silk Board — still beats driving' },
      whitefield: { time: 75, mode: 'Metro + metro', note: 'Yellow to Silk Board, Purple to Kadugodi — long' },
      mgRoad: { time: 42, mode: 'Metro combo', note: 'Silk Board → Indiranagar → MG Road' },
      manyata: { time: 50, mode: 'Cab via ORR', note: 'No metro option — avoid if your office is north' },
    },
  },

  {
    id: 'manyata',
    name: 'Hebbal / Manyata',
    mapX: 45, mapY: 33,
    zone: 'North',
    tag: 'Airport corridor',
    tagline: "Bangalore's fastest growing north corridor",
    summary: "Embassy REIT anchor makes this the strongest commercial real estate play in city. Manyata Tech Park alone houses 90,000 employees. Airport access is genuinely premium — 25 min. Residential prices still reasonable vs quality of infrastructure.",
    metro: 'Green Line extension planned — Nagawara hub nearby',

    jobs: {
      score: 80,
      salaryRange: '₹10–28 LPA',
      freelanceRate: '₹2–10k/day',
      jobDensity: 'Manyata Tech Park — Cognizant, IBM, Levi Strauss Tech, HDFC',
      topEmployers: ['Cognizant', 'IBM India', 'Levi Strauss Tech', 'HDFC Bank tech', 'Tesco Bengaluru'],
      topRoles: ['Software Engineer', 'Data Engineering', 'DevOps', 'Marketing', 'BFSI tech'],
      listings: [
        { role: 'Full Stack Developer', company: 'Cognizant', pay: '₹10–20 LPA', type: 'Hybrid', exp: '2–5 yrs', skills: ['React', 'Node', 'SQL'] },
        { role: 'ML Engineer', company: 'Levi Strauss Tech', pay: '₹18–30 LPA', type: 'Full-time', exp: '3–6 yrs', skills: ['Python', 'TensorFlow', 'Retail ML'] },
        { role: 'DevOps Lead', company: 'IBM Manyata', pay: '₹20–32 LPA', type: 'Full-time', exp: '5+ yrs', skills: ['Kubernetes', 'OpenShift', 'CI/CD'] },
        { role: 'Data Consultant', company: 'Manyata-based firms', pay: '₹3–8k/day', type: 'Contract', exp: '4+ yrs', skills: ['SQL', 'Power BI', 'Python'] },
      ],
    },

    rentbuy: {
      score: 82,
      pricePerSqft: 9000,
      appreciation: 17,
      rentalYield: 3.8,
      avgPropertyPrice: 90,
      breakEvenYrs: 8,
      verdict: 'Best commercial investment in city (Embassy REIT). Residential is solid — airport premium will keep prices rising.',
      rentRanges: { studio: 18, oneBHK: 24, twoBHK: 34, threeBHK: 52 },
      listings: [
        { name: '3BHK – Sobha Dream Gardens', price: '₹1.1 Cr', type: 'Buy', yield: '3.8%', note: '2026 possession, lake view' },
        { name: 'Embassy REIT office – Manyata', price: '₹1.4 Cr/yr', type: 'Lease', note: 'Grade A, 3000 sqft, REIT-grade' },
        { name: '2BHK rental – Hebbal main', price: '₹34k/mo', type: 'Rent', note: 'Semi-furnished, 5 min from Manyata gate' },
        { name: 'Retail – Bellary Road front', price: '₹65k/mo', type: 'Lease', note: '800 sqft corner, high traffic' },
      ],
      bestStreets: ['Hebbal main – proximity to Manyata gate', 'Sahakara Nagar – quieter, green', 'Bellary Road – airport premium'],
    },

    restaurants: {
      score: 56,
      foodRange: '₹150–1400/meal',
      nightlifeScore: 38,
      vibe: 'Growing fast. Corporate dining on weekdays, Sahakara Nagar strip on weekends. Orion Mall 15 min away.',
      listings: [
        { name: 'Sahakara Nagar restaurant strip', type: 'Casual dining', price: '₹200–900', note: 'Growing scene, 8+ restaurants now' },
        { name: 'Orion Mall food court', type: 'Mall dining', price: '₹200–600', note: '15 min drive — worth it for weekends' },
        { name: 'Manyata campus food streets', type: 'Quick serve', price: '₹100–300', note: 'Good during office hours' },
        { name: 'Hebbal lake cafes', type: 'Cafe', price: '₹150–400', note: 'New openings 2025 — lakeside seating' },
      ],
    },

    commute: {
      mgRoad: { time: 28, mode: 'Cab via Outer Ring Rd', note: 'Reasonable — avoid 9–10am' },
      airport: { time: 25, mode: 'Cab / BMTC Vayu Vajra', note: 'Biggest perk of this locality' },
      koramangala: { time: 48, mode: 'Cab via ORR', note: 'Long — not ideal for south workers' },
      whitefield: { time: 58, mode: 'Cab', note: 'ORR+ITPL stretch — peak can be 75min' },
      hsr: { time: 50, mode: 'Cab via ORR', note: 'Can be punishing at peak' },
      electronicCity: { time: 55, mode: 'Cab', note: 'Only if necessary — long haul' },
    },
  },
]

export const PERSONAS = {
  fresher:    { label: 'Fresh graduate',  jobW: 0.55, rentbuyW: 0.20, restW: 0.25 },
  midlevel:   { label: 'Mid-level pro',   jobW: 0.40, rentbuyW: 0.35, restW: 0.25 },
  senior:     { label: 'Senior / lead',   jobW: 0.30, rentbuyW: 0.45, restW: 0.25 },
  freelancer: { label: 'Freelancer',      jobW: 0.50, rentbuyW: 0.25, restW: 0.25 },
  investor:   { label: 'Investor',        jobW: 0.10, rentbuyW: 0.75, restW: 0.15 },
  family:     { label: 'Family mover',    jobW: 0.30, rentbuyW: 0.45, restW: 0.25 },
}
