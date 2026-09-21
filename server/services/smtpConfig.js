function cleanEnv(value) {
  if (value == null) return ''
  return String(value).trim().replace(/^['"]|['"]$/g, '')
}

function isPlaceholderSecret(value) {
  const v = String(value || '').toLowerCase()
  return (
    !v ||
    v.includes('xxxxxxxx') ||
    v.includes('yourhostinger') ||
    v.includes('your_') ||
    v.includes('changeme') ||
    v === 'password'
  )
}

export function getSmtpConfig() {
  const host = cleanEnv(process.env.SMTP_HOST)
  const user = cleanEnv(process.env.SMTP_USER || process.env.EMAIL_USER)
  const pass = cleanEnv(process.env.SMTP_PASS || process.env.EMAIL_PASS)
  const port = Number(cleanEnv(process.env.SMTP_PORT) || 465)
  const secure = cleanEnv(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465
  const from = cleanEnv(process.env.EMAIL_FROM) || (user ? `"Ezycertify" <${user}>` : '')

  const missing = []
  if (!host) missing.push('SMTP_HOST')
  if (!user) missing.push('SMTP_USER')
  if (!pass) missing.push('SMTP_PASS')

  const placeholder = Boolean(pass && isPlaceholderSecret(pass))
  const ready = missing.length === 0 && !placeholder

  return { host, user, pass, port, secure, from, missing, placeholder, ready }
}
