import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdatePlantModal'

const AssignedAssetRow = ({ plant }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const openDelete = () => setIsDeleteOpen(true)
  const closeDelete = () => setIsDeleteOpen(false)

  const {
    assetImage,
    assetName,
    assetType,
    employeeName,
    employeeEmail,
    assignmentDate,
    returnDate,
    status,
  } = plant

  return (
    <tr className="bg-[#0F172A] hover:bg-[#1A2238] transition-all duration-200 rounded-lg">
      {/* Image */}
      <td className="px-4 py-4 text-sm">
        <div className="flex items-center">
          <img
            src={assetImage}
            alt={assetName}
            className="h-12 w-16 rounded-lg object-cover border border-white/10"
          />
        </div>
      </td>

      {/* Asset Name */}
      <td className="px-4 py-4 text-sm text-white font-medium">{assetName}</td>

      {/* Type */}
      <td className="px-4 py-4 text-sm text-gray-300">{assetType}</td>

      {/* Assigned To */}
      <td className="px-4 py-4 text-sm text-gray-300">
        {employeeName} <span className="text-xs text-gray-400">({employeeEmail})</span>
      </td>

      {/* Assignment Date */}
      <td className="px-4 py-4 text-sm text-gray-300">
        {new Date(assignmentDate).toLocaleDateString()}
      </td>

      {/* Return Date */}
      <td className="px-4 py-4 text-sm text-gray-300">
        {returnDate ? new Date(returnDate).toLocaleDateString() : '—'}
      </td>

      {/* Status */}
      <td className="px-4 py-4 text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'assigned'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-sm flex gap-2">
        {/* Delete */}
        <button
          onClick={openDelete}
          className="px-3 py-1 rounded-lg text-xs font-medium
          bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition"
        >
          Delete
        </button>
        <DeleteModal isOpen={isDeleteOpen} closeModal={closeDelete} />

        {/* Update */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-3 py-1 rounded-lg text-xs font-medium
          bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition"
        >
          Update
        </button>
        <UpdatePlantModal isOpen={isEditOpen} setIsEditModalOpen={setIsEditOpen} />
      </td>
    </tr>
  )
}

export default AssignedAssetRow
