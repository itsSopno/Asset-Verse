import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import PlanCard from '../PlanCard/PlanCard'
import { motion } from 'framer-motion'

const PlansPage = () => {
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/plans`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="relative h-auto bg-[#0f0f1c] py-16 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-indigo-500/30 blur-[200px] rounded-full top-10 left-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-[150px] rounded-full bottom-10 right-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <Container className="relative z-10">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center"
        >
          Build Your Asset Universe
        </motion.h1>

        {/* Meaningful Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
        >
          From small teams to enterprises, AssetVerse equips you with the tools to track, grow, and secure your assets efficiently. Choose a plan and unlock full control over your company inventory.
        </motion.p>

        {/* Plans Grid - horizontally centered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className='flex flex-wrap justify-center gap-8'
        >
          {plans.map(plan => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </motion.div>
      </Container>
    </div>
  )
}

export default PlansPage
