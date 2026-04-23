import { useEffect, useState } from "react";
import API from "../api";
import AddOrganizationModal from "./forms/AddOrganizationModal";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

const Organizations = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

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

  const handleDelete = async (id, companyName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${companyName}"?`
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await API.delete(`/organizations/${id}`);

      const updatedOrganizations = organizations.filter((org) => org.id !== id);
      setOrganizations(updatedOrganizations);

      const updatedFiltered = updatedOrganizations.filter((org) => {
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

      const newTotalPages = Math.ceil(updatedFiltered.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      alert("Organization deleted successfully");
    } catch (error) {
      console.error("Delete organization error:", error);
      alert("Failed to delete organization");
    } finally {
      setDeletingId(null);
    }
  };

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

  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrganizations = filteredOrganizations.slice(startIndex, endIndex);

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
        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
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
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    Loading organizations...
                  </td>
                </tr>
              ) : paginatedOrganizations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No organizations found
                  </td>
                </tr>
              ) : (
                paginatedOrganizations.map((org, index) => (
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

                    <td className="p-4 whitespace-nowrap">{org.sector}</td>
                    <td className="p-4 whitespace-nowrap">{org.region}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          org.status
                        )}`}
                      >
                        {org.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/organizations/${org.id}/view`)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#486b50] text-white hover:bg-[#3d5b44] transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(org.id, org.company_name || org.name)
                          }
                          disabled={deletingId === org.id}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                          title="Delete Organization"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 px-2">
        <p className="text-sm text-gray-500">
          Showing {paginatedOrganizations.length} of {filteredOrganizations.length} organizations
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50"
          >
            Next
          </button>
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