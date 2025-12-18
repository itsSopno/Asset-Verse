import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
import { FiSettings } from 'react-icons/fi'
import  { LuUserRoundCheck } from "react-icons/lu";
import { HiSearch } from "react-icons/hi";
const EmployeeMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdHomeWork}
        label='My-INVENTORY'
        address='MY-inventory'
      />
  
      <MenuItem
        icon={HiSearch}
        label='My HISTORY'
        address='MYTEAM'
      />
       <MenuItem
        icon={LuUserRoundCheck}
        label='My TEAM'
        address='MY-TEAM'
      />
       
       
    </>
  )
}

export default EmployeeMenu
