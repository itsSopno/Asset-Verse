import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const PackageLimit = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: packageLimit, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['packageLimit', user?.email],
    queryFn: async () => {
      if (!user?.email) return null // safety check
      const result = await axiosSecure.get('/user/packageLimit')
      return result.data.packageLimit
    },
  })

  return [packageLimit, isRoleLoading]
}

export default PackageLimit
