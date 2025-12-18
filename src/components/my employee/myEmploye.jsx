import { useQuery } from '@tanstack/react-query'
import { getEmployeeAffiliations } from '../../components/Affliaction/employeeAffiliations'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import StatCard from '../Dashboard/StatCard'
import useAuth from '../../hooks/useAuth'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const EmployeeDashboard = () => {
  const { user } = useAuth()
  const container = useRef(null)
  const rows = useRef([])

  const {
    data: employees = [],
    isLoading,
  } = useQuery({
    queryKey: ['employeeAffiliations', user?.email],
    enabled: !!user,
    queryFn: async () => {
      const token = await user.getIdToken(true)
      return getEmployeeAffiliations(token)
    },
  })

 useEffect(() => {
  if (!rows.current.length) return

  const ctx = gsap.context(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power4.out',
      clearProps: 'all', 
    })

    gsap.from(rows.current, {
      opacity: 0,
      y: 16,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'all', 
    })
  }, container)

  return () => ctx.revert()
}, [employees])

  if (isLoading) return <LoadingSpinner />

  const total = employees.length
  const active = employees.filter(e => e.status === 'active').length
  const inactive = total - active

  return (
    <section
      ref={container}
      className="min-h-screen p-8 bg-[#0B0F19] text-gray-200"
    >
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-wide text-white">
          Employee Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Secure overview of employee affiliations
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Employees" value={total} tone="neutral" />
        <StatCard title="Active Employees" value={active} tone="success" />
        <StatCard title="Inactive Employees" value={inactive} tone="danger" />
      </div>

      {/* Table */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <h2 className="text-lg font-medium text-white">
            Employee Records
          </h2>
        </div>

        {employees.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#0F172A] text-gray-400">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Company</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-white">
                {employees.map((emp, i) => (
                  <tr
                    key={emp._id}
                    ref={el => (rows.current[i] = el)}
                    className="hover:bg-white/[0.03] transition"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {emp.employeeName}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {emp.employeeEmail}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {emp.companyName}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(emp.affiliationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            emp.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500">
            No employees affiliated yet.
          </div>
        )}
      </div>
    </section>
  )
}

export default EmployeeDashboard
