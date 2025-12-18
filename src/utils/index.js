import axios from 'axios'

export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return data?.data?.display_url
}

// upload image using cloudinary
// example post endpoint: https://api.cloudinary.com/v1_1/<cloud name>/image/upload
export const imageUploadCloudinary = async imageData => {
  const formData = new FormData()
  formData.append('file', imageData)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  )

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    formData
  )
  return data.secure_url
}

// save or update user in db
export const saveOrUpdateUser = async userData => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  )
  return data
}
