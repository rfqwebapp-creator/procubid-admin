import { useState, useEffect } from "react";
import UserAPI from "../userApi";

import { FiSearch, FiEdit2, FiTrash2, FiEye, FiSlash } from "react-icons/fi";
import EditRoleModal from "./forms/EditRoleModal";

const Users = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [permissionsMaster, setPermissionsMaster] = useState({});

  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    // USERS
    UserAPI.get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Users error:", err);
      });

    // PERMISSIONS MASTER
    API.get("/permissions")
      .then((res) => {
        const moduleMap = {};

        res.data.forEach((p) => {
          moduleMap[p.name] = p.module;
        });

        setPermissionsMaster(moduleMap);
      })
      .catch((err) => console.log("Permissions error:", err));

    // ROLES + PERMISSIONS
    API.get("/roles")
      .then((res) => {
        const rolesData = res.data;
        setRoles(rolesData);

        const permissionMap = {};
        
        rolesData.forEach((role) => {

        const permsArray = Array.isArray(role?.permissions)
  ? role.permissions
  : typeof role?.permissions === "string"
  ? role.permissions.split(",").map((p) => p.trim())
  : [];

permsArray.forEach((perm) => {
  if (!perm) return;

  if (!permissionMap[perm]) {
    permissionMap[perm] = {
      permission: perm,
      module: permissionsMaster[perm] || "-",
      assigned_roles: [],
    };
  }

  permissionMap[perm].assigned_roles.push(role.name);
});
});

        const finalData = Object.values(permissionMap).map((p) => ({
          ...p,
          assigned_roles: p.assigned_roles.join(", "),
        }));

        setPermissions(finalData);
      })
      .catch((err) => console.log("Roles/Permissions error:", err));
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      const permissionMap = {};

      roles.forEach((role) => {
       const permsArray = Array.isArray(role?.permissions)
  ? role.permissions
  : typeof role?.permissions === "string"
  ? role.permissions.split(",").map((p) => p.trim())
  : [];

        permsArray.forEach((perm) => {
          if (!perm) return;

          if (!permissionMap[perm]) {
            permissionMap[perm] = {
              permission: perm,
              module: permissionsMaster[perm] || "-",
              assigned_roles: [],
            };
          }

          permissionMap[perm].assigned_roles.push(role.name);
        });
      });

      const finalData = Object.values(permissionMap).map((p) => ({
        ...p,
        assigned_roles: p.assigned_roles.join(", "),
      }));

      setPermissions(finalData);
    }
  }, [permissionsMaster, roles]);

  // DELETE USER
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);

      setUsers((prev) => prev.filter((u) => u.id !== id));

      alert("User deleted successfully");
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete user");
    }
  };

  // BLOCK / UNBLOCK USER
  const toggleUserStatus = async (id) => {
    try {
      await API.put(`/users/${id}/toggle-status`);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                status: user.status === "Active" ? "Blocked" : "Active",
              }
            : user
        )
      );
    } catch (error) {
      console.log("Toggle error:", error);
      alert("Failed to update user status");
    }
  };

  const getRoleColor = (role) => {
    if (role === "Admin") return "bg-teal-100 text-teal-700";
    if (role === "Buyer") return "bg-blue-100 text-blue-700";
    if (role === "Supplier") return "bg-orange-100 text-orange-700";
    if (role === "Customer") return "bg-purple-100 text-purple-700";
    return "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    if (status === "Blocked") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstname || ""} ${u.lastname || ""} ${u.email || ""} ${u.companyname || ""} ${u.phone || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDeleteRole = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/roles/${id}`);
      setRoles((prev) => prev.filter((role) => role.id !== id));
      alert("Role deleted successfully");
    } catch (error) {
      console.log("Delete role error:", error);
    }
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          Users & Roles
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Manage user accounts, assign roles and configure permissions
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
            activeTab === "users"
              ? "bg-white shadow text-primary"
              : "text-gray-500"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
            activeTab === "roles"
              ? "bg-white shadow text-primary"
              : "text-gray-500"
          }`}
        >
          Role Management
        </button>

        <button
          onClick={() => setActiveTab("permissions")}
          className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
            activeTab === "permissions"
              ? "bg-white shadow text-primary"
              : "text-gray-500"
          }`}
        >
          Permissions
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === "users" && (
        <>
          {/* SEARCH */}
          <div className="relative w-full sm:w-96 mb-6">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-[1400px] w-full">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr className="text-left">
                  <th className="p-4">First Name</th>
                  <th className="p-4">Last Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Industry</th>
                  <th className="p-4">Work Number</th>
                  <th className="p-4">GST</th>
                  <th className="p-4">Company Name</th>
                  <th className="p-4">Referral Code</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{user.firstname}</td>
                    <td className="p-4">{user.lastname}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4">{user.country}</td>
                    <td className="p-4">{user.industry}</td>
                    <td className="p-4">{user.worknumber}</td>
                    <td className="p-4">{user.gst}</td>
                    <td className="p-4">{user.companyname}</td>
                    <td className="p-4">{user.referralcode}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4 flex gap-3">
                      <FiEye
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 cursor-pointer"
                        title="View User"
                      />

                      <FiSlash
                        onClick={() => toggleUserStatus(user.id)}
                        className={`cursor-pointer ${
                          user.status === "Active"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                        title={
                          user.status === "Active"
                            ? "Block User"
                            : "Unblock User"
                        }
                      />

                      <FiTrash2
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 cursor-pointer"
                        title="Delete User"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ROLE TAB */}
      {activeTab === "roles" && (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-[800px] w-full">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr className="text-left">
                <th className="p-4">Role</th>
                <th className="p-4">Description</th>
                <th className="p-4">Module</th>
                <th className="p-4">Permissions</th>
                <th className="p-4 text-center">Edit</th>
                <th className="p-4 text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{role.name}</td>
                  <td className="p-4 text-gray-600">{role.description}</td>
                  <td className="p-4">{role.modules}</td>

                  <td className="p-4 text-gray-500">
  {Array.isArray(role.permissions)
    ? role.permissions.length <= 2
      ? role.permissions.join(", ")
      : `${role.permissions.slice(0, 2).join(", ")} (+${role.permissions.length - 2} more)`
    : typeof role.permissions === "string"
    ? (() => {
        const perms = role.permissions.split(",").map((p) => p.trim());

        if (perms.length <= 2) {
          return perms.join(", ");
        }

        return `${perms.slice(0, 2).join(", ")} (+${perms.length - 2} more)`;
      })()
    : "No permissions"}
</td>

                  <td className="p-4 text-center">
                    <FiEdit2
                      onClick={() => setSelectedRole(role)}
                      className="text-blue-600 cursor-pointer"
                    />
                  </td>

                  <td className="p-4 text-center">
                    <FiTrash2
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PERMISSIONS TAB */}
      {activeTab === "permissions" && (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr className="text-left">
                <th className="p-4">Permission</th>
                <th className="p-4">Module</th>
                <th className="p-4">Assigned Roles</th>
              </tr>
            </thead>

            <tbody>
              {permissions.map((perm, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-mono">{perm.permission}</td>
                  <td className="p-4 text-gray-600">{perm.module}</td>

                  <td className="p-4 flex gap-2 flex-wrap">
                    {(perm.assigned_roles || "")
  .split(",")
  .filter(Boolean)
  .map((role, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs ${getRoleColor(
                            role.trim()
                          )}`}
                        >
                          {role.trim()}
                        </span>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT ROLE MODAL */}
      {selectedRole && (
        <EditRoleModal
          role={selectedRole}
          close={() => setSelectedRole(null)}
        />
      )}

      {/* USER VIEW MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-lg font-semibold mb-4">User Details</h2>

            <div className="space-y-3">
              <p>
                <strong>First Name:</strong> {selectedUser.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedUser.lastname}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p>
                <strong>Country:</strong> {selectedUser.country}
              </p>
              <p>
                <strong>Industry:</strong> {selectedUser.industry}
              </p>
              <p>
                <strong>Work Number:</strong> {selectedUser.worknumber}
              </p>
              <p>
                <strong>GST:</strong> {selectedUser.gst}
              </p>
              <p>
                <strong>Company Name:</strong> {selectedUser.companyname}
              </p>
              <p>
                <strong>Referral Code:</strong> {selectedUser.referralcode}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.status}
              </p>
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;








// // ========== backend conncetion to frontend =========================
// import { useState, useEffect } from "react"
// import API from "../api"
// import { FiSearch, FiMoreHorizontal, FiEdit2, FiTrash2, FiEye, FiSlash } from "react-icons/fi"
// import EditRoleModal from "./forms/EditRoleModal"

// const Users = () => {

//   const [activeTab, setActiveTab] = useState("users")
//   const [search, setSearch] = useState("")
//   const [selectedRole, setSelectedRole] = useState(null)

//   const [users, setUsers] = useState([])
//   const [roles, setRoles] = useState([])
//   const [permissions, setPermissions] = useState([])

//   const [permissionsMaster, setPermissionsMaster] = useState({});

//   const [selectedUser, setSelectedUser] = useState(null)

//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;

//   // FETCH DATA FROM BACKEND
//   useEffect(() => {

//     // USERS
//     API.get("/users")
//       .then((res) => {
//         setUsers(res.data)
//       })
//       .catch((err) => {
//         console.log("Users error:", err)
//       })

//     // ROLES
//     // API.get("/roles")
//     //   .then((res) => {
//     //     setRoles(res.data)
//     //   })
//     //   .catch((err) => {
//     //     console.log("Roles error:", err)
//     //   })

//   // ROLES + PERMISSIONS (COMBINED)
// API.get("/roles")
//   .then((res) => {

//     const rolesData = res.data;

//     setRoles(rolesData); // 🔥 IMPORTANT

//     const permissionMap = {};

//     rolesData.forEach((role) => {

//       // if (!role.permissions) return;

//        const permsArray = role.permissions
//     ? role.permissions.split(",").map(p => p.trim())
//     : [];

//   permsArray.forEach((perm) => {

//     if (!perm) return;

//     if (!permissionMap[perm]) {
//       permissionMap[perm] = {
//         permission: perm,
//         module: permissionsMaster[perm] || "-",
//         assigned_roles: []
//       };
//     }

//     permissionMap[perm].assigned_roles.push(role.name);

//   });

//   API.get("/permissions")
//   .then((res) => {

//     const moduleMap = {};

//     res.data.forEach((p) => {
//       moduleMap[p.name] = p.module;
//     });

//     setPermissionsMaster(moduleMap);

//   })
//   .catch((err) => console.log("Permissions error:", err));

//     //   role.permissions
//     //     .split(",")
//     //     .map(p => p.trim())
//     //     .forEach((perm) => {

//     //       if (!permissionMap[perm]) {
//     //         permissionMap[perm] = {
//     //           permission: perm,
//     //           module: "-",
//     //           assigned_roles: []
//     //         };
//     //       }

//     //       permissionMap[perm].assigned_roles.push(role.name);

//     //     });

//     });

//     const finalData = Object.values(permissionMap).map((p) => ({
//       ...p,
//       assigned_roles: p.assigned_roles.join(", ")
//     }));

//     setPermissions(finalData);

//   })
//   .catch((err) => console.log("Roles/Permissions error:", err));

//   }, [])




// // DELETE USER
// const deleteUser = async (id) => {

//   const confirmDelete = window.confirm("Are you sure you want to delete this user?")

//   if (!confirmDelete) return

//   try {

//     await API.delete(`/admin/delete-user/${id}`)

//     // remove from UI
//     setUsers((prev) => prev.filter((u) => u.id !== id))

//     alert("User deleted successfully")

//   } catch (error) {
//     console.log("Delete error:", error)
//   }
// }



// const toggleUserStatus = async (id) => {

//   try {

//     await API.put(`/admin/toggle-user/${id}`);

//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === id
//           ? {
//               ...user,
//               status: user.status === "Active" ? "Blocked" : "Active"
//             }
//           : user
//       )
//     );

//   } catch (error) {
//     console.log("Toggle error:", error);
//   }
// };

// const getRoleColor = (role) => {
//     if (role === "Admin") return "bg-teal-100 text-teal-700"
//     if (role === "Buyer") return "bg-blue-100 text-blue-700"
//     if (role === "Supplier") return "bg-orange-100 text-orange-700"
//     return "bg-gray-100 text-gray-700"
//   }

//   const getStatusColor = (status) => {
//     if (status === "Active") return "bg-green-100 text-green-700"
//     if (status === "Blocked") return "bg-red-100 text-red-700"
//     return "bg-gray-100 text-gray-700"
//   }

//   const filteredUsers = users.filter((u) =>
//     u.name?.toLowerCase().includes(search.toLowerCase())
//   )


// const indexOfLastUser = currentPage * usersPerPage;
// const indexOfFirstUser = indexOfLastUser - usersPerPage;

// const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

// const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

// const handleDeleteRole = async (id) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this role?");
//   if (!confirmDelete) return;

//   try {
//     await API.delete(`/roles/${id}`); // 🔥 backend call

//     // UI update
//     setRoles((prev) => prev.filter((role) => role.id !== id));

//     alert("Role deleted successfully");
//   } catch (error) {
//     console.log("Delete role error:", error);
//   }
// };

//   return (

//     <div className="w-full">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-xl sm:text-2xl font-bold text-primary">
//           Users & Roles
//         </h1>
//         <p className="text-sm sm:text-base text-gray-500">
//           Manage user accounts, assign roles and configure permissions
//         </p>
//       </div>

//       {/* TABS */}
//       <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">

