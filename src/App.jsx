import { Routes, Route } from 'react-router-dom'
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
import { useScrollRevealDeps } from './hooks/useScrollReveal'

function Layout({ children, hideFooter = false }) {
  useScrollRevealDeps([children])

  return (
    <>
      <Header />
      <main>{children}</main>
      {!hideFooter && <Footer />}
      <WhatsAppWidget />
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
    </Routes>
  )
}
