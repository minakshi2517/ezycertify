import { exchangeRates } from '../data/siteData.js'

export function getPayable(courseOrUsd) {
  const rate = exchangeRates.INR || 83.5

  if (courseOrUsd && typeof courseOrUsd === 'object') {
    const listedInr = courseOrUsd.priceINR != null ? Number(courseOrUsd.priceINR) : null
    if (listedInr != null && !Number.isNaN(listedInr) && (courseOrUsd.priceCurrency === 'INR' || courseOrUsd.priceUSD == null)) {
      const major = Math.max(1, Math.round(listedInr))
      return { amount: major * 100, currency: 'INR', major }
    }
    const usd = Number(courseOrUsd.priceUSD || 0)
    const major = Math.max(1, Math.round(usd * rate))
    return { amount: major * 100, currency: 'INR', major }
  }

  const major = Math.max(1, Math.round(Number(courseOrUsd || 0) * rate))
  return { amount: major * 100, currency: 'INR', major }
}