//         <button
//           onClick={() => setActiveTab("users")}
//           className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
//             activeTab === "users"
//               ? "bg-white shadow text-primary"
//               : "text-gray-500"
//           }`}
//         >
//           Users
//         </button>

//         <button
//           onClick={() => setActiveTab("roles")}
//           className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
//             activeTab === "roles"
//               ? "bg-white shadow text-primary"
//               : "text-gray-500"
//           }`}
//         >
//           Role Management
//         </button>

//         <button
//           onClick={() => setActiveTab("permissions")}
//           className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
//             activeTab === "permissions"
//               ? "bg-white shadow text-primary"
//               : "text-gray-500"
//           }`}
//         >
//           Permissions
//         </button>

//       </div>

//       {/* USERS TAB */}

//       {activeTab === "users" && (
//         <>

//           {/* SEARCH */}

//           <div className="relative w-full sm:w-96 mb-6">

//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//             <input
//               type="text"
//               placeholder="Search users..."
//               value={search}
//               onChange={(e) => {
//   setSearch(e.target.value);
//   setCurrentPage(1);
// }}
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
//             />

//           </div>

//           {/* TABLE */}

//           <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

//             <table className="min-w-[700px] w-full">

//               <thead className="bg-gray-50 text-gray-600 text-sm">
//                 <tr className="text-left">
//                   <th className="p-4">User</th>
//                   <th className="p-4">Role</th>
//                   <th className="p-4">Organization</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Last Login</th>
//                   <th></th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {currentUsers.map((user, i) => (

