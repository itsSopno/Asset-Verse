import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Loading from '../components/Loadingpage/loading'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MainLayout = () => {
  const [loading, setLoading] = useState(true)
  const location = useLocation() // Required for AnimatePresence

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500) // 3s loading
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="relative">
      <div className="glow-wrapper">
        <div className="glow-indigo"></div>
        <div className="glow-pink"></div>
      </div>
      <Navbar />

      {/* AnimatePresence wraps Outlet for page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pt-24 min-h-[calc(100vh-68px)]"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default MainLayout
