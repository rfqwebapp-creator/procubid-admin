import { FiSearch, FiBell, FiMenu } from "react-icons/fi"

const Topbar = ({ openSidebar }) => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4 sm:px-6">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 w-full md:w-1/2">

        {/* Mobile Menu Button */}
        <FiMenu
          className="text-gray-600 cursor-pointer md:hidden"
          size={22}
          onClick={openSidebar}
        />

        {/* Search */}
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="hidden sm:flex items-center gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FiBell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-secondary text-dark flex items-center justify-center font-bold">
            AD
          </div>
        </div>

      </div>
    </div>
  )
}

export default Topbar