
import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 rounded-lg transition-colors duration-300 transform
         hover:bg-indigo-500/10 hover:text-white
         ${isActive ? 'bg-indigo-500/20 text-white' : 'text-gray-300'}`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="ml-3 font-medium">{label}</span>
    </NavLink>
  )
}

export default MenuItem
