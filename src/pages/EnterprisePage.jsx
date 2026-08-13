import { useState } from 'react'
import { enterpriseServices, globalFortuneCompanies, PHONE_NUMBER } from '../data/siteData'

export default function EnterprisePage() {
  const [submitted, setSubmitted] = useState(false)
  const [seatsCount, setSeatsCount] = useState(15)
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    teamSize: '10-25 seats',
    coursesInterested: 'PMP® & Agile SAFe®',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ companyName: '', contactName: '', workEmail: '', phone: '', teamSize: '10-25 seats', coursesInterested: 'PMP® & Agile SAFe®', message: '' })
    }, 3000)
  }

  // Calculate estimated discount
  const getDiscountPercent = (seats) => {
    if (seats >= 50) return 35
    if (seats >= 25) return 25
    if (seats >= 10) return 15
    return 10
  }

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
              EZYCERTIFY FOR ENTERPRISE & CORPORATES
            </span>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
              Upskill Your Workforce with Globally Accredited Certification Training
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Empower your engineering, project, and product teams with accredited PMP®, Scrum Alliance®, SAFe® 6.0, and AWS training. Tailored corporate schedules, bulk seat discounts, and enterprise analytics.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <a href="#proposal-form" className="btn btn-red btn-lg">
                Request Corporate Proposal
              </a>
              <a
                href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=Hi%20Ezycertify,%20we%20need%20corporate%20training%20for%20our%20team.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-lg"
              >
                Talk to Enterprise Director
              </a>
            </div>
          </div>
        </div>

        {/* Global Fortune Trust Marquee */}
        <div style={{ background: 'var(--white)', padding: '2.5rem 2rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', marginBottom: '4.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '1.5rem' }}>
            TRUSTED BY LEADERS AT GLOBAL FORTUNE 500 ENTERPRISES
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem 3rem', alignItems: 'center' }}>
            {globalFortuneCompanies.map((c, i) => (
              <span key={i} style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', opacity: 0.8 }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Enterprise Services Grid */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">ENTERPRISE SOLUTIONS</span>
            <h2 className="section-title">Built for Modern Global Organizations</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {enterpriseServices.map((s, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                padding: '2.25rem 2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-200)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.65rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Volume Seat Discount Calculator */}
        <div style={{
          background: 'var(--gray-50)',
          padding: '3.5rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)',
          marginBottom: '4.5rem'
        }}>
          <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">ENTERPRISE VOLUME DISCOUNTS</span>
            <h2 className="section-title">Calculate Your Corporate Team Savings</h2>

            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius)', marginTop: '2rem', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <label style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
                Select Number of Employees / Seats: <strong style={{ color: 'var(--blue)' }}>{seatsCount} Seats</strong>
              </label>

              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={seatsCount}
                onChange={(e) => setSeatsCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--blue)', cursor: 'pointer', height: '8px', marginBottom: '1.5rem' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Volume Savings</span>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#16a34a' }}>
                    {getDiscountPercent(seatsCount)}% OFF
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 700 }}>Dedicated Support</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginTop: '0.3rem' }}>
                    1-on-1 Account Director
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Proposal Request Form */}
        <div id="proposal-form" style={{ background: 'var(--white)', padding: '3.5rem 3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-md)', maxWidth: '800px', margin: '0 auto' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)' }}>Corporate Request Received!</h3>
              <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem', fontSize: '1.05rem' }}>
                Thank you, <strong>{form.contactName}</strong> ({form.companyName}). Our enterprise learning director will contact you within 2 hours with customized group pricing.
              </p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <span className="section-label">REQUEST CUSTOM PROPOSAL</span>
                <h2 className="section-title">Get a Tailored Corporate Upskilling Plan</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Company / Organization Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Microsoft, Accenture"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Name & Designation *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Priya Nair (HR Director)"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Corporate Work Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="priya@company.com"
                      value={form.workEmail}
                      onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Direct Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="+1 (555) 019-2834 / +91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Target Team Size</label>
                    <select
                      className="form-input"
                      value={form.teamSize}
                      onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                    >
                      <option value="5-10 seats">5 - 10 Seats</option>
                      <option value="10-25 seats">10 - 25 Seats (15% OFF)</option>
                      <option value="25-50 seats">25 - 50 Seats (25% OFF)</option>
                      <option value="50+ seats">50+ Enterprise Seats (35% OFF)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Primary Courses Needed</label>
                    <select
                      className="form-input"
                      value={form.coursesInterested}
                      onChange={(e) => setForm({ ...form, coursesInterested: e.target.value })}
                    >
                      <option value="PMP® & Agile SAFe®">PMP® & Agile SAFe®</option>
                      <option value="Certified ScrumMaster (CSM)">Certified ScrumMaster (CSM)</option>
                      <option value="AWS & Cloud Architecture">AWS & Cloud Architecture</option>
                      <option value="ITIL® 4 Foundation">ITIL® 4 Foundation</option>
                      <option value="All Courses Suite">Full Enterprise Suite</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Specific Training Dates or Custom Requirements</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="Tell us about preferred training schedules, private batch requirements, or internal tools."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: '1rem' }}>
                  Submit Corporate Proposal Request
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
