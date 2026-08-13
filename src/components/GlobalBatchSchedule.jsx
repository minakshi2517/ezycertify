import { useState } from 'react'
import { courses, globalTimezones } from '../data/siteData'

export default function GlobalBatchSchedule() {
  const [selectedTimezone, setSelectedTimezone] = useState('IN-IST')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [reservedCourse, setReservedCourse] = useState(null)
  const [reservedSuccess, setReservedSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const filteredCourses = courses.filter(c => {
    if (selectedFilter === 'Weekend') return c.nextBatch.toLowerCase().includes('weekend') || c.nextBatch.toLowerCase().includes('sat') || c.nextBatch.toLowerCase().includes('sun')
    if (selectedFilter === 'Weekday') return c.nextBatch.toLowerCase().includes('weekday') || c.nextBatch.toLowerCase().includes('live')
    return true
  })

  const handleReserve = (e) => {
    e.preventDefault()
    setReservedSuccess(true)
    setTimeout(() => {
      setReservedSuccess(false)
      setReservedCourse(null)
      setForm({ name: '', email: '', phone: '' })
    }, 2500)
  }

  return (
    <section className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-label">GLOBAL LIVE VIRTUAL CLASSROOMS</span>
          <h2 className="section-title">Upcoming Live Training Batches</h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Select your local timezone and preferred schedule to view guaranteed live virtual cohorts led by certified CST®, SPC®, and PMI Authorized trainers.
          </p>

          {/* Timezone & Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--white)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)' }}>🌐 Select Timezone:</span>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontWeight: 700, color: 'var(--blue)', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}
              >
                {globalTimezones.map(tz => (
                  <option key={tz.code} value={tz.code}>{tz.label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--white)', padding: '0.25rem', borderRadius: '50px', border: '1px solid var(--gray-200)' }}>
              {['All', 'Weekend', 'Weekday'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedFilter(type)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: 'none',
                    background: selectedFilter === type ? 'var(--navy)' : 'transparent',
                    color: selectedFilter === type ? 'var(--white)' : 'var(--gray-600)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type} Batches
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Batches Table Grid */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--navy)', color: 'var(--white)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Course Program</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Next Upcoming Batch</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Format & Duration</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c, idx) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--gray-200)', background: idx % 2 === 0 ? 'var(--white)' : 'var(--gray-50)' }}>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1rem' }}>{c.shortTitle}</div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>{c.category}</span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--blue)', fontSize: '0.95rem' }}>{c.nextBatch}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {globalTimezones.find(tz => tz.code === selectedTimezone)?.label.split('(')[0]}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.9rem', color: 'var(--gray-700)', fontWeight: 600 }}>
                      {c.duration}
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '0.25rem 0.65rem', borderRadius: '50px', textTransform: 'uppercase', display: 'inline-block' }}>
                        ✓ Guaranteed to Run
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <button
                        onClick={() => setReservedCourse(c)}
                        className="btn btn-red btn-sm"
                      >
                        Reserve Seat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {reservedCourse && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
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
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <button
              onClick={() => setReservedCourse(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem', cursor: 'pointer', border: 'none', background: 'none' }}
            >
              ✕
            </button>

            {reservedSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>Seat Reserved!</h3>
                <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>
                  Thank you, <strong>{form.name}</strong>. Your seat for <strong>{reservedCourse.shortTitle}</strong> has been provisionally reserved. An advisor will contact you with cohort details.
                </p>
              </div>
            ) : (
              <>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  INSTANT COHORT RESERVATION
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: '0.4rem 0 0.2rem' }}>
                  {reservedCourse.shortTitle}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                  Batch: {reservedCourse.nextBatch} ({globalTimezones.find(tz => tz.code === selectedTimezone)?.code})
                </p>

                <form onSubmit={handleReserve}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Your full name"
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
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="+1 / +91 number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: '1rem' }}>
                    Confirm Provisional Seat
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
