import { FaUserCog, FaUserTag } from 'react-icons/fa'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'
import MenuItem from './MenuItem'
import { LuPackage } from "react-icons/lu";
import { AiFillAppstore } from "react-icons/ai";
import { FaChartArea } from "react-icons/fa";
import  { LuUserRoundCheck } from "react-icons/lu";
const HRMenu = () => {
  return (
    <>
      {/* <MenuItem icon={FaUserCog} label='ALL EMPLOYEE' address='manage-users' /> */}
      <MenuItem
        icon={FaUserTag}
        label='All Requests'
        address='all-Requests'
      />
       <MenuItem
        icon={BsFillHouseAddFill}
        label='Add ASSET'
        address='add-asset'
      />
    
       <MenuItem
            icon={AiFillAppstore}
            label="ASSETS"
            address="/dashboard/plants"
          />
            <MenuItem
            icon={LuPackage}
            label="Package"
            address="all-package"
          />
          
                <MenuItem
            icon={LuUserRoundCheck}
            label="MY EMPLOYEE"
            address="/dashboard/my-em"
          />
            <MenuItem
            icon={FaChartArea}
            label="CHARTS"
            address="/dashboard/hr-charts"
          />
    </>
  )
}

export default HRMenu
