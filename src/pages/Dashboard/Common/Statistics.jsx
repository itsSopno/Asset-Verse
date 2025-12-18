import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import CustomerStatistics from '../../../components/Dashboard/Statistics/CustomerStatistics'
import SellerStatistics from '../../../components/Dashboard/Statistics/SellerStatistics'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
  return (
    <div>
      {role === 'customer' && <CustomerStatistics />}
      {role === 'seller' && <SellerStatistics />}
      {role === 'admin' && <AdminStatistics />}
    </div>
  )
}

export default Statistics
