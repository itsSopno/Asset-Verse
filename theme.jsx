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
          photoURL: data.photoURL || user?.photoURL || '',
          coverImage: data.coverImage || ''
        })
      } catch (err) {
        console.error('Error fetching profile data:', err)
      }
    }
    if (user) fetchUserData()
  }, [user, axiosSecure])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, { opacity: 0, y: 30, duration: 1, ease: 'power4.out' })
    })
    return () => ctx.revert()
  }, [])

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
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
      const imageUrl = res.data.data.display_url
      setForm(prev => ({ ...prev, [type === 'avatar' ? 'photoURL' : 'coverImage']: imageUrl }))
      toast.success(`${type === 'avatar' ? 'Avatar' : 'Cover'} uploaded!`)
    } catch (err) {
      toast.error('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      await axiosSecure.post('/user/update-profile', { photoURL: form.photoURL, coverImage: form.coverImage })
      toast.success('Profile updated!')
    } catch (err) {
      toast.error('Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#0B0F19] px-2 sm:px-4 py-6 md:py-12 flex justify-center">
      <div
        ref={cardRef}
        className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Cover Image */}
        <div className="relative h-40 sm:h-56 md:h-72 w-full bg-indigo-900/20">
          <img
            src={form.coverImage || 'https://i.ibb.co/3Y8pY8X/default-cover.jpg'}
            alt="cover"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <label className="absolute top-3 right-3 cursor-pointer bg-black/40 hover:bg-black/60 text-white text-[10px] sm:text-xs px-3 py-1.5 rounded-lg backdrop-blur-md transition-all">
            <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'cover')} />
            Change Cover
          </label>
        </div>

        {/* Avatar */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto -mt-12 sm:-mt-16 md:-mt-20 group">
          <img
            ref={avatarRef}
            src={form.photoURL || 'https://i.ibb.co/rtp9999/default-avatar.png'}
            alt="avatar"
            className="w-full h-full rounded-full border-4 border-[#0B0F19] object-cover shadow-2xl"
          />
          <label className="absolute inset-0 cursor-pointer flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
            <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'avatar')} />
            <span className="text-white text-[10px] font-bold bg-indigo-600 px-2 py-1 rounded-full">Edit</span>
          </label>
        </div>

        {/* Role Badge */}
        <div className="flex justify-center mt-4">
          <span className="px-4 py-1 text-[10px] sm:text-xs font-bold tracking-widest rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
            {isRoleLoading ? '...' : role || 'No Role'}
          </span>
        </div>

        {/* User Info Grid */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-8 md:px-16">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Full Name</p>
            <p className="mt-1 text-base sm:text-lg text-white font-semibold truncate">{user?.displayName || 'User'}</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Email Address</p>
            <p className="mt-1 text-sm sm:text-base text-white font-medium break-all">{user?.email}</p>
          </div>
        </div>

        {/* Employment History Table */}
        {!isRoleLoading && role === 'employee' && (
          <div className="mt-10 px-4 sm:px-8 md:px-16 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white whitespace-nowrap">History</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            
            {/* Scrollable Container for Table */}
            <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0F172A]/50">
              <table className="min-w-[500px] md:min-w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">HR Name</th>
                    <th className="px-4 py-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                  {isHistoryLoading ? (
                    <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                  ) : history.length > 0 ? (
                    history.map((entry) => (
                      <tr key={entry._id} className="hover:bg-white/[0.02] transition">
                        <td className="px-4 py-4 font-semibold text-indigo-300">{entry.companyName}</td>
                        <td className="px-4 py-4 text-gray-400">{entry.performedBy || 'N/A'}</td>
                        <td className="px-4 py-4 text-gray-400 text-right">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-400 italic">No data.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 flex justify-center pb-8 px-4">
          <button
            className="w-full sm:w-auto px-10 py-3 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
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