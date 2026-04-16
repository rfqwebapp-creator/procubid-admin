import { useEffect, useState } from "react";
import API from "../../api";

const EditRoleModal = ({ role, close }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    permissionsText: "[]",
  });

  useEffect(() => {
    let parsedPermissions = role?.permissions || [];

    if (typeof parsedPermissions === "string") {
      try {
        parsedPermissions = JSON.parse(parsedPermissions);
      } catch {
        parsedPermissions = [];
      }
    }

    setForm({
      name: role?.name || "",
      description: role?.description || "",
      permissionsText: JSON.stringify(parsedPermissions, null, 2),
    });
  }, [role]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedPermissions = [];

    try {
      parsedPermissions = JSON.parse(form.permissionsText);
    } catch (error) {
      alert("Permissions JSON is invalid");
      return;
    }

    try {
      await API.put(`/roles/${role.id || role.role_id}`, {
        name: form.name,
        description: form.description,
        permissions: parsedPermissions,
      });

      alert("Role updated successfully");
      close();
      window.location.reload();
    } catch (error) {
      console.log("Update error:", error);
      alert("Failed to update role");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-1">
          Edit Role — {role?.name}
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Update the role details and permissions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Role Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Permissions JSON</label>
            <textarea
              name="permissionsText"
              rows="12"
              value={form.permissionsText}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

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
  );
};

export default EditRoleModal;