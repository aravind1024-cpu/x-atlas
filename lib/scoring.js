export function computeIncomeScore(loc, { salIdx, freeIdx, skill }) {
  const skillQ = (skill || '').toLowerCase()
  const hasSkillMatch = skillQ
    ? loc.income.topRoles.some(r => r.toLowerCase().includes(skillQ)) ||
      skillQ.split(' ').some(w => loc.income.topRoles.some(r => r.toLowerCase().includes(w)))
    : true
  const base = (loc.income.jobScore * salIdx / 8 + loc.income.freelanceScore * freeIdx / 6) / 2
  return Math.min(100, Math.round(base * (hasSkillMatch ? 1 : 0.6)))
}

export function computeInvestScore(loc, { invIdx, roiIdx, holdIdx }) {
  const budgets = [30, 50, 70, 90, 120, 200, 350, 500]
  const roiTargets = [8, 10, 12, 15, 18, 22, 26, 30]
  const holdYrs = [2, 3, 5, 7, 10, 15]
  const budget = budgets[Math.min(invIdx - 1, 7)]
  const roiTarget = roiTargets[Math.min(roiIdx - 1, 7)]
  const holdYr = holdYrs[Math.min(holdIdx - 1, 5)]
  const roiMatch = loc.invest.appreciation >= roiTarget
    ? 100
    : Math.round(loc.invest.appreciation / roiTarget * 100)
  const budgetMatch = budget >= loc.invest.avgPropertyPrice
    ? 100
    : Math.round(budget / loc.invest.avgPropertyPrice * 100)
  const holdBonus = holdYr >= 5 ? Math.min(20, loc.invest.appreciation * holdYr / 10) : 0
  return Math.min(100, Math.round(roiMatch * 0.4 + loc.invest.rentalYield * 8 + budgetMatch * 0.3 + holdBonus))
}

export function computeLifeScore(loc, { foodIdx, clothIdx }) {
  return Math.min(100, Math.round(
    (loc.lifestyle.foodScore * foodIdx / 7 + loc.lifestyle.clothScore * clothIdx / 6) / 2
  ))
}

export function computeMatchScore(loc, filters) {
  const income = computeIncomeScore(loc, filters)
  const invest = computeInvestScore(loc, filters)
  const life = computeLifeScore(loc, filters)
  return Math.min(100, Math.round(income * 0.35 + invest * 0.35 + life * 0.30))
}

export function matchColor(score) {
  if (score >= 78) return '#14b8a6'
  if (score >= 62) return '#f59e0b'
  if (score >= 48) return '#fb923c'
  return '#f43f5e'
}

export function matchLabel(score) {
  if (score >= 78) return 'Excellent fit'
  if (score >= 62) return 'Good fit'
  if (score >= 48) return 'Decent fit'
  return 'Weak fit'
}

export function computeBreakEven(appreciation) {
  return Math.max(3, Math.round(72 / appreciation))
}

export function computeEMI(propertyLakhs) {
  const propPrice = propertyLakhs * 1e5
  const loan = propPrice * 0.8
  const rate = 0.085 / 12
  const months = 240
  return Math.round(loan * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) / 1000)
}
