
import axios from 'axios'

export const getEmployeeAffiliations = async (token) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/employee-affiliations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data
}
