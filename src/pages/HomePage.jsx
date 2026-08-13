import Hero from '../components/Hero'
import Partners from '../components/Partners'
import CoursesSection from '../components/CoursesSection'
import CareerQuiz from '../components/CareerQuiz'
import GlobalBatchSchedule from '../components/GlobalBatchSchedule'
import Features from '../components/Features'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <CoursesSection limit={6} />
      
      <div className="container">
        {/* Career Pathway Wizard */}
        <CareerQuiz />
      </div>

      <GlobalBatchSchedule />

      {/* Enterprise & Corporate Teaser Banner */}
      <section className="section" style={{ background: 'var(--white)', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
            color: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 3rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                FOR BUSINESS & CORPORATES
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>
                Upskill Your Team with Custom Enterprise Cohorts
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '600px' }}>
                Bulk seat discounts up to 35% OFF, private schedule cohorts, and enterprise LMS progress tracking dashboard.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/enterprise" className="btn btn-red">
                Explore Enterprise Solutions
              </Link>
              <Link to="/free-practice-test" className="btn btn-outline-white">
                Try Free PMP® Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <WhyUs />
      <Testimonials />
    </>
  )
}
