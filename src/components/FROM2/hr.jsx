import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import AuthProvider from '../../providers/AuthProvider'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

const HRForm = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    companyLogo: '',
    password: '',
    dateOfBirth: ''
  })
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (user?.email) {
      setForm(prev => ({ ...prev, email: user.email }))
    }
  }, [user])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)

    setLoading(true)
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      )
      setForm(prev => ({ ...prev, companyLogo: res.data.data.url }))
      toast.success('Logo uploaded successfully!')
    } catch (err) {
      toast.error('Failed to upload image')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
  e.preventDefault()
  if (!form.companyLogo) return toast.error('Please upload a company logo first')

  try {
    if (!user) {
      toast.error('You must be logged in to register as HR')
      return
    }

    
    const token = await user.getIdToken()
    const res = await axiosSecure.post(
      '/join-hr',
      { ...form, email: user.email }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    toast.success(res.data.message)
    setForm({ name: '', companyName: '', companyLogo: '', password: '', dateOfBirth: '' })
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || 'Unauthorized or Error')
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 sm:p-12"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-500 mb-2">
            Join as HR
          </h1>
          <p className="text-gray-600 sm:text-lg">
            Create your HR account to manage employees and company resources easily.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ scale: 1.02 }}
          />

          {/* Image Upload */}
          <motion.div className="flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded-lg cursor-pointer" />
            {loading && <p className="text-sm text-gray-500">Uploading...</p>}
            {form.companyLogo && <motion.img src={form.companyLogo} alt="Company Logo" className="w-24 h-24 object-cover rounded mt-2 mx-auto shadow-md" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 100 }} />}
          </motion.div>

          {/* Email field (auto-filled, read-only) */}
          <motion.input
            type="email"
            name="email"
            value={user?.email || ''}
            readOnly
            placeholder="Email"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
          />

          <motion.input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password (min 6 chars)"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-black transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default HRForm