//                   <tr key={user.id} className="border-t hover:bg-gray-50">

//                     <td className="p-4">

//                       <div className="flex items-center gap-3">

//                         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                           {user.name?.[0]}
//                         </div>

//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-gray-500">{user.email}</p>
//                         </div>

//                       </div>

//                     </td>

//                     <td className="p-4">

//                       <span className={`px-3 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
//                         {user.role}
//                       </span>

//                     </td>

//                     <td className="p-4 text-gray-600">
//                       {user.organization}
//                     </td>

//                     <td className="p-4">

//                       <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
//                         {user.status}
//                       </span>

//                     </td>

//                     <td className="p-4 text-gray-600">
//                       {user.last_login}
//                     </td>

//                    <td className="p-4 flex gap-3">

//                         <FiEye
//                           onClick={() => setSelectedUser(user)}
//                           className="text-blue-600 cursor-pointer"
//                           title="View User"
//                         />

//                         <FiSlash
//                           onClick={() => toggleUserStatus(user.id)}
//                           className={`cursor-pointer text-red-600 hover:text-red-800 ${
//                             user.status === "Active" ? "text-red-600" : "text-green-600"
//                           }`}
//                           title={user.status === "Active" ? "Block User" : "Unblock User"}
//                         />

//                         <FiTrash2
//                           onClick={() => deleteUser(user.id)}
//                           className="text-red-600 cursor-pointer"
//                           title="Delete User"
//                         />

