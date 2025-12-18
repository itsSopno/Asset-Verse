import LenisScroll from '../../../lenissmoothscrool' 
import { motion } from 'framer-motion'
import './home.css'
import AboutAssetVerseScroll from '../../components/About/about'
import TestimonialsStats from '../../components/Testimonila/Testimonial'
import Questions from '../../components/Question/Question'
import SelectionProjectSection from '../../components/SelectionProjectSection/SelectionProjectSection'
import Plans from '../../components/Plans/Plans'
import AssetVerseHero from '../../components/AssetVerse/AssetVerse'
import THANKS from '../../components/Thanks/thanks'

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut',
}

const Home = () => {
  return (
   
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={pageTransition}
      className="bg-[#05050a] text-white overflow-x-hidden" 
    >
      {/* ১. স্মুথ স্ক্রল সবার উপরে */}
      <LenisScroll />

      {/* ULTRA PREMIUM HERO */}
      <motion.section
        className="
          relative w-full h-[90vh] flex flex-col justify-center items-center
          rounded-tr-4xl rounded-tl-4xl overflow-hidden px-6
          bg-[#0f0f1c] shadow-[0_0_80px_rgba(80,80,255,0.4)]
        "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(125,108,255,0.35),rgba(0,0,0,0))] pointer-events-none" />
        
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-indigo-300 via-white to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.5)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ASSET VERSE
        </motion.h1>

        <motion.p
          className="text-indigo-100/90 text-lg md:text-xl font-medium mt-4 max-w-2xl leading-relaxed text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The next evolution of digital asset intelligence — premium ecosystem for the modern era.
        </motion.p>
      </motion.section>

     
      <AssetVerseHero />
      <AboutAssetVerseScroll />
      <Plans />
      <SelectionProjectSection />
      <TestimonialsStats />
      <Questions />
      
     
      
    </motion.main>
  )
}

export default Home