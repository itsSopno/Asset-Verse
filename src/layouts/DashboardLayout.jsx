import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex   /* Primary Background Layer */
          bg-[#0f0f1c]
          border-r border-indigo-500/20 shadow-[0_0_40px_rgba(80,80,255,0.35)]

          /* Glass Highlight */
          before:absolute before:inset-0 before:bg-gradient-to-b 
          before:from-white/10 before:to-transparent before:blur-[90px] 
          before:opacity-20 before:pointer-events-none'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
