import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import { courses } from '../../src/data/siteData.js'

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(process.cwd(), 'server', 'data')

fs.mkdirSync(DATA_DIR, { recursive: true })

const DB_FILE = path.join(DATA_DIR, 'ezycertify.json')

class PureDatabase {
  constructor() {
    this.tables = {
      users: [],
      verifications: [],
      courses: [],
      payments: [],
      enrollments: [],
    }
    this.load()
  }

  load() {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf8')
        const data = JSON.parse(raw)
        this.tables = {
          users: data.users || [],
          verifications: data.verifications || [],
          courses: data.courses || [],
          payments: data.payments || [],
          enrollments: data.enrollments || [],
        }
      } catch (err) {
        console.error('[Database] Failed to read database JSON, initializing fresh:', err.message)
      }
    }
  }

  save() {
    try {
      const tempPath = `${DB_FILE}.${Date.now()}.tmp`
      fs.writeFileSync(tempPath, JSON.stringify(this.tables, null, 2), 'utf8')
      fs.renameSync(tempPath, DB_FILE)
    } catch (err) {
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(this.tables, null, 2), 'utf8')
      } catch (e) {
        console.error('[Database] Save failed:', e.message)
      }
    }
  }

  pragma(cmd) {
    // No-op for compatibility
  }

  exec(sql) {
    // Schema creation no-op for pure JSON store
    return this
  }

  transaction(fn) {
    return (...args) => {
      const result = fn(...args)
      this.save()
      return result
    }
  }

  prepare(sql) {
    const trimmed = sql.trim().replace(/\s+/g, ' ')
    const db = this

    return {
      run(...args) {
        return db.executeRun(trimmed, args)
      },
      get(...args) {
        const rows = db.executeQuery(trimmed, args)
        return rows.length > 0 ? rows[0] : undefined
      },
      all(...args) {
        return db.executeQuery(trimmed, args)
      },
    }
  }

  executeRun(sql, args) {
    const params = args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0])
      ? args[0]
      : args

    // 1. INSERT INTO
    const insertMatch = sql.match(/^INSERT INTO (\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i)
    if (insertMatch) {
      const table = insertMatch[1]
      const cols = insertMatch[2].split(',').map((c) => c.trim())
      const placeholders = insertMatch[3].split(',').map((p) => p.trim())

      const record = {}
      if (Array.isArray(params)) {
        let paramIdx = 0
        cols.forEach((col, idx) => {
          const p = placeholders[idx]
          if (p === '?') {
            record[col] = params[paramIdx++] !== undefined ? params[paramIdx - 1] : null
          } else if (p.startsWith("'") && p.endsWith("'")) {
            record[col] = p.slice(1, -1)
          } else if (!isNaN(p)) {
            record[col] = Number(p)
          } else {
            record[col] = params[paramIdx++] !== undefined ? params[paramIdx - 1] : null
          }
        })
      } else {
        // Named parameters (@key or :key)
        cols.forEach((col, idx) => {
          const p = placeholders[idx]
          if (p.startsWith('@') || p.startsWith(':')) {
            const key = p.replace(/^[@:]/, '')
            record[col] = params[key] !== undefined ? params[key] : null
          } else if (p.startsWith("'") && p.endsWith("'")) {
            record[col] = p.slice(1, -1)
          } else if (!isNaN(p)) {
            record[col] = Number(p)
          } else {
            record[col] = params[col] !== undefined ? params[col] : null
          }
        })
      }

      if (!this.tables[table]) this.tables[table] = []
      this.tables[table].push(record)
      this.save()
      return { changes: 1, lastInsertRowid: record.id || this.tables[table].length }
    }

    // 2. UPDATE users/verifications/enrollments/payments
    const updateMatch = sql.match(/^UPDATE (\w+)\s+SET\s+(.+?)\s+WHERE\s+(.+)$/i)
    if (updateMatch) {
      const table = updateMatch[1]
      const setClause = updateMatch[2]
      const whereClause = updateMatch[3]

      const rows = this.tables[table] || []
      let changes = 0

      // Extract set expressions
      const setPairs = setClause.split(',').map((s) => s.trim())
      const setParamCount = (setClause.match(/\?/g) || []).length

      for (const row of rows) {
        if (this.evaluateWhere(whereClause, row, params, setParamCount)) {
          changes++
          let pIdx = 0
          for (const pair of setPairs) {
            const [col, rawVal] = pair.split('=').map((s) => s.trim())
            if (rawVal === '?') {
              row[col] = params[pIdx++]
            } else if (rawVal.includes('attempts + 1')) {
              row[col] = (Number(row[col]) || 0) + 1
            } else if (rawVal.startsWith("'") && rawVal.endsWith("'")) {
              row[col] = rawVal.slice(1, -1)
            } else if (!isNaN(rawVal)) {
              row[col] = Number(rawVal)
            } else {
              row[col] = params[pIdx++]
            }
          }
        }
      }

      if (changes > 0) this.save()
      return { changes }
    }

    return { changes: 0 }
  }

  executeQuery(sql, args) {
    const params = args

    // 1. COUNT queries
    if (/^SELECT COUNT\(\*\)\s+as\s+(\w+)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i.test(sql)) {
      const match = sql.match(/^SELECT COUNT\(\*\)\s+as\s+(\w+)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i)
      const alias = match[1]
      const table = match[2]
      const where = match[3]

      let rows = this.tables[table] || []
      if (where) {
        rows = rows.filter((r) => this.evaluateWhere(where, r, params, 0))
      }
      return [{ [alias]: rows.length }]
    }

    // 2. Payments aggregate revenue query
    if (sql.includes('COUNT(*) as total_count') && sql.includes('FROM payments')) {
      const payments = this.tables.payments || []
      const captured = payments.filter((p) => p.status === 'captured' || p.status === 'paid')
      const failed = payments.filter((p) => p.status === 'failed')
      const created = payments.filter((p) => p.status === 'created')
      const refunded = payments.filter((p) => p.status === 'refunded')
      const totalRev = captured.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

      return [{
        total_count: payments.length,
        captured_count: captured.length,
        failed_count: failed.length,
        pending_count: created.length,
        refunded_count: refunded.length,
        total_revenue: totalRev,
      }]
    }

    // 3. User & Enrollment JOIN queries (Admin & Student Dashboard)
    if (sql.includes('FROM enrollments e')) {
      const enrollments = this.tables.enrollments || []
      const coursesMap = Object.fromEntries((this.tables.courses || []).map((c) => [c.id, c]))
      const usersMap = Object.fromEntries((this.tables.users || []).map((u) => [u.id, u]))

      let result = enrollments.map((e) => {
        const c = coursesMap[e.course_id] || {}
        const u = usersMap[e.user_id] || {}
        return {
          ...e,
          course_title: c.title || 'Course',
          course_slug: c.slug || '',
          course_badge: c.badge || '',
          course_category: c.category || '',
          user_name: u.name || e.student_name || 'Student',
          registered_user_name: u.name || null,
          registered_user_email: u.email || null,
        }
      })

      if (sql.includes('WHERE e.user_id = ?')) {
        result = result.filter((e) => e.user_id === params[0])
      }

      result.sort((a, b) => new Date(b.purchased_at || 0) - new Date(a.purchased_at || 0))
      return this.applyLimitOffset(sql, result, params)
    }

    // 4. Payments with course & user join (Admin Dashboard)
    if (sql.includes('FROM payments p')) {
      const payments = this.tables.payments || []
      const coursesMap = Object.fromEntries((this.tables.courses || []).map((c) => [c.id, c]))
      const usersMap = Object.fromEntries((this.tables.users || []).map((u) => [u.id, u]))

      const result = payments.map((p) => {
        const c = coursesMap[p.course_id] || {}
        const u = usersMap[p.user_id] || {}
        return {
          ...p,
          course_title: c.title || 'Course',
          user_name: u.name || 'User',
        }
      })

      result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      return this.applyLimitOffset(sql, result, params)
    }

    // 5. Standard table queries
    const selectMatch = sql.match(/^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER BY\s+(.+?))?(?:\s+LIMIT\s+.+)?$/i)
    if (selectMatch) {
      const cols = selectMatch[1].trim()
      const table = selectMatch[2].trim()
      const where = selectMatch[3]?.trim()
      const orderBy = selectMatch[4]?.trim()

      let rows = [...(this.tables[table] || [])]

      if (where) {
        rows = rows.filter((r) => this.evaluateWhere(where, r, params, 0))
      }

      if (orderBy) {
        if (orderBy.includes('created_at DESC')) {
          rows.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        } else if (orderBy.includes('purchased_at DESC')) {
          rows.sort((a, b) => new Date(b.purchased_at || 0) - new Date(a.purchased_at || 0))
        }
      }

      rows = this.applyLimitOffset(sql, rows, params)

      // Column projection
      if (cols !== '*' && !cols.includes('COUNT(')) {
        const selectedCols = cols.split(',').map((c) => c.trim())
        rows = rows.map((r) => {
          const projected = {}
          for (const col of selectedCols) {
            projected[col] = r[col] !== undefined ? r[col] : null
          }
          return projected
        })
      }

      return rows
    }

    return []
  }

  evaluateWhere(whereClause, row, params, paramOffset = 0) {
    if (!whereClause) return true

    const clause = whereClause.trim()
    let pIdx = paramOffset

    // 1. WHERE email = ?
    if (clause === 'email = ?') {
      return String(row.email || '').toLowerCase() === String(params[pIdx] || '').toLowerCase()
    }
    // 2. WHERE phone = ?
    if (clause === 'phone = ?') {
      return String(row.phone || '') === String(params[pIdx] || '')
    }
    // 3. WHERE id = ?
    if (clause === 'id = ?') {
      return String(row.id || '') === String(params[pIdx] || '')
    }
    // 4. WHERE slug = ?
    if (clause === 'slug = ?') {
      return String(row.slug || '') === String(params[pIdx] || '')
    }
    // 5. WHERE order_id = ?
    if (clause === 'order_id = ?') {
      return String(row.order_id || '') === String(params[pIdx] || '')
    }
    // 6. WHERE razorpay_order_id = ?
    if (clause === 'razorpay_order_id = ?') {
      return String(row.razorpay_order_id || '') === String(params[pIdx] || '')
    }
    // 7. WHERE status = 'active'
    if (clause === "status = 'active'") {
      return row.status === 'active'
    }
    // 8. WHERE payment_status = 'paid'
    if (clause === "payment_status = 'paid'") {
      return row.payment_status === 'paid'
    }
    // 9. WHERE email_verified = 1 OR phone_verified = 1
    if (clause === 'email_verified = 1 OR phone_verified = 1') {
      return Boolean(row.email_verified || row.phone_verified)
    }
    // 10. WHERE payment_id = ? OR order_id = ?
    if (clause === 'payment_id = ? OR order_id = ?') {
      const p1 = params[pIdx]
      const p2 = params[pIdx + 1]
      return row.payment_id === p1 || row.order_id === p2
    }
    // 11. Complex Course Access Authorization Check
    if (clause.includes('user_id = ?') && clause.includes('course_id') && (clause.includes('payment_status') || clause.includes('access_status'))) {
      const uId = params[pIdx]
      const uEmail = params[pIdx + 1]
      const cId = params[pIdx + 2]
      const isUser = row.user_id === uId || (row.student_email && row.student_email.toLowerCase() === String(uEmail || '').toLowerCase())
      const isCourse = row.course_id === cId || (row.course_id && (row.course_id.includes(String(cId || '')) || String(cId || '').includes(row.course_id)))
      const isPaid = row.payment_status === 'paid'
      const isAccess = row.access_status === 'granted'
      return isUser && isCourse && isPaid && isAccess
    }
    // 12. WHERE user_id = ? AND purpose = 'email_verify'
    if (clause.includes("purpose = 'email_verify'") && clause.includes('user_id = ?')) {
      return row.user_id === params[pIdx] && row.purpose === 'email_verify'
    }
    // 13. WHERE user_id = ? AND purpose = 'phone_verify'
    if (clause.includes("purpose = 'phone_verify'") && clause.includes('user_id = ?')) {
      return row.user_id === params[pIdx] && row.purpose === 'phone_verify'
    }
    // 14. WHERE user_id = ? AND purpose = 'login_2fa'
    if (clause.includes("purpose = 'login_2fa'") && clause.includes('user_id = ?')) {
      return row.user_id === params[pIdx] && row.purpose === 'login_2fa'
    }
    // 15. WHERE user_id = ? AND purpose = 'password_reset'
    if (clause.includes("purpose = 'password_reset'") && clause.includes('user_id = ?')) {
      return row.user_id === params[pIdx] && row.purpose === 'password_reset'
    }
    // 16. WHERE user_id = ? AND purpose = ? AND used_at IS NULL
    if (clause.includes('user_id = ?') && clause.includes('purpose = ?') && clause.includes('used_at IS NULL')) {
      return row.user_id === params[pIdx] && row.purpose === params[pIdx + 1] && !row.used_at
    }
    // 17. WHERE user_id = ? AND purpose = ?
    if (clause.includes('user_id = ?') && clause.includes('purpose = ?')) {
      return row.user_id === params[pIdx] && row.purpose === params[pIdx + 1]
    }

    return true
  }

  applyLimitOffset(sql, rows, params) {
    if (/LIMIT \? OFFSET \?/i.test(sql)) {
      const limit = Number(params[params.length - 2]) || 50
      const offset = Number(params[params.length - 1]) || 0
      return rows.slice(offset, offset + limit)
    }
    if (/LIMIT \d+/i.test(sql)) {
      const match = sql.match(/LIMIT (\d+)/i)
      const limit = Number(match[1]) || 1
      return rows.slice(0, limit)
    }
    if (/LIMIT \?/i.test(sql)) {
      const limit = Number(params[params.length - 1]) || 1
      return rows.slice(0, limit)
    }
    return rows
  }
}

