import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { courses, formatPrice } from '../data/siteData'

export function CourseCard({ course }) {
  const { currency, currencySymbol } = useApp()

  const handleImageError = (e) => {
    e.target.onerror = null
    // Fallback to local high-res SVG banner if remote photo load fails
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
          onError={handleImageError}
        />
        <span className="course-card-badge">{course.badge}</span>
      </div>
      <div className="course-card-body">
        <h3 className="course-card-title">{course.shortTitle}</h3>
        <p className="course-card-desc">{course.description}</p>
        <div className="course-card-meta">
          <span className="course-card-price">
            {formatPrice(course.priceUSD, currency, currencySymbol)}
          </span>
          <Link to={`/courses/${course.slug}`} className="btn btn-blue btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CoursesSection({ limit = 6 }) {
  const displayCourses = courses.slice(0, limit)

  return (
    <section className="section">
      <div className="container">
        <div className="courses-container-box">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span className="section-label">IZENBRIDGE ALIGNED CURRICULUM</span>
              <h2 className="section-title">Popular Certification Programs</h2>
              <p className="section-lead">
                Accelerate your career with globally accredited PMP®, Scrum Alliance CSM®, Scaled Agile SAFe® 6.0, and PMI-ACP® training programs designed for practical skills and first-attempt exam success.
              </p>
            </div>
            <Link to="/courses" className="btn btn-red">
              VIEW ALL COURSES
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
