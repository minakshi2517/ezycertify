import { Link } from 'react-router-dom'
import { US_ADDRESS, NIGERIA_ADDRESS, EMAIL_ADDRESS, PHONE_NUMBER } from '../data/siteData'

export default function TermsPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: 'calc(var(--header-h) + 2rem)', background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '3.5rem 0' }}>
        <div className="container">
          <span style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', marginBottom: '1rem', textTransform: 'uppercase' }}>
            LEGAL & ACADEMIC POLICIES
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 850, color: '#ffffff', marginBottom: '0.85rem' }}>
            Terms of Service & Academic Policies
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '780px', lineHeight: 1.6 }}>
            Please read these Terms of Service carefully. They govern your enrollment in Ezycertify masterclasses, live virtual cohorts, 100% exam application approval mentorship, and refund policies.
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
              1. Acceptance of Terms & Account Registration
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
              By registering an account, enrolling in a course, or accessing Ezycertify masterclasses, you agree to comply with and be bound by these Terms of Service. You must ensure that all profile information (Name, Email, Phone Number) provided during registration is accurate and up to date for official PDU/SEU certificate issuance.
            </p>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              2. 100% Exam Application Approval Mentorship Terms
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Ezycertify provides dedicated 1-on-1 expert review for candidates submitting credentials to official bodies (such as PMI®, Scrum Alliance®, SAFe®, and PeopleCert®).
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li>Candidates must provide authentic professional project experience details for mentor review.</li>
              <li>Our academic advisors assist in drafting descriptions aligned with the latest Exam Content Outlines (ECO).</li>
              <li>While Ezycertify boasts a 100% audit approval success rate, final audit verification remains under the sole authority of the respective credentialing body.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              3. Class Rescheduling & Refund Terms
            </h2>
            <div style={{ background: '#f8fafc', padding: '1.25rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #0074e4', marginBottom: '1rem' }}>
              <ul style={{ paddingLeft: '1rem', color: '#334155', lineHeight: 1.8, fontSize: '0.92rem', margin: 0 }}>
                <li><strong>Batch Rescheduling:</strong> Students can request a free batch transfer or reschedule up to 3 business days prior to cohort start at zero extra charge.</li>
                <li><strong>100% Money-Back Refund:</strong> Cancellation requests submitted at least 7 days before cohort start qualify for a 100% full refund with zero cancellation penalty.</li>
                <li><strong>100% Exam Pass Guarantee:</strong> Students who maintain 100% live class attendance and achieve 80%+ on full-length mock exams, but fail the official certification exam on their first attempt within 45 days, are eligible for free re-enrollment in the next live batch or exam re-test support.</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              4. Intellectual Property & Brand Trademarks Notice
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              All course materials, mock questions, slide decks, and LMS video recordings are proprietary intellectual property of Ezycertify provided solely for individual personal study:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li>PMBOK®, PMP®, PgMP®, CAPM®, PMI-ACP®, and PMI-PBA® are registered trademarks of Project Management Institute, Inc.</li>
              <li>CSM®, CSPO®, CSD®, and A-CSM® are registered trademarks of Scrum Alliance®.</li>
              <li>SAFe® and Leading SAFe® are registered trademarks of Scaled Agile, Inc.</li>
              <li>ITIL® and PRINCE2® are registered trademarks of AXELOS Limited / PeopleCert.</li>
              <li>Microsoft Azure®, AWS®, and ISACA® trademarks belong to their respective corporate entities.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              5. Support & Legal Inquiries
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
              If you have any questions regarding these Terms of Service or academic policies, contact our team:
            </p>
            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                Ezycertify Academic Support Desk
              </div>
              <div style={{ fontSize: '0.92rem', color: '#1e40af', lineHeight: 1.7 }}>
                📍 <strong>USA Office:</strong> {US_ADDRESS}<br />
                📍 <strong>Nigeria Office:</strong> {NIGERIA_ADDRESS}<br />
                📧 <strong>Support Email:</strong> <a href={`mailto:${EMAIL_ADDRESS}`} style={{ color: '#0074e4', textDecoration: 'underline' }}>{EMAIL_ADDRESS}</a><br />
                📞 <strong>Direct Helpline:</strong> {PHONE_NUMBER}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <Link to="/courses" className="btn btn-blue">
              Explore Masterclasses →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
