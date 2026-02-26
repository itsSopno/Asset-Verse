// import { Outlet, useLocation } from 'react-router'
// import Navbar from '../components/Shared/Navbar/Navbar'
// import Footer from '../components/Shared/Footer/Footer'
// import Loading from '../components/Loadingpage/loading'
// import { useState, useEffect } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'

// const MainLayout = () => {
//   const [loading, setLoading] = useState(true)
//   const location = useLocation() // Required for AnimatePresence

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2500) // 3s loading
//     return () => clearTimeout(timer)
//   }, [])

//   if (loading) {
//     return <Loading />
//   }

//   return (
//     <div className="relative">
//       <div className="glow-wrapper">
//         <div className="glow-indigo"></div>
//         <div className="glow-pink"></div>
//       </div>
//       <Navbar />

//       {/* AnimatePresence wraps Outlet for page transitions */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, scale: 0.96 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.98 }}
//           transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//           className="pt-24 min-h-[calc(100vh-68px)]"
//         >
//           <Outlet />
//         </motion.div>
//       </AnimatePresence>

//       <Footer />
//     </div>
//   )
// }

// export default MainLayout
import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Loading from '../components/Loadingpage/loading'
import { useState, useEffect } from 'react'

const MainLayout = () => {
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Only show loading screen on initial app load
    if (initialLoad) {
      const timer = setTimeout(() => {
        setLoading(false)
        setInitialLoad(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [initialLoad])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Background */}
      <div className="glow-spot -top-[10%] -left-[10%] opacity-40"></div>
      <div className="glow-spot -bottom-[10%] -right-[10%] opacity-20" style={{ animationDelay: '-5s' }}></div>
      <div className="blueprint-grid absolute inset-0 opacity-[0.03] pointer-events-none"></div>

      <Navbar />

      <div className="pt-20">
        <Outlet key={location.pathname} />
      </div>

      <Footer />
    </div>
  )
}

export default MainLayout
