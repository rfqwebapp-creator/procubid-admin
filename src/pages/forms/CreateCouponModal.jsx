import { useState } from "react"
import { FiX } from "react-icons/fi"

const CreateCouponModal = ({ close }) => {

  const [couponCode, setCouponCode] = useState("")
  const [discountType, setDiscountType] = useState("Percentage")
  const [discountValue, setDiscountValue] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [usageLimit, setUsageLimit] = useState("100")
  const [status, setStatus] = useState("Active")

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20}/>
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-1">
          Create Coupon
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Add a new discount coupon for subscriptions.
        </p>

        {/* COUPON CODE */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Coupon Code
          </label>

          <input
            type="text"
            placeholder="e.g. SUMMER25"
            value={couponCode}
            onChange={(e)=>setCouponCode(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* DISCOUNT TYPE + VALUE */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          <div>
            <label className="text-sm font-medium">
              Discount Type
            </label>

            <select
              value={discountType}
              onChange={(e)=>setDiscountType(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Percentage</option>
              <option>Fixed</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Discount Value
            </label>

            <input
              type="text"
              placeholder="e.g. 10%"
              value={discountValue}
              onChange={(e)=>setDiscountValue(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

        </div>

        {/* EXPIRY + LIMIT */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          <div>
            <label className="text-sm font-medium">
              Expiry Date
            </label>

            <input
              type="date"
              value={expiryDate}
              onChange={(e)=>setExpiryDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Usage Limit
            </label>

            <input
              type="number"
              value={usageLimit}
              onChange={(e)=>setUsageLimit(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

        </div>

        {/* STATUS */}
        <div className="mb-6">
          <label className="text-sm font-medium">
            Status
          </label>

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={close}
            className="px-5 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button className="px-5 py-2 bg-primary text-white rounded-lg hover:opacity-90">
            Create Coupon
          </button>

        </div>

      </div>

    </div>
  )
}

export default CreateCouponModal