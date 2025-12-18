import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LoadingSpinner = ({ smallHeight }) => {
  const containerRef = useRef(null)
  const triangleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(triangleRef.current, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 1.2,
        repeat: -1,
        ease: 'linear',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center ${
        smallHeight ? 'h-[250px]' : 'h-[70vh]'
      }`}
    >
      <svg
        ref={triangleRef}
        width="60"
        height="60"
        viewBox="0 0 100 100"
        className="fill-none stroke-lime-400 stroke-4"
      >
        <polygon
          points="50,10 90,85 10,85"
          strokeWidth="8"
          stroke="lime"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default LoadingSpinner
