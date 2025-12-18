import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <td className='px-5 py-5 border-b  border-indigo-400  text-sm'>
        <p className='text-white break-all'>{user?.email}</p>
      </td>

      <td className='px-5 py-5 border-b   text-sm'>
        <span className='px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700'>
          {user?.role}
        </span>
      </td>

      <td className='px-5 py-5 border-b   text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative inline-flex items-center px-4 py-1.5 text-xs font-semibold text-green-900'
        >
          <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative'>Update Role</span>
        </button>

        {/* Modal */}
        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </>
  )
}

export default UserDataRow
