import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import API from "../api"; // path correct aakkuka if needed

const Tenders = () => {
  const [activeTab, setActiveTab] = useState("Tenders");
  const [searchTerm, setSearchTerm] = useState("");
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tenders");

      if (res.data.success) {
        setTenders(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching tenders:", error);
      setTenders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const filteredTenders = useMemo(() => {
    return tenders.filter((item) => {
      const q = searchTerm.toLowerCase();

      return (
        (item.rfx_no || "").toLowerCase().includes(q) ||
        (item.tender_name || "").toLowerCase().includes(q) ||
        (item.buyer || "").toLowerCase().includes(q) ||
        (item.classification || "").toLowerCase().includes(q)
      );
    });
  }, [tenders, searchTerm]);

  return (
    <div className="p-6 bg-[#f6f3ea] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-[#2f5d50] mb-2">
          Tenders & Transactions
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor all tenders in one place
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["Tenders", "Bids", "Purchase Orders", "Invoices & Payments"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg font-medium border transition ${
                activeTab === tab
                  ? "bg-white text-[#2f5d50] border-gray-300 shadow-sm"
                  : "bg-transparent text-gray-600 border-transparent"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Only Tenders tab content */}
      {activeTab === "Tenders" && (
        <>
          {/* Search */}
          <div className="relative w-full max-w-md mb-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#2f5d50]/20"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      RFX NO
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Tender Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Buyer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Classification
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Loading tenders...
                      </td>
                    </tr>
                  ) : filteredTenders.length > 0 ? (
                    filteredTenders.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b last:border-b-0 hover:bg-gray-50/70 transition"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-[#2f5d50]">
                          {item.rfx_no}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {item.tender_name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.buyer || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.classification || "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No tenders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== "Tenders" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-500">
          No data connected for this tab yet.
        </div>
      )}
    </div>
  );
};

export default Tenders;