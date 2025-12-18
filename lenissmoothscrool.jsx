import { useEffect } from 'react'
import Lenis from 'lenis'

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, 
      duration: 1.2,
      lerp: 0.1,
    })

   
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize()
    })
    resizeObserver.observe(document.body)

  
    window.scrollTo(0, 0)

    return () => {
      lenis.destroy()
      resizeObserver.disconnect()
    }
  }, [])

  return null
}

export default LenisScroll