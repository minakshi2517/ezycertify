export function apiUrl(path) {
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  const config = {
    ...options,
    headers,
    credentials: 'include',
  }

  let res
  try {
    res = await fetch(apiUrl(path), config)
  } catch (networkErr) {
    console.error('[API Network Error]:', networkErr)
    throw new Error('Unable to connect to the server. Please check your internet connection or start the backend server.')
  }

  let data
  try {
    data = await res.json()
  } catch (parseErr) {
    const text = await res.text().catch(() => '')
    console.error(`[API Non-JSON Response from ${path}]:`, res.status, text)
    data = { error: text ? `Server Error (${res.status}): ${text.slice(0, 120)}` : `Server returned status ${res.status}` }
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`)
  }
  return data
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),

  auth: {
    signup: (data) => api.post('/api/auth/signup', data),
    verifyEmail: (data) => api.post('/api/auth/verify-email', data),
    resendEmailOtp: (data) => api.post('/api/auth/resend-email-otp', data),
    verifyPhone: (data) => api.post('/api/auth/verify-phone', data),
    resendPhoneOtp: (data) => api.post('/api/auth/resend-phone-otp', data),
    login: (data) => api.post('/api/auth/login', data),
    send2FAOtp: (data) => api.post('/api/auth/send-2fa-otp', data),
    verify2FA: (data) => api.post('/api/auth/verify-2fa', data),
    forgotPassword: (data) => api.post('/api/auth/forgot-password', data),
    resetPassword: (data) => api.post('/api/auth/reset-password', data),
    me: () => api.get('/api/auth/me'),
    logout: () => api.post('/api/auth/logout'),
  },

  payments: {
    createOrder: (data) => api.post('/api/create-order', data),
    verifyPayment: (data) => api.post('/api/verify-payment', data),
  },

  courses: {
    getAll: () => api.get('/api/courses'),
    getBySlug: (slug) => api.get(`/api/courses/${slug}`),
    checkAccess: (id) => api.get(`/api/courses/${id}/access`),
    getMyEnrollments: () => api.get('/api/user/enrollments'),
  },

  admin: {
    getOverview: () => api.get('/api/admin/overview'),
    getUsers: () => api.get('/api/admin/users'),
    getCourses: () => api.get('/api/admin/courses'),
    createCourse: (data) => api.post('/api/admin/courses', data),
    deleteCourse: (id) => api.delete(`/api/admin/courses/${id}`),
    getPayments: () => api.get('/api/admin/payments'),
    getEnrollments: () => api.get('/api/admin/enrollments'),
    updateAccess: (id, access_status) => api.patch(`/api/admin/enrollments/${id}/access`, { access_status }),
  },
}
