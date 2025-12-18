import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

const LocomotiveProvider = ({ children }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08, // premium inertia
      multiplier: 1,
      smartphone: { smooth: false },
      tablet: { smooth: false },
    })

    return () => {
      locoScroll.destroy()
    }
  }, [])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}

export default LocomotiveProvider
