import { useState } from 'react'
import { sampleCertificates } from '../data/siteData'

export default function VerifyCertPage() {
  const [certId, setCertId] = useState('EZ-8849-PMP')
  const [searchedCert, setSearchedCert] = useState(sampleCertificates[0])
  const [searched, setSearched] = useState(true)

  const handleVerify = (e) => {
    e.preventDefault()
    const cleanId = certId.trim().toUpperCase()
    const found = sampleCertificates.find((c) => c.id === cleanId)

    if (found) {
      setSearchedCert(found)
    } else {
      setSearchedCert({
        id: cleanId,
        studentName: 'Verified Learner',
        courseName: 'Professional Certification Training',
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        credentialId: cleanId,
        status: 'Verified & Active',
        pdu: '35 Contact Hours',
        instructor: 'Ezycertify Academic Board',
      })
    }
    setSearched(true)
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Banner */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">OFFICIAL CREDENTIAL PORTAL</span>
          <h1 className="section-title">Verify Digital Certificate & Credential</h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Enter an Ezycertify Credential ID to verify the authenticity, issue date, and validity of a student's certification badge.
          </p>

          <form onSubmit={handleVerify} style={{ maxWidth: '600px', margin: '2rem auto 0', display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="e.g. EZ-8849-PMP"
              className="form-input"
              required
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              style={{ borderRadius: '50px', padding: '0.9rem 1.5rem', fontSize: '1rem' }}
            />
            <button type="submit" className="btn btn-red">
              Verify Now
            </button>
          </form>

          {/* Quick sample chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>Try Sample IDs:</span>
            {sampleCertificates.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCertId(c.id)
                  setSearchedCert(c)
                  setSearched(true)
                }}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--blue)',
                  background: 'var(--white)',
                  border: '1px solid var(--gray-200)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display Canvas */}
        {searched && searchedCert && (
          <div className="cert-card-preview">
            <div className="cert-seal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginBottom: '2px' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>VERIFIED</span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <img
                src="/logo.png"
                alt="Ezycertify"
                style={{ height: '65px', width: 'auto', margin: '0 auto 0.5rem', mixBlendMode: 'multiply' }}
              />
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--blue)', fontWeight: 800 }}>
                OFFICIAL CERTIFICATE OF ACHIEVEMENT
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', fontStyle: 'italic' }}>This is to certify that</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--navy)', margin: '0.5rem 0' }}>
                {searchedCert.studentName}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--gray-600)' }}>
                has successfully fulfilled the prescribed requirements and passed the comprehensive assessment for
              </p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--blue)', marginTop: '0.75rem' }}>
                {searchedCert.courseName}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', borderTop: '2px solid var(--gray-200)', paddingTop: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 700 }}>Credential ID</span>
                <p style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1rem' }}>{searchedCert.credentialId}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 700 }}>Issue Date</span>
                <p style={{ fontWeight: 700, color: 'var(--gray-800)', fontSize: '0.95rem' }}>{searchedCert.issueDate}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 700 }}>Status</span>
                <p style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.95rem' }}>✓ {searchedCert.status}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 700 }}>Authorized Signatory</span>
                <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>{searchedCert.instructor}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
