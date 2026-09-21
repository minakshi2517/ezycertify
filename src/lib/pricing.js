import { exchangeRates, getExchangeRates, setLiveExchangeRates } from '../data/siteData.js'

let inrRate = exchangeRates.INR || 95.73
let fetchedAt = 0

export async function refreshExchangeRates() {
  if (Date.now() - fetchedAt < 30 * 60 * 1000) return inrRate
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD')
    const data = await res.json()
    if (data?.rates?.INR) {
      setLiveExchangeRates(data.rates)
      inrRate = Number(data.rates.INR)
      fetchedAt = Date.now()
    }
  } catch {
    // keep last known rate
  }
  return inrRate
}

export function getPayable(courseOrUsd) {
  const rate = getExchangeRates().INR || inrRate || 95.73

  if (courseOrUsd && typeof courseOrUsd === 'object') {
    const listedInr = courseOrUsd.priceINR != null ? Number(courseOrUsd.priceINR) : null
    if (listedInr != null && !Number.isNaN(listedInr) && (courseOrUsd.priceUSD == null || Number.isNaN(Number(courseOrUsd.priceUSD)))) {
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
