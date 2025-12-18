import { useNavigate } from 'react-router'
import Button from '../components/Shared/Button/Button'
import { motion } from 'framer-motion'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-gray-100 rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center"
      >
      
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-500/20 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

      
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Oops! Something Went Wrong</h1>
        <p className="text-gray-400 mb-6">
          The page you are looking for may be temporarily unavailable. Try going back or return home.
        </p>

      
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center px-6 py-2 rounded-lg bg-indigo-600 text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12l3.75-3.75M3 12h18" />
            </svg>
            Go Back
          </button>

          <Button
            label="Take Me Home"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default ErrorPage
