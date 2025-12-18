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

  // Fetch detailed user profile from DB
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axiosSecure.get('/user/profile')
        setForm({
          photoURL: data.photoURL || user?.photoURL || '',
          coverImage: data.coverImage || ''
        })
      } catch (err) {
        console.error('Error fetching profile data:', err)
      }
    }
    if (user) fetchUserData()
  }, [user, axiosSecure])

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, { opacity: 0, y: 40, duration: 1, ease: 'power4.out' })
      gsap.from(avatarRef.current, { scale: 0.8, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  // Fetch Employment History with Email Filter
  const { data: history = [], isLoading: isHistoryLoading } = useQuery({
    queryKey: ['getTeam', user?.email],
    enabled: !!user && role === 'employee', 
    queryFn: async () => {
      const token = await user.getIdToken(true)
      const allHistory = await getTeam(token)
      
    
      return allHistory.filter(entry => entry.employeeEmail === user?.email)
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
        className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Cover Section */}
        <div className="relative h-56 md:h-72 w-full bg-indigo-900/20">
          <img
            src={form.coverImage || 'https://i.ibb.co/3Y8pY8X/default-cover.jpg'}
            alt="cover"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <label className="absolute top-4 right-4 cursor-pointer bg-black/40 hover:bg-black/60 text-white text-xs px-4 py-2 rounded-lg transition-all backdrop-blur-md">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImageUpload(e, 'cover')}
            />
            Change Cover
          </label>
        </div>

        {/* Avatar Section */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto -mt-16 md:-mt-20 group">
          <img
            ref={avatarRef}
            src={form.photoURL || 'https://i.ibb.co/rtp9999/default-avatar.png'}
            alt="avatar"
            className="w-full h-full rounded-full border-4 border-[#0B0F19] object-cover shadow-2xl"
          />
          <label className="absolute inset-0 cursor-pointer flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImageUpload(e, 'avatar')}
            />
            <span className="text-white text-xs font-bold bg-indigo-600 px-3 py-1 rounded-full">Edit Photo</span>
          </label>
        </div>

        {/* User Role Badge */}
        <div className="flex justify-center mt-6">
          <span className="px-6 py-1.5 text-xs font-bold tracking-widest rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
            {isRoleLoading ? 'Loading...' : role || 'No Role'}
          </span>
        </div>

        {/* Profile Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-16 text-center md:text-left">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Full Name</p>
            <p className="mt-1 text-xl text-white font-semibold">{user?.displayName || 'User Name'}</p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email Address</p>
            <p className="mt-1 text-lg text-white font-medium break-all">{user?.email}</p>
          </div>
        </div>

        {/* ✅ History Table Section (Only for Employees) */}
        {!isRoleLoading && role === 'employee' && (
          <div className="mt-12 px-6 md:px-16 pb-10">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-white">Employment History</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#0F172A]/50">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4">Company Name</th>
                    <th className="px-6 py-4">Managed By (HR)</th>
                    <th className="px-6 py-4">Joining Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {isHistoryLoading ? (
                    <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-500">Loading history...</td></tr>
                  ) : history.length > 0 ? (
                    history.map((entry) => (
                      <tr key={entry._id} className="hover:bg-white/[0.02] transition">
                        <td className="px-6 py-4 font-semibold text-indigo-300">{entry.companyName}</td>
                        <td className="px-6 py-4 text-gray-400">{entry.performedBy || entry.hrEmail}</td>
                        <td className="px-6 py-4 text-gray-400">
                          {new Date(entry.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-16 text-center text-gray-500 italic">
                        No official company assignment found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Update Button */}
        <div className="mt-6 flex justify-center pb-12">
          <button
            className="px-10 py-3 rounded-2xl text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all disabled:opacity-50 active:scale-95"
            onClick={handleSaveProfile}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'SAVE CHANGES'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Profile