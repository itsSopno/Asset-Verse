import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveOrUpdateUser } from '../../utils'
import { motion } from 'framer-motion'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  const handleSubmit = async e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const { user } = await signIn(email, password)

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <div
      className="
        relative flex justify-center items-center min-h-screen 
        bg-[#0f0f1c]
        border-r border-indigo-500/20 
        shadow-[0_0_40px_rgba(80,80,255,0.35)]
        before:absolute before:inset-0 
        before:bg-gradient-to-b before:from-white/10 before:to-transparent
        before:blur-[90px] before:opacity-20 before:pointer-events-none
        px-4
      "
    >
      {/* 🔥 Floating Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-10 text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-wide 
          bg-gradient-to-r from-indigo-300 to-lime-300 
          bg-clip-text text-transparent 
          drop-shadow-[0_0_35px_rgba(120,120,255,0.8)]
          animate-pulse
        ">
          Welcome Back
        </h1>
      </motion.div>

      {/* 🔥 Main Card (3D Hover) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{
          scale: 1.03,
          rotateX: 6,
          rotateY: -6,
          boxShadow:
            '0px 0px 60px rgba(120,120,255,0.5), 0 0 120px rgba(80,80,255,0.3)',
        }}
        className="
          relative w-full max-w-md 
          bg-white/10 backdrop-blur-xl 
          text-white rounded-2xl p-8 
          shadow-xl border border-white/10 
          mt-32 transition-all duration-300
        "
      >
        <p className="text-center text-gray-300 -mt-2 mb-6 text-sm">
          Sign in to your account
        </p>

        {/* ✨ Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="group">
            <label className="text-sm mb-2 block">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@mail.com"
              className="
                w-full px-4 py-3 rounded-lg 
                bg-gray-800/60 border border-gray-700 
                focus:border-indigo-400 
                focus:outline-none text-gray-100
                group-hover:shadow-[0_0_20px_rgba(120,120,255,0.4)]
                transition
              "
            />
          </div>

          {/* Password */}
          <div className="group">
            <label className="text-sm mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="•••••••"
              className="
                w-full px-4 py-3 rounded-lg 
                bg-gray-800/60 border border-gray-700 
                focus:border-indigo-400 
                focus:outline-none text-gray-100
                group-hover:shadow-[0_0_20px_rgba(120,120,255,0.4)]
                transition
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-lg 
              bg-indigo-500 hover:bg-indigo-600 
              text-white font-semibold shadow-lg 
              transition shadow-[0_0_20px_rgba(120,120,255,0.3)]
            "
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-3 text-right">
          <button className="text-sm text-gray-300 hover:text-indigo-400 transition">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-700" />
        </div>

        {/* Google */}
        <motion.div
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.03 }}
          className="
            flex items-center justify-center gap-3 
            border border-gray-700 rounded-lg py-3 
            cursor-pointer hover:bg-gray-800 
            transition shadow-[0_0_20px_rgba(120,120,255,0.3)]
          "
        >
          <FcGoogle size={30} />
          <p className="text-gray-200">Continue with Google</p>
        </motion.div>

        {/* Signup */}
        <p className="text-center text-sm mt-6 text-gray-300">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            state={from}
            className="text-indigo-400 hover:text-indigo-300 underline transition"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
