import { useState, useEffect, useRef } from 'react'

export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!startOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          animate()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, startOnView])

  const animate = () => {
    const startTime = performance.now()
    const numericEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''))
    const suffix = String(end).replace(/[0-9.]/g, '')

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericEnd))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(numericEnd)
    }

    requestAnimationFrame(step)
  }

  const suffix = String(end).replace(/[0-9.]/g, '')
  return { count, suffix, ref }
}
