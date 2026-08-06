import Hero from '../components/Hero'
import Partners from '../components/Partners'
import CoursesSection from '../components/CoursesSection'
import Features from '../components/Features'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <CoursesSection limit={6} />
      <Features />
      <WhyUs />
      <Testimonials />
    </>
  )
}