// </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>


// <div className="flex justify-center items-center gap-2 mt-4">

//   {/* Prev */}
//   <button
//     onClick={() => setCurrentPage(currentPage - 1)}
//     disabled={currentPage === 1}
//     className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//   >
//     Prev
//   </button>

//   {/* Page Numbers */}
//   {[...Array(totalPages)].map((_, index) => (
//     <button
//       key={index}
//       onClick={() => setCurrentPage(index + 1)}
//       className={`px-3 py-1 rounded ${
//         currentPage === index + 1
//           ? "bg-blue-500 text-white"
//           : "bg-gray-200"
//       }`}
//     >
//       {index + 1}
//     </button>
//   ))}

//   {/* Next */}
//   <button
//     onClick={() => setCurrentPage(currentPage + 1)}
//     disabled={currentPage === totalPages}
//     className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//   >
//     Next
//   </button>

// </div>

//           {/* PAGINATION */}


//         </>
//       )}

//       {/* ROLE TAB */}

//       {activeTab === "roles" && (

//         <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

//           <table className="min-w-[800px] w-full">

//             <thead className="bg-gray-50 text-gray-600 text-sm">
//               <tr className="text-left">
//                 <th className="p-4">Role</th>
//                 <th className="p-4">Description</th>
//                 <th className="p-4">Module</th>
//                 <th className="p-4">Permissions</th>
//                 <th className="p-4 text-center">Edit</th>
//                 <th className="p-4 text-center">Delete</th>
//               </tr>
//             </thead>

