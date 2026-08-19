import { useState } from 'react'
import { US_ADDRESS, NIGERIA_ADDRESS, PHONE_NUMBER, EMAIL_ADDRESS, courses, partnerLogos } from '../data/siteData'
import { globalCountryCodes } from '../data/countryData'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    course: '',
    otherCourse: '',
    message: '',
  })

  const activeCountry = globalCountryCodes.find((c) => c.code === form.countryCode) || globalCountryCodes[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.course) return
    if (form.course === 'Other' && !form.otherCourse.trim()) return

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', countryCode: '+1', phone: '', course: '', otherCourse: '', message: '' })
    }, 3500)
  }

  const displayCourseName = form.course === 'Other' ? form.otherCourse : form.course

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Banner Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">GLOBAL LEARNER SUPPORT</span>
          <h1 className="section-title">We'd Love to Hear From You</h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Have questions about global virtual cohorts, accredited training, or application approval support? Contact Ezycertify advisors today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
          {/* Contact Details Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'var(--white)', padding: '1.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div className="why-icon-static">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>🇺🇸 USA Office</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{US_ADDRESS}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--white)', padding: '1.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div className="why-icon-static">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>🇳🇬 Nigeria Office</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{NIGERIA_ADDRESS}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--white)', padding: '1.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div className="why-icon-static">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>Contact Helpline</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--blue)', fontWeight: 700, marginTop: '0.2rem' }}>{PHONE_NUMBER}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--white)', padding: '1.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div className="why-icon-static">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>Email Inquiry</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--blue)', fontWeight: 700, marginTop: '0.2rem' }}>{EMAIL_ADDRESS}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--navy)', color: 'var(--white)', padding: '1.75rem', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.5rem' }}>Global Virtual Cohorts</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>Americas, EMEA, APAC Timezone Cohorts Available</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '0.3rem' }}>24x7 Academic Support & Exam Application Approval Guidance</p>
            </div>
          </div>

          {/* Interactive Form */}
          <div style={{ background: 'var(--white)', padding: '3rem 2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-md)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)' }}>Inquiry Received!</h3>
                <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  Thank you for reaching out, <strong>{form.name}</strong>. An Ezycertify global academic counselor will contact you at <strong>{form.countryCode} {form.phone}</strong> regarding <strong>{displayCourseName}</strong> shortly.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  Send Us an Inquiry
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '2rem' }}>
                  Select your desired accredited course and submit your contact information.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="alex.johnson@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select
                        className="form-input"
                        style={{ width: '100px', flexShrink: 0, paddingLeft: '0.4rem', paddingRight: '0.1rem', fontSize: '0.85rem', fontWeight: 600 }}
                        value={form.countryCode}
                        onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                      >
                        {globalCountryCodes.map((c, i) => (
                          <option key={i} value={c.code}>
                            {c.flag} {c.code} ({c.name})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        className="form-input"
                        required
                        placeholder={activeCountry.placeholder}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Course Interested In *</label>
                    <select
                      className="form-input"
                      required
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      style={{ fontSize: '0.88rem', fontWeight: form.course ? 600 : 400 }}
                    >
                      <option value="" disabled>-- Choose your course * --</option>
                      {partnerLogos.map((provider) => {
                        const providerCourses = courses.filter((c) => c.providerId === provider.id)
                        return (
                          <optgroup key={provider.id} label={`--- ${provider.name} ---`}>
                            {providerCourses.map((c) => (
                              <option key={c.id} value={c.title}>
                                {c.title}
                              </option>
                            ))}
                          </optgroup>
                        )
                      })}
                      <option value="Other" style={{ fontWeight: 800, color: 'var(--blue)' }}>✏️ Other (Specify course manually below)</option>
                    </select>

                    {/* Dynamic Manual Course Input if 'Other' is selected */}
                    {form.course === 'Other' && (
                      <div style={{ marginTop: '0.85rem' }}>
                        <label style={{ fontSize: '0.84rem', color: 'var(--blue)', fontWeight: 700, marginBottom: '0.35rem', display: 'block' }}>
                          Specify Course Name *
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          required
                          placeholder="Enter the course or certification you are looking for..."
                          value={form.otherCourse}
                          onChange={(e) => setForm({ ...form, otherCourse: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Message / Career Goals (Optional)</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      placeholder="Share your current career background or exam timeframe..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: '1rem' }}>
                    Submit Global Inquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div style={{
          background: 'var(--white)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="section-label">VISIT OUR OFFICES</span>
            <h2 className="section-title" style={{ fontSize: '1.85rem' }}>Global Office Locations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ background: 'var(--gray-50)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '0.35rem', fontSize: '1rem' }}>🇺🇸 USA Office</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{US_ADDRESS}</p>
              </div>
              <div style={{ background: 'var(--gray-50)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '0.35rem', fontSize: '1rem' }}>🇳🇬 Nigeria Office</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{NIGERIA_ADDRESS}</p>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: '400px', border: '1px solid var(--gray-200)' }}>
            <iframe
              title="Ezycertify Office Map Location"
              src="https://maps.google.com/maps?q=217+N+5th+Street,+Brainerd,+MN+56401&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
