import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const MobileData = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  return (
    <div className='border-b border-gray-800 hover:bg-[#1a1a2e]/50 rounded-xl shadow-md p-4 space-y-4'>
      {/* EMAIL */}
      <div>
        <p className='text-xs text-gray-500'>Email</p>
        <p className='text-sm font-medium break-all text-gray-900'>
          {user?.email}
        </p>
      </div>

      {/* ROLE */}
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xs text-gray-500'>Role</p>
          <span className='inline-block mt-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700'>
            {user?.role}
          </span>
        </div>

        {/* ACTION */}
        <button
          onClick={() => setIsOpen(true)}
          className='px-4 py-2 text-xs font-semibold text-green-900 bg-green-200 rounded-full'
        >
          Update Role
        </button>
      </div>

      {/* MODAL */}
      <UpdateUserRoleModal
        user={user}
        refetch={refetch}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  )
}

export default MobileData
