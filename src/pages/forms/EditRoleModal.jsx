import { useEffect, useState } from "react";
import API from "../../api";

const AVAILABLE_PERMISSIONS = [
  { module: "Purchase Request", actions: ["Manage", "View"] },
  { module: "Purchase Order", actions: ["Manage", "View"] },
  { module: "Delivery Note", actions: ["Manage", "View"] },
  { module: "Bills", actions: ["Manage", "View"] },
  { module: "User Roles", actions: ["Manage", "View"] },
  { module: "RFX", actions: ["Manage", "View"] },
  { module: "Account Settings", actions: ["Manage", "View"] },
  { module: "Offline transactions", actions: ["Manage", "View"] },
];

const EditRoleModal = ({ role, close }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: [],
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

    if (!Array.isArray(parsedPermissions)) {
      parsedPermissions = [];
    }

    setForm({
      name: role?.name || "",
      description: role?.description || "",
      permissions: parsedPermissions,
    });
  }, [role]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isChecked = (moduleName, action) => {
    const foundModule = form.permissions.find(
      (item) => item.module === moduleName
    );

    if (!foundModule) return false;

    return foundModule.actions?.includes(action);
  };

  const handlePermissionToggle = (moduleName, action) => {
    setForm((prev) => {
      const updatedPermissions = [...prev.permissions];
      const moduleIndex = updatedPermissions.findIndex(
        (item) => item.module === moduleName
      );

      if (moduleIndex === -1) {
        updatedPermissions.push({
          module: moduleName,
          actions: [action],
        });
      } else {
        const currentActions = updatedPermissions[moduleIndex].actions || [];
        const actionExists = currentActions.includes(action);

        if (actionExists) {
          const filteredActions = currentActions.filter((a) => a !== action);

          if (filteredActions.length === 0) {
            updatedPermissions.splice(moduleIndex, 1);
          } else {
            updatedPermissions[moduleIndex] = {
              ...updatedPermissions[moduleIndex],
              actions: filteredActions,
            };
          }
        } else {
          updatedPermissions[moduleIndex] = {
            ...updatedPermissions[moduleIndex],
            actions: [...currentActions, action],
          };
        }
      }

      return {
        ...prev,
        permissions: updatedPermissions,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      permissions: form.permissions,
      field_permissions: role?.field_permissions || [],
    };

    console.log("UPDATE PAYLOAD:", payload);

    try {
      await API.put(`/roles/${role.id || role.role_id}`, payload);

      alert("Role updated successfully");
      close();
      window.location.reload();
    } catch (error) {
      console.log("Update error:", error);
      console.log("Error response:", error?.response?.data);
      alert("Failed to update role");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
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
            <label className="text-sm font-medium block mb-3">Permissions</label>

            <div className="border rounded-lg p-4 space-y-4 max-h-[350px] overflow-y-auto">
              {AVAILABLE_PERMISSIONS.map((item, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <p className="font-medium text-gray-800 mb-2">{item.module}</p>

                  <div className="flex flex-wrap gap-6">
                    {item.actions.map((action, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked(item.module, action)}
                          onChange={() =>
                            handlePermissionToggle(item.module, action)
                          }
                          className="w-4 h-4"
                        />
                        {action}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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