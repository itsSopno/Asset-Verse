import { useEffect } from 'react'
import Lenis from 'lenis'

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,

      // Core smoothness
      lerp: 0.07,          // lower = smoother (0.05–0.08 sweet spot)
      duration: 1.2,       // too high = floaty

      // Input feel
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,

      // Natural easing (enterprise feel)
      easing: (t) =>
        t === 1
          ? 1
          : 1 - Math.pow(2, -10 * t), // exponential out

      // Direction handling
      infinite: false,
      syncTouch: true,
      smoothTouch: false, // mobile native scroll best

      // Prevent layout shift
      normalizeWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}

export default LenisScroll
