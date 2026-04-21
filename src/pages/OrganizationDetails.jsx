import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const InfoCard = ({ label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-base font-medium text-gray-800">
      {value || "-"}
    </p>
  </div>
);

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/organizations/${id}/details`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching organization details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading organization details...</div>;
  }

  if (!data) {
    return <div className="p-6">No data found</div>;
  }

  return (
    <div className="p-6 bg-[#f7f4ec] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2f4f3e]">
            Organization Details
          </h1>
          <p className="text-gray-600 mt-1">
            View complete company information
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-[#486b50] text-white hover:bg-[#3d5b44]"
        >
          Back
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#2f4f3e] mb-4">
          Basic Organization Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard label="Company Name" value={data.company_name} />
          <InfoCard label="Organization Email" value={data.organization_email} />
          <InfoCard label="Role Type" value={data.role_type} />
          <InfoCard label="Sector" value={data.sector} />
          <InfoCard label="Region" value={data.region} />
          <InfoCard label="Status" value={data.status} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-[#2f4f3e] mb-4">
          Company Profile Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard label="Legal Name" value={data.legal_name} />
          <InfoCard label="Address" value={data.address} />
          <InfoCard label="Country" value={data.country} />
          <InfoCard label="Phone" value={data.phone} />
          <InfoCard label="Email" value={data.email} />
          <InfoCard label="Type" value={data.type} />
          <InfoCard label="Size" value={data.size} />
          <InfoCard label="Industry" value={data.industry} />
          <InfoCard label="Registration Number" value={data.reg_number} />
          <InfoCard label="VAT/GST" value={data.vat} />
          <InfoCard label="Incorporated Date" value={data.inc_date} />
          <InfoCard label="Procurement Count" value={data.procurement_count} />
          <InfoCard label="LinkedIn" value={data.linkedin} />
          <InfoCard label="Twitter" value={data.twitter} />
          <InfoCard label="Facebook" value={data.facebook} />
          <InfoCard label="Instagram" value={data.instagram} />
          <InfoCard label="YouTube" value={data.youtube} />
          <InfoCard
            label="NDA Required"
            value={data.nda_required === 1 ? "Yes" : "No"}
          />
          <InfoCard
            label="Vendor Form Required"
            value={data.vendor_form_required === 1 ? "Yes" : "No"}
          />
        </div>

        <div className="mt-6">
          <div className="bg-[#f9fafb] border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-2">About Company</p>
            <p className="text-gray-800 leading-7">{data.about || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;