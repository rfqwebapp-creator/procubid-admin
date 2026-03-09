import { useState } from "react"
import { FiX } from "react-icons/fi"

const CreatePlanModal = ({ close }) => {

  const [form, setForm] = useState({
    name: "",
    price: "",
    billing: "Monthly",
    features: "",
    status: "Active"
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("New Plan:", form)

    close()
  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">

        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20}/>
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-1">
          Create New Plan
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Add a new subscription plan for your platform.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* PLAN NAME */}
          <div>
            <label className="text-sm font-medium">
              Plan Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="e.g. Professional"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* PRICE + BILLING */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">
                Price
              </label>

              <input
                type="text"
                name="price"
                placeholder="e.g. $99"
                value={form.price}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Billing Cycle
              </label>

              <select
                name="billing"
                value={form.billing}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

          </div>

          {/* FEATURES */}
          <div>
            <label className="text-sm font-medium">
              Features
            </label>

            <textarea
              rows="3"
              name="features"
              placeholder="e.g. 25 Users, Unlimited RFQs, Priority Support"
              value={form.features}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
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
              Create Plan
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default CreatePlanModal