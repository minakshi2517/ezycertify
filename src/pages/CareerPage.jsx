import { useState } from 'react'
import { jobListings } from '../data/siteData'

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', experience: '', resume: null })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSelectedJob(null)
      setApplicant({ name: '', email: '', phone: '', experience: '', resume: null })
    }, 2500)
  }

  const perks = [
    {
      title: 'Global Enterprise Exposure',
      desc: 'Deliver live virtual cohorts to project leaders, engineering directors, and product managers across Fortune 500 organizations.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      title: '100% Remote & Hybrid Flexibility',
      desc: 'Facilitate virtual cohorts from your home office with flexible weekend or weekday evening training schedules.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: 'Industry-Leading Pay & Bonuses',
      desc: 'Top-tier hourly and batch rates combined with learner success bonuses and exam pass-rate incentives.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: 'Full Certification Sponsorship',
      desc: 'We sponsor 100% of advanced accreditation fees for our lead trainers, including SAFe® SPC 6.0, PgMP®, and CST® pathways.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
    {
      title: 'Comprehensive Health & Wellness',
      desc: 'Full medical coverage for full-time academic staff, annual wellness stipends, and professional growth allowances.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      title: 'Collaborative Instructor Community',
      desc: 'Join a tight-knit faculty of senior PMs, Agile coaches, and published authors to share course material & pedagogical insights.',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Application Submission',
      desc: 'Submit your credentials, teaching background, and active certifications (PMP, CSM, SAFe SPC).',
    },
    {
      step: '02',
      title: 'Mock Delivery Session',
      desc: 'Conduct a 20-minute live virtual sample teaching session with our academic review panel.',
    },
    {
      step: '03',
      title: 'Onboarding & Cohort Assignment',
      desc: 'Finalize agreements, gain access to Ezycertify LMS portals, and receive your first cohort schedule.',
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
              CAREERS AT EZYCERTIFY
            </span>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
              Shape the Future of Global Certification & Professional Learning
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Join an elite faculty of PMP® instructors, Certified Scrum Trainers, SAFe® Practice Consultants, and academic advisors. Help professionals in 120+ countries earn life-changing credentials.
            </p>

            <a href="#openings" className="btn btn-red btn-lg">
              View Open Positions
            </a>
          </div>
        </div>

        {/* Culture & Perks Grid */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">FACULTY & TEAM BENEFITS</span>
            <h2 className="section-title">Why Top Trainers Choose Ezycertify</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {perks.map((p, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                padding: '2.25rem 2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-200)',
                boxShadow: 'var(--shadow-sm)'
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

        {/* 3-Step Hiring Process */}
        <div style={{
          background: 'var(--gray-50)',
          padding: '4rem 3rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)',
          marginBottom: '4.5rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">OUR HIRING PATHWAY</span>
            <h2 className="section-title">3-Step Selection & Onboarding Process</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {processSteps.map((s, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-200)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--blue)', marginBottom: '0.75rem' }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Openings */}
        <div id="openings">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">JOIN OUR FACULTY</span>
            <h2 className="section-title">Current Open Positions</h2>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {jobListings.map((job) => (
              <div key={job.id} style={{
                background: 'var(--white)',
                padding: '2.25rem 2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-200)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.25s ease'
              }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--blue)', background: 'var(--blue-light)', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {job.department} • {job.location}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', margin: '0.6rem 0 0.4rem' }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                    {job.description}
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 700 }}>
                    Requirements: <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{job.experience}</span>
                  </div>
                </div>

                <button
                  className="btn btn-red btn-sm"
                  onClick={() => setSelectedJob(job)}
                >
                  Apply for Position
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius)',
            padding: '2.5rem',
            maxWidth: '550px',
            width: '100%',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <button
              onClick={() => setSelectedJob(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem', cursor: 'pointer', border: 'none', background: 'none' }}
            >
              ✕
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>
                  Application Submitted!
                </h3>
                <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>
                  Thank you for applying for <strong>{selectedJob.title}</strong>. Our academic HR board will review your credentials and get in touch.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.2rem' }}>
                  Apply for {selectedJob.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                  Location: {selectedJob.location} • {selectedJob.department}
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Your full name"
                      value={applicant.name}
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="name@company.com"
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="+91 98765 43210"
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Certifications & Years of Experience *</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      required
                      placeholder="List your active credentials (e.g. PMP, CSM, SAFe SPC 6.0) and total teaching/industry years."
                      value={applicant.experience}
                      onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: '1rem' }}>
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
