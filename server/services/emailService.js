import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (host && user && pass && !pass.includes('xxxxxxxx') && !user.includes('xxxxxxxx')) {
    try {
      transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user, pass },
      })
    } catch (e) {
      console.warn('[Email Transporter Init Error]:', e.message)
      transporter = null
    }
  }
  return transporter
}

export async function sendEmail({ to, subject, html, text, logHeader = 'EMAIL' }) {
  const mailer = getTransporter()
  const from = process.env.EMAIL_FROM || '"Ezycertify" <support@ezycertify.com>'

  if (mailer) {
    try {
      const info = await mailer.sendMail({ from, to, subject, html, text })
      console.log(`[Email] Sent to ${to}: ${subject} (MessageId: ${info.messageId})`)
      return { success: true, messageId: info.messageId }
    } catch (err) {
      console.error(`[Email Error] Failed sending to ${to}:`, err.message)
      if (process.env.NODE_ENV === 'production' && !process.env.SMTP_PASS?.includes('xxxxxxxx')) {
        throw new Error(`Email delivery failed: ${err.message}`)
      }
      console.log(`[Email Dev Fallback] Falling back to console logger...`)
    }
  }

  // Developer / Local fallback logger
  console.log(`\n================== [${logHeader}] ==================`)
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Text: ${text || html.replace(/<[^>]*>/g, '')}`)
  console.log(`=====================================================\n`)
  return { success: true, localLogged: true }
}

export async function sendVerificationEmail(email, name, otp, link) {
  const subject = `Your Ezycertify Verification Code: ${otp}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0f2b5c; margin: 0;">Ezycertify</h2>
        <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Official Learning Platform</p>
      </div>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for joining Ezycertify. Please use the verification code below to confirm your email address:</p>
      <div style="background: #f0f7ff; border: 2px dashed #0074e4; border-radius: 8px; padding: 18px; text-align: center; margin: 24px 0;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0074e4;">${otp}</span>
      </div>
      ${link ? `<p style="text-align: center;"><a href="${link}" style="display: inline-block; background: #0074e4; color: #fff; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 700;">Verify Email Directly</a></p>` : ''}
      <p style="font-size: 13px; color: #64748b; margin-top: 24px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
    </div>
  `
  return sendEmail({ to: email, subject, html, logHeader: 'EMAIL VERIFICATION' })
}

export async function send2FAEmail(email, name, otp) {
  const subject = `Your Ezycertify Security Code: ${otp}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0f2b5c; margin: 0;">Ezycertify Security</h2>
      </div>
      <p>Hi <strong>${name}</strong>,</p>
      <p>A login attempt was initiated on your account. Please enter this two-step verification code to complete sign in:</p>
      <div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 18px; text-align: center; margin: 24px 0;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #16a34a;">${otp}</span>
      </div>
      <p style="font-size: 13px; color: #64748b;">This security code is single-use and expires in 10 minutes. Never share this code with anyone.</p>
    </div>
  `
  return sendEmail({ to: email, subject, html, logHeader: 'LOGIN 2FA CODE' })
}

export async function sendPasswordResetEmail(email, name, link) {
  const subject = `Reset Your Ezycertify Password`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0f2b5c; margin: 0;">Ezycertify Password Reset</h2>
      </div>
      <p>Hi <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to choose a new password:</p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${link}" style="background: #0074e4; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">Reset My Password</a>
      </div>
      <p style="font-size: 13px; color: #64748b;">This link is valid for 1 hour. If you did not make this request, you can safely ignore this email.</p>
    </div>
  `
  return sendEmail({ to: email, subject, html, logHeader: 'PASSWORD RESET LINK' })
}

export async function sendEnrollmentEmail({ email, name, courseTitle, batch, receiptId, amount, currency }) {
  const subject = `Enrollment Confirmed: ${courseTitle} (${receiptId})`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f2b5c;">Welcome to Ezycertify!</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your enrollment in <strong>${courseTitle}</strong> has been successfully confirmed.</p>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p><strong>Receipt ID:</strong> ${receiptId}</p>
        <p><strong>Batch:</strong> ${batch || 'Upcoming Live Virtual Cohort'}</p>
        <p><strong>Amount Paid:</strong> ${currency} ${amount}</p>
      </div>
      <p>You can access your course materials and batch live links from your student dashboard.</p>
    </div>
  `
  return sendEmail({ to: email, subject, html, logHeader: 'ENROLLMENT CONFIRMATION' })
}