//             <tbody>

//               {roles.map((role, i) => (

//                 <tr key={i} className="border-t hover:bg-gray-50">

//                   <td className="p-4 font-medium">{role.name}</td>

//                   <td className="p-4 text-gray-600">{role.description}</td>

//                   <td className="p-4">{role.modules}</td>

//                   <td className="p-4 text-gray-500">
//                      {role.permissions
//     ? (() => {
//         const perms = role.permissions.split(", ");

//         if (perms.length <= 2) {
//           return perms.join(", ");
//         }

//         return `${perms.slice(0, 2).join(", ")} (+${perms.length - 2} more)`;
//       })()
//     : "No permissions"}
//                   </td>

//                   <td className="p-4 text-center">

//                     <FiEdit2
//                       onClick={() => setSelectedRole(role)}
//                       className="text-blue-600 cursor-pointer"
//                     />

//                   </td>

//                   <td className="p-4 text-center">

//                     <FiTrash2
//                       onClick={() => handleDeleteRole(role.id)}
//                       className="text-red-600 cursor-pointer"
//                     />

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       )}

//       {/* PERMISSIONS TAB */}

//       {activeTab === "permissions" && (

//         <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

//           <table className="min-w-[700px] w-full">

//             <thead className="bg-gray-50 text-gray-600 text-sm">
//               <tr className="text-left">
//                 <th className="p-4">Permission</th>
//                 <th className="p-4">Module</th>
//                 <th className="p-4">Assigned Roles</th>
//               </tr>
//             </thead>

//             <tbody>

//               {permissions.map((perm, i) => (

//                 <tr key={i} className="border-t hover:bg-gray-50">

//                   <td className="p-4 font-mono">
//                     {perm.permission}
//                   </td>

//                   <td className="p-4 text-gray-600">
//                     {perm.module}
//                   </td>

//                   <td className="p-4 flex gap-2 flex-wrap">

//                     {perm.assigned_roles.split(",").map((role, idx) => (

//                       <span
//                         key={idx}
//                         className={`px-3 py-1 rounded-full text-xs ${getRoleColor(role)}`}
//                       >
//                         {role}
//                       </span>

//                     ))}

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       )}

