import { sanitizePhone } from './authService.js'

export async function sendPhoneOtp(phone, otp, purpose = 'verification') {
  const cleanPhone = sanitizePhone(phone)
  const provider = process.env.SMS_PROVIDER || 'console'

  const message = `Your Ezycertify ${purpose === '2fa' ? 'security' : 'verification'} code is ${otp}. Valid for 10 minutes.`

  if (provider === 'twilio' && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')
      const body = new URLSearchParams({
        To: cleanPhone,
        From: process.env.TWILIO_PHONE_NUMBER,
        Body: message,
      })
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Twilio SMS failed')
      return { success: true, sid: data.sid }
    } catch (err) {
      console.error('[SMS Error] Twilio delivery failed:', err.message)
      throw new Error(`SMS delivery failed: ${err.message}`)
    }
  }

  // Console / Development logger
  console.log(`\n================== [PHONE OTP SMS] ==================`)
  console.log(`To: ${cleanPhone}`)
  console.log(`Message: ${message}`)
  console.log(`Code: ${otp}`)
  console.log(`=====================================================\n`)
  return { success: true, localLogged: true }
}
