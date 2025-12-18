import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useEmployeeLimit = (planId) => {
  const axiosSecure = useAxiosSecure()
  const { data = null, isLoading } = useQuery({
    enabled: !!planId,
    queryKey: ['employeeLimit', planId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/plans/${planId}`)
      return res.data.employeeLimit
    },
  })
  return [data, isLoading]
}

export default useEmployeeLimit
