import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pmpSampleQuiz } from '../data/siteData'

export default function FreePracticeTestPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let totalScore = 0
    pmpSampleQuiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        totalScore += 1
      }
    })
    setScore(totalScore)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '5rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">FREE PMP® EXAM SIMULATOR</span>
          <h1 className="section-title">Test Your Readiness with Free Practice Questions</h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Experience real-time PMP® exam simulator questions mapped to the latest PMBOK® 7th Edition & Exam Content Outline (ECO).
          </p>
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            {pmpSampleQuiz.map((q, idx) => {
              const isSelected = selectedAnswers[q.id] !== undefined
              const selectedIdx = selectedAnswers[q.id]
              const isCorrect = selectedIdx === q.correctAnswer

              return (
                <div
                  key={q.id}
                  style={{
                    background: 'var(--white)',
                    padding: '2rem 2.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--gray-200)',
                    boxShadow: 'var(--shadow-sm)',
                    marginBottom: '2rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--blue)', background: 'var(--blue-light)', padding: '0.25rem 0.7rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                      Question {idx + 1} of {pmpSampleQuiz.length}
                    </span>
                    {submitted && (
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isCorrect ? '#16a34a' : '#dc2626' }}>
                        {isCorrect ? '✓ Correct Answer' : '✕ Incorrect'}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {q.question}
                  </h3>

                  <div style={{ display: 'grid', gap: '0.85rem' }}>
                    {q.options.map((opt, optIdx) => {
                      let btnBg = 'var(--gray-50)'
                      let btnBorder = 'var(--gray-200)'
                      let textColor = 'var(--gray-800)'

                      if (selectedIdx === optIdx) {
                        btnBg = '#e0f2fe'
                        btnBorder = 'var(--blue)'
                        textColor = 'var(--navy)'
                      }

                      if (submitted) {
                        if (optIdx === q.correctAnswer) {
                          btnBg = '#dcfce7'
                          btnBorder = '#16a34a'
                          textColor = '#14532d'
                        } else if (selectedIdx === optIdx && optIdx !== q.correctAnswer) {
                          btnBg = '#fee2e2'
                          btnBorder = '#dc2626'
                          textColor = '#7f1d1d'
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={submitted}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            padding: '1rem 1.25rem',
                            background: btnBg,
                            border: `1.5px solid ${btnBorder}`,
                            borderRadius: 'var(--radius-sm)',
                            color: textColor,
                            textAlign: 'left',
                            fontSize: '0.95rem',
                            fontWeight: selectedIdx === optIdx ? 700 : 500,
                            cursor: submitted ? 'default' : 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: selectedIdx === optIdx ? 'var(--blue)' : 'var(--white)',
                            color: selectedIdx === optIdx ? 'var(--white)' : 'var(--gray-600)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: '1px solid var(--gray-300)',
                            flexShrink: 0
                          }}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>

                  {submitted && (
                    <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: '#f8fafc', borderLeft: '4px solid var(--blue)', borderRadius: '4px', fontSize: '0.9rem', color: 'var(--gray-700)', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--navy)' }}>Explanation: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              )
            })}

            {!submitted ? (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  type="submit"
                  className="btn btn-red btn-lg"
                  disabled={Object.keys(selectedAnswers).length < pmpSampleQuiz.length}
                  style={{ opacity: Object.keys(selectedAnswers).length < pmpSampleQuiz.length ? 0.6 : 1 }}
                >
                  Submit & Calculate My Score
                </button>
              </div>
            ) : (
              <div style={{
                background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
                color: 'var(--white)',
                padding: '3rem 2.5rem',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  SIMULATOR RESULT REPORT
                </span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0.75rem 0' }}>
                  Your Score: {score} / {pmpSampleQuiz.length} (Math.round((score / pmpSampleQuiz.length) * 100)%)
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  {score === pmpSampleQuiz.length
                    ? 'Excellent readiness! You are fully prepared to tackle the PMP® exam with confidence.'
                    : 'Good attempt! To reach 99.2% first-attempt pass guarantee, enroll in Ezycertify’s 35 contact hour PMP bootcamp.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/courses/pmp-certification" className="btn btn-red">
                    Enroll in PMP® Bootcamp
                  </Link>
                  <button type="button" onClick={handleReset} className="btn btn-outline-white">
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