//       {/* EDIT ROLE MODAL */}

//       {selectedRole && (
//         <EditRoleModal
//           role={selectedRole}
//           close={() => setSelectedRole(null)}
//         />
//       )}


//       {/* USER VIEW MODAL */}

//     {selectedUser && (

//   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//     <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

//       <h2 className="text-lg font-semibold mb-4">
//         User Details
//       </h2>

//       <div className="space-y-3">

//         <p><strong>Name:</strong> {selectedUser.name}</p>

//         <p><strong>Email:</strong> {selectedUser.email}</p>

//         <p><strong>Role:</strong> {selectedUser.role}</p>

//         <p><strong>Organization:</strong> {selectedUser.organization}</p>

//         <p><strong>Status:</strong> {selectedUser.status}</p>

//         <p><strong>Last Login:</strong> {selectedUser.last_login}</p>

//       </div>

//       <div className="flex justify-end mt-5">

//         <button
//           onClick={() => setSelectedUser(null)}
//           className="px-4 py-2 bg-gray-200 rounded-lg"
//         >
//           Close
//         </button>

//       </div>

//     </div>

//   </div>

// )}


//     </div>

//   )

// }

// export default Users




// // ================================corrected frontend-code ======================

// // // import { useState } from "react"
// // // import { FiSearch, FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi"
// // // import EditRoleModal from "./forms/EditRoleModal" // NEW

// // // const Users = () => {

// // //   const [activeTab, setActiveTab] = useState("users")
// // //   const [search, setSearch] = useState("")

// // //   const [selectedRole, setSelectedRole] = useState(null) // NEW

// // //   const users = [
// // //     {
// // //       name: "John Mitchell",
// // //       email: "john@techcorp.com",
// // //       role: "Admin",
// // //       organization: "ABC Pvt Ltd",
// // //       status: "Active",
// // //       lastLogin: "2 hrs ago"
// // //     },
// // //     {
// // //       name: "Sarah Chen",
// // //       email: "sarah@global.com",
// // //       role: "Buyer",
// // //       organization: "ABC Pvt Ltd",
// // //       status: "Active",
// // //       lastLogin: "1 day ago"
// // //     },
// // //     {
// // //       name: "Mike Johnson",
// // //       email: "mike@innovate.co",
// // //       role: "Supplier",
// // //       organization: "XYZ Traders",
// // //       status: "Active",
// // //       lastLogin: "5 hrs ago"
// // //     },
// // //     {
// // //       name: "Emily Davis",
// // //       email: "emily@pacific.com",
// // //       role: "Buyer",
// // //       organization: "Pacific Trading",
// // //       status: "Blocked",
// // //       lastLogin: "30 days ago"
// // //     }
// // //   ]

// // //   const roles = [
// // //     {
// // //       name: "Admin",
// // //       description: "Full system access",
// // //       module: "All Modules",
// // //       permissions: ["create_tender", "submit_bid", "approve_invoice", "+2"]
// // //     },
// // //     {
// // //       name: "Buyer",
// // //       description: "Tender and PO management",
// // //       module: "Tender, PO",
// // //       permissions: ["create_tender", "approve_invoice", "view_reports"]
// // //     },
// // //     {
// // //       name: "Supplier",
// // //       description: "Bid and Invoice management",
// // //       module: "Bid, Invoice",
// // //       permissions: ["submit_bid", "create_invoice", "view_reports"]
// // //     }
// // //   ]

// // //   const permissions = [
// // //     { name: "create_tender", module: "Tender", roles: ["Admin", "Buyer"] },
// // //     { name: "submit_bid", module: "Tender", roles: ["Admin", "Supplier"] },
// // //     { name: "approve_invoice", module: "Invoice", roles: ["Admin", "Buyer"] },
// // //     { name: "create_invoice", module: "Invoice", roles: ["Supplier"] },
// // //     { name: "manage_users", module: "Users", roles: ["Admin"] },
// // //     { name: "view_reports", module: "Reports", roles: ["Admin", "Buyer", "Supplier"] },
// // //     { name: "approve_po", module: "Purchase Order", roles: [] },
// // //     { name: "manage_workflows", module: "Workflow", roles: [] }
// // //   ]

