import { motion } from 'framer-motion'
import { useState } from 'react'
import PurchaseModal from '../Modal/PurchaseModal'
import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'
import { useContext } from 'react'
import AuthProvider from '../../providers/AuthProvider'

/* ================= PLAN STYLES ================= */
const planStyles = {
  Basic: {
    bg: 'from-gray-800 via-gray-700 to-gray-800',
    button: 'from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500',
    tagline: 'Perfect for small teams starting their asset journey.',
  },
  Standard: {
    bg: 'from-purple-800 via-purple-700 to-purple-800',
    button:
      'from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500',
    tagline: 'Ideal for growing teams needing advanced management.',
  },
  Premium: {
    bg: 'from-blue-900 via-blue-800 to-blue-900',
    button:
      'from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500',
    tagline: 'Full-suite solution for enterprises with priority support.',
  },
}

const PlanCard = ({ plan }) => {
  const style = planStyles[plan.name] || planStyles.Basic
  const [purchaseOpen, setPurchaseOpen] = useState(false)

  const {user,loading } = useAuth()
  const [role] = useRole()

  const userLimit = user?.packageLimit
const planLimit = plan?.employeeLimit

let buttonText = 'Activate Plan'
let disabled = false
if (loading) {
  buttonText = 'Loading...'
  disabled = true
} else if (role !== 'hr') {
  buttonText = 'ONLY HR CAN PURCHASE'
  disabled = true
} else if (userLimit === planLimit) {
  buttonText = 'ACTIVATED'
  disabled = true
} else if (userLimit > planLimit) {
  buttonText = 'DOWNGRADE NOT ALLOWED'
  disabled = true
} else {
  buttonText = 'UPGRADE PLAN'
}


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-tr ${style.bg} p-6 rounded-3xl shadow-2xl border border-gray-700 flex flex-col justify-between`}
    >
      {/* CONTENT */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
        <p className="text-gray-300 mb-2">{style.tagline}</p>

        <p className="text-xl font-extrabold mb-4 text-white">
          $ {plan.price} / month
        </p>

        <ul className="text-gray-300 text-sm space-y-2 mb-6">
          {plan.features?.map((feature, i) => (
            <li key={i}>• {feature}</li>
          ))}
        </ul>
      </div>

      {/* BUTTON */}
      <button
        disabled={disabled}
        onClick={!disabled ? () => setPurchaseOpen(true) : undefined}
        className={`w-full py-3 rounded-xl text-white font-semibold transition
          ${
            buttonText === 'ACTIVATED'
              ? 'bg-green-600 cursor-default'
              : disabled
              ? 'bg-gray-600 cursor-not-allowed'
              : `bg-[#0f0f1c] bg-gradient-to-r ${style.button}`
          }
        `}
      >
        {buttonText}
      </button>

      {/* MODAL */}
      <PurchaseModal
        plan={plan}
        isOpen={purchaseOpen}
        closeModal={() => setPurchaseOpen(false)}
      />
    </motion.div>
  )
}

export default PlanCard
