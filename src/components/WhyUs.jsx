export default function WhyUs() {
  const whyPoints = [
    {
      title: 'Industry Expert Mentors',
      desc: 'Learn directly from certified trainers with 15+ years of active project management and Agile execution experience.',
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
    {
      title: 'Flexible Live & Self-Paced Options',
      desc: 'Join weekend live virtual classes or access on-demand video learning anytime with lifetime platform access.',
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: 'PMI & Scrum Application Support',
      desc: 'Step-by-step assistance in writing project descriptions to ensure 100% application approval without audit stress.',
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      title: 'Career Advancement & Networking',
      desc: 'Join a global community of 4,000+ certified leaders across Fortune 500 organizations.',
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: '24x7 Learner Support',
      desc: 'Dedicated mentor assistance round-the-clock for mock test review and doubt clearing.',
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="section" id="why">
      <div className="container">
        <div className="why-us-box">
          <div className="why-grid">
            <div>
              <span className="section-label">MAKING CERTIFICATION EASY</span>
              <h2 className="section-title">Why Choose Ezycertify ?</h2>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--gray-600)',
                background: 'var(--gray-50)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-200)'
              }}>
                At Ezycertify, we make professional credentials accessible and stress-free. Partnered with PMI, Scrum Alliance, Scaled Agile (SAFe), and PeopleCert, our Ezycertify masterclass training combines comprehensive question banks, simulated mock exams, and personalized application support so you pass on your very first try.
              </p>
            </div>

            <div>
              {whyPoints.map((pt, idx) => (
                <div key={idx} className="why-card">
                  <div className="why-icon-static">
                    {pt.iconSvg}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>
                      {pt.title}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