export const db = new PureDatabase()

export function initDatabase() {
  seedCourses()
  seedAdmin()
}

function seedCourses() {
  const count = db.prepare('SELECT COUNT(*) as count FROM courses').get().count
  if (count === 0 && Array.isArray(courses)) {
    const insert = db.prepare(`
      INSERT INTO courses (id, slug, title, short_title, provider_id, category, badge, description, price_usd, status, created_at, updated_at)
      VALUES (@id, @slug, @title, @shortTitle, @providerId, @category, @badge, @description, @priceUSD, 'active', @now, @now)
    `)
    const insertMany = db.transaction((list) => {
      const now = new Date().toISOString()
      for (const item of list) {
        insert.run({
          id: item.id,
          slug: item.slug,
          title: item.title,
          shortTitle: item.shortTitle || item.title,
          providerId: item.providerId,
          category: item.category,
          badge: item.badge || '',
          description: item.description || '',
          priceUSD: item.priceUSD || 499,
          now,
        })
      }
    })
    insertMany(courses)
    console.log(`[Database] Seeded ${courses.length} courses successfully.`)
  }
}

function seedAdmin() {
  const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@ezycertify.com').toLowerCase().trim()
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail)
  if (!existing) {
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@Ezycertify2026!'
    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(adminPassword, salt)
    const now = new Date().toISOString()
    const adminId = 'user_admin_001'

    db.prepare(`
      INSERT INTO users (id, name, email, phone, password_hash, email_verified, phone_verified, two_factor_enabled, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 1, 0, 'admin', ?, ?)
    `).run(
      adminId,
      process.env.ADMIN_DEFAULT_NAME || 'Ezycertify Administrator',
      adminEmail,
      process.env.ADMIN_DEFAULT_PHONE || '+919876543210',
      passwordHash,
      now,
      now
    )
    console.log(`[Database] Created default administrator account: ${adminEmail}`)
  }
}

// Auto-run on load
initDatabase()
