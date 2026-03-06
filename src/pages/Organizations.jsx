import { useState } from "react"

const Organizations = () => {

  const [search, setSearch] = useState("")

  const [organizations] = useState([
    {
      name: "ABC Pvt Ltd",
      email: "abc@abcpvt.com",
      role: "Buyer",
      sector: "Manufacturing",
      region: "South Asia",
      status: "Active"
    },
    {
      name: "XYZ Traders",
      email: "xyz@xyztraders.com",
      role: "Supplier",
      sector: "Logistics",
      region: "North America",
      status: "Pending"
    },
    {
      name: "Innovate Partners",
      email: "info@innovate.co",
      role: "Both",
      sector: "Technology",
      region: "Europe",
      status: "Active"
    },
    {
      name: "Summit Holdings",
      email: "contact@summit.com",
      role: "Supplier",
      sector: "Energy",
      region: "North America",
      status: "Suspended"
    }
  ])

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase()) ||
    org.email.toLowerCase().includes(search.toLowerCase()) ||
    org.region.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700"
    if (status === "Pending") return "bg-yellow-100 text-yellow-700"
    if (status === "Suspended") return "bg-red-100 text-red-700"
  }

  const getRoleColor = (role) => {
    if (role === "Buyer") return "bg-blue-100 text-blue-700"
    if (role === "Supplier") return "bg-green-100 text-green-700"
    if (role === "Both") return "bg-orange-100 text-orange-700"
  }

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Organizations
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage all registered organizations — Buyers, Suppliers, and their accounts
          </p>
        </div>

        <button className="bg-secondary text-dark px-4 py-2 rounded-lg font-medium hover:opacity-90 transition w-full sm:w-auto">
          + Add Organization
        </button>

      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full sm:w-96 mb-6">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full border-collapse">

            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 text-sm">
                <th className="p-4">Company Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role Type</th>
                <th className="p-4">Sector</th>
                <th className="p-4">Region</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrganizations.map((org, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">

                  <td className="p-4 font-medium whitespace-nowrap">
                    {org.name}
                  </td>

                  <td className="p-4 text-gray-500 whitespace-nowrap">
                    {org.email}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(org.role)}`}>
                      {org.role}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {org.sector}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {org.region}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(org.status)}`}>
                      {org.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Organizations