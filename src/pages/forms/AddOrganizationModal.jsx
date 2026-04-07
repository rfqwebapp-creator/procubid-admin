import { useState } from "react"
import API from "../api";
const AddOrganizationModal = ({ close }) => {

  const [form,setForm] = useState({
    name:"",
    email:"",
    role:"",
    sector:"",
    region:"",
    status:"Active"
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

 const handleSubmit = async (e)=>{
  e.preventDefault()

  try {
    await API.post("https://api.procubid.com/api/organizations/add", {
      company_name: form.name,
      email: form.email,
      role_type: form.role,
      sector: form.sector,
      region: form.region,
      status: form.status
    });

    alert("Organization added ✅");
    close();

  } catch (err) {
    console.error(err);
    alert("Error adding organization ❌");
  }
}

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-1">
          Add Organization
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Fill in the details to register a new organization.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* COMPANY NAME */}
          <div>
            <label className="text-sm font-medium">
              Company Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="e.g. ABC Pvt Ltd"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="e.g. info@company.com"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* ROLE + SECTOR */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">
                Role Type
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select role</option>
                <option value="Buyer">Buyer</option>
                <option value="Supplier">Supplier</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Sector
              </label>

              <input
                type="text"
                name="sector"
                placeholder="e.g. Manufacturing"
                value={form.sector}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

          </div>

          {/* REGION */}
          <div>
            <label className="text-sm font-medium">
              Region
            </label>

            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">Select region</option>
              <option value="South Asia">South Asia</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Middle East">Middle East</option>
              <option value="Africa">Africa</option>
              <option value="East Asia">East Asia</option>
            </select>
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
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
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
              className="px-4 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900"
            >
              Add Organization
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default AddOrganizationModal