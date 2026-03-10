import { useState } from "react"
import { FiX, FiCopy } from "react-icons/fi"

const GenerateReferralModal = ({ close }) => {

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = "REF-"
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)]
    }
    return code
  }

  const [code, setCode] = useState(generateCode())
  const [discount, setDiscount] = useState("15%")
  const [limit, setLimit] = useState("50")
  const [expiry, setExpiry] = useState("")

  const regenerate = () => {
    setCode(generateCode())
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">

        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20}/>
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-1">
          Generate Referral Code
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Auto-generate a referral coupon code for partner sharing.
        </p>

        {/* GENERATED CODE */}
        <div className="mb-4">
          <label className="text-sm font-medium">Generated Code</label>

          <div className="flex gap-2 mt-1">

            <input
              value={code}
              readOnly
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              onClick={copyCode}
              className="px-3 border rounded-lg hover:bg-gray-50"
            >
              <FiCopy/>
            </button>

            <button
              onClick={regenerate}
              className="px-4 border rounded-lg hover:bg-gray-50"
            >
              Regenerate
            </button>

          </div>
        </div>

        {/* DISCOUNT + LIMIT */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          <div>
            <label className="text-sm font-medium">Discount</label>
            <input
              value={discount}
              onChange={(e)=>setDiscount(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Usage Limit</label>
            <input
              value={limit}
              onChange={(e)=>setLimit(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

        </div>

        {/* EXPIRY */}
        <div className="mb-6">
          <label className="text-sm font-medium">Expiry Date</label>
          <input
            type="date"
            value={expiry}
            onChange={(e)=>setExpiry(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={close}
            className="px-5 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Add Referral
          </button>

        </div>

      </div>
    </div>
  )
}

export default GenerateReferralModal