import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
const EmployeeForm = () => {
  const { user } = useAuth()  // get current logged-in user
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: ''
  })

  // Auto-fill email & password from logged-in user
  useEffect(() => {
    if (user?.email) {
      setForm(prev => ({
        ...prev,
        email: user.email,
        password: 'default123', // default password for employee
      }))
    }
  }, [user])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    if (!user) {
      toast.error('You must be logged in to register as employee');
      return;
    }

    
    const res = await useAxiosSecure.post('/join-employee', form);

    toast.success(res.data.message);
    setForm({ name: '', email: user.email, password: 'default123', dateOfBirth: '' });
    
  } catch (err) {
    toast.error(err.response?.data?.message || 'Error occurred');
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Join as Employee</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* NAME */}
        <motion.input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileFocus={{ scale: 1.02 }}
        />

        {/* EMAIL (auto-filled & readonly) */}
        <motion.input
          type="email"
          name="email"
          value={form.email}
          readOnly
          className="border p-3 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* PASSWORD (auto-filled & readonly) */}
        <motion.input
          type="password"
          name="password"
          value={form.password}
          readOnly
          className="border p-3 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* DATE OF BIRTH */}
        <motion.input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileFocus={{ scale: 1.02 }}
        />

        {/* REGISTER BUTTON */}
        <motion.button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </form>
    </motion.div>
  )
}

export default EmployeeForm
