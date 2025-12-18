import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

import { useState } from "react";

// Icons
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { MdHome } from "react-icons/md";
import { AiFillAppstore } from "react-icons/ai";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import EmployeeMenu from "./Menu/SellerMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();
  const navigate = useNavigate();

  if (isRoleLoading) return <LoadingSpinner />;

  const backhome = () => navigate("/");

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center px-5 py-4 bg-[#0f0f1c]/90 backdrop-blur-xl border-b border-white/10">
        <h1 className="text-2xl font-extrabold tracking-wider bg-gradient-to-r 
                     from-indigo-300 via-white to-indigo-300 
                     bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(255,255,255,0.3)]">
          ASSET<span className="text-indigo-400">VERSE</span>
        </h1>
        <button onClick={() => setActive(!isActive)} className="text-white">
          <AiOutlineBars size={26} />
        </button>
      </div>

      {/* SIDEBAR */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -260, rotateY: -15, opacity: 0 }}
          animate={{ x: 0, rotateY: 0, opacity: 1 }}
          exit={{ x: -260, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`
            fixed left-0 top-0 z-40 
            w-72 h-screen flex flex-col justify-between
            px-5 py-8 
            bg-[#0c0c18]/95 backdrop-blur-2xl
            shadow-[0_0_40px_rgba(80,80,255,0.4)]
            border-r border-indigo-500/20
            transform transition-all duration-300
            ${isActive ? "-translate-x-full" : "translate-x-0"}
            md:translate-x-0
          `}
        >
          {/* GLASS OVERLAY GLOW */}
          <div className="absolute inset-0 opacity-30 pointer-events-none 
                          bg-gradient-to-b from-white/10 to-transparent blur-[100px]" />

          {/* HEADER */}
          <div className="relative mb-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[26px] font-extrabold tracking-widest
              bg-gradient-to-r from-indigo-300 via-white to-indigo-300 
              bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              ASSET<span className="text-indigo-400">VERSE</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-[2px] bg-gradient-to-r from-indigo-500 to-indigo-300 mx-auto rounded-full"
            />
          </div>

          {/* MENU AREA */}
          <div className="flex flex-col gap-7 overflow-y-auto relative">

            {/* ANIMATED SECTION TITLE */}
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 0.8 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold tracking-[0.2em] text-indigo-200/70 pl-2"
            >
              MAIN PANEL
            </motion.h2>

            {/* DASHBOARD */}
            <motion.div
              whileHover={{ scale: 1.04, x: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
                <MenuItem
            icon={AiFillAppstore}
            label="ASSETS lIST"
            address="/dashboard/plantsi"
          />
            </motion.div>

            {/* ROLE MENUS */}
            <div className="flex flex-col gap-1">
              {role === "customer" && <CustomerMenu />}
              {role === "hr" && <AdminMenu />}
              {role === "employee" && <EmployeeMenu />}
            </div>

            {/* OPTIONAL BLOCK PLACEHOLDER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                bg-white/5 backdrop-blur-xl border border-white/10 
                rounded-xl p-2 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.08)]
              "
            >
            </motion.div>
          </div>

          {/* FOOTER AREA */}
          <div className="mt-8 border-t border-white/10 pt-6 flex flex-col gap-4">

            {/* SETTINGS */}
            <motion.div whileHover={{ scale: 1.03, x: 8 }}>
              <MenuItem
                icon={FiSettings}
                label="Profile Settings"
                address="/dashboard/profile"
              />
            </motion.div>

            {/* LOGOUT */}
            <motion.button
              whileHover={{ scale: 1.05, x: 6 }}
              whileTap={{ scale: 0.95 }}
              onClick={logOut}
              className="
                flex items-center gap-3 w-full
                px-5 py-3 rounded-xl
                bg-indigo-500/10 hover:bg-indigo-500/20 
                text-white/80 hover:text-white 
                backdrop-blur-lg border border-indigo-300/10 
                transition-all duration-200
              "
            >
              <GrLogout />
              <span className="font-medium tracking-wide">Logout</span>
            </motion.button>

            {/* HOME BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05, x: 6 }}
              whileTap={{ scale: 0.95 }}
              onClick={backhome}
              className="
                flex items-center gap-3 w-full
                px-5 py-3 rounded-xl
                bg-indigo-500/10 hover:bg-indigo-500/20 
                text-white/80 hover:text-white 
                backdrop-blur-lg border border-indigo-300/10 
                transition-all duration-200
              "
            >
              <MdHome />
              HOME
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
