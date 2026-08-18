import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import CareerPage from './pages/CareerPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import VerifyCertPage from './pages/VerifyCertPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import MyCoursesPage from './pages/MyCoursesPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import PartnerPage from './pages/PartnerPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookieBanner from './components/CookieBanner'
import { useScrollRevealDeps } from './hooks/useScrollReveal'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Layout({ children, hideFooter = false }) {
  useScrollRevealDeps([children])

  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main-content">{children}</main>
      {!hideFooter && <Footer />}
      <WhatsAppWidget />
      <CookieBanner />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/courses"
        element={
          <Layout>
            <CoursesPage />
          </Layout>
        }
      />
      <Route
        path="/courses/:slug"
        element={
          <Layout>
            <CourseDetailPage />
          </Layout>
        }
      />
      <Route
        path="/partners/:providerId"
        element={
          <Layout>
            <PartnerPage />
          </Layout>
        }
      />
      <Route
        path="/career"
        element={
          <Layout>
            <CareerPage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <Layout>
            <PrivacyPage />
          </Layout>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <Layout>
            <TermsPage />
          </Layout>
        }
      />
      <Route
        path="/verify"
        element={
          <Layout>
            <VerifyCertPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout hideFooter>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/auth/login"
        element={
          <Layout hideFooter>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout hideFooter>
            <SignupPage />
          </Layout>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <Layout hideFooter>
            <SignupPage />
          </Layout>
        }
      />
      <Route
        path="/verify-email"
        element={
          <Layout hideFooter>
            <VerifyEmailPage />
          </Layout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Layout hideFooter>
            <ForgotPasswordPage />
          </Layout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <Layout hideFooter>
            <ResetPasswordPage />
          </Layout>
        }
      />
      <Route
        path="/my-courses"
        element={
          <Layout>
            <MyCoursesPage />
          </Layout>
        }
      />
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminDashboardPage />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
    </Routes>
  )
}
