import { useState } from "react"
import { FiPlus, FiSettings, FiCheckCircle } from "react-icons/fi"

const Workflows = () => {

  const [activeTab, setActiveTab] = useState("visual")

  const workflows = [
    {
      title: "Tender Approval",
      description: "Multi-stage approval process for new tender submissions",
      status: "Active",
      steps: ["Requester", "Manager", "CFO", "CEO"],
      autoSteps: ["CEO"],
      triggers: 45
    },
    {
      title: "Purchase Order Approval",
      description: "Approval flow for purchase orders above threshold",
      status: "Active",
      steps: ["Buyer", "Manager", "Finance"],
      autoSteps: ["Finance"],
      triggers: 23
    },
    {
      title: "Invoice Approval",
      description: "Invoice verification and payment approval",
      status: "Active",
      steps: ["Supplier", "Buyer", "Finance"],
      autoSteps: ["Finance"],
      triggers: 38
    },
    {
      title: "Organization Onboarding",
      description: "Automated onboarding flow for new organizations",
      status: "Draft",
      steps: ["Registration", "Admin Review", "Account Setup"],
      autoSteps: ["Registration", "Account Setup"],
      triggers: 0
    }
  ]

  const statusBadge = (status) =>
    status === "Active"
      ? "bg-primary text-white"
      : "bg-gray-200 text-gray-700"

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Workflows
          </h1>
          <p className="text-gray-500">
            Configure multi-step approval workflows — set step order, responsible roles, and auto-approval conditions
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90">
          <FiPlus /> New Workflow
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {["visual", "table"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm capitalize ${
              activeTab === tab
                ? "bg-white shadow text-primary"
                : "text-gray-500"
            }`}
          >
            {tab === "visual" ? "Visual View" : "Table View"}
          </button>
        ))}
      </div>

      {/* ================= VISUAL VIEW ================= */}
      {activeTab === "visual" && (
        <div className="grid grid-cols-2 gap-6">

          {workflows.map((wf, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">

              {/* Title Row */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-lg font-semibold">{wf.title}</h2>
                  <p className="text-gray-500 text-sm">
                    {wf.description}
                  </p>
                </div>

                <span className={`px-3 py-1 text-xs rounded-full ${statusBadge(wf.status)}`}>
                  {wf.status}
                </span>
              </div>

              {/* Steps Flow */}
              <div className="flex flex-wrap items-center gap-2 my-4">
                {wf.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">

                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-sm">
                      <FiCheckCircle className="text-green-500 text-xs" />
                      {step}
                      {wf.autoSteps.includes(step) && (
                        <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Auto
                        </span>
                      )}
                    </div>

                    {i !== wf.steps.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}

                  </div>
                ))}
              </div>

              <hr className="my-4" />

              {/* Footer */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {wf.triggers} triggers this month
                </span>

                <button className="flex items-center gap-2 text-primary hover:underline">
                  <FiSettings /> Configure
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* ================= TABLE VIEW ================= */}
      {activeTab === "table" && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Workflow</th>
                <th className="p-4 text-left">Steps</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Triggers</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {workflows.map((wf, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">

                  {/* Workflow */}
                  <td className="p-4">
                    <p className="font-semibold text-primary">
                      {wf.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {wf.description}
                    </p>
                  </td>

                  {/* Steps */}
                  <td className="p-4 text-sm text-gray-700">
                    {wf.steps.join("  →  ")}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        wf.status === "Active"
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {wf.status}
                    </span>
                  </td>

                  {/* Triggers */}
                  <td className="p-4 font-medium">
                    {wf.triggers}
                  </td>

                  {/* Action */}
                  <td className="p-4">
                    <button className="flex items-center gap-2 text-primary hover:underline text-sm">
                      <FiSettings />
                      Configure
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  )
}

export default Workflows