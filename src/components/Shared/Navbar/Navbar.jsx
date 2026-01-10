import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import { motion, AnimatePresence } from 'framer-motion'
import './nav.css'
import useRole from '../../../hooks/useRole'
import { useTheme } from '../../UseTheme/UseTheme'
import { LuSunMoon } from "react-icons/lu";
import { MdOutlineWbSunny } from 'react-icons/md'
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const [role] = useRole();
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logOut()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrollY > 60
          ? ' backdrop-blur-xl border-b border-white/10 shadow-lg py-2'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 md:px-12">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: LOGO & DESKTOP LINKS */}
          <div className="flex items-center gap-12">
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl md:text-2xl font-extrabold tracking-[0.2em] md:tracking-[0.3em] bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]"
              >
                ASSET<span className="text-indigo-400">VERSE</span>
              </Link>
            </motion.div>
<button onClick={toggleTheme} className="p-2 rounded-full border transition-all" style={{ borderColor: 'var(--border-color)' }}>
            {theme === 'dark' ? <MdOutlineWbSunny className="text-yellow-400" /> : <LuSunMoon className="text-indigo-600" />}
          </button>
            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-widest text-white/80">
              <li><Link  style={{ color: 'var(--text-main)' }} className="hover:text-white transition-colors" to="/">HOME</Link></li>
              {user && <li> <Link  style={{ color: 'var(--text-main)' }} className="hover:text-white transition-colors" to="/dashboard">DASHBOARD</Link></li>}
            
                 <li><Link  style={{ color: 'var(--text-main)' }} className="hover:text-white transition-colors" to="/legal">LEGAL</Link></li>
                  <li><Link  style={{ color: 'var(--text-main)' }}className="hover:text-white transition-colors" to="/testimonial">TESTIMONIAL</Link></li>
            </ul>
          </div>

          {/* RIGHT: USER ACTIONS */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-5">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    {/* Role Condition Logic */}
                    {role === 'hr' ? (
                      <span className="text-[10px] font-bold text-indigo-400 border border-indigo-400/40 px-3 py-1 rounded-full tracking-tighter uppercase">
                        You Are HR
                      </span>
                    ) : role === 'employee' ? (
                      <span className="text-[10px] font-bold text-green-400 border border-green-400/40 px-3 py-1 rounded-full tracking-tighter uppercase">
                        You Are Employee
                      </span>
                    ) : (
                      /* If user is logged in but has no role yet */
                      <div className="flex gap-2">
                        <Link to="/hr-join" className="text-xs font-bold bg-indigo-600 px-5 py-2 rounded-full text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                          Join as HR
                        </Link>
                        <Link to="/join" className="text-xs font-bold bg-white/5 border border-white/10 px-5 py-2 rounded-full text-white hover:bg-white/10 transition-all">
                          Join as Employee
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <button onClick={handleLogout} className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="px-7 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest shadow-lg transition-all">
                  Login
                </Link>
              )}
            </div>

            {/* PROFILE IMAGE & MOBILE TOGGLE */}
            <div className="flex items-center gap-3">
              {user && (
                <img
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-white/10 shadow-2xl"
                  src={user?.photoURL || avatarImg}
                  alt="profile"
                />
              )}

              <div
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
              >
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Full Width Dropdown) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0b0b15]/98 backdrop-blur-3xl border-t border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-10 flex flex-col gap-6 text-base font-bold tracking-widest uppercase">
              <Link onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white" to="/">Home</Link>
              <button onClick={toggleTheme} className="p-2 rounded-full border transition-all" style={{ borderColor: 'var(--border-color)' }}>
            {theme === 'dark' ? <MdOutlineWbSunny className="text-yellow-400" /> : <LuSunMoon className="text-indigo-600" />}
          </button>
              {user && <Link onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white" to="/dashboard">Dashboard</Link>}
              
              <hr className="border-white/5 my-2" />
              
              {user ? (
                <div className="flex flex-col gap-4">
                  {role === 'hr' ? (
                    <span className="text-indigo-400 text-sm">Role: You Are HR</span>
                  ) : role === 'employee' ? (
                    <span className="text-green-400 text-sm">Role: You Are Employee</span>
                  ) : (
                    <>
                      <Link onClick={() => setIsOpen(false)} to="/hr" className="text-indigo-400">Join as HR</Link>
                      <Link onClick={() => setIsOpen(false)} to="/join" className="text-white">Join as Employee</Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="text-left text-red-500 mt-2">Logout</button>
                </div>
              ) : (
                <Link onClick={() => setIsOpen(false)} to="/login" className="bg-indigo-600 text-center py-3 rounded-xl text-white">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar