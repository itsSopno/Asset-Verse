import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import { toast } from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import axios from 'axios'
import { getTeam } from '../../../components/TEAM JS/team'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = useRole()
  const axiosSecure = useAxiosSecure()

  const [form, setForm] = useState({
    photoURL: user?.photoURL || '',
    coverImage: user?.coverImage || ''
  })
  const [loading, setLoading] = useState(false)

  const cardRef = useRef(null)
  const avatarRef = useRef(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axiosSecure.get('/user/profile')
        setForm({
          photoURL: data.photoURL || '',
          coverImage: data.coverImage || ''
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, { opacity: 0, y: 40, duration: 1, ease: 'power4.out' })
      gsap.from(avatarRef.current, { scale: 0.9, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['getTeam', user?.email],
    enabled: !!user,
    queryFn: async () => {
      const token = await user.getIdToken(true)
      const allHistory = await getTeam(token)

      const companyNameSet = new Set()
      allHistory.forEach(entry => {
        if (entry.companyName) companyNameSet.add(entry.companyName)
      })

      return allHistory.filter(
        entry => entry.companyName && companyNameSet.has(entry.companyName)
      )
    },
  })

  const handleImageUpload = async (e, type = 'avatar') => {
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
      const imageUrl = res.data.data.display_url

      setForm(prev => ({
        ...prev,
        [type === 'avatar' ? 'photoURL' : 'coverImage']: imageUrl
      }))

      toast.success(`${type === 'avatar' ? 'Avatar' : 'Cover'} uploaded successfully!`)
    } catch (err) {
      toast.error('Failed to upload image')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      await axiosSecure.post('/user/update-profile', {
        photoURL: form.photoURL,
        coverImage: form.coverImage
      })
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#0B0F19] px-4 py-12 flex justify-center">
      <div
        ref={cardRef}
        className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-lg"
      >
        {/* Cover */}
        <div className="relative h-56 md:h-64 w-full">
          <img
            src={form.coverImage || '/default-cover.jpg'}
            alt="cover"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <label className="absolute bottom-4 right-4 cursor-pointer bg-white/20 px-3 py-1 rounded transition hover:bg-white/30">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImageUpload(e, 'cover')}
            />
            Upload
          </label>
        </div>

        {/* Avatar */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto -mt-14 md:-mt-16">
          <img
            ref={avatarRef}
            src={form.photoURL || '/default-avatar.png'}
            alt="avatar"
            className="w-full h-full rounded-full border border-white/20 object-cover"
          />
          <label className="absolute inset-0 cursor-pointer flex items-center justify-center rounded-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImageUpload(e, 'avatar')}
            />
            <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">Edit</span>
          </label>
        </div>

        {/* Role */}
        <div className="flex justify-center mt-4">
          <span className="px-4 py-1 text-xs md:text-sm tracking-wide rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {isRoleLoading ? 'loading...' : role}
          </span>
        </div>

        {/* Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-gray-400">Name</p>
            <p className="mt-1 text-white font-medium">{user?.displayName}</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-gray-400">Email</p>
            <p className="mt-1 text-white font-medium break-all">{user?.email}</p>
          </div>
        </div>

        {/* History Table */}
       {user.role === "employee" ? (
  <div className="mt-10 px-4 md:px-12 overflow-x-auto">
    <table className="min-w-full text-left divide-y divide-white/10">
      <thead>
        <tr className="text-gray-400 text-sm uppercase">
          <th className="px-6 py-3">Employee</th>
          <th className="px-6 py-3">Performed By</th>
          <th className="px-6 py-3">Company</th>
          <th className="px-6 py-3">Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {history.map((entry) => (
          <tr key={entry._id} className="hover:bg-white/5 transition">
            <td className="px-6 py-4 font-medium">
              {entry.employeeName || entry.employeeEmail}
            </td>
            <td className="px-6 py-4 text-gray-400">
              {entry.performedBy || entry.hrEmail}
            </td>
            <td className="px-6 py-4 text-gray-400">{entry.companyName}</td>
            <td className="px-6 py-4 text-gray-400">
              {new Date(entry.date).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <h1 className="text-center mt-10">Nothing</h1>
)}
      

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-6 md:px-12 mb-8">
          <button
            className="px-8 py-2 rounded-xl text-sm font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
            onClick={handleSaveProfile}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Profile
