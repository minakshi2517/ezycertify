import { Link } from 'react-router-dom'
import { PHONE_NUMBER, WHATSAPP_LINK } from '../data/siteData'

export default function AboutPage() {
  const stats = [
    { number: '4,500+', label: 'Certified Alumni Globally' },
    { number: '99.2%', label: 'First-Attempt Pass Rate' },
    { number: '15+', label: 'Accredited Global Courses' },
    { number: '100%', label: 'PMP Application Approval' },
  ]

  const accreditations = [
    { title: 'PMI Accredited Partner', desc: 'Global Certification Partner of Project Management Institute (PMI®)' },
    { title: 'Scrum Alliance Accredited', desc: 'Official Accredited Education Academy for CSM® & CSPO® credentials' },
    { title: 'SAFe® Silver Partner', desc: 'Accredited Scaled Agile partner delivering Leading SAFe® 6.0' },
    { title: 'PeopleCert Accredited', desc: 'Official exam voucher & course provider for ITIL® 4 Foundation' },
  ]

  const pillars = [
    {
      title: 'Ezycertify Masterclass Framework',
      desc: 'Mapped directly to the latest Exam Content Outlines (ECO) with 2,500+ practice questions and 8 full-length simulated mock exams.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      title: 'Veteran CST® & SPC® Instructors',
      desc: 'Learn directly from certified trainers with 15+ years of active project management and enterprise Agile transformation experience.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: '1-on-1 Application Approval Support',
      desc: 'Our academic review board provides step-by-step assistance in writing project descriptions to guarantee 100% application approval without audit stress.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      title: 'Lifetime Learning & PDU Ecosystem',
      desc: 'Gain permanent access to updated learning portals, recorded session archives, PMBOK® 7th Ed. summaries, and ongoing career doubt support.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 16 14" />
        </svg>
      ),
    },
  ]

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 1.5rem)', paddingBottom: '5.5rem' }}>
      <div className="container">
        {/* Executive Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
          color: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '4.5rem 3rem',
          marginBottom: '3.5rem',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '820px', position: 'relative', zIndex: 10 }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(0, 116, 228, 0.25)',
              border: '1px solid rgba(0, 116, 228, 0.4)',
              color: '#93c5fd',
              padding: '0.35rem 1rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              ABOUT EZYCERTIFY
            </span>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
              Making Professional Certification Simple, Accessible & Result-Driven
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Ezycertify is a global leader in professional development and accredited certification training. Partnered with PMI, Scrum Alliance, Scaled Agile (SAFe®), and PeopleCert, we bridge the gap between exam preparation and real-world career mastery.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link to="/courses" className="btn btn-red btn-lg">
                Explore Accredited Courses
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-lg"
              >
                Speak with Academic Advisor
              </a>
            </div>
          </div>
        </div>

        {/* High-Impact Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4.5rem'
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'var(--white)',
              padding: '2.25rem 1.75rem',
              borderRadius: 'var(--radius)',
              textAlign: 'center',
              border: '1px solid var(--gray-200)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 900, color: 'var(--blue)', lineHeight: 1 }}>
                {s.number}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 700, marginTop: '0.5rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Accreditations Grid */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">GLOBAL RECOGNITION</span>
            <h2 className="section-title">Authorizations & Accreditation Badges</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {accreditations.map((acc, i) => (
              <div key={i} style={{
                background: 'var(--gray-50)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-200)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--blue)', background: 'var(--blue-light)', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                    Accredited
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginTop: '0.85rem', marginBottom: '0.5rem' }}>
                    {acc.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                    {acc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Story Split Section */}
        <div style={{
          background: 'var(--white)',
          padding: '4rem 3rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '4.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop"
              alt="Ezycertify Executive Team Collaboration"
              style={{ borderRadius: 'var(--radius)', width: '100%', height: '380px', objectFit: 'cover', boxShadow: 'var(--shadow-md)' }}
            />
          </div>

          <div>
            <span className="section-label">OUR MISSION & PHILOSOPHY</span>
            <h2 className="section-title">Eliminating Certification Friction</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Ezycertify was founded with a clear objective: to take the guesswork out of professional accreditation. Navigating eligibility guidelines, writing PM experience descriptions, and preparing for 180-question exams can be intimidating for working professionals.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--gray-600)', lineHeight: 1.8 }}>
              By integrating Ezycertify’s proven pedagogical framework, direct mentor access, and comprehensive mock portals, we turn intimidating certification exams into structured, achievable milestones.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">WHY EZYCERTIFY STANDS APART</span>
            <h2 className="section-title">Built Upon Four Pillars of Excellence</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {pillars.map((p, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                padding: '2.25rem 2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-200)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.25s ease'
              }}>
                <div className="why-icon-static" style={{ marginBottom: '1.25rem' }}>
                  {p.iconSvg}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.65rem' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
