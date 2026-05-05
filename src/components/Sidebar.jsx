import { NavLink } from "react-router-dom"
import { useState } from "react"
import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiDollarSign,
  FiSettings,
  FiShield,
  FiClipboard,
  FiLayers,
  FiLogOut,
  FiUserCheck
} from "react-icons/fi"

import logo from "../assets/logo.jpg"

const Sidebar = ({ closeSidebar }) => {
  const [showFeatureLockedModal, setShowFeatureLockedModal] = useState(false)

  return (
    <div className="w-64 bg-primary text-white h-screen flex flex-col px-5 py-6 overflow-y-auto">

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
          to="/dashboard"
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

        {/* NEW EMPLOYEE SECTION */}

        <button
          type="button"
          onClick={() => setShowFeatureLockedModal(true)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-secondary hover:text-dark text-left"
        >
          <FiUserCheck size={18} />
          Employee Details
        </button>

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

      {showFeatureLockedModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              Feature Locked
              <span className="text-2xl">🔒</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Kindly mail us to
              <a href="mailto:hello@procubid.com" className="text-blue-600 hover:underline font-medium">
                hello@procubid.com
              </a>
              to activate this segment/feature.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowFeatureLockedModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <a
                href="mailto:hello@procubid.com"
                className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800"
              >
                Mail Now
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Sidebar