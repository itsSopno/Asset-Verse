import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import { motion, AnimatePresence } from 'framer-motion'
import './nav.css'
import useRole from '../../../hooks/useRole'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [role] = useRole()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`
         top-0 left-0 w-full z-50
        transition-all duration-300
        ${scrollY > 60
          ? '/70 backdrop-blur-2xl border-b border-white/10 shadow-lg py-2'
          : 'bg-transparent py-5'
        }
      `}
    >
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-between h-16">

          {/* LEFT MENU */}
          <ul className="hidden lg:flex items-center gap-10 text-sm font-medium tracking-wide text-white">
            <li><Link className="nav-premium" to="/">HOME</Link></li>
            <li><Link className="nav-premium" to="/dashboard">DASHBOARD</Link></li>
          </ul>

          {/* CENTER LOGO */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center flex-1">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-[0.3em]
                bg-gradient-to-r from-indigo-300 via-white to-indigo-300
                bg-clip-text text-transparent
                drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]"
            >
              ASSET<span className="text-indigo-400">VERSE</span>
            </Link>
          </motion.div>

          {/* RIGHT MENU */}
          <div className="flex items-center justify-end gap-6">

            {/* ROLE LABEL */}
            {role === 'hr' && <span className="hidden lg:block text-xs tracking-widest text-indigo-400">HR PANEL</span>}
            {role === 'employee' && <span className="hidden lg:block text-xs tracking-widest text-indigo-400">EMPLOYEE</span>}

            {/* PROFILE / LOGIN */}
            {user ? (
              <img
                className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                src={user?.photoURL || avatarImg}
                alt="profile"
              />
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow-lg transition-all"
              >
                Login
              </Link>
            )}

            {/* MOBILE MENU ICON */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 border border-white/20 rounded-xl hover:bg-white/10 cursor-pointer transition-all"
            >
              <AiOutlineMenu size={22} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 left-0 w-full md:w-72 bg-[#0b0b15]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl p-4 flex flex-col gap-2"
          >
            <Link className="drop-link" to="/">Home</Link>
            {user ? (
              <> <Link className="drop-link" to="/dashboard">Dashboard</Link></>
            ):(

<>
<span className="drop-link text-indigo-400">PLEASE LOGIN IN OUR WEBSITE</span>
</>
            )}
           

            {user ? (
              <>
                {role === 'hr' && <span className="drop-link text-indigo-400">You Are HR</span>}
                {role === 'employee' && <span className="drop-link text-indigo-400">You Are Employee</span>}

                <button onClick={logOut} className="drop-link text-left w-full">Logout</button>
              </>
            ) : (
              <>
                <Link className="drop-link" to="/login">Login</Link>
                <Link className="drop-link" to="/signup">Sign Up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
