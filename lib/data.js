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

  // ── NEW LOCALITIES ────────────────────────────────────────────────────────

  {
    id: 'jayanagar', name: 'Jayanagar', mapX: 46, mapY: 68, zone: 'South',
    tag: 'Family favourite', tagline: 'Best schools and old-Bangalore charm',
    summary: "Bangalore's most liveable family zone — tree-lined streets, top CBSE schools, BDA Complex park. Limited IT jobs locally but Yellow Line metro now connects to the city. Property commands a permanent school premium.",
    metro: 'Yellow Line — Jayanagar station',
    jobs: {
      score: 58, salaryRange: '₹8–20 LPA', freelanceRate: '₹1–5k/day',
      jobDensity: 'Limited IT — most commute to Koramangala or HSR',
      topEmployers: ['Education sector', 'Healthcare', 'Retail', 'Government'],
      topRoles: ['Education', 'Healthcare', 'Finance', 'Retail', 'Government'],
      listings: [
        { role: 'Finance Analyst', company: 'CA firm – 11th Block', pay: '₹6–12 LPA', type: 'Full-time', exp: '2–4 yrs', skills: ['Tally', 'GST', 'Excel'] },
        { role: 'School Teacher', company: 'Clarence / BGS School', pay: '₹4–8 LPA', type: 'Full-time', exp: '2+ yrs', skills: ['Teaching', 'Content'] },
        { role: 'Freelance Tutor', company: 'Independent', pay: '₹800–2k/hr', type: 'Freelance', exp: 'Subject expert', skills: ['Maths', 'Science', 'IIT-JEE'] },
      ],
    },
    rentbuy: {
      score: 74, pricePerSqft: 11000, appreciation: 11, rentalYield: 2.9,
      avgPropertyPrice: 110, breakEvenYrs: 11,
      verdict: 'Buy for self-use with kids — school zone commands permanent premium. Not a great pure investment.',
      rentRanges: { studio: 18, oneBHK: 24, twoBHK: 36, threeBHK: 58 },
      listings: [
        { name: '3BHK – 4th Block', price: '₹1.1 Cr', type: 'Buy', yield: '2.9%', note: 'School belt — always in demand' },
        { name: '2BHK – 9th Block', price: '₹36k/mo', type: 'Rent', note: 'Furnished, BDA Complex side' },
        { name: '2BHK resale – 11th Block', price: '₹85L', type: 'Buy', yield: '2.8%', note: 'Good value end of Jayanagar' },
      ],
      bestStreets: ['4th Block – premium, school zone', '9th Block – quieter, green', '11th Block – best value'],
    },
    restaurants: {
      score: 76, foodRange: '₹60–1200/meal', nightlifeScore: 35,
      vibe: 'Legendary Udupi and South Indian food. Best darshinis in the city. Limited nightlife.',
      listings: [
        { name: "Brahmin's Coffee Bar", type: 'Heritage cafe', price: '₹30–80', note: 'Iconic — best idli-vada in Bangalore. Open 7–11am only' },
        { name: 'MTR – Lalbagh Road', type: 'South Indian institution', price: '₹150–400', note: 'Heritage restaurant since 1924' },
        { name: 'Udupi chains – 4th Block', type: 'Budget dining', price: '₹60–200', note: 'Multiple options, consistent quality' },
      ],
    },
    commute: {
      koramangala: { time: 18, mode: 'Cab or metro', note: 'Easy — Yellow Line now direct' },
      hsr: { time: 20, mode: 'Cab', note: 'Quick via 24th Main' },
      electronicCity: { time: 28, mode: 'Yellow Line metro', note: 'Direct via Silk Board' },
      mgRoad: { time: 35, mode: 'Metro', note: 'Direct Yellow Line' },
    },
  },

  {
    id: 'jp_nagar', name: 'JP Nagar', mapX: 42, mapY: 74, zone: 'South',
    tag: 'Affordable south', tagline: 'Best value in south Bangalore',
    summary: "JP Nagar gives south Bangalore quality at 30% less than Jayanagar or Koramangala. Strong school belt, decent food scene, Bannerghatta Road IT belt nearby. Unsung hero for families on a budget.",
    metro: 'Yellow Line — JP Nagar station',
    jobs: {
      score: 62, salaryRange: '₹8–22 LPA', freelanceRate: '₹1–4k/day',
      jobDensity: 'Bannerghatta Road IT belt 10 min — commute zone rather than job zone',
      topEmployers: ['Bannerghatta Rd IT firms', 'Education sector', 'Healthcare', 'Retail'],
      topRoles: ['Software Engineer', 'Education', 'Healthcare', 'Operations'],
      listings: [
        { role: 'Software Engineer', company: 'Bannerghatta Rd firm', pay: '₹8–16 LPA', type: 'Full-time', exp: '1–4 yrs', skills: ['Java', 'Python'] },
        { role: 'Operations Manager', company: 'Logistics firm', pay: '₹8–14 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['Supply chain', 'ERP'] },
        { role: 'Content Writer', company: 'Agency', pay: '₹1.5–3k/day', type: 'Freelance', exp: '2+ yrs', skills: ['SEO', 'Blogging'] },
      ],
    },
    rentbuy: {
      score: 82, pricePerSqft: 8500, appreciation: 12, rentalYield: 3.4,
      avgPropertyPrice: 85, breakEvenYrs: 9,
      verdict: 'Best value buy in south Bangalore. Solid appreciation, good rental demand from families and professionals.',
      rentRanges: { studio: 14, oneBHK: 18, twoBHK: 28, threeBHK: 46 },
      listings: [
        { name: '3BHK – Phase 6', price: '₹85L', type: 'Buy', yield: '3.4%', note: 'Great value, school nearby' },
        { name: '2BHK – Phase 3', price: '₹28k/mo', type: 'Rent', note: 'Semi-furnished, park facing' },
        { name: '2BHK resale – Phase 7', price: '₹72L', type: 'Buy', yield: '3.3%', note: 'Ready possession' },
      ],
      bestStreets: ['Phase 6 – most developed', 'Phase 3 – central, good amenities', '15th Cross – quiet residential'],
    },
    restaurants: {
      score: 68, foodRange: '₹80–1000/meal', nightlifeScore: 40,
      vibe: 'Good local dining, growing cafe scene. Rameshwaram Cafe is the anchor — worth queuing for.',
      listings: [
        { name: 'Rameshwaram Cafe', type: 'South Indian', price: '₹100–300', note: 'Viral — best filter coffee + dosas. Long queues' },
        { name: 'Forum Mall food court', type: 'Mall dining', price: '₹250–600', note: '10 min drive, all cuisines' },
        { name: 'Grameen – JP Nagar', type: 'Casual dining', price: '₹200–600', note: 'Good North Karnataka cuisine' },
      ],
    },
    commute: {
      koramangala: { time: 22, mode: 'Cab or metro', note: 'Easy — metro direct now' },
      electronicCity: { time: 25, mode: 'Yellow Line metro', note: 'Great connectivity post-metro' },
      hsr: { time: 18, mode: 'Cab', note: 'Quick via 24th Main' },
      mgRoad: { time: 38, mode: 'Metro', note: 'Yellow Line direct' },
    },
  },

  {
    id: 'marathahalli', name: 'Marathahalli', mapX: 78, mapY: 57, zone: 'East',
    tag: 'IT value pick', tagline: 'Whitefield at 60% of the cost',
    summary: "Marathahalli sits between Whitefield and Indiranagar — close to ITPL, pay 40% less rent. Purple Line metro makes it viable. Best value for IT workers who want east Bangalore without paying Whitefield prices.",
    metro: 'Purple Line — Marathahalli station',
    jobs: {
      score: 84, salaryRange: '₹12–28 LPA', freelanceRate: '₹2–7k/day',
      jobDensity: 'Bagmane Tech Park, RMZ Ecospace, Cessna Business Park — all within 3km',
      topEmployers: ['HP India', 'Dell Technologies', 'Oracle India', 'Mphasis', 'Mindtree'],
      topRoles: ['Software Engineer', 'DevOps', 'Data', 'QA', 'IT Management'],
      listings: [
        { role: 'Software Engineer', company: 'HP India', pay: '₹12–22 LPA', type: 'Full-time', exp: '2–5 yrs', skills: ['Java', 'Spring', 'Microservices'] },
        { role: 'Data Engineer', company: 'Oracle India', pay: '₹14–24 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['SQL', 'Python', 'Cloud'] },
        { role: 'IT Project Manager', company: 'Mphasis', pay: '₹3–7k/day', type: 'Contract', exp: '5+ yrs', skills: ['Agile', 'PMP', 'Delivery'] },
      ],
    },
    rentbuy: {
      score: 80, pricePerSqft: 8200, appreciation: 15, rentalYield: 3.8,
      avgPropertyPrice: 82, breakEvenYrs: 8,
      verdict: 'Excellent value. Metro arrival boosted appreciation. Buy before prices catch up to Whitefield.',
      rentRanges: { studio: 15, oneBHK: 20, twoBHK: 30, threeBHK: 48 },
      listings: [
        { name: '2BHK – Brookefield', price: '₹82L', type: 'Buy', yield: '3.8%', note: 'Metro-adjacent, good appreciation' },
        { name: '1BHK – HAL Airport Rd', price: '₹20k/mo', type: 'Rent', note: 'Walk to Purple Line' },
        { name: '3BHK – Marathahalli Bridge', price: '₹48k/mo', type: 'Rent', note: 'Furnished, gated' },
      ],
      bestStreets: ['Brookefield – most developed', 'HAL Airport Road – metro access', 'Varthur Road – budget end'],
    },
    restaurants: {
      score: 70, foodRange: '₹150–1200/meal', nightlifeScore: 52,
      vibe: 'Good mid-range dining, growing with IT crowd. Phoenix Marketcity 15 min drive.',
      listings: [
        { name: 'Punjab Grill', type: 'North Indian', price: '₹600–1400', note: 'Business lunch spot for IT crowd' },
        { name: 'Biryani Zone', type: 'Quick serve', price: '₹200–400', note: 'Best biryani in area' },
        { name: 'Phoenix Marketcity (15 min)', type: 'Mall dining', price: '₹300–1000', note: 'Weekend hub' },
      ],
    },
    commute: {
      whitefield: { time: 20, mode: 'Cab or Purple Line', note: 'Very quick — biggest advantage' },
      indiranagar: { time: 25, mode: 'Purple Line metro', note: 'Direct — game changer' },
      koramangala: { time: 40, mode: 'Metro combo', note: 'Metro to Indiranagar, cab onward' },
      mgRoad: { time: 35, mode: 'Purple Line metro', note: 'Direct' },
    },
  },

  {
    id: 'bellandur', name: 'Bellandur', mapX: 68, mapY: 70, zone: 'Southeast',
    tag: 'ORR IT corridor', tagline: 'Where Sarjapur meets Whitefield',
    summary: "SAP, Cisco, Accenture all have large campuses here. Property rising fast after the Bellandur lake cleanup. Good investment, lifestyle developing — new restaurants opening weekly.",
    metro: 'Phase 3 corridor — planned ORR line',
    jobs: {
      score: 86, salaryRange: '₹12–30 LPA', freelanceRate: '₹2–8k/day',
      jobDensity: 'SAP Labs, Cisco, Accenture Delivery Centre — 50k+ employees in 4km',
      topEmployers: ['SAP Labs', 'Cisco Systems', 'Accenture', 'Target India', 'Goldman Sachs'],
      topRoles: ['Software Engineer', 'DevOps', 'Product', 'Data', 'SAP Consulting'],
      listings: [
        { role: 'SAP Developer', company: 'SAP Labs India', pay: '₹15–28 LPA', type: 'Full-time', exp: '3–6 yrs', skills: ['SAP ABAP', 'Fiori', 'S4HANA'] },
        { role: 'Network Engineer', company: 'Cisco Systems', pay: '₹14–26 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['CCNA', 'Routing', 'Security'] },
        { role: 'Data Analyst', company: 'Target India', pay: '₹10–18 LPA', type: 'Full-time', exp: '2–4 yrs', skills: ['SQL', 'Tableau', 'Python'] },
      ],
    },
    rentbuy: {
      score: 86, pricePerSqft: 8800, appreciation: 18, rentalYield: 4.0,
      avgPropertyPrice: 88, breakEvenYrs: 7,
      verdict: 'Strong investment. Lake cleanup driving appreciation. Buy near ORR for maximum IT rental demand.',
      rentRanges: { studio: 16, oneBHK: 22, twoBHK: 32, threeBHK: 50 },
      listings: [
        { name: '2BHK – Salarpuria Sattva', price: '₹88L', type: 'Buy', yield: '4.0%', note: 'Gated, amenities, IT tenant demand' },
        { name: '1BHK – Bellandur main', price: '₹22k/mo', type: 'Rent', note: 'Walk to SAP/Cisco gates' },
        { name: '3BHK – ORR service road', price: '₹50k/mo', type: 'Rent', note: 'Furnished, families prefer' },
      ],
      bestStreets: ['Bellandur main – near SAP gate', 'ORR service road – premium', 'Kadubeesanahalli – quieter, cheaper'],
    },
    restaurants: {
      score: 65, foodRange: '₹200–1200/meal', nightlifeScore: 48,
      vibe: 'Growing fast. New cafes opening with IT influx. Still developing but improving every month.',
      listings: [
        { name: 'The Fatty Bao – Bellandur', type: 'Asian', price: '₹700–1500', note: 'Best restaurant in area right now' },
        { name: 'Cafe Noir', type: 'Cafe', price: '₹200–500', note: 'Work-friendly, good coffee' },
        { name: 'Sarjapur Road dining strip', type: 'Casual', price: '₹200–600', note: '10 min drive, more options' },
      ],
    },
    commute: {
      sarjapur: { time: 15, mode: 'Cab via ORR', note: 'Very quick — same corridor' },
      koramangala: { time: 28, mode: 'Cab via ORR', note: 'Decent off-peak, bad at 6pm' },
      whitefield: { time: 35, mode: 'Cab via ORR', note: 'Manageable mid-day' },
      hsr: { time: 22, mode: 'Cab', note: 'Quick via 27th Main' },
    },
  },

  {
    id: 'yelahanka', name: 'Yelahanka', mapX: 40, mapY: 16, zone: 'North',
    tag: 'Airport zone', tagline: 'Most affordable north — big upside incoming',
    summary: "Best-kept investor secret. Cheapest property in north Bangalore, 20 min from airport, IAF base adds stability, suburban rail + upcoming metro will transform connectivity. Buy now before infrastructure arrives.",
    metro: 'Suburban rail — Yelahanka junction (operational)',
    jobs: {
      score: 52, salaryRange: '₹6–18 LPA', freelanceRate: '₹1–3k/day',
      jobDensity: 'Limited local IT — aerospace, defence and airport-adjacent businesses',
      topEmployers: ['HAL Aerospace', 'BIAL (airport)', 'Aerospace clusters', 'Education'],
      topRoles: ['Aerospace engineering', 'Airport operations', 'Education', 'Government', 'Logistics'],
      listings: [
        { role: 'Aerospace Engineer', company: 'HAL', pay: '₹8–16 LPA', type: 'Full-time', exp: '2–5 yrs', skills: ['Mechanical', 'Avionics'] },
        { role: 'Airport Operations', company: 'BIAL', pay: '₹6–12 LPA', type: 'Full-time', exp: '2–4 yrs', skills: ['Operations', 'Safety'] },
        { role: 'Logistics Coordinator', company: 'Airport cargo firm', pay: '₹5–9 LPA', type: 'Full-time', exp: '1–3 yrs', skills: ['Supply chain'] },
      ],
    },
    rentbuy: {
      score: 90, pricePerSqft: 5800, appreciation: 16, rentalYield: 3.6,
      avgPropertyPrice: 58, breakEvenYrs: 8,
      verdict: 'Best long-hold investment in Bangalore. ₹58L average is cheapest in north. Metro + suburban rail will 2x appreciation in 5 years.',
      rentRanges: { studio: 10, oneBHK: 14, twoBHK: 20, threeBHK: 32 },
      listings: [
        { name: '3BHK – New Town', price: '₹65L', type: 'Buy', yield: '3.6%', note: 'Largest units at lowest city price' },
        { name: '2BHK – Yelahanka New Town', price: '₹48L', type: 'Buy', yield: '3.5%', note: 'Best entry-level investment' },
        { name: '2BHK rental', price: '₹18k/mo', type: 'Rent', note: 'Airport staff, students, defence families' },
      ],
      bestStreets: ['New Town – most developed', 'Sahakara Nagar Rd – good connectivity', 'Attur Layout – quieter, cheaper'],
    },
    restaurants: {
      score: 46, foodRange: '₹80–600/meal', nightlifeScore: 22,
      vibe: 'Basic but improving. Good local dhabas and Udupi joints. Drive to Hebbal for better options.',
      listings: [
        { name: 'Local darshinis', type: 'Budget South Indian', price: '₹60–180', note: 'Abundant, good quality' },
        { name: 'Yelahanka market area', type: 'Street food', price: '₹50–150', note: 'Good evening street food' },
        { name: 'Hebbal (15 min drive)', type: 'Nearby hub', price: '₹200–900', note: 'Growing restaurant scene' },
      ],
    },
    commute: {
      airport: { time: 20, mode: 'Cab', note: 'Biggest perk — airport workers love this' },
      manyata: { time: 22, mode: 'Cab', note: 'Bellary Road is smooth most times' },
      mgRoad: { time: 35, mode: 'Suburban rail or cab', note: 'Rail faster off-peak' },
      koramangala: { time: 55, mode: 'Cab', note: 'Long — not ideal for south workers' },
    },
  },

  {
    id: 'rajajinagar', name: 'Rajajinagar', mapX: 33, mapY: 46, zone: 'West',
    tag: 'Undervalued west', tagline: 'Old Bangalore premium at underdog prices',
    summary: "Grossly undervalued — premium residential, top schools, Purple Line metro, Orion Mall, all at prices 35% below comparable east Bangalore. Buy before the west corridor gets the attention it deserves.",
    metro: 'Purple Line — Rajajinagar station (direct)',
    jobs: {
      score: 56, salaryRange: '₹6–18 LPA', freelanceRate: '₹1–4k/day',
      jobDensity: 'Yeshwantpur industrial, Peenya KIADB, city centre offices all accessible',
      topEmployers: ['Yeshwantpur industrial firms', 'Retail sector', 'Government', 'Education'],
      topRoles: ['Manufacturing', 'Retail management', 'Education', 'Government', 'Operations'],
      listings: [
        { role: 'Plant Operations Manager', company: 'Industrial firm – Yeshwantpur', pay: '₹10–18 LPA', type: 'Full-time', exp: '5+ yrs', skills: ['Operations', 'Safety'] },
        { role: 'Retail Store Manager', company: 'Orion Mall brand', pay: '₹6–10 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['Retail', 'Customer service'] },
        { role: 'CA Freelancer', company: 'Independent', pay: '₹2–5k/day', type: 'Freelance', exp: 'CA qualified', skills: ['Audit', 'Tax', 'Compliance'] },
      ],
    },
    rentbuy: {
      score: 80, pricePerSqft: 9200, appreciation: 12, rentalYield: 3.3,
      avgPropertyPrice: 92, breakEvenYrs: 10,
      verdict: 'Undervalued with metro operational. School and Orion Mall proximity keeps demand high. 4th Block is premium.',
      rentRanges: { studio: 16, oneBHK: 20, twoBHK: 30, threeBHK: 50 },
      listings: [
        { name: '3BHK – 4th Block', price: '₹1.1 Cr', type: 'Buy', yield: '3.3%', note: 'Premium Rajajinagar address' },
        { name: '2BHK – 1st Block', price: '₹30k/mo', type: 'Rent', note: 'Metro access, Orion Mall walkable' },
        { name: '2BHK resale – 2nd Block', price: '₹78L', type: 'Buy', yield: '3.2%', note: 'Good entry point' },
      ],
      bestStreets: ['4th Block – premium, Orion Mall area', '1st Block – metro walkable', '3rd Block – quiet residential'],
    },
    restaurants: {
      score: 66, foodRange: '₹80–1200/meal', nightlifeScore: 38,
      vibe: 'Strong traditional food culture. Orion Mall options. Heritage cafes like Veena Stores are legendary.',
      listings: [
        { name: 'Veena Stores', type: 'Heritage cafe', price: '₹30–100', note: 'Legendary — best khali dosa in Bangalore. Opens 6:30am' },
        { name: 'Orion Mall food court', type: 'Mall dining', price: '₹200–600', note: 'Good variety, all major chains' },
        { name: 'Malgudi Days', type: 'Casual dining', price: '₹250–600', note: 'Good Karnataka cuisine' },
      ],
    },
    commute: {
      mgRoad: { time: 18, mode: 'Purple Line metro', note: 'Direct — very quick' },
      indiranagar: { time: 28, mode: 'Purple Line metro', note: 'Direct, no changes' },
      whitefield: { time: 48, mode: 'Purple Line metro', note: 'Long but no traffic stress' },
      koramangala: { time: 40, mode: 'Metro + cab', note: 'Metro to Indiranagar then cab' },
    },
  },

  {
    id: 'malleshwaram', name: 'Malleshwaram', mapX: 36, mapY: 38, zone: 'North-West',
    tag: 'Premium old city', tagline: "Bangalore's most prestigious traditional address",
    summary: "Old money Bangalore — Sankey Tank, top schools, BMS and NPS campuses, legendary food culture. Premium pricing for limited space. Families with school-going children pay willingly. Purple Line metro is 3-min walk.",
    metro: 'Purple Line — Sampige Road station (3 min walk)',
    jobs: {
      score: 54, salaryRange: '₹8–20 LPA', freelanceRate: '₹1.5–5k/day',
      jobDensity: 'Limited IT locally — most commute to tech parks via metro',
      topEmployers: ['BMS / MSRIT (academia)', 'Hospitals', 'Retail', 'Government', 'Law firms'],
      topRoles: ['Academia', 'Healthcare', 'Legal', 'Finance', 'Retail'],
      listings: [
        { role: 'College Professor', company: 'BMS / MSRIT', pay: '₹8–15 LPA', type: 'Full-time', exp: 'PhD preferred', skills: ['Teaching', 'Research'] },
        { role: 'Doctor / Specialist', company: 'Private hospital', pay: '₹15–40 LPA', type: 'Full-time', exp: 'MD/MS', skills: ['Clinical'] },
        { role: 'Legal Consultant', company: 'Law firm', pay: '₹2–6k/day', type: 'Retainer', exp: '5+ yrs', skills: ['Corporate law', 'Litigation'] },
      ],
    },
    rentbuy: {
      score: 72, pricePerSqft: 13000, appreciation: 10, rentalYield: 2.8,
      avgPropertyPrice: 130, breakEvenYrs: 12,
      verdict: 'Prestige address, low yield. Buy for lifestyle and school access, not ROI. Limited supply keeps prices stable.',
      rentRanges: { studio: 20, oneBHK: 26, twoBHK: 40, threeBHK: 65 },
      listings: [
        { name: '3BHK – 15th Cross', price: '₹1.4 Cr', type: 'Buy', yield: '2.8%', note: 'Rare listing — holds value well' },
        { name: '2BHK – Sampige Road', price: '₹40k/mo', type: 'Rent', note: 'Metro walk, Mantri Mall nearby' },
        { name: '2BHK – 8th Cross', price: '₹95L', type: 'Buy', yield: '2.7%', note: 'Sankey Tank side — premium' },
      ],
      bestStreets: ['15th Cross – premium, quiet', 'Sampige Road – metro access', '8th Cross – Sankey Tank proximity'],
    },
    restaurants: {
      score: 72, foodRange: '₹50–1200/meal', nightlifeScore: 30,
      vibe: "Heritage food culture. Best traditional Bangalore breakfast. No nightlife — that's the point.",
      listings: [
        { name: 'CTR Sri Sagar', type: 'South Indian', price: '₹60–200', note: 'Best benne masala dosa in city. 7–11am only' },
        { name: 'Veena Stores 18th Cross', type: 'Heritage breakfast', price: '₹40–120', note: 'Institution since 1936' },
        { name: 'Mantri Square food court', type: 'Mall dining', price: '₹200–600', note: 'All cuisines, reliable' },
      ],
    },
    commute: {
      mgRoad: { time: 15, mode: 'Purple Line metro', note: 'Sampige Road → MG Road direct' },
      indiranagar: { time: 22, mode: 'Purple Line metro', note: 'Direct, smooth' },
      whitefield: { time: 45, mode: 'Purple Line metro', note: 'Long but stress-free' },
      koramangala: { time: 38, mode: 'Metro + cab', note: 'Metro to Indiranagar, cab onward' },
    },
  },

  {
    id: 'bannerghatta', name: 'Bannerghatta Rd', mapX: 46, mapY: 80, zone: 'South',
    tag: 'South IT corridor', tagline: 'JP Nagar + IT jobs — best south combo',
    summary: "Forgotten south IT corridor — ITC, Biocon, and several MNCs have large campuses. Property still affordable, road now 6-laned, connects seamlessly to JP Nagar and Electronic City. Under-the-radar investment pick with Yellow Line metro at Gottigere.",
    metro: 'Yellow Line — Gottigere station (southern terminus)',
    jobs: {
      score: 74, salaryRange: '₹10–24 LPA', freelanceRate: '₹1.5–5k/day',
      jobDensity: 'ITC, Biocon, Global Village Tech Park, Agilent — 30k+ employees',
      topEmployers: ['ITC Infotech', 'Biocon', 'Agilent Technologies', 'Global Village Tech Park'],
      topRoles: ['Software Engineer', 'Biotech / Life sciences', 'IT Management', 'Data'],
      listings: [
        { role: 'Software Engineer', company: 'ITC Infotech', pay: '₹10–20 LPA', type: 'Full-time', exp: '2–5 yrs', skills: ['Java', 'SAP', 'Cloud'] },
        { role: 'Bioinformatics Analyst', company: 'Biocon', pay: '₹10–18 LPA', type: 'Full-time', exp: '2–4 yrs', skills: ['Python', 'R', 'Genomics'] },
        { role: 'IT Consultant', company: 'Global Village TPark', pay: '₹2–5k/day', type: 'Contract', exp: '4+ yrs', skills: ['Business analysis', 'ERP'] },
      ],
    },
    rentbuy: {
      score: 84, pricePerSqft: 7800, appreciation: 14, rentalYield: 3.8,
      avgPropertyPrice: 78, breakEvenYrs: 8,
      verdict: 'Strong value — Yellow Line metro terminal at Gottigere changes the equation. Buy before metro drives prices up.',
      rentRanges: { studio: 13, oneBHK: 17, twoBHK: 25, threeBHK: 40 },
      listings: [
        { name: '2BHK – Arekere', price: '₹78L', type: 'Buy', yield: '3.8%', note: 'Metro catchment, good tenant demand' },
        { name: '3BHK – Gottigere', price: '₹40k/mo', type: 'Rent', note: 'Biocon campus proximity' },
        { name: '1BHK – Bilekahalli', price: '₹17k/mo', type: 'Rent', note: 'Budget option, clean area' },
      ],
      bestStreets: ['Arekere – metro proximity', 'Bilekahalli – budget, good connectivity', 'Gottigere – end of Yellow Line, value buy'],
    },
    restaurants: {
      score: 60, foodRange: '₹80–900/meal', nightlifeScore: 35,
      vibe: 'Functional dining for IT crowd. Forum Shantiniketan 20 min. Very residential feel.',
      listings: [
        { name: 'Rameshwaram Cafe – BTM', type: 'South Indian', price: '₹100–300', note: '15 min away — worth trip for breakfast' },
        { name: 'Biryani By Kilo', type: 'Delivery', price: '₹300–600', note: 'Best delivery biryani in south Bangalore' },
        { name: 'Hotel Suvarna – Arekere', type: 'Local dining', price: '₹80–250', note: 'Good lunch thalis, cheap' },
      ],
    },
    commute: {
      electronicCity: { time: 18, mode: 'Yellow Line metro', note: 'Direct — same metro line' },
      jp_nagar: { time: 15, mode: 'Cab/metro', note: 'Very close — same south belt' },
      koramangala: { time: 30, mode: 'Metro + cab', note: 'Yellow Line to Silk Board, cab onward' },
      hsr: { time: 25, mode: 'Cab', note: 'Quick via 24th Main' },
    },
  },

  {
    id: 'kr_puram', name: 'KR Puram', mapX: 74, mapY: 43, zone: 'East',
    tag: 'Emerging east', tagline: 'Whitefield value with metro advantage',
    summary: "Purple Line stops here, Whitefield is 15 min east, property is 45% cheaper than Whitefield. New Bangalore-Chennai highway interchange makes it strategic. Buy for 5-year appreciation — this is where 2028 upside lives.",
    metro: 'Purple Line — KR Puram station (direct)',
    jobs: {
      score: 70, salaryRange: '₹8–22 LPA', freelanceRate: '₹1.5–5k/day',
      jobDensity: 'ITPL 15 min east, EPIP Zone, Bagmane — metro makes it viable catchment',
      topEmployers: ['Whitefield IT parks (commute)', 'EPIP Zone firms', 'Brigade Gateway firms'],
      topRoles: ['Software Engineer', 'DevOps', 'QA', 'Operations', 'Logistics'],
      listings: [
        { role: 'Software Engineer', company: 'EPIP Zone firm', pay: '₹8–18 LPA', type: 'Full-time', exp: '1–4 yrs', skills: ['Java', 'Python', 'Testing'] },
        { role: 'Logistics Manager', company: 'Highway-adjacent firm', pay: '₹8–14 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['Supply chain', 'Warehouse'] },
        { role: 'QA Engineer', company: 'IT firm', pay: '₹7–14 LPA', type: 'Full-time', exp: '2–4 yrs', skills: ['Selenium', 'JIRA', 'Manual testing'] },
      ],
    },
    rentbuy: {
      score: 88, pricePerSqft: 6200, appreciation: 17, rentalYield: 4.0,
      avgPropertyPrice: 62, breakEvenYrs: 7,
      verdict: 'Best emerging investment in east Bangalore. Metro + highway + Whitefield proximity = strong 5-year upside. Entry price still low.',
      rentRanges: { studio: 12, oneBHK: 16, twoBHK: 24, threeBHK: 38 },
      listings: [
        { name: '2BHK – Ramamurthy Nagar', price: '₹62L', type: 'Buy', yield: '4.0%', note: 'Metro walking distance' },
        { name: '3BHK – KR Puram main', price: '₹38k/mo', type: 'Rent', note: 'Gated, Whitefield commuters prefer' },
        { name: '1BHK – Banaswadi', price: '₹16k/mo', type: 'Rent', note: 'Budget — good for freshers' },
      ],
      bestStreets: ['Ramamurthy Nagar – metro adjacent', 'Old Madras Road – highway access', 'Banaswadi – budget, emerging'],
    },
    restaurants: {
      score: 55, foodRange: '₹80–800/meal', nightlifeScore: 32,
      vibe: 'Very functional — good local dhabas. Indiranagar 25 min by metro for real dining.',
      listings: [
        { name: 'Local dhabas – Old Madras Rd', type: 'Budget dining', price: '₹80–250', note: 'Abundant, cheap, filling' },
        { name: 'Banaswadi restaurant strip', type: 'Casual dining', price: '₹150–500', note: 'Growing, some decent options' },
        { name: 'Indiranagar via metro (25 min)', type: 'Nearby hub', price: '₹30 metro', note: 'Best option for quality dining' },
      ],
    },
    commute: {
      whitefield: { time: 15, mode: 'Purple Line metro', note: 'Biggest advantage — fast and direct' },
      indiranagar: { time: 25, mode: 'Purple Line metro', note: 'Direct, no changes' },
      mgRoad: { time: 30, mode: 'Purple Line metro', note: 'Direct' },
      koramangala: { time: 42, mode: 'Metro + cab', note: 'Metro to Indiranagar, cab' },
    },
  },

  {
    id: 'banashankari', name: 'Banashankari', mapX: 38, mapY: 72, zone: 'South-West',
    tag: 'Affordable family zone', tagline: "JP Nagar's quieter, cheaper neighbour",
    summary: "Calm, affordable alternative to Jayanagar and JP Nagar — same south Bangalore quality, lower prices. NICE Road access and Yellow Line metro make it surprisingly well-connected. Best for families wanting south Bangalore without the premium.",
    metro: 'Yellow Line — Banashankari station',
    jobs: {
      score: 52, salaryRange: '₹6–16 LPA', freelanceRate: '₹1–3k/day',
      jobDensity: 'Primarily residential — commute to JP Nagar IT belt, Electronic City or Koramangala',
      topEmployers: ['Education sector', 'Healthcare', 'Government', 'Retail'],
      topRoles: ['Education', 'Healthcare', 'Government', 'Retail', 'Operations'],
      listings: [
        { role: 'Primary School Teacher', company: 'DPS / Presidency School', pay: '₹4–8 LPA', type: 'Full-time', exp: '2+ yrs', skills: ['Teaching', 'Curriculum'] },
        { role: 'Healthcare Administrator', company: 'Private hospital', pay: '₹6–12 LPA', type: 'Full-time', exp: '3–5 yrs', skills: ['Hospital mgmt'] },
        { role: 'Tutor / Coaching', company: 'Independent', pay: '₹500–1.5k/hr', type: 'Freelance', exp: 'Subject expert', skills: ['PCMB', 'UPSC'] },
      ],
    },
    rentbuy: {
      score: 86, pricePerSqft: 7500, appreciation: 13, rentalYield: 3.5,
      avgPropertyPrice: 75, breakEvenYrs: 9,
      verdict: 'Excellent family buy at south Bangalore prices. Yellow Line metro drove 20% appreciation since 2023. More upside ahead.',
      rentRanges: { studio: 12, oneBHK: 16, twoBHK: 24, threeBHK: 38 },
      listings: [
        { name: '3BHK – 3rd Stage', price: '₹75L', type: 'Buy', yield: '3.5%', note: 'School zone, good family demand' },
        { name: '2BHK – BSK 2nd Stage', price: '₹24k/mo', type: 'Rent', note: 'Metro adjacent, well-maintained' },
        { name: '2BHK resale – 1st Stage', price: '₹62L', type: 'Buy', yield: '3.4%', note: 'Best value entry point' },
      ],
      bestStreets: ['3rd Stage – most developed', '2nd Stage – metro access', '1st Stage – quietest, most established'],
    },
    restaurants: {
      score: 62, foodRange: '₹60–800/meal', nightlifeScore: 28,
      vibe: 'Traditional Bangalore food culture. Good local restaurants. Very family-friendly — zero nightlife.',
      listings: [
        { name: 'Adigas – Banashankari', type: 'South Indian chain', price: '₹80–250', note: 'Reliable, good quality' },
        { name: 'BSK temple area food', type: 'Street food', price: '₹30–120', note: 'Best during festival days' },
        { name: 'JP Nagar restaurants (15 min)', type: 'Nearby hub', price: '₹150–600', note: 'Rameshwaram Cafe worth the trip' },
      ],
    },
    commute: {
      jp_nagar: { time: 12, mode: 'Cab or Yellow Line', note: 'Very close — same south belt' },
      electronicCity: { time: 22, mode: 'Yellow Line metro', note: 'Direct via Gottigere' },
      koramangala: { time: 28, mode: 'Metro + cab', note: 'Yellow Line to Silk Board, cab' },
      jayanagar: { time: 15, mode: 'Cab or metro', note: 'Quick — same south zone' },
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
