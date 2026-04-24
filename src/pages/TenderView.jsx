import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const TenderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTender = async () => {
    try {
      const res = await API.get(`/tenders/${id}`);

      if (res.data.success) {
        setTender(res.data.data);
      }
    } catch (error) {
      console.error("Fetch tender details error:", error);
      alert("Failed to fetch tender details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTender();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading tender details...</div>;
  }

  if (!tender) {
    return <div className="p-6">Tender not found</div>;
  }

  return (
    <div className="p-6 bg-[#f6f3ea] min-h-screen">
      <button
        onClick={() => navigate("/tenders")}
        className="mb-6 px-4 py-2 rounded-lg bg-white border"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-[#2f5d50] mb-2">
        {tender.rfx_no}
      </h1>

      <p className="text-gray-600 mb-6">
        {tender.heading || tender.tender_name || "N/A"}
      </p>

      <div className="bg-white rounded-2xl shadow-sm border p-6 grid grid-cols-2 gap-5">
        <Detail label="Buyer" value={tender.buyer} />
        <Detail label="Status" value={tender.status} />
        <Detail label="Requisition Type" value={tender.requisition_type} />
        <Detail label="Classification" value={tender.selected_industry} />
        <Detail label="Publish Date" value={tender.publish_date} />
        <Detail label="Closing Date" value={tender.closing_date} />
        <Detail label="Delivery Time" value={tender.delivery_time} />
        <Detail label="Payment Terms" value={tender.payment_terms} />
        <Detail label="Supplier Option" value={tender.supplier_option} />
        <Detail label="RFQ Visibility" value={tender.rfx_visibility} />

        <div className="col-span-2">
          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-gray-900">
            {tender.item_description_note || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900">{value || "N/A"}</p>
  </div>
);

export default TenderView;