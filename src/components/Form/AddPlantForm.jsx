import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import gsap from 'gsap'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { imageUpload } from '../../utils'
import LoadingSpinner from '../Shared/LoadingSpinner'
import ErrorPage from '../../pages/ErrorPage'

const AddProductForm = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const formRef = useRef(null)
  const ringRef = useRef(null)

  /* ================= GSAP ANIMATIONS ================= */
  useEffect(() => {
    // Form entrance
    gsap.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    // SVG ring pulse
    gsap.to(ringRef.current, {
      scale: 1.25,
      opacity: 0,
      duration: 1.6,
      repeat: -1,
      ease: 'power1.out',
    })
  }, [])

  /* ================= FORM ================= */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: payload => axiosSecure.post('/plants', payload),
    onSuccess: () => {
      toast.success('Product successfully added to inventory')
      reset()
    },
    onError: () => toast.error('Failed to add product'),
  })

  const onSubmit = async data => {
    try {
      const imageFile = data.productImage[0]
      const imageUrl = await imageUpload(imageFile)

      const payload = {
        productName: data.productName,
        productImage: imageUrl,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        availableQuantity: Number(data.productQuantity),
        companyName: data.companyName,
        hrEmail: user?.email,
        dateAdded: new Date(),
      }

      await mutateAsync(payload)
    } catch (err) {
      toast.error('Image upload failed')
    }
  }

  if (isPending) return <LoadingSpinner />
  if (isError) return <ErrorPage />

  return (
    <div className='min-h-[calc(100vh-60px)] text-white flex items-center justify-center px-4'>
      <div
        ref={formRef}
        className='w-full max-w-4xl rounded-3xl shadow p-8'
      >
        {/* ===== HEADER ===== */}
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative w-14 h-14 flex items-center justify-center'>
            <svg width='56' height='56'>
              <circle
                ref={ringRef}
                cx='28'
                cy='28'
                r='22'
                stroke='#84cc16'
                strokeWidth='2'
                fill='none'
              />
            </svg>
            <span className='absolute text-sm font-semibold text-lime-600'>
              HR
            </span>
          </div>

          <div>
            <h2 className='text-2xl font-semibold'>
              Add Inventory Product
            </h2>
            <p className='text-sm text-gray-500 max-w-md'>
              Register a new company asset into the inventory system.
              Quantity and availability will be tracked automatically.
            </p>
          </div>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Product Name */}
            <div>
              <label className='text-sm text-gray-600'>Product Name</label>
              <input
                className='w-full px-4 py-3 border rounded-md'
                placeholder='e.g. MacBook Pro M2'
                {...register('productName', { required: 'Required' })}
              />
              {errors.productName && (
                <p className='text-xs text-red-500'>
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className='text-sm text-gray-600'>Company Name</label>
              <input
                className='w-full px-4 py-3 border rounded-md'
                placeholder='e.g. PixelSoft'
                {...register('companyName', { required: 'Required' })}
              />
            </div>

            {/* Type */}
            <div>
              <label className='text-sm text-gray-600'>Product Type</label>
              <select
                className='w-full px-4 py-3 border rounded-md'
                {...register('productType', { required: 'Required' })}
              >
                <option value=''>Select type</option>
                <option value='Returnable'>Returnable</option>
                <option value='Non-returnable'>Non-returnable</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className='text-sm text-gray-600'>Total Quantity</label>
              <input
                type='number'
                className='w-full px-4 py-3 border rounded-md'
                {...register('productQuantity', {
                  required: 'Required',
                  min: 1,
                })}
              />
            </div>

            {/* HR Email */}
            <div className='md:col-span-2'>
              <label className='text-sm text-black'>HR Email</label>
              <input
                readOnly
                value={user?.email || ''}
                className='w-full px-4 py-3 border rounded-md bg-gray-100 cursor-not-allowed'
              />
              <p className='text-xs text-gray-400 mt-1'>
                This email is automatically assigned from your account.
              </p>
            </div>

            {/* Image */}
            <div className='md:col-span-2'>
              <label className='text-sm text-gray-600'>Product Image</label>
              <input
                type='file'
                accept='image/*'
                {...register('productImage', { required: 'Required' })}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type='submit'
            className='mt-8 w-full py-3 rounded-xl bg-indigo-400 text-white font-medium shadow hover:shadow-md transition'
          >
            {isPending ? (
              <TbFidgetSpinner className='animate-spin mx-auto' />
            ) : (
              'Add Product to Inventory'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProductForm
