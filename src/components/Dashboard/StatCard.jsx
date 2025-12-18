import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const tones = {
  neutral: 'border-indigo-500/30',
  success: 'border-emerald-500/30',
  danger: 'border-rose-500/30',
}

const StatCard = ({ title, value, tone = 'neutral' }) => {
  const card = useRef(null)
  const number = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(card.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
      })

      gsap.fromTo(
        number.current,
        { innerText: 0 },
        {
          innerText: value,
          duration: 1.2,
          ease: 'power2.out',
          snap: { innerText: 1 },
        }
      )
    }, card)

    return () => ctx.revert()
  }, [value])

  return (
    <div
      ref={card}
      className={`relative bg-[#0F172A] border ${tones[tone]} rounded-2xl p-6`}
    >
      <p className="text-sm text-gray-400">{title}</p>
      <p
        ref={number}
        className="mt-3 text-3xl font-semibold text-white"
      >
        0
      </p>
    </div>
  )
}

export default StatCard
