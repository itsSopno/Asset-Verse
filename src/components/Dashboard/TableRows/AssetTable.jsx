import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import AssignAssetModal from '../../Modal/AssignAssetModal'
import Pagination from '../../Pagination/Pagination'

const ITEMS_PER_PAGE = 10

const AssetTable = ({ assets, employees, hrEmail, companyName }) => {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const tableRef = useRef(null)

  const totalPages = Math.ceil(assets.length / ITEMS_PER_PAGE)

  const paginatedAssets = assets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  /* ================= GSAP ROW ANIMATION ================= */
  useEffect(() => {
    if (!tableRef.current) return

    gsap.fromTo(
      tableRef.current.querySelectorAll('.asset-row'),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.05,
      }
    )
  }, [currentPage, paginatedAssets])

  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block w-full overflow-x-auto">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f172a] to-[#020617] shadow-2xl">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Available</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody ref={tableRef}>
              {paginatedAssets.map(asset => (
                <tr
                  key={asset._id}
                  className="asset-row border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {asset.productName}
                  </td>
                  <td className="px-6 py-4">{asset.productType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        asset.availableQuantity > 0
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {asset.availableQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedAsset(asset)}
                      disabled={asset.availableQuantity <= 0}
                      className="rounded-lg border border-white/15 px-4 py-2 text-xs
                      font-semibold text-white transition-all
                      hover:border-indigo-400 hover:bg-indigo-500/10
                      disabled:opacity-40"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Desktop Pagination */}
          <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
            <p className="text-xs text-slate-400">
              Page {currentPage} of {totalPages}
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {paginatedAssets.map(asset => (
          <div
            key={asset._id}
            className="rounded-xl border border-white/10 bg-[#020617] p-4"
          >
            <h3 className="text-white font-semibold">
              {asset.productName}
            </h3>
            <p className="text-sm text-slate-400">
              {asset.productType}
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-300">
                Available: {asset.availableQuantity}
              </span>

              <button
                onClick={() => setSelectedAsset(asset)}
                disabled={asset.availableQuantity <= 0}
                className="rounded-lg border border-white/15 px-4 py-2 text-xs
                font-semibold text-white hover:bg-indigo-500/10 disabled:opacity-40"
              >
                Assign
              </button>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ================= MODAL ================= */}
      {selectedAsset && (
        <AssignAssetModal
          asset={selectedAsset}
          employees={employees}
          hrEmail={hrEmail}
          companyName={companyName}
          onClose={() => setSelectedAsset(null)}
          onSuccess={() => setSelectedAsset(null)}
        />
      )}
    </>
  )
}

export default AssetTable
