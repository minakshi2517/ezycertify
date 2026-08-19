import { Router } from 'express'
import { db } from '../db/database.js'
import { adminMiddleware } from '../services/sessionService.js'

const router = Router()

// Enforce admin role for all admin routes
router.use(adminMiddleware)

// 1. OVERVIEW STATS
router.get('/overview', (req, res) => {
  try {
    const totalUsers = db.prepare('SELECT COUNT(*) as c FROM users').get().c
    const verifiedUsers = db.prepare('SELECT COUNT(*) as c FROM users WHERE email_verified = 1 OR phone_verified = 1').get().c
    const unverifiedUsers = totalUsers - verifiedUsers

    const totalCourses = db.prepare('SELECT COUNT(*) as c FROM courses').get().c
    const totalEnrollments = db.prepare("SELECT COUNT(*) as c FROM enrollments WHERE payment_status = 'paid'").get().c

    const paymentsStats = db.prepare(`
      SELECT 
        COUNT(*) as total_count,
        SUM(CASE WHEN status = 'captured' THEN 1 ELSE 0 END) as captured_count,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_count,
        SUM(CASE WHEN status = 'created' THEN 1 ELSE 0 END) as pending_count,
        SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END) as refunded_count,
        SUM(CASE WHEN status = 'captured' THEN amount ELSE 0 END) as total_revenue
      FROM payments
    `).get()

    res.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          verified: verifiedUsers,
          unverified: unverifiedUsers,
        },
        courses: {
          total: totalCourses,
        },
        enrollments: {
          total: totalEnrollments,
        },
        payments: {
          totalCount: paymentsStats.total_count || 0,
          captured: paymentsStats.captured_count || 0,
          failed: paymentsStats.failed_count || 0,
          pending: paymentsStats.pending_count || 0,
          refunded: paymentsStats.refunded_count || 0,
          totalRevenue: paymentsStats.total_revenue || 0,
        },
      },
    })
  } catch (err) {
    console.error('Admin overview error:', err.message)
    res.status(500).json({ error: 'Could not fetch admin overview statistics.' })
  }
})

// 2. USERS LIST
router.get('/users', (req, res) => {
  try {
    const users = db.prepare(`
      SELECT id, name, email, phone, email_verified, phone_verified, two_factor_enabled, role, created_at, updated_at, last_login
      FROM users
      ORDER BY created_at DESC
    `).all()

    res.json({ success: true, count: users.length, users })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch users list.' })
  }
})

// 3. COURSES LIST WITH ENROLLMENT COUNTS
router.get('/courses', (req, res) => {
  try {
    const courses = db.prepare(`
      SELECT c.*, COUNT(e.id) as enrolled_students
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id AND e.payment_status = 'paid'
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).all()

    res.json({ success: true, count: courses.length, courses })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch courses list.' })
  }
})

// 4. CREATE NEW COURSE (Admin)
router.post('/courses', (req, res) => {
  try {
    const { title, short_title, provider_id, category, price_usd, duration, description, badge } = req.body
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Course title is required.' })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const id = `course_${Date.now()}`
    const now = new Date().toISOString()

    db.prepare(`
      INSERT INTO courses (id, slug, title, short_title, provider_id, category, badge, description, price_usd, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)
    `).run(
      id,
      slug,
      title.trim(),
      short_title || title.trim(),
      provider_id || 'Ezycertify',
      category || 'Certifications',
      badge || 'Popular',
      description || '',
      Number(price_usd) || 499,
      now,
      now
    )

    const created = db.prepare('SELECT * FROM courses WHERE id = ?').get(id)
    res.json({ success: true, message: 'Course created successfully.', course: created })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create course.' })
  }
})

// 5. DELETE COURSE (Admin)
router.delete('/courses/:id', (req, res) => {
  try {
    const { id } = req.params
    db.prepare('DELETE FROM courses WHERE id = ?').run(id)
    res.json({ success: true, message: 'Course deleted successfully.' })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete course.' })
  }
})

// 6. PAYMENTS LIST
router.get('/payments', (req, res) => {
  try {
    const payments = db.prepare(`
      SELECT p.*, u.name as user_name, u.email as user_email, c.title as course_title
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN courses c ON p.course_id = c.id
      ORDER BY p.created_at DESC
    `).all()

    res.json({ success: true, count: payments.length, payments })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch payments list.' })
  }
})

// 7. ENROLLMENTS LIST
router.get('/enrollments', (req, res) => {
  try {
    const enrollments = db.prepare(`
      SELECT e.*, u.name as registered_user_name, u.email as registered_user_email, c.title as course_title
      FROM enrollments e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN courses c ON e.course_id = c.id
      ORDER BY e.purchased_at DESC
    `).all()

    res.json({ success: true, count: enrollments.length, enrollments })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch enrollments list.' })
  }
})

// 8. TOGGLE ENROLLMENT ACCESS STATUS (Grant / Revoke)
router.patch('/enrollments/:id/access', (req, res) => {
  try {
    const { id } = req.params
    const { access_status } = req.body

    if (!['granted', 'revoked'].includes(access_status)) {
      return res.status(400).json({ error: 'Status must be granted or revoked.' })
    }

    const now = new Date().toISOString()
    const info = db.prepare(`
      UPDATE enrollments
      SET access_status = ?, updated_at = ?
      WHERE id = ?
    `).run(access_status, now, id)

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Enrollment not found.' })
    }

    res.json({ success: true, id, access_status })
  } catch (err) {
    res.status(500).json({ error: 'Could not update enrollment access.' })
  }
})

export default router
