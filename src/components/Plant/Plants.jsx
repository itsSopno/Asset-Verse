import { useState } from "react"
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import PlantsGrid from '../PlantsGrid/PlantsGrid'

const Plantsi = () => {
  const [selectedCompany, setSelectedCompany] = useState('All')

  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/plants`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const companies = ['All', ...new Set(plants.map(p => p.companyName).filter(Boolean))]

  
  const filteredPlants = selectedCompany === 'All'
    ? plants
    : plants.filter(p => p.companyName === selectedCompany)

  return (
    <Container>
    
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-white text-xl font-semibold">Assets</h2>
        <select
          className="px-4 py-2 rounded-lg bg-black text-white focus:outline-none"
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
        >
          {companies.map((company, i) => (
            <option key={i} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

    
      <PlantsGrid plants={filteredPlants} />
    </Container>
  )
}

export default Plantsi
