import { useQuery } from '@tanstack/react-query'
import { getTeam } from '../TEAM JS/team'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const MyTeam = () => {
  const { user } = useAuth()
  const container = useRef(null)
  const rows = useRef([])

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['getTeam', user?.email],
    enabled: !!user,
    queryFn: async () => {
      const token = await user.getIdToken(true)
      const allHistory = await getTeam(token)

      // Unique by companyName
      const companyNameSet = new Set()
      allHistory.forEach(entry => {
        if (entry.companyName) companyNameSet.add(entry.companyName)
      })

      return allHistory.filter(
        entry => entry.companyName && companyNameSet.has(entry.companyName)
      )
    },
  })

  useEffect(() => {
    if (!rows.current.length) return

    const ctx = gsap.context(() => {
      // Container animation
      gsap.from(container.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power4.out',
        clearProps: 'all',
      })

      // Row animation
      gsap.from(rows.current, {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
      })
    }, container)

    return () => ctx.revert()
  }, [history])

  if (isLoading) return <LoadingSpinner />

  const total = history.length

  return (
    <section ref={container} className="min-h-screen p-8 bg-[#0B0F19] text-gray-200">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">My Team</h1>
        <p className="text-gray-400 mt-2">
          Overview of employees assigned to your company
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="relative bg-[#0F172A] border border-indigo-500/30 rounded-2xl p-6">
          <p className="text-sm text-gray-400">Total COMPANY</p>
          <p className="mt-3 text-3xl font-semibold text-white">{total}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <h2 className="text-lg font-medium text-white">Employee Records</h2>
        </div>

        {history.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#0F172A] text-gray-400">
                <tr>
                  <th className="px-6 py-4 text-left">Employee Name</th>
                  <th className="px-6 py-4 text-left">HR Name</th>
                  <th className="px-6 py-4 text-left">Company</th>
                  <th className="px-6 py-4 text-left">Joined Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-white">
                {history.map((entry, i) => (
                  <tr
                    key={entry._id}
                    ref={el => (rows.current[i] = el)}
                    className="hover:bg-white/[0.03] transition"
                  >
                    <td className="px-6 py-4 font-medium text-white">
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
          <div className="py-16 text-center text-gray-500">No employees assigned yet.</div>
        )}
      </div>
    </section>
  )
}

export default MyTeam