// // //   const getRoleColor = (role) => {
// // //     if (role === "Admin") return "bg-teal-100 text-teal-700"
// // //     if (role === "Buyer") return "bg-blue-100 text-blue-700"
// // //     if (role === "Supplier") return "bg-orange-100 text-orange-700"
// // //   }

// // //   const getStatusColor = (status) => {
// // //     if (status === "Active") return "bg-green-100 text-green-700"
// // //     if (status === "Blocked") return "bg-red-100 text-red-700"
// // //   }

// // //   const filteredUsers = users.filter((u) =>
// // //     u.name.toLowerCase().includes(search.toLowerCase())
// // //   )

// // //   // NEW
// // //   const handleDeleteRole = (roleName) => {
// // //     const confirmDelete = window.confirm("Are you sure you want to delete this role?")
// // //     if (!confirmDelete) return

// // //     console.log("Deleted role:", roleName)
// // //   }

// // //   return (
// // //     <div className="w-full">

// // //       {/* HEADER */}
// // //       <div className="mb-6">
// // //         <h1 className="text-xl sm:text-2xl font-bold text-primary">
// // //           Users & Roles
// // //         </h1>
// // //         <p className="text-sm sm:text-base text-gray-500">
// // //           Manage user accounts, assign roles and configure permissions
// // //         </p>
// // //       </div>

// // //       {/* TABS */}
// // //       <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
// // //         <button
// // //           onClick={() => setActiveTab("users")}
// // //           className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
// // //             activeTab === "users"
// // //               ? "bg-white shadow text-primary"
// // //               : "text-gray-500"
// // //           }`}
// // //         >
// // //           Users
// // //         </button>

// // //         <button
// // //           onClick={() => setActiveTab("roles")}
// // //           className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
// // //             activeTab === "roles"
// // //               ? "bg-white shadow text-primary"
// // //               : "text-gray-500"
// // //           }`}
// // //         >
// // //           Role Management
// // //         </button>

// // //         <button
// // //           onClick={() => setActiveTab("permissions")}
// // //           className={`px-3 sm:px-4 py-2 text-sm rounded-md ${
// // //             activeTab === "permissions"
// // //               ? "bg-white shadow text-primary"
// // //               : "text-gray-500"
// // //           }`}
// // //         >
// // //           Permissions
// // //         </button>
// // //       </div>

// // //       {/* USERS TAB */}
// // //       {activeTab === "users" && (
// // //         <>
// // //           {/* SEARCH */}
// // //           <div className="relative w-full sm:w-96 mb-6">
// // //             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

// // //             <input
// // //               type="text"
// // //               placeholder="Search users..."
// // //               value={search}
// // //               onChange={(e) => setSearch(e.target.value)}
// // //               className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
// // //             />
// // //           </div>

// // //           {/* TABLE */}
// // //           <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

// // //             <table className="min-w-[700px] w-full">

// // //               <thead className="bg-gray-50 text-gray-600 text-sm">
// // //                 <tr className="text-left">
// // //                   <th className="p-4">User</th>
// // //                   <th className="p-4">Role</th>
// // //                   <th className="p-4">Organization</th>
// // //                   <th className="p-4">Status</th>
// // //                   <th className="p-4">Last Login</th>
// // //                   <th></th>
// // //                 </tr>
// // //               </thead>

// // //               <tbody>
// // //                 {filteredUsers.map((user, i) => (
// // //                   <tr key={i} className="border-t hover:bg-gray-50">

// // //                     <td className="p-4">
// // //                       <div className="flex items-center gap-3">

// // //                         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
// // //                           {user.name[0]}
// // //                         </div>

// // //                         <div>
// // //                           <p className="font-medium">{user.name}</p>
// // //                           <p className="text-sm text-gray-500">{user.email}</p>
// // //                         </div>

// // //                       </div>
// // //                     </td>

// // //                     <td className="p-4">
// // //                       <span className={`px-3 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
// // //                         {user.role}
// // //                       </span>
// // //                     </td>

