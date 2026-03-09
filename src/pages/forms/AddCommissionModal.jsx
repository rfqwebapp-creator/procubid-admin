import { useState } from "react"
import { FiX } from "react-icons/fi"

const AddCommissionModal = ({ close }) => {

  const [form, setForm] = useState({
    percentage: "",
    effectiveDate: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Commission Data:", form)

    close()
  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20}/>
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-1">
          Add Commission Rate
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Set a new platform commission rate with an effective date.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* COMMISSION PERCENTAGE */}
          <div>
            <label className="text-sm font-medium">
              Commission Percentage
            </label>

            <input
              type="text"
              name="percentage"
              placeholder="e.g. 3.5%"
              value={form.percentage}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* EFFECTIVE DATE */}
          <div>
            <label className="text-sm font-medium">
              Effective From
            </label>

            <input
              type="date"
              name="effectiveDate"
              value={form.effectiveDate}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900"
            >
              Add Rate
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default AddCommissionModal