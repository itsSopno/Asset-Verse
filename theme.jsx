import LenisScroll from '../../../lenissmoothscrool'
import { motion } from 'framer-motion'
import './home.css'
import AboutAssetVerseScroll from '../../components/About/about'
import TestimonialsStats from '../../components/Testimonila/Testimonial'
import Questions from '../../components/Question/Question'
import SelectionProjectSection from '../../components/SelectionProjectSection/SelectionProjectSection'
import Plans from '../../components/Plans/Plans'

import AssetVerseHero from '../../components/AssetVerse/AssetVerse'
const pageVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
}

const pageTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
}

const Home = () => {
  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={pageTransition}
      className="bg-[#05050a] text-white overflow-hidden"
    >
      <LenisScroll />

      {/* ULTRA PREMIUM HERO */}
      <motion.section
        className="
          relative w-full h-[90vh] flex flex-col justify-center items-center
          rounded-tr-4xl rounded-tl-4xl overflow-hidden px-6
          bg-[#0f0f1c] shadow-[0_0_80px_rgba(80,80,255,0.4)]
        "
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(125,108,255,0.35),rgba(0,0,0,0))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 1.3 }}
        />

        {/* Glass Reflection */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[200px] opacity-[0.18]
          bg-gradient-to-b from-white/40 to-transparent blur-[60px]"
          animate={{ y: [-25, 25, -25] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Neon Aura */}
        <motion.div
          className="absolute w-[650px] h-[650px] bg-indigo-500 blur-[220px] opacity-30 rounded-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{ top: '20%', left: '15%' }}
        />

        {/* Floating Shards */}
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[90px] h-[2px] bg-white/10 rounded-full backdrop-blur-xl"
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 40 - 20],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.4, 0.15],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* TITLE */}
        <motion.h1
          className="
            text-6xl md:text-7xl font-extrabold text-center
            bg-gradient-to-r from-indigo-300 via-white to-indigo-200
            bg-clip-text text-transparent
            drop-shadow-[0_0_35px_rgba(255,255,255,0.5)]
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          ASSET VERSE
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          className="
            text-indigo-100/90 text-lg md:text-xl font-medium
            mt-4 max-w-2xl leading-relaxed text-center
          "
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          The next evolution of digital asset intelligence — combining cinematic
          design, frictionless performance, and AI-powered management into one
          premium ecosystem.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="absolute bottom-[16%] w-[200px] h-[3px]
          bg-gradient-to-r from-indigo-400 via-white/80 to-indigo-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.section>

      {/* SECTIONS */}
        <section><AssetVerseHero></AssetVerseHero></section>
      <section><AboutAssetVerseScroll /></section>
      <section><Plans /></section>
      <section><SelectionProjectSection /></section>
      <section><TestimonialsStats /></section>
      <section><Questions /></section>
    </motion.main>
  )
}

export default Home
import { motion } from 'framer-motion'
import PurchaseModal from '../Modal/PurchaseModal'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'
import usePackageLimit from '../../hooks/usePackageLimit'
import useEmployeeLimit from '../../hooks/useEmployeeLimit'

const planStyles = {
  Basic: {
    bg: 'from-gray-800 via-gray-700 to-gray-800',
    button: 'from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500',
    tagline: 'Perfect for small teams starting their asset journey.',
  },
  Pro: {
    bg: 'from-purple-800 via-purple-700 to-purple-800',
    button: 'from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500',
    tagline: 'Ideal for growing teams needing advanced management.',
  },
  Enterprise: {
    bg: 'from-blue-900 via-blue-800 to-blue-900',
    button: 'from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500',
    tagline: 'Full-suite solution for enterprises with priority support.',
  },
}

const PlanCard = ({ plan }) => {
  const style = planStyles[plan.name] || planStyles.Basic
  const [purchaseOpen, setPurchaseOpen] = useState(false)

  const [role] = useRole()
  const [packageLimit] = usePackageLimit()
  const [employeeLimit] = useEmployeeLimit(plan._id)

  const { user } = useAuth()

  // Plan already activated logic
  const isActivated =
  role === 'hr' &&
  packageLimit !== null &&
  employeeLimit !== null &&
  user.packageLimit === employeeLimit
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-tr ${style.bg} p-6 rounded-3xl shadow-2xl border border-gray-700 transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
        <p className="text-gray-300 mb-2">{style.tagline}</p>
        <p className="text-xl font-extrabold mb-4 text-white">
          $ {plan.price} / month
        </p>

        <ul className="text-gray-300 text-sm space-y-2 mb-5">
          {plan.features?.map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      </div>

      <div>
       {user.packageLimit === employeeLimit ? (
  <button
    className="w-full bg-green-600 py-3 rounded-xl text-white font-semibold cursor-default"
    disabled
  >
    ACTIVATED
  </button>
) : (
  <button
    className={`w-full bg-[#0f0f1c] py-3 rounded-xl ${style.button} text-white font-semibold`}
    onClick={() => setPurchaseOpen(true)}
  >
    Activate Plan
  </button>
)}

        {isActivated ? (
          <button
            className="w-full bg-green-600 py-3 rounded-xl text-white font-semibold cursor-default"
            disabled
          >
            ACTIVATED
          </button>
        ) : role === 'hr' ? (
          <button
            className={`w-full bg-[#0f0f1c] py-3 rounded-xl ${style.button} text-white font-semibold`}
            onClick={() => setPurchaseOpen(true)}
          >
            Activate Plan
          </button>
        ) : role === 'employee' ? (
          <button
            className={`w-full bg-[#0f0f1c] py-3 rounded-xl text-white font-semibold`}
          >
            YOU ARE NOT HR
          </button>
        ) : (
          <button
            className={`w-full bg-[#0f0f1c] py-3 rounded-xl text-white font-semibold`}
          >
            JOIN AS HR
          </button>
        )}
      </div>

      <PurchaseModal
        plan={plan}
        isOpen={purchaseOpen}
        closeModal={() => setPurchaseOpen(false)}
      />
    </motion.div>
  )
}

export default PlanCard
