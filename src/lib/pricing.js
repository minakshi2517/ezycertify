import { exchangeRates } from '../data/siteData'

export function getPayable(priceUSD) {
  const rate = exchangeRates.INR || 83.5
  const major = Math.max(1, Math.round(Number(priceUSD || 0) * rate))
  return { amount: major * 100, currency: 'INR', major }
}
