import React, { useEffect, useMemo, useState } from "react";
import { Search, Eye, Trash2, Ban, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const RFQPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRfqs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tenders");

      if (res.data.success) {
        setRfqs(res.data.data || []);
      } else {
        setRfqs([]);
      }
    } catch (error) {
      console.error("Error fetching RFQs:", error);
      setRfqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRfqs();
  }, []);

  const isSpamRFQ = (item) => {
    const name = (item.tender_name || "").toLowerCase();

    return (
      name === "n/a" ||
      name === "test" ||
      name === "hlo" ||
      name.length < 4 ||
      (item.buyer || "").toLowerCase() === "unknown buyer" ||
      !item.classification
    );
  };

  const handleView = (id) => {
    navigate(`/tenders/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this RFQ?");
    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/tenders/${id}`);

      if (res.data.success) {
        alert("RFQ deleted successfully");
        fetchRfqs();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete RFQ");
    }
  };

  const handleSuspend = async (id, currentStatus) => {
    const newStatus = currentStatus === "suspended" ? "active" : "suspended";

    try {
      const res = await API.put(`/tenders/${id}/suspend`, {
        status: newStatus,
      });

      if (res.data.success) {
        alert(`RFQ ${newStatus === "suspended" ? "blocked" : "unblocked"} successfully`);
        fetchRfqs();
      }
    } catch (error) {
      console.error("Suspend error:", error);
      alert("Failed to update status");
    }
  };

  const filteredRfqs = useMemo(() => {
    const q = searchTerm.toLowerCase();

    return rfqs.filter((item) => {
      return (
        (item.rfx_no || "").toLowerCase().includes(q) ||
        (item.tender_name || "").toLowerCase().includes(q) ||
        (item.buyer || "").toLowerCase().includes(q) ||
        (item.classification || "").toLowerCase().includes(q)
      );
    });
  }, [rfqs, searchTerm]);

  return (
    <div className="p-6 bg-[#f6f3ea] min-h-screen">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-[#2f5d50] mb-2">RFQ</h1>
        <p className="text-gray-600 text-lg">
          Monitor all RFQs in one place
        </p>
      </div>

      <div className="relative w-full max-w-md mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search RFQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#2f5d50]/20"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  RFX NO
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  RFQ Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Buyer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Classification / Industry
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Spam
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    Loading RFQs...
                  </td>
                </tr>
              ) : filteredRfqs.length > 0 ? (
                filteredRfqs.map((item) => {
                  const spam = isSpamRFQ(item);

                  return (
                    <tr
                      key={item.id}
                      className={`border-b last:border-b-0 transition ${
                        spam ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-[#2f5d50]">
                        {item.rfx_no}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-800">
                        {item.tender_name || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.buyer || "Unknown Buyer"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.classification || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {spam ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                            <AlertTriangle size={14} />
                            Spam
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">Safe</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {item.status === "suspended" ? (
                          <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                            Suspended
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleView(item.id)}
                            title="View RFQ"
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete RFQ"
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>

                          <button
                            onClick={() => handleSuspend(item.id, item.status)}
                            title={item.status === "suspended" ? "Unblock RFQ" : "Block RFQ"}
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                          >
                            {item.status === "suspended" ? (
                              <CheckCircle size={17} />
                            ) : (
                              <Ban size={17} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No RFQs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RFQPage;