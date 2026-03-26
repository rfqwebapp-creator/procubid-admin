import { useState } from "react"
import API from "../../api";

const modulesList = [
  "Tender",
  "PO",
  "Bid",
  "Invoice",
  "Reports",
  "Users"
]

const permissionsList = [
  "create_tender",
  "submit_bid",
  "approve_invoice",
  "view_reports",
  "create_invoice",
  "manage_users",
  "manage_roles"
]

const EditRoleModal = ({ role, close }) => {

const [form,setForm] = useState({
  name: role?.name || "",
  description: role?.description || "",

// modules: role?.modules ? role.modules.split(", ") : [],
//   permissions: role?.permissions
//   ? role.permissions.split(", ")
//   : []

modules: role?.modules
  ? role.modules.split(",").map(m => m.trim())
  : [],

permissions: role?.permissions
  ? role.permissions.split(",").map(p => p.trim())
  : []
})
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const toggleModule = (module)=>{
    setForm(prev=>{
      const exists = prev.modules.includes(module)

      return {
        ...prev,
        modules: exists
          ? prev.modules.filter(m=>m!==module)
          : [...prev.modules,module]
      }
    })
  }

  const togglePermission = (permission)=>{
    setForm(prev=>{
      const exists = prev.permissions.includes(permission)

      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter(p=>p!==permission)
          : [...prev.permissions,permission]
      }
    })
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.put(`/roles/${role.id || role.role_id}`, {
  ...form,
  modules: form.modules.join(","),
  permissions: form.permissions.join(",")
}); // 🔥 backend update

    alert("Role updated successfully");

    close(); // modal close

    // window.location.reload(); // quick refresh (later improve cheyyam)

  } catch (error) {
    console.log("Update error:", error);
  }
};

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">

        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-1">
          Edit Role — {role?.name}
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Update the role details, modules, and permissions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ROLE NAME */}
          <div>
            <label className="text-sm font-medium">
              Role Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* MODULES */}
          <div>

            <h3 className="font-medium mb-2">
              Modules
            </h3>

            <div className="flex flex-wrap gap-4">

              {modulesList.map(module=>(
                <label key={module} className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={form.modules.includes(module)}
                    onChange={()=>toggleModule(module)}
                    className="accent-green-700"
                  />

                  {module}

                </label>
              ))}

            </div>

          </div>

          {/* PERMISSIONS */}
          <div>

            <h3 className="font-medium mb-2">
              Permissions
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              {permissionsList.map(permission=>(
                <label key={permission} className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={form.permissions.includes(permission)}
                    onChange={()=>togglePermission(permission)}
                    className="accent-green-700"
                  />

                  {permission}

                </label>
              ))}

            </div>

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
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default EditRoleModal