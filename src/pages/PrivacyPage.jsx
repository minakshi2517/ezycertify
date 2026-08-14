import { Link } from 'react-router-dom'
import { ADDRESS_TEXT, EMAIL_ADDRESS, PHONE_NUMBER } from '../data/siteData'

export default function PrivacyPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: 'calc(var(--header-h) + 2rem)', background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '3.5rem 0' }}>
        <div className="container">
          <span style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', marginBottom: '1rem', textTransform: 'uppercase' }}>
            GLOBAL COMPLIANCE & PRIVACY
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 850, color: '#ffffff', marginBottom: '0.85rem' }}>
            Privacy & Data Protection Policy
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '750px', lineHeight: 1.6 }}>
            Ezycertify is committed to protecting your personal data, exam credentials, and privacy in compliance with global standards including GDPR, CCPA, and DPDP Act.
          </p>
          <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            Last Updated: August 2026 · Effective Date: January 1, 2026
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ background: '#ffffff', padding: '3rem 2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              1. Information We Collect
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              When you enroll in our accreditation masterclasses, request academic counseling, or register for mock exams, Ezycertify collects the following categories of data:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li><strong>Personal Identity Data:</strong> Full Name, Email Address, Phone Number, Corporate Billing Address.</li>
              <li><strong>Educational & Professional Credentials:</strong> Project management experience, resume details for PMP®/PgMP® application audit support.</li>
              <li><strong>Transaction & Payment Records:</strong> Encrypted payment confirmation IDs (processed via 256-bit SSL certified PCI-DSS payment gateways; Ezycertify never stores raw credit card details).</li>
              <li><strong>LMS Usage & Performance Data:</strong> Attendance logs, quiz scores, mock exam timer data, and certificate verification records.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              2. How We Use Your Personal Data
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Your data is processed strictly for legitimate educational, certification eligibility, and student service purposes:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li>To issue official 35 PDU / 16 SEU course completion certificates required by exam bodies.</li>
              <li>To review and assist with your PMI®, Scrum Alliance®, SAFe®, or ITIL® official exam applications.</li>
              <li>To provide access to virtual live classrooms, recorded sessions, and 2,500+ practice question banks.</li>
              <li>To send critical cohort updates, schedule notifications, and instructor feedback.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              3. Data Security & Encryption Standards
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Ezycertify implements enterprise-grade technical and organizational safeguards:
            </p>
            <div style={{ background: '#f8fafc', padding: '1.25rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #0074e4', marginTop: '1rem' }}>
              <ul style={{ paddingLeft: '1rem', color: '#334155', lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>
                <li>256-Bit SSL/TLS end-to-end encryption for all web communications and student portal logins.</li>
                <li>Strict Role-Based Access Control (RBAC) limiting student record access to authorized academic advisors.</li>
                <li>Annual vulnerability testing and ISO/IEC 27001 data center infrastructure compliance.</li>
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              4. Your Privacy Rights (GDPR & Global Standards)
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Depending on your location, you hold the following statutory rights regarding your personal data:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li><strong>Right to Access & Rectify:</strong> You can request a copy of your stored records or request correction of inaccuracies.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may request full account and personal data deletion.</li>
              <li><strong>Right to Restrict Processing:</strong> You can opt out of promotional communications at any time.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              5. Contact Data Protection Officer (DPO)
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              If you have any questions or data privacy requests, contact our dedicated Data Protection Officer:
            </p>
            <div style={{ background: '#eff6ff', padding: '1.25rem 1.5rem', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1rem', marginBottom: '0.35rem' }}>
                Ezycertify Data Protection Office
              </div>
              <div style={{ fontSize: '0.9rem', color: '#1e40af', lineHeight: 1.6 }}>
                📍 {ADDRESS_TEXT}<br />
                📧 Email: <a href={`mailto:${EMAIL_ADDRESS}`} style={{ color: '#0074e4', textDecoration: 'underline' }}>{EMAIL_ADDRESS}</a><br />
                📞 Phone: {PHONE_NUMBER}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <Link to="/courses" className="btn btn-blue">
              Return to Certification Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
