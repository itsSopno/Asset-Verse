import { useQuery } from '@tanstack/react-query'
import SellerRequestsDataRow from '../../../components/Dashboard/TableRows/SellerRequestsDataRow'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const SellerRequests = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['asset-permission-requests'],
    queryFn: async () => {
      const result = await axiosSecure('/asset-permission')
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  
  const filteredRequests = Array.isArray(requests)
    ? requests.filter(req => req?.product?.hr === user?.email)
    : []

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-white mb-6 drop-shadow-[0_0_20px_rgba(125,108,255,0.6)]">
        Seller Requests
      </h1>

      {/* If no data */}
      {filteredRequests.length === 0 && (
        <p className="text-center text-gray-300 text-lg py-10">
          No requests found for your company.
        </p>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block -mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
        <div className="inline-block min-w-full shadow-[0_0_20px_rgba(125,108,255,0.15)] rounded-xl overflow-hidden bg-[#0f0f1c] border border-indigo-500/20">
          <table className="min-w-full leading-normal text-white">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b border-indigo-500/30 text-left text-sm uppercase font-medium">
                  Seller
                </th>
                <th className="px-5 py-3 border-b border-indigo-500/30 text-left text-sm uppercase font-medium">
                  Product
                </th>
                <th className="px-5 py-3 border-b border-indigo-500/30 text-left text-sm uppercase font-medium">
                  Status
                </th>
                <th className="px-5 py-3 border-b border-indigo-500/30 text-left text-sm uppercase font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map(req => (
                <SellerRequestsDataRow
                  key={req._id}
                  req={req}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredRequests.map(req => (
          <div
            key={req._id}
            className="bg-[#0f0f1c] rounded-xl p-4 shadow-[0_0_25px_rgba(125,108,255,0.25)] backdrop-blur-sm border border-indigo-500/20"
          >
            <SellerRequestsDataRow refetch={refetch} req={req} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SellerRequests
