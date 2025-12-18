import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import MobileData from '../../../components/Dashboard/TableRows/MobileData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const ManageUsers = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await axiosSecure('/users')
      return res.data
    },
  })

  // 🔥 FILTER ONLY EMPLOYEES
  const employees = users.filter(u => u?.role === 'employee')

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-2xl md:text-3xl font-semibold mb-6 text-white'>
        Manage Employees
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className='hidden md:block border-r border-pink-500/30 hover:bg-[#1a1a2e]/50 rounded-xl shadow overflow-x-auto'>
        <table className='min-w-full'>
          <thead className=''>
            <tr>
              <th className='px-6 py-4 text-left text-white text-sm font-medium'>
                Email
              </th>
              <th className='px-6 py-4 text-left text-white text-sm font-medium'>
                Role
              </th>
              <th className='px-6 py-4 text-left text-white text-sm font-medium'>
                Action
              </th>
            </tr>
          </thead>

          <motion.tbody
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            {employees.map(user => (
              <motion.tr
                key={user._id}
                variants={itemVariants}
                className='border-b last:border-none'
              >
                <UserDataRow
                  user={user}
                  refetch={refetch}
                />
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='md:hidden space-y-4'
      >
        {employees.map(user => (
          <motion.div key={user._id} variants={itemVariants}>
            <MobileData
              user={user}
              refetch={refetch}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ManageUsers
