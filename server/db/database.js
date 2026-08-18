import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import { courses } from '../../src/data/siteData.js'

const DATA_DIR = path.join(process.cwd(), 'server', 'data')
fs.mkdirSync(DATA_DIR, { recursive: true })

const DB_PATH = path.join(DATA_DIR, 'ezycertify.db')

export const db = new Database(DB_PATH)

// Optimize SQLite for production concurrency & relational integrity
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')
db.pragma('busy_timeout = 5000')

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email_verified INTEGER DEFAULT 0,
      phone_verified INTEGER DEFAULT 0,
      two_factor_enabled INTEGER DEFAULT 1,
      role TEXT DEFAULT 'student',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_login TEXT
    );

    CREATE TABLE IF NOT EXISTS verifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      purpose TEXT NOT NULL,
      token_hash TEXT NOT NULL,
      destination TEXT NOT NULL,
      attempts INTEGER DEFAULT 0,
      max_attempts INTEGER DEFAULT 5,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      resend_available_at TEXT,
      metadata TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_verifications_user_purpose 
      ON verifications(user_id, purpose);
    CREATE INDEX IF NOT EXISTS idx_verifications_token_hash 
      ON verifications(token_hash);

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_title TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      category TEXT NOT NULL,
      badge TEXT,
      description TEXT,
      price_usd INTEGER NOT NULL,
      status TEXT DEFAULT 'active',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      course_id TEXT NOT NULL,
      razorpay_order_id TEXT UNIQUE NOT NULL,
      razorpay_payment_id TEXT UNIQUE,
      razorpay_signature TEXT,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL,
      status TEXT NOT NULL,
      error_code TEXT,
      error_description TEXT,
      raw_payload TEXT,
      created_at TEXT NOT NULL,
      verified_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT
    );

    CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(razorpay_order_id);
    CREATE INDEX IF NOT EXISTS idx_payments_payment_id ON payments(razorpay_payment_id);

    CREATE TABLE IF NOT EXISTS enrollments (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      course_id TEXT NOT NULL,
      payment_id TEXT,
      order_id TEXT,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      enrollment_status TEXT NOT NULL,
      access_status TEXT DEFAULT 'granted',
      batch TEXT,
      student_name TEXT,
      student_email TEXT,
      student_phone TEXT,
      student_city TEXT,
      purchased_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT
    );

    CREATE INDEX IF NOT EXISTS idx_enrollments_user_course ON enrollments(user_id, course_id);
  `)

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
