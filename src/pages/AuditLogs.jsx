import { useState } from "react"
import { FiSearch } from "react-icons/fi"

const ComplianceAudit = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState("All Modules")
  const [selectedAction, setSelectedAction] = useState("All Actions")

  const modules = [
    "All Modules",
    "Users",
    "Organizations",
    "Tender",
    "Reports",
    "Settings",
    "Auth",
    "Invoice"
  ]

  const actions = [
    "All Actions",
    "User role updated",
    "Organization suspended",
    "Bid Submitted",
    "Data export requested",
    "Security policy updated",
    "Login attempt failed",
    "Tender created",
    "Invoice approved"
  ]

  const auditLogs = [
    {
      user: "admin@system.com",
      action: "User role updated",
      module: "Users",
      date: "2024-03-20",
      ip: "192.168.1.15",
      severity: "Medium"
    },
    {
      user: "admin@system.com",
      action: "Organization suspended",
      module: "Organizations",
      date: "2024-03-20",
      ip: "192.168.1.15",
      severity: "High"
    },
    {
      user: "sarah@global.com",
      action: "Bid Submitted",
      module: "Tender",
      date: "2024-03-19",
      ip: "10.0.0.45",
      severity: "Low"
    },
    {
      user: "mike@innovate.co",
      action: "Data export requested",
      module: "Reports",
      date: "2024-03-19",
      ip: "172.16.0.22",
      severity: "Medium"
    },
    {
      user: "admin@system.com",
      action: "Security policy updated",
      module: "Settings",
      date: "2024-03-18",
      ip: "192.168.1.15",
      severity: "High"
    }
  ]

  const filteredLogs = auditLogs.filter((log) => {

    const matchUser =
      searchTerm === "" ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchModule =
      selectedModule === "All Modules" ||
      log.module === selectedModule

    const matchAction =
      selectedAction === "All Actions" ||
      log.action === selectedAction

    return matchUser && matchModule && matchAction
  })

  const severityBadge = (level) => {
    if (level === "High") return "bg-primary text-white"
    if (level === "Medium") return "bg-gray-200 text-gray-800"
    return "bg-gray-100 text-gray-600"
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h2 className="text-xl md:text-2xl font-semibold">
        Audit Trail
      </h2>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* SEARCH */}
        <div className="relative w-full md:w-96">

          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search by user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />

        </div>

        {/* MODULE FILTER */}
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-auto"
        >
          {modules.map((m, index) => (
            <option key={index} value={m}>{m}</option>
          ))}
        </select>

        {/* ACTION FILTER */}
        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-auto"
        >
          {actions.map((a, index) => (
            <option key={index} value={a}>{a}</option>
          ))}
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50 text-gray-600 text-sm">

              <tr>
                <th className="p-4 text-left whitespace-nowrap">User</th>
                <th className="p-4 text-left whitespace-nowrap">Action</th>
                <th className="p-4 text-left whitespace-nowrap">Module</th>
                <th className="p-4 text-left whitespace-nowrap">Date</th>
                <th className="p-4 text-left whitespace-nowrap">IP</th>
                <th className="p-4 text-left whitespace-nowrap">Severity</th>
              </tr>

            </thead>

            <tbody>

              {filteredLogs.length > 0 ? (

                filteredLogs.map((log, index) => (

                  <tr key={index} className="border-t hover:bg-gray-50">

                    <td className="p-4 text-gray-600 whitespace-nowrap">
                      {log.user}
                    </td>

                    <td className="p-4 font-medium whitespace-nowrap">
                      {log.action}
                    </td>

                    <td className="p-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-md text-sm whitespace-nowrap">
                        {log.module}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500 whitespace-nowrap">
                      {log.date}
                    </td>

                    <td className="p-4 text-gray-500 whitespace-nowrap">
                      {log.ip}
                    </td>

                    <td className="p-4">

                      <span className={`px-3 py-1 text-xs rounded-full ${severityBadge(log.severity)}`}>
                        {log.severity}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    No records found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default ComplianceAudit