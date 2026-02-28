import { useState } from "react"
import {
  FiSearch,
  FiCheckCircle,
  FiShield,
  FiAlertTriangle,
  FiFileText
} from "react-icons/fi"

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

  // ✅ FILTER LOGIC
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
    <div className="p-6">

      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">
          Compliance & Audit
        </h1>
        <p className="text-gray-500">
          Full audit trail — no record deletion, all status changes logged, all transactions traceable
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <FiCheckCircle className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold">98.5%</h2>
            <p className="text-gray-500 text-sm">Compliance Score</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <FiShield className="text-primary text-3xl" />
          <div>
            <h2 className="text-xl font-bold">8</h2>
            <p className="text-gray-500 text-sm">Audit Events</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <FiAlertTriangle className="text-yellow-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold">3</h2>
            <p className="text-gray-500 text-sm">Open Violations</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <FiFileText className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold">12</h2>
            <p className="text-gray-500 text-sm">Reports Generated</p>
          </div>
        </div>

      </div>

      {/* ================= AUDIT TRAIL ================= */}
      <h2 className="text-lg font-semibold mb-4">Audit Trail</h2>

      {/* FILTER BAR */}
      <div className="flex gap-4 mb-6">

        <div className="relative w-96">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {modules.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {actions.map((a, i) => (
            <option key={i} value={a}>{a}</option>
          ))}
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Module</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">IP</th>
              <th className="p-4 text-left">Severity</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-gray-600">{log.user}</td>
                  <td className="p-4 font-medium">{log.action}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{log.date}</td>
                  <td className="p-4 text-gray-500">{log.ip}</td>
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
  )
}

export default ComplianceAudit