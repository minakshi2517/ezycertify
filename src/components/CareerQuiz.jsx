import { useState } from 'react'
import { Link } from 'react-router-dom'
import { careerPathQuizQuestions, courses } from '../data/siteData'

export default function CareerQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [recommendedCourse, setRecommendedCourse] = useState(null)

  const handleSelectOption = (path) => {
    const updated = [...answers, path]
    setAnswers(updated)

    if (currentStep < careerPathQuizQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate recommendation
      const pmpCount = updated.filter(a => a === 'pmp').length
      const csmCount = updated.filter(a => a === 'csm').length
      const safeCount = updated.filter(a => a === 'safe-agilist').length

      let recId = 'pmp'
      if (csmCount > pmpCount && csmCount >= safeCount) recId = 'csm'
      else if (safeCount > pmpCount) recId = 'safe-agilist'
      else if (updated.includes('cspo')) recId = 'cspo'

      const found = courses.find(c => c.id === recId) || courses[0]
      setRecommendedCourse(found)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers([])
    setRecommendedCourse(null)
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
      color: 'var(--white)',
      padding: '3.5rem 2.5rem',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      margin: '3rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
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
          marginBottom: '1rem'
        }}>
          INTELLIGENT CAREER PATHWAY FINDER
        </span>

        {!recommendedCourse ? (
          <>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Which Certification Fits Your Career Goals Best?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.98rem', marginBottom: '2.25rem' }}>
              Answer 2 quick questions to get personalized course recommendation and roadmap.
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius)',
              padding: '2.25rem 2rem',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Question {currentStep + 1} of {careerPathQuizQuestions.length}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)', marginBottom: '1.5rem' }}>
                {careerPathQuizQuestions[currentStep].question}
              </h3>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {careerPathQuizQuestions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.1rem 1.4rem',
                      color: 'var(--white)',
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 116, 228, 0.35)'
                      e.currentTarget.style.borderColor = 'var(--blue)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                    }}
                  >
                    <span>{opt.label}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{
            background: 'var(--white)',
            color: 'var(--navy)',
            borderRadius: 'var(--radius)',
            padding: '2.5rem 2rem',
            textAlign: 'left',
            boxShadow: 'var(--shadow-md)'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '0.3rem 0.75rem', borderRadius: '50px', textTransform: 'uppercase' }}>
              ✓ RECOMMENDED FOR YOUR CAREER PATH
            </span>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', margin: '1rem 0 0.5rem' }}>
              {recommendedCourse.title}
            </h3>

            <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {recommendedCourse.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link to={`/courses/${recommendedCourse.slug}`} className="btn btn-red">
                Explore Course & Schedule
              </Link>
              <button
                onClick={handleReset}
                className="btn btn-outline-navy btn-sm"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
