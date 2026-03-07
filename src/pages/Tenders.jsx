import { useState } from "react"
import { FiSearch, FiEye } from "react-icons/fi"
import { FaClock, FaFileAlt, FaTruck, FaDollarSign } from "react-icons/fa"

const Tenders = () => {

  const [activeTab, setActiveTab] = useState("tenders")
  const [search, setSearch] = useState("")

  const summary = {
    openTenders: 2,
    totalBids: 5,
    purchaseOrders: 3,
    invoices: 3
  }

  const tenders = [
    {
      title: "100 Chairs",
      id: "TND-001",
      buyer: "ABC Pvt Ltd",
      status: "Open",
      deadline: "Feb 25, 2024",
      bids: 12
    },
    {
      title: "IT Infrastructure Upgrade",
      id: "TND-002",
      buyer: "Pacific Trading",
      status: "Closed",
      deadline: "Mar 15, 2024",
      bids: 15
    },
    {
      title: "Office Supplies Contract",
      id: "TND-003",
      buyer: "Innovate Partners",
      status: "Paused",
      deadline: "Mar 30, 2024",
      bids: 8
    },
    {
      title: "Cloud Migration Services",
      id: "TND-004",
      buyer: "Alpha Dynamics",
      status: "Open",
      deadline: "Apr 20, 2024",
      bids: 5
    }
  ]

  const bids = [
    { id: "TND-001", supplier: "XYZ Traders", amount: "$4,500", status: "Submitted", date: "Feb 18, 2024" },
    { id: "TND-001", supplier: "Summit Holdings", amount: "$4,200", status: "Shortlisted", date: "Feb 19, 2024" },
    { id: "TND-002", supplier: "Alpha Dynamics", amount: "$120,000", status: "Awarded", date: "Mar 5, 2024" },
    { id: "TND-002", supplier: "XYZ Traders", amount: "$135,000", status: "Rejected", date: "Mar 6, 2024" },
    { id: "TND-004", supplier: "Innovate Partners", amount: "$85,000", status: "Submitted", date: "Apr 10, 2024" }
  ]

  const purchaseOrders = [
    { id: "PO-001", buyer: "Pacific Trading", supplier: "Alpha Dynamics", amount: "$120,000", status: "Completed", created: "Mar 20, 2024" },
    { id: "PO-002", buyer: "ABC Pvt Ltd", supplier: "Summit Holdings", amount: "$4,200", status: "Approved", created: "Mar 1, 2024" },
    { id: "PO-003", buyer: "Innovate Partners", supplier: "XYZ Traders", amount: "$28,500", status: "Pending", created: "Apr 1, 2024" }
  ]

  const invoices = [
    { id: "INV-2024-0045", poRef: "PO-001", amount: "$120,000", status: "Paid", date: "Mar 25, 2024" },
    { id: "INV-2024-0046", poRef: "PO-002", amount: "$4,200", status: "Pending", date: "Mar 10, 2024" },
    { id: "INV-2024-0047", poRef: "PO-003", amount: "$28,500", status: "Overdue", date: "Apr 5, 2024" }
  ]

  const statusColor = (status) => {
    switch (status) {
      case "Open":
      case "Shortlisted":
      case "Completed":
      case "Approved":
      case "Awarded":
      case "Paid":
        return "bg-primary text-white"

      case "Submitted":
      case "Pending":
        return "bg-gray-100 text-gray-700"

      case "Closed":
        return "bg-gray-300 text-gray-800"

      case "Paused":
        return "bg-gray-200 text-gray-700"

      case "Rejected":
      case "Overdue":
        return "bg-red-600 text-white"

      default:
        return "bg-gray-100"
    }
  }

  const filteredTenders = tenders.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Tenders & Transactions
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Monitor all tenders, bids, purchase orders, invoices and payments
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <SummaryCard icon={<FaClock />} count={summary.openTenders} label="Open Tenders" color="bg-green-100 text-green-600" />
        <SummaryCard icon={<FaFileAlt />} count={summary.totalBids} label="Total Bids" color="bg-blue-100 text-blue-600" />
        <SummaryCard icon={<FaTruck />} count={summary.purchaseOrders} label="Purchase Orders" color="bg-green-100 text-green-600" />
        <SummaryCard icon={<FaDollarSign />} count={summary.invoices} label="Invoices" color="bg-yellow-100 text-yellow-600" />

      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg w-fit">

        {["tenders", "bids", "purchase", "invoices"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm capitalize whitespace-nowrap ${
              activeTab === tab
                ? "bg-white shadow text-primary"
                : "text-gray-500"
            }`}
          >
            {tab === "purchase"
              ? "Purchase Orders"
              : tab === "invoices"
              ? "Invoices & Payments"
              : tab}
          </button>
        ))}

      </div>

      {/* SEARCH */}
      {activeTab === "tenders" && (
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tenders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

        {/* TENDERS */}
        {activeTab === "tenders" && (
          <TableWrapper headers={["Tender","Buyer","Status","Deadline","Bids","Action"]}>
            {filteredTenders.map((t,i)=>(
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm text-gray-500">{t.id}</p>
                </td>
                <td className="p-4">{t.buyer}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColor(t.status)}`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4">{t.deadline}</td>
                <td className="p-4">{t.bids}</td>
                <td className="p-4 flex items-center gap-2 text-primary cursor-pointer">
                  <FiEye /> View
                </td>
              </tr>
            ))}
          </TableWrapper>
        )}

        {/* BIDS */}
        {activeTab === "bids" && (
          <TableWrapper headers={["Tender ID","Supplier","Quoted Amount","Status","Submitted At"]}>
            {bids.map((b,i)=>(
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 text-primary font-medium">{b.id}</td>
                <td className="p-4">{b.supplier}</td>
                <td className="p-4 font-mono">{b.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColor(b.status)}`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4">{b.date}</td>
              </tr>
            ))}
          </TableWrapper>
        )}

        {/* PURCHASE */}
        {activeTab === "purchase" && (
          <TableWrapper headers={["PO #","Buyer","Supplier","Amount","Status","Created"]}>
            {purchaseOrders.map((po,i)=>(
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 text-primary font-medium">{po.id}</td>
                <td className="p-4">{po.buyer}</td>
                <td className="p-4">{po.supplier}</td>
                <td className="p-4 font-mono">{po.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColor(po.status)}`}>
                    {po.status}
                  </span>
                </td>
                <td className="p-4">{po.created}</td>
              </tr>
            ))}
          </TableWrapper>
        )}

        {/* INVOICES */}
        {activeTab === "invoices" && (
          <TableWrapper headers={["Invoice #","PO Reference","Amount","Payment Status","Submitted At"]}>
            {invoices.map((inv,i)=>(
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{inv.id}</td>
                <td className="p-4 text-primary font-medium">{inv.poRef}</td>
                <td className="p-4 font-mono">{inv.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColor(inv.status)}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4">{inv.date}</td>
              </tr>
            ))}
          </TableWrapper>
        )}

        </div>

      </div>

    </div>
  )
}

const SummaryCard = ({ icon, count, label, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg text-lg ${color}`}>
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-bold">{count}</h2>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  </div>
)

const TableWrapper = ({ headers, children }) => (
  <table className="min-w-full">
    <thead className="bg-gray-50 text-gray-600 text-sm">
      <tr>
        {headers.map((h, i) => (
          <th key={i} className="p-4 text-left whitespace-nowrap">{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
)

export default Tenders