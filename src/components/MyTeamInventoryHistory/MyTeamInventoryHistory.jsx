import { useQuery } from '@tanstack/react-query'
import { getInventoryHistory } from '../getMyInventory/getMyInventory'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'

const MyInventoryHistory = () => {
  const { user } = useAuth()

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['inventoryHistory', user?.email],
    enabled: !!user,
    queryFn: async () => {
      const token = await user.getIdToken(true)
      const allHistory = await getInventoryHistory(token)
      return allHistory.filter(entry => entry.employeeEmail === user.email)
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <section className="min-h-screen p-4 sm:p-6 md:p-8 bg-[#0B0F19] text-gray-200">
      {/* Header */}
      <header className="mb-6 sm:mb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          My Inventory History
        </h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Overview of assets assigned or returned to you
        </p>
      </header>

      {/* Mobile Cards */}
      <div className="grid gap-4 sm:hidden">
        {history.length ? (
          history.map(entry => (
            <div
              key={entry._id}
              className="bg-[#111827] p-4 rounded-xl shadow-md flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">{entry.assetName || 'N/A'}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    entry.action === 'ASSIGNED'
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'bg-green-500/10 text-green-400'
                  }`}
                >
                  {entry.action}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Company: {entry.companyName || 'N/A'}</p>
              <p className="text-gray-400 text-sm">HR: {entry.performedBy || 'N/A'}</p>
              <p className="text-gray-400 text-sm">Date: {new Date(entry.date).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="py-16 text-center text-gray-500">No history available.</p>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-[#111827] border border-white/5 rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-[#0F172A] text-gray-400">
            <tr>
              <th className="px-6 py-4 text-left">Asset Name</th>
              <th className="px-6 py-4 text-left">Action</th>
              <th className="px-6 py-4 text-left">Company</th>
              <th className="px-6 py-4 text-left">Performed By</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white">
            {history.length ? (
              history.map(entry => (
                <tr key={entry._id} className="hover:bg-white/[0.03] transition">
                  <td className="px-6 py-4 font-medium">{entry.assetName || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-400">{entry.action}</td>
                  <td className="px-6 py-4 text-gray-400">{entry.companyName || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-400">{entry.performedBy || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(entry.date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyInventoryHistory
