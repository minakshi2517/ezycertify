import { Link } from 'react-router-dom'
import { EMAIL_ADDRESS, PHONE_NUMBER } from '../data/siteData'

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
            Terms of Service & Guarantee Policy
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '750px', lineHeight: 1.6 }}>
            Review the terms governing Ezycertify masterclasses, live virtual cohorts, 100% application approval mentorship, and refund policies.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ background: '#ffffff', padding: '3rem 2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              1. 100% Application Approval Mentorship Policy
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Ezycertify provides dedicated expert application review for candidates applying for PMP®, PgMP®, PMI-PBA®, or PMI-ACP® credentials. Our team guides you through experience documentation according to current Exam Content Outlines (ECO).
            </p>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              2. Class Rescheduling & Refund Terms
            </h2>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li><strong>Rescheduling:</strong> Students can request a batch transfer or reschedule up to 3 business days prior to cohort start at zero additional cost.</li>
              <li><strong>Refund Policy:</strong> Cancellation requests received 7 days before class start qualify for a 100% full refund.</li>
              <li><strong>Exam Pass Guarantee:</strong> If a student completes 100% live attendance and scores 80%+ on mock exams but fails the official certification exam within 45 days, Ezycertify covers the re-examination fee or offers free enrollment in the next live batch.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0074e4', paddingBottom: '0.4rem', display: 'inline-block' }}>
              3. Intellectual Property Notice
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
              PMBOK®, PMP®, PgMP®, PMI-ACP®, and CAPM® are registered marks of Project Management Institute, Inc. CSM® and CSPO® are registered trademarks of Scrum Alliance®. SAFe® is a registered trademark of Scaled Agile, Inc. ITIL® is a registered trademark of AXELOS Limited. All training materials are provided for individual personal study only.
            </p>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
              Questions about our terms? Contact support at <a href={`mailto:${EMAIL_ADDRESS}`} style={{ color: '#0074e4' }}>{EMAIL_ADDRESS}</a> or call {PHONE_NUMBER}.
            </div>
            <Link to="/courses" className="btn btn-blue">
              Explore Courses →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
