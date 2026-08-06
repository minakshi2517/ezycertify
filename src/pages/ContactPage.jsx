import { useState } from 'react'
import { ADDRESS_TEXT, PHONE_NUMBER, EMAIL_ADDRESS } from '../data/siteData'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: 'PMP® Certification', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', phone: '', course: 'PMP® Certification', message: '' })
    }, 3000)
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Banner Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">GET IN TOUCH</span>
          <h1 className="section-title">We'd Love to Hear From You</h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Have questions about course fees, batch schedules, or PMP application approval support? Contact Ezycertify advisors today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
          {/* Contact Details Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div className="why-icon-static">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>Headquarters Address</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{ADDRESS_TEXT}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div className="why-icon-static">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)' }}>Phone & WhatsApp</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--blue)', fontWeight: 700, marginTop: '0.2rem' }}>{PHONE_NUMBER}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div className="why-icon-static">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)' }}>Email Inquiry</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--blue)', fontWeight: 700, marginTop: '0.2rem' }}>{EMAIL_ADDRESS}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--navy)', color: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.5rem' }}>Operating Hours</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '0.3rem' }}>24x7 Support Available for Enrolled Students</p>
            </div>
          </div>

          {/* Interactive Form */}
          <div style={{ background: 'var(--white)', padding: '3rem 2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-md)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)' }}>Message Received!</h3>
                <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>
                  Thank you for reaching out, <strong>{form.name}</strong>. Our counselor will respond within 2 hours.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  Send Us a Message
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '2rem' }}>
                  Fill out the form below and an Ezycertify counselor will call or email you back promptly.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Rahul Sharma"
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
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Course Interested In</label>
                    <select
                      className="form-input"
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                    >
                      <option value="PMP® Certification">PMP® Certification</option>
                      <option value="Certified ScrumMaster (CSM)">Certified ScrumMaster (CSM)</option>
                      <option value="Leading SAFe 6.0">Leading SAFe 6.0</option>
                      <option value="PMI-ACP® Agile">PMI-ACP® Agile</option>
                      <option value="PMI-PBA® Business Analysis">PMI-PBA® Business Analysis</option>
                      <option value="ITIL® 4 Foundation">ITIL® 4 Foundation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message / Question</label>
                    <textarea
                      className="form-input"
                      rows="4"
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: '1rem' }}>
                    Submit Inquiry
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
            <span className="section-label">VISIT OUR ACADEMY</span>
            <h2 className="section-title" style={{ fontSize: '1.85rem' }}>Our Headquarters Location</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>
              Shagun Arcade, Near Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh 452010
            </p>
          </div>

          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: '420px', border: '1px solid var(--gray-200)' }}>
            <iframe
              title="Ezycertify HQ Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5244589201944!2d75.89279097589947!3d22.7458933266008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd56f4d2f099%3A0xb366b5952fdf3d15!2sShagun%20Arcade%2C%20Vijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
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
