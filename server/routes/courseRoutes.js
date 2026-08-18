import { Router } from 'express'
import { db } from '../db/database.js'
import { authMiddleware, optionalAuthMiddleware } from '../services/sessionService.js'

const router = Router()

// 1. GET ALL ACTIVE COURSES
router.get('/courses', (req, res) => {
  try {
    const coursesList = db.prepare("SELECT * FROM courses WHERE status = 'active'").all()
    res.json({ success: true, count: coursesList.length, courses: coursesList })
  } catch (err) {
    console.error('Courses fetch error:', err.message)
    res.status(500).json({ error: 'Could not fetch courses list.' })
  }
})

// 2. GET COURSE BY SLUG
router.get('/courses/:slug', (req, res) => {
  try {
    const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug)
    if (!course) return res.status(404).json({ error: 'Course not found.' })
    res.json({ success: true, course })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch course details.' })
  }
})

// 3. CHECK COURSE ACCESS FOR USER
router.get('/courses/:id/access', optionalAuthMiddleware, (req, res) => {
  try {
    const courseId = req.params.id
    if (!req.user) {
      return res.json({ hasAccess: false, reason: 'unauthenticated' })
    }

    // Check if user has active enrollment
    const enrollment = db.prepare(`
      SELECT * FROM enrollments
      WHERE (user_id = ? OR student_email = ?)
        AND (course_id = ? OR course_id LIKE ?)
        AND payment_status = 'paid'
        AND access_status = 'granted'
      LIMIT 1
    `).get(req.user.id, req.user.email, courseId, `%${courseId}%`)

    if (enrollment) {
      return res.json({ hasAccess: true, enrollment })
    }

    res.json({ hasAccess: false, reason: 'not_enrolled' })
  } catch (err) {
    res.status(500).json({ error: 'Could not verify course access.' })
  }
})

// 4. GET MY ENROLLED COURSES
router.get('/user/enrollments', authMiddleware, (req, res) => {
  try {
    const enrollments = db.prepare(`
      SELECT e.*, c.title as course_title, c.slug as course_slug, c.badge as course_badge, c.provider_id
      FROM enrollments e
      LEFT JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ? OR e.student_email = ?
      ORDER BY e.purchased_at DESC
    `).all(req.user.id, req.user.email)

    res.json({ success: true, enrollments })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch user enrollments.' })
  }
})

export default router
