import { useEffect, useState } from "react";
import API from "../api";
import AddOrganizationModal from "./forms/AddOrganizationModal";

const Organizations = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const res = await API.get("/organizations");
      setOrganizations(res.data || []);
    } catch (error) {
      console.error("Fetch organizations error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const filteredOrganizations = organizations.filter((org) => {
    const name = (org.company_name || org.name || "").toLowerCase();
    const email = (org.email || "").toLowerCase();
    const region = (org.region || "").toLowerCase();
    const searchText = search.toLowerCase();

    return (
      name.includes(searchText) ||
      email.includes(searchText) ||
      region.includes(searchText)
    );
  });

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Suspended") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const getRoleColor = (role) => {
    if (role === "Buyer") return "bg-blue-100 text-blue-700";
    if (role === "Supplier") return "bg-green-100 text-green-700";
    if (role === "Both") return "bg-orange-100 text-orange-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Organizations
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage all registered organizations — Buyers, Suppliers, and their accounts
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-secondary text-dark px-4 py-2 rounded-lg font-medium hover:opacity-90 transition w-full sm:w-auto"
        >
          + Add Organization
        </button>
      </div>

      <div className="relative w-full sm:w-96 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 text-sm">
                <th className="p-4">Company Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role Type</th>
                <th className="p-4">Sector</th>
                <th className="p-4">Region</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    Loading organizations...
                  </td>
                </tr>
              ) : filteredOrganizations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No organizations found
                  </td>
                </tr>
              ) : (
                filteredOrganizations.map((org, index) => (
                  <tr key={org.id || index} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4 font-medium whitespace-nowrap">
                      {org.company_name || org.name}
                    </td>

                    <td className="p-4 text-gray-500 whitespace-nowrap">
                      {org.email}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                          org.role_type || org.role
                        )}`}
                      >
                        {org.role_type || org.role}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {org.sector}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {org.region}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          org.status
                        )}`}
                      >
                        {org.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <AddOrganizationModal
          close={() => setShowModal(false)}
          onSuccess={() => {
            fetchOrganizations();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Organizations;