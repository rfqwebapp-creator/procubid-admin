import { useState } from "react"
import { FiSearch, FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi"
import EditRoleModal from "./forms/EditRoleModal" // NEW

const Users = () => {

  const [activeTab, setActiveTab] = useState("users")
  const [search, setSearch] = useState("")

  const [selectedRole, setSelectedRole] = useState(null) // NEW

  const users = [
    {
      name: "John Mitchell",
      email: "john@techcorp.com",
      role: "Admin",
      organization: "ABC Pvt Ltd",
      status: "Active",
      lastLogin: "2 hrs ago"
    },
    {
      name: "Sarah Chen",
      email: "sarah@global.com",
      role: "Buyer",
      organization: "ABC Pvt Ltd",
      status: "Active",
      lastLogin: "1 day ago"
    },
    {
      name: "Mike Johnson",
      email: "mike@innovate.co",
      role: "Supplier",
      organization: "XYZ Traders",
      status: "Active",
      lastLogin: "5 hrs ago"
    },
    {
      name: "Emily Davis",
      email: "emily@pacific.com",
      role: "Buyer",
      organization: "Pacific Trading",
      status: "Blocked",
      lastLogin: "30 days ago"
    }
  ]

  const roles = [
    {
      name: "Admin",
      description: "Full system access",
      module: "All Modules",
      permissions: ["create_tender", "submit_bid", "approve_invoice", "+2"]
    },
    {
      name: "Buyer",
      description: "Tender and PO management",
      module: "Tender, PO",
      permissions: ["create_tender", "approve_invoice", "view_reports"]
    },
    {
      name: "Supplier",
      description: "Bid and Invoice management",
      module: "Bid, Invoice",
      permissions: ["submit_bid", "create_invoice", "view_reports"]
    }
  ]

  const permissions = [
    { name: "create_tender", module: "Tender", roles: ["Admin", "Buyer"] },
    { name: "submit_bid", module: "Tender", roles: ["Admin", "Supplier"] },
    { name: "approve_invoice", module: "Invoice", roles: ["Admin", "Buyer"] },
    { name: "create_invoice", module: "Invoice", roles: ["Supplier"] },
    { name: "manage_users", module: "Users", roles: ["Admin"] },
    { name: "view_reports", module: "Reports", roles: ["Admin", "Buyer", "Supplier"] },
    { name: "approve_po", module: "Purchase Order", roles: [] },
    { name: "manage_workflows", module: "Workflow", roles: [] }
  ]

  const getRoleColor = (role) => {
    if (role === "Admin") return "bg-teal-100 text-teal-700"
    if (role === "Buyer") return "bg-blue-100 text-blue-700"
    if (role === "Supplier") return "bg-orange-100 text-orange-700"
  }

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700"
    if (status === "Blocked") return "bg-red-100 text-red-700"
  }

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  // NEW
  const handleDeleteRole = (roleName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this role?")
    if (!confirmDelete) return

    console.log("Deleted role:", roleName)
  }

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          Users & Roles
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Manage user accounts, assign roles and configure permissions
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
            activeTab === "users"
              ? "bg-white shadow text-primary"
              : "text-gray-500"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
            activeTab === "roles"
              ? "bg-white shadow text-primary"
              : "text-gray-500"
          }`}
        >
          Role Management
        </button>

        <button
          onClick={() => setActiveTab("permissions")}
          className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
            activeTab === "permissions"
              ? "bg-white shadow text-primary"
              : "text-gray-500"
          }`}
        >
          Permissions
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === "users" && (
        <>
          {/* SEARCH */}
          <div className="relative w-full sm:w-96 mb-6">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

            <table className="min-w-[700px] w-full">

              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr className="text-left">
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Login</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">

                    <td className="p-4">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {user.name[0]}
                        </div>

                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>

                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.organization}
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.lastLogin}
                    </td>

                    <td className="p-4">
                      <FiMoreHorizontal className="text-gray-500 cursor-pointer" />
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </>
      )}

      {/* ROLE TAB */}
      {activeTab === "roles" && (

        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

          <table className="min-w-[800px] w-full">

            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr className="text-left">
                <th className="p-4">Role</th>
                <th className="p-4">Description</th>
                <th className="p-4">Module</th>
                <th className="p-4">Permissions</th>
                <th className="p-4 text-center">Edit</th>
                <th className="p-4 text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">

                  <td className="p-4 font-medium">{role.name}</td>

                  <td className="p-4 text-gray-600">{role.description}</td>

                  <td className="p-4">{role.module}</td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((perm, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 px-2 py-1 rounded text-xs"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <FiEdit2
                      onClick={() => setSelectedRole(role)} // NEW
                      className="text-blue-600 cursor-pointer"
                    />
                  </td>

                  <td className="p-4 text-center">
                    <FiTrash2
                      onClick={() => handleDeleteRole(role.name)} // NEW
                      className="text-red-600 cursor-pointer"
                    />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      {/* PERMISSIONS TAB */}
      {activeTab === "permissions" && (

        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

          <table className="min-w-[700px] w-full">

            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr className="text-left">
                <th className="p-4">Permission</th>
                <th className="p-4">Module</th>
                <th className="p-4">Assigned Roles</th>
              </tr>
            </thead>

            <tbody>
              {permissions.map((perm, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">

                  <td className="p-4 font-mono">{perm.name}</td>

                  <td className="p-4 text-gray-600">{perm.module}</td>

                  <td className="p-4 flex gap-2 flex-wrap">
                    {perm.roles.map((role, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-xs ${getRoleColor(role)}`}
                      >
                        {role}
                      </span>
                    ))}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      )}

      {/* EDIT ROLE MODAL */}
      {selectedRole && (
        <EditRoleModal
          role={selectedRole}
          close={() => setSelectedRole(null)}
        />
      )}

    </div>
  )
}

export default Users