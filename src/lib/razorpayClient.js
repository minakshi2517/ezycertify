const SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'

export function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Razorpay can only run in the browser.'))
      return
    }
    if (window.Razorpay) {
      resolve(window.Razorpay)
      return
    }

    const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay))
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay checkout.')))
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => resolve(window.Razorpay)
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout.'))
    document.body.appendChild(script)
  })
}

export function apiUrl(path) {
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  return `${base}${path}`
}

export async function getJson(path) {
  try {
    const res = await fetch(apiUrl(path))
    return await res.json()
  } catch {
    return { ok: false, configured: false }
  }
}

export async function postJson(path, body) {
  let res
  try {
    res = await fetch(apiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Cannot reach payment server. Run npm run dev and try again.')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Payment request failed. Please try again.')
  }
  return data
}