// // //                     <td className="p-4 text-gray-600">
// // //                       {user.organization}
// // //                     </td>

// // //                     <td className="p-4">
// // //                       <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
// // //                         {user.status}
// // //                       </span>
// // //                     </td>

// // //                     <td className="p-4 text-gray-600">
// // //                       {user.lastLogin}
// // //                     </td>

// // //                     <td className="p-4">
// // //                       <FiMoreHorizontal className="text-gray-500 cursor-pointer" />
// // //                     </td>

// // //                   </tr>
// // //                 ))}
// // //               </tbody>

// // //             </table>

// // //           </div>
// // //         </>
// // //       )}

// // //       {/* ROLE TAB */}
// // //       {activeTab === "roles" && (

// // //         <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

// // //           <table className="min-w-[800px] w-full">

// // //             <thead className="bg-gray-50 text-gray-600 text-sm">
// // //               <tr className="text-left">
// // //                 <th className="p-4">Role</th>
// // //                 <th className="p-4">Description</th>
// // //                 <th className="p-4">Module</th>
// // //                 <th className="p-4">Permissions</th>
// // //                 <th className="p-4 text-center">Edit</th>
// // //                 <th className="p-4 text-center">Delete</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody>
// // //               {roles.map((role, i) => (
// // //                 <tr key={i} className="border-t hover:bg-gray-50">

// // //                   <td className="p-4 font-medium">{role.name}</td>

// // //                   <td className="p-4 text-gray-600">{role.description}</td>

// // //                   <td className="p-4">{role.module}</td>

// // //                   <td className="p-4">
// // //                     <div className="flex flex-wrap gap-2">
// // //                       {role.permissions.map((perm, idx) => (
// // //                         <span
// // //                           key={idx}
// // //                           className="bg-gray-100 px-2 py-1 rounded text-xs"
// // //                         >
// // //                           {perm}
// // //                         </span>
// // //                       ))}
// // //                     </div>
// // //                   </td>

// // //                   <td className="p-4 text-center">
// // //                     <FiEdit2
// // //                       onClick={() => setSelectedRole(role)} // NEW
// // //                       className="text-blue-600 cursor-pointer"
// // //                     />
// // //                   </td>

// // //                   <td className="p-4 text-center">
// // //                     <FiTrash2
// // //                       onClick={() => handleDeleteRole(role.name)} // NEW
// // //                       className="text-red-600 cursor-pointer"
// // //                     />
// // //                   </td>

// // //                 </tr>
// // //               ))}
// // //             </tbody>

// // //           </table>

// // //         </div>
// // //       )}

// // //       {/* PERMISSIONS TAB */}
// // //       {activeTab === "permissions" && (

// // //         <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

// // //           <table className="min-w-[700px] w-full">

// // //             <thead className="bg-gray-50 text-gray-600 text-sm">
// // //               <tr className="text-left">
// // //                 <th className="p-4">Permission</th>
// // //                 <th className="p-4">Module</th>
// // //                 <th className="p-4">Assigned Roles</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody>
// // //               {permissions.map((perm, i) => (
// // //                 <tr key={i} className="border-t hover:bg-gray-50">

// // //                   <td className="p-4 font-mono">{perm.name}</td>

// // //                   <td className="p-4 text-gray-600">{perm.module}</td>

// // //                   <td className="p-4 flex gap-2 flex-wrap">
// // //                     {perm.roles.map((role, idx) => (
// // //                       <span
// // //                         key={idx}
// // //                         className={`px-3 py-1 rounded-full text-xs ${getRoleColor(role)}`}
// // //                       >
// // //                         {role}
// // //                       </span>
// // //                     ))}
// // //                   </td>

// // //                 </tr>
// // //               ))}
// // //             </tbody>

// // //           </table>

// // //         </div>

// // //       )}

// // //       {/* EDIT ROLE MODAL */}
// // //       {selectedRole && (
// // //         <EditRoleModal
// // //           role={selectedRole}
// // //           close={() => setSelectedRole(null)}
// // //         />
// // //       )}

// // //     </div>
// // //   )
// // // }

// // // export default Users