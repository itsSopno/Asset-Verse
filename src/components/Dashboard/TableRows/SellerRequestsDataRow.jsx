import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const SellerRequestsDataRow = ({ req, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleApprove = async () => {
    try {
      await axiosSecure.patch(`/asset-permission/${req._id}`, { status: 'approved' })
      toast.success('Request Approved!')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }
  }

  const handleReject = async () => {
    try {
      await axiosSecure.patch(`/asset-permission/${req._id}`, { status: 'rejected' })
      toast.error('Request Rejected!')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }
  }

  return (
    <>
      {/* Table row for medium and up screens */}
      <tr className="hidden md:table-row border-b border-gray-800 hover:bg-[#1a1a2e]/50 transition-all duration-200">
        <td className="px-4 py-4 text-sm">
          <div className="flex items-center gap-3">
            <img
              src={req?.seller?.image}
              alt="Seller Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow-[0_0_10px_rgba(125,108,255,0.4)]"
            />
            <div className="flex flex-col">
              <span className="font-medium text-white">{req?.seller?.name}</span>
              <span className="text-gray-400 text-xs truncate">{req?.seller?.email}</span>
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-sm">
          <div className="flex items-center gap-3">
            <img
              src={req?.product?.image}
              alt={req?.product?.name}
              className="w-10 h-10 rounded shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-medium text-white">{req?.product?.name}</span>
              <span className="text-gray-400 text-xs">{req?.product?.type}</span>
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-sm">
          <span
            className={`px-4 py-1 rounded-full font-semibold text-sm text-white 
            ${req?.status === 'approved'
              ? 'bg-green-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,150,0.4)]'
              : req?.status === 'rejected'
              ? 'bg-red-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,150,0.4)]'
              : 'bg-yellow-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,0,0.4)]'
            }`}
          >
            {req?.status.toUpperCase()}
          </span>
        </td>

        <td className="px-4 py-4 text-sm flex flex-wrap gap-2">
          {req?.status === 'pending' && (
            <>
              <button
                onClick={handleApprove}
                className="px-4 py-1 bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-100 rounded backdrop-blur-sm shadow-[0_0_10px_rgba(125,108,255,0.4)] transition-all duration-200"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-1 bg-red-500/30 hover:bg-red-500/50 text-red-100 rounded backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,150,0.4)] transition-all duration-200"
              >
                Reject
              </button>
            </>
          )}
        </td>
      </tr>

      {/* Mobile card for small screens */}
      <div className="md:hidden bg-[#0f0f1c] shadow-[0_0_30px_rgba(125,108,255,0.25)] rounded-xl p-4 mb-4 backdrop-blur-sm border border-indigo-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={req?.seller?.image}
              alt="Seller Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow-[0_0_10px_rgba(125,108,255,0.4)]"
            />
            <div className="flex flex-col">
              <span className="font-medium text-white">{req?.seller?.name}</span>
              <span className="text-gray-400 text-xs truncate">{req?.seller?.email}</span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm text-white 
            ${req?.status === 'approved'
              ? 'bg-green-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,150,0.4)]'
              : req?.status === 'rejected'
              ? 'bg-red-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,150,0.4)]'
              : 'bg-yellow-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,0,0.4)]'
            }`}
          >
            {req?.status.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={req?.product?.image}
            alt={req?.product?.name}
            className="w-12 h-12 rounded shadow-md"
          />
          <div className="flex flex-col">
            <span className="font-medium text-white">{req?.product?.name}</span>
            <span className="text-gray-400 text-xs">{req?.product?.type}</span>
          </div>
        </div>

        {req?.status === 'pending' && (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleApprove}
              className="flex-1 px-4 py-2 bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-100 rounded backdrop-blur-sm shadow-[0_0_10px_rgba(125,108,255,0.4)] transition-all duration-200"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="flex-1 px-4 py-2 bg-red-500/30 hover:bg-red-500/50 text-red-100 rounded backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,150,0.4)] transition-all duration-200"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default SellerRequestsDataRow
