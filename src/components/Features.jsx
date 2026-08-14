export default function Features() {
  const keyFeatures = [
    '35+ Hours of Live Virtual Learning & 35 PDU Certificate',
    '2500+ Practice Exam Questions & 8 Full-Length Mock Exams',
    'Coverage of 3 PMI ECO Domains: People (42%), Process (50%), Business Environment (8%)',
    'Step-by-Step PMP® Application Approval Support & Audit Mentorship',
    'Lifetime Access to Learning Portal, Video Recordings & PMBOK® 7th Ed. Notes',
    'Dedicated 1-on-1 Mentor Doubt Clearing & Exam Strategy Support',
  ]

  const keySkills = [
    'Agile & Hybrid Project Lifecycle Management',
    'Work Breakdown Structure (WBS), Schedule Baseline & EVM',
    'Risk Management, Decision Trees & Contingency Reserve',
    'Stakeholder Alignment, Conflict Resolution & Negotiation',
    'Servant Leadership, Team Coaching & Motivation',
    'Project Governance & Organizational Alignment',
  ]

  return (
    <>
      {/* 3 Pillars Banner */}
      <section className="pillars-section">
        <div className="container">
          <div className="pillars-grid">
            <div className="pillar-card">
              <h3 className="pillar-title">Proven Curriculum</h3>
              <p className="pillar-desc">
                Leverage Ezycertify proprietary study materials, ECO domain breakdowns, and 2500+ practice questions designed to help you pass on your first attempt.
              </p>
            </div>
            <div className="pillar-card">
              <h3 className="pillar-title">Expert-Led Coaching</h3>
              <p className="pillar-desc">
                Learn directly from Certified Scrum Trainers (CST®), SAFe Practice Consultants (SPCs), and PMP mentors with 15+ years of real-world industry experience.
              </p>
            </div>
            <div className="pillar-card">
              <h3 className="pillar-title">Global Credential Value</h3>
              <p className="pillar-desc">
                Achieve globally recognized PMI, Scrum Alliance, SAFe®, and PeopleCert certifications that boost salary, credibility, and global career opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features & Skills */}
      <section className="section">
        <div className="container">
          <div className="features-section-box">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '1rem' }}>
              <div>
                <span className="section-label">PMP® TRAINING EXCELLENCE</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>PMP Training Key Features</h2>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '50px',
                padding: '0.5rem 1.25rem',
                color: 'var(--red)',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                <span>🛡️</span>
                <span>100% Money-Back Guarantee Support</span>
              </div>
            </div>

            <div className="features-check-grid" style={{ marginBottom: '3rem' }}>
              {keyFeatures.map((feat, idx) => (
                <div key={idx} className="check-item-card">
                  <div className="check-icon-circle">✓</div>
                  <p style={{ fontWeight: 500, color: 'var(--gray-800)', fontSize: '0.95rem' }}>{feat}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1.5rem' }}>
              Key Skills You'll Gain
            </h3>

            <div className="features-check-grid">
              {keySkills.map((skill, idx) => (
                <div key={idx} className="check-item-card">
                  <div className="check-icon-circle" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>🚀</div>
                  <p style={{ fontWeight: 500, color: 'var(--gray-800)', fontSize: '0.95rem' }}>{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
