import { NavLink } from "react-router-dom"
import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiDollarSign,
  FiSettings,
  FiShield,
  FiClipboard,
  FiLayers,
  FiLogOut
} from "react-icons/fi"

import logo from "../assets/logo.jpg"

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="w-60 bg-primary text-white h-full min-h-screen flex flex-col px-5 py-6">

      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
        <div>
          <h1 className="text-lg font-bold">PROCUBID</h1>
          <p className="text-xs text-gray-300">Admin Panel</p>
        </div>
      </div>

      {/* MAIN */}
      <p className="text-xs uppercase text-gray-300 mb-3 tracking-wider">
        Main
      </p>

      <nav className="flex flex-col gap-1">

        <NavLink
          to="/"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiGrid size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/organizations"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiUsers size={18} />
          Organizations
        </NavLink>

        <NavLink
          to="/users"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiLayers size={18} />
          Users & Roles
        </NavLink>

        <NavLink
          to="/tenders"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiFileText size={18} />
          Tenders
        </NavLink>

        <NavLink
          to="/pricing"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiDollarSign size={18} />
          Pricing
        </NavLink>

      </nav>

      {/* SYSTEM */}
      <p className="text-xs uppercase text-gray-300 mt-8 mb-3 tracking-wider">
        System
      </p>

      <nav className="flex flex-col gap-1">

        <NavLink
          to="/workflows"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiClipboard size={18} />
          Workflows
        </NavLink>

        <NavLink
          to="/audit-logs"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiShield size={18} />
          Compliance & Audit
        </NavLink>

        <NavLink
          to="/settings"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
            ${isActive
              ? "bg-secondary text-dark font-medium"
              : "hover:bg-secondary hover:text-dark"}`
          }
        >
          <FiSettings size={18} />
          Settings
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <div className="mt-auto pt-10">
        <button
          onClick={closeSidebar}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  )
}

export default Sidebar