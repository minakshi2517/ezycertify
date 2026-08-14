import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { courses } from '../data/siteData'

export function CourseCard({ course }) {
  const { t, tr } = useApp()

  const handleImageError = (e) => {
    e.target.onerror = null
    if (course.id === 'csm') e.target.src = '/courses/csm.svg'
    else if (course.id === 'safe-agilist') e.target.src = '/courses/safe.svg'
    else if (course.id === 'cspo') e.target.src = '/courses/cspo.svg'
    else if (course.id === 'pmi-acp') e.target.src = '/courses/pmi-acp.svg'
    else if (course.id === 'pmi-pba') e.target.src = '/courses/pmi-pba.svg'
    else if (course.id === 'pgmp') e.target.src = '/courses/pgmp.svg'
    else if (course.id === 'itil4') e.target.src = '/courses/itil.svg'
    else if (course.id === 'aws-sa') e.target.src = '/courses/aws.svg'
    else e.target.src = '/courses/pmp.svg'
  }

  return (
    <div className="course-card">
      <div className="course-card-img">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          onError={handleImageError}
        />
        <span className="course-card-badge">{course.badge}</span>
      </div>
      <div className="course-card-body">
        <h3 className="course-card-title">{tr(course.title) || course.shortTitle}</h3>
        <p className="course-card-desc">{course.description}</p>
        <div className="course-card-meta" style={{ alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0074e4', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: '#eff6ff', padding: '0.35rem 0.85rem', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0074e4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{course.duration || 'Live Virtual Cohort'}</span>
          </span>
          <Link to={`/courses/${course.slug}`} className="btn btn-blue btn-sm">
            {t.courses?.viewDetails || 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CoursesSection({ limit = 6 }) {
  const { t } = useApp()
  const displayCourses = courses.slice(0, limit)

  return (
    <section className="section">
      <div className="container">
        <div className="courses-container-box">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span className="section-label">{t.courses?.label || 'GLOBALLY ACCREDITED CURRICULUM'}</span>
              <h2 className="section-title">{t.courses?.title || 'Popular Certification Programs'}</h2>
              <p className="section-lead">
                {t.courses?.lead || 'Accelerate your career with globally accredited PMP®, Scrum Alliance CSM®, Scaled Agile SAFe® 6.0, and PMI-ACP® training programs designed for practical skills and first-attempt exam success.'}
              </p>
            </div>
            <Link to="/courses" className="btn btn-red">
              {t.courses?.viewAll || 'VIEW ALL COURSES'}
            </Link>
          </div>

          <div className="courses-grid">
            {displayCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
