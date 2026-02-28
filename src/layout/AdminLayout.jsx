import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-light">
        {/* <Navbar /> */}
 <Topbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout