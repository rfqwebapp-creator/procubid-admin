import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import API from "../../api";

const RFQPage = () => {
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
          <table className="w-full min-w-[700px]">
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
                  Classification
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    Loading RFQs...
                  </td>
                </tr>
              ) : filteredRfqs.length > 0 ? (
                filteredRfqs.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
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