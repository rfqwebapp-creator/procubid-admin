import { FiX } from "react-icons/fi"

const TenderDetailsModal = ({ tender, close }) => {

  if (!tender) return null

  const statusColor = (status) => {
    if (status === "Open") return "bg-green-100 text-green-700"
    if (status === "Closed") return "bg-gray-200 text-gray-700"
    if (status === "Paused") return "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">

        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20}/>
        </button>

        <h2 className="text-xl font-semibold">{tender.title}</h2>
        <p className="text-gray-500 mb-4">{tender.id}</p>

        <p className="text-gray-600 mb-6">
          Supply of ergonomic office equipment and related services.
        </p>

        <hr className="mb-6"/>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">Buyer</p>
            <p className="font-medium">{tender.buyer}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span className={`px-3 py-1 rounded-full text-xs ${statusColor(tender.status)}`}>
              {tender.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Estimated Value</p>
            <p className="font-medium">$45,000</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Deadline</p>
            <p className="font-medium">{tender.deadline}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total Bids</p>
            <p className="font-medium">{tender.bids}</p>
          </div>

        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={close}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default TenderDetailsModal