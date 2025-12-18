import { useQuery } from '@tanstack/react-query'
import AssignedAssetRow from '../../../components/Dashboard/TableRows/AssignedAssetRow'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const MyInventory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['assigned-assets', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/assigned-assets')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <section className="min-h-screen bg-[#0B0F19] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl text-white font-bold mb-6">My Inventory</h2>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Assignment Date
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {plants.length > 0 ? (
                plants.map((plant) => (
  <AssignedAssetRow key={plant._id} plant={plant} />
))

                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-400">
                      No assets assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyInventory
