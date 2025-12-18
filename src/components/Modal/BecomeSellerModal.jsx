import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../../providers/AuthContext'
const BecomeSellerModal = ({ closeModal, isOpen, product }) => {
  const axiosSecure = useAxiosSecure()
const {user} = useContext(AuthContext)
  const handleRequest = async () => {
    const requestData = {
      seller: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL
      },
      product: {
        id: product._id,
        name: product.productName,
        image: product.productImage,
        type: product.type,
        hr:product.hrEmail
      },
      status: "pending",
      requestDate: new Date()
    }

    try {
      await axiosSecure.post('/asset-permission', requestData)
      toast.success('Permission request sent!')
    } catch (err) {
      toast.error(err?.response?.data?.message)
    } finally {
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10' onClose={closeModal}>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md bg-white p-6 shadow-xl rounded-2xl'>
            <DialogTitle className='text-lg font-medium text-center'>
              Permission Request
            </DialogTitle>

            <div className='mt-4 text-center text-gray-600'>
              <p>Do you want permission for this asset?</p>
            </div>

            <div className='flex mt-6 justify-around'>
              <button
                onClick={handleRequest}
                className='cursor-pointer bg-green-100 px-4 py-2 rounded-md font-medium text-green-900 hover:bg-green-200'
              >
                Yes
              </button>

              <button
                onClick={closeModal}
                className='cursor-pointer bg-red-100 px-4 py-2 rounded-md font-medium text-red-900 hover:bg-red-200'
              >
                No
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default BecomeSellerModal
