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
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '780px', lineHeight: 1.6 }}>
            Ezycertify is committed to safeguarding your privacy, personal information, and professional certification records in strict accordance with global data protection frameworks, including the EU General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and India Digital Personal Data Protection (DPDP) Act.
          </p>
          <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            Last Revised: August 2026 · Effective Date: January 1, 2026
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ background: '#ffffff', padding: '3.5rem 3rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', maxWidth: '920px', margin: '0 auto' }}>
          
          {/* Section 1 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              1. Information We Collect
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              When you visit Ezycertify, enroll in our masterclasses, request academic counseling, or utilize our certification application approval support, we collect the following categories of information:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li><strong>Personal Identity Data:</strong> Full Name, Email Address, Contact Phone Number, Billing Address, Country, and Timezone preference.</li>
              <li><strong>Professional & Experience Credentials:</strong> Resume details, project management hours, educational qualification background submitted for PMP®, PgMP®, or PMI-ACP® audit prep.</li>
              <li><strong>Financial & Payment Records:</strong> Encrypted transaction reference IDs and payment receipts. All online payments are securely processed via 256-bit SSL certified PCI-DSS compliant payment gateways (Razorpay, Stripe, PayPal). Ezycertify never stores raw credit card numbers or banking passwords.</li>
              <li><strong>Learning Management System (LMS) Data:</strong> Cohort attendance records, quiz performance metrics, mock exam timer logs, live Q&A interactions, and issued course completion certificates.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              2. Purpose & Legal Basis for Data Processing
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              We process your personal data strictly for legitimate educational, academic advisory, and service delivery purposes:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li>To issue official 35 Contact Hours / 16 SEU PDU completion certificates recognized by global certification bodies.</li>
              <li>To provide 1-on-1 mentorship for reviewing official exam applications (PMI®, Scrum Alliance®, SAFe®).</li>
              <li>To grant access to live virtual classrooms, interactive cohort recordings, and 2,500+ simulated exam questions.</li>
              <li>To communicate schedule changes, upcoming cohort dates, instructor feedback, and exam tips.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              3. Data Security & Encryption Standards
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Ezycertify implements high-grade physical, technical, and administrative security measures:
            </p>
            <div style={{ background: '#f8fafc', padding: '1.25rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #0074e4', marginTop: '1rem' }}>
              <ul style={{ paddingLeft: '1rem', color: '#334155', lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>
                <li>256-Bit SSL/TLS end-to-end encryption for all browser interactions and learner portal data exchanges.</li>
                <li>Strict Role-Based Access Control (RBAC) ensuring student records are accessible only to authorized academic advisors.</li>
                <li>Secure cloud server infrastructure hosted in ISO/IEC 27001 certified data centers with continuous monitoring.</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              4. Cookies & Web Analytics
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
              We use essential session cookies to keep you logged into the learner dashboard and remember your language/currency preferences. We may also use anonymous analytics cookies to improve site performance and navigation speed. You can manage or disable cookie preferences at any time via your browser settings.
            </p>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              5. Your Global Privacy Rights
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Under GDPR, CCPA, and DPDP laws, you hold full authority over your data:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li><strong>Right to Access & Export:</strong> Request a full copy of your personal data stored with Ezycertify.</li>
              <li><strong>Right to Rectification:</strong> Request instant updates or corrections to any inaccurate details.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request full deletion of your user account and data records.</li>
              <li><strong>Opt-Out Rights:</strong> Unsubscribe from marketing communications at any time with a single click.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              6. Contact Data Protection Officer (DPO)
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              If you have any questions regarding this Privacy Policy or wish to submit a formal data privacy request, contact our Data Protection Officer:
            </p>
            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                Ezycertify Legal & Compliance Office
              </div>
              <div style={{ fontSize: '0.92rem', color: '#1e40af', lineHeight: 1.7 }}>
                📍 <strong>Registered Office:</strong> {ADDRESS_TEXT}<br />
                📧 <strong>Email:</strong> <a href={`mailto:${EMAIL_ADDRESS}`} style={{ color: '#0074e4', textDecoration: 'underline' }}>{EMAIL_ADDRESS}</a><br />
                📞 <strong>Phone:</strong> {PHONE_NUMBER}
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
