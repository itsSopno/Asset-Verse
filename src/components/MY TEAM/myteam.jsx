import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { getInventoryHistory, returnAsset } from '../getMyInventory/getMyInventory'

const EmployeeInventory = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [selectedAsset, setSelectedAsset] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingReturn, setLoadingReturn] = useState(false)

  /* ================= FETCH DATA ================= */
  const {
    data: assets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['inventoryHistory', user?.email],
    enabled: !!user,
    queryFn: async () => {
      const token = await user.getIdToken(true)
      const res = await getInventoryHistory(token)

      console.log('Inventory Response:', res) // 🔍 debug
      return Array.isArray(res) ? res : []
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: 'always',
  })

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p className="text-red-400 p-6">Failed to load inventory</p>

  /* ================= RETURN HANDLER ================= */
  const handleReturn = async () => {
    try {
      setLoadingReturn(true)
      const token = await user.getIdToken(true)
      await returnAsset(selectedAsset.assetId, token)

      setModalOpen(false)
      setSelectedAsset(null)

      queryClient.invalidateQueries(['inventoryHistory', user?.email])
    } catch (err) {
      console.error(err)
      alert('Failed to return asset')
    } finally {
      setLoadingReturn(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 text-gray-200">
      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          My Assigned Assets
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Assets currently assigned to you
        </p>
      </header>

      {/* EMPTY STATE */}
      {!assets.length && (
        <div className="py-16 text-center text-gray-500">
          No assets assigned yet
        </div>
      )}

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="bg-[#111827] rounded-xl p-4 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-1">
              {asset.assetName}
            </h3>

            <div className="text-sm text-gray-400 space-y-1">
              <p>Company: {asset.companyName}</p>
              <p>HR: {asset.performedBy}</p>
              <p>
                Assigned:{' '}
                {new Date(asset.date).toLocaleDateString()}
              </p>
            </div>

            {asset.action === 'ASSIGNED' && (
              <button
                onClick={() => {
                  setSelectedAsset(asset)
                  setModalOpen(true)
                }}
                className="mt-3 w-full py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
              >
                Return Asset
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block bg-[#111827] rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#0F172A] text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Asset</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">HR</th>
              <th className="px-4 py-3 text-left">Assigned</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td className="px-4 py-3 font-medium text-white">
                  {asset.assetName}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {asset.companyName}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {asset.performedBy}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(asset.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {asset.action === 'ASSIGNED' && (
                    <button
                      onClick={() => {
                        setSelectedAsset(asset)
                        setModalOpen(true)
                      }}
                      className="px-3 py-1 text-xs rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= RETURN MODAL ================= */}
      {modalOpen && selectedAsset && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Confirm Return
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to return{' '}
              <span className="text-white font-medium">
                {selectedAsset.assetName}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReturn}
                disabled={loadingReturn}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
              >
                {loadingReturn ? 'Returning...' : 'Return'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default EmployeeInventory