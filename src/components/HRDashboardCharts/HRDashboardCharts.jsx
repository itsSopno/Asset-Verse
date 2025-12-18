import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const COLORS = ['#34D399', '#F87171'] 

const HRDashboardCharts = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  // ===== Assigned Assets =====
  const { data: assignedAssets = [], isLoading: assignedLoading } = useQuery({
    queryKey: ['assigned-assets', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/assigned-assets')
      return res.data
    },
  })

  // ===== Asset Requests =====
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['asset-permission-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/asset-permission')
      return res.data
    },
  })

  if (assignedLoading || requestsLoading) return <LoadingSpinner />

  // ===== Pie Chart Data =====
  const pieData = [
    {
      name: 'Returnable',
      value: assignedAssets.filter(a => a.assetType?.toLowerCase() === 'returnable').length
    },
    {
      name: 'Non-returnable',
      value: assignedAssets.filter(a => a.assetType?.toLowerCase() === 'non-returnable').length
    }
  ]

  // ===== Bar Chart Data =====
  const requestCountMap = {}
  requests.forEach(r => {
    const name = r.product?.name || 'Unknown'
    requestCountMap[name] = (requestCountMap[name] || 0) + 1
  })

  const barData = Object.entries(requestCountMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 min-h-screen bg-transparent">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg flex flex-col items-center">
        <h3 className="text-white font-bold mb-4 text-center">Returnable vs Non-returnable</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1A2238', border: 'none', color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg flex flex-col items-center">
        <h3 className="text-white font-bold mb-4 text-center">Top 5 Requested Assets</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#CBD5E1" tick={{ fontSize: 12 }} />
            <YAxis stroke="#CBD5E1" />
            <Tooltip contentStyle={{ backgroundColor: '#1A2238', border: 'none', color: '#fff' }} />
            <Legend />
            <Bar dataKey="count" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HRDashboardCharts
