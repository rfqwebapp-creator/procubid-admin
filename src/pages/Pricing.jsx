import { useState } from "react"
import { FiPercent, FiPlus, FiEdit, FiTag } from "react-icons/fi"
import AddCommissionModal from "./forms/AddCommissionModal" // NEW

const Pricing = () => {

  const [activeTab, setActiveTab] = useState("subscription")
  const [showCommissionModal, setShowCommissionModal] = useState(false) // NEW

  const plans = [
    {
      name: "Basic Plan",
      price: "$49",
      duration: "30 days",
      features: "Up to 5 users, 10 tenders/month, Email support",
      status: "Active",
      enabled: true
    },
    {
      name: "Premium Plan",
      price: "$99",
      duration: "30 days",
      features: "Up to 25 users, Unlimited tenders, Priority support, Analytics",
      status: "Active",
      enabled: true
    },
    {
      name: "Enterprise Plan",
      price: "$299",
      duration: "30 days",
      features: "Unlimited users, Unlimited tenders, Dedicated support, Custom workflows",
      status: "Active",
      enabled: true
    },
    {
      name: "Annual Basic",
      price: "$490",
      duration: "365 days",
      features: "Basic plan features, billed annually (2 months free)",
      status: "Active",
      enabled: true
    },
    {
      name: "Trial Plan",
      price: "$0",
      duration: "14 days",
      features: "Full access for 14 days, No credit card required",
      status: "Inactive",
      enabled: false
    }
  ]

  const commissionRates = [
    { rate: "2.5%", effective: "2024-01-01" },
    { rate: "3%", effective: "2024-04-01" }
  ]

  const coupons = [
    {
      code: "WELCOME10",
      type: "Percentage",
      value: "10%",
      expiry: "2025-12-31",
      used: 23,
      limit: 100,
      status: "Active"
    },
    {
      code: "START50",
      type: "Fixed",
      value: "$50",
      expiry: "2025-10-01",
      used: 10,
      limit: 50,
      status: "Active"
    },
    {
      code: "REFERRAL20",
      type: "Percentage",
      value: "20%",
      expiry: "2025-08-01",
      used: 0,
      limit: 30,
      status: "Inactive"
    }
  ]

  const statusBadge = (status) =>
    status === "Active"
      ? "bg-primary text-white"
      : "bg-gray-200 text-gray-700"

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Pricing & Subscriptions
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Manage subscription plans, pricing, and platform commission settings
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setShowCommissionModal(true)} // NEW
            className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
          >
            <FiPercent /> Commission Settings
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 text-sm">
            <FiPlus /> New Plan
          </button>

        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg w-fit">

        {["subscription", "commission", "coupons"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${
              activeTab === tab
                ? "bg-white shadow text-primary"
                : "text-gray-500"
            }`}
          >
            {tab === "subscription"
              ? "Subscription Plans"
              : tab === "commission"
              ? "Commission Settings"
              : "Coupons"}
          </button>
        ))}

      </div>

      {/* ================= SUBSCRIPTION TAB ================= */}
      {activeTab === "subscription" && (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {plans.slice(0,3).map((plan,i)=>(
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border relative">

                <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-primary text-white">
                  {plan.status}
                </span>

                <h2 className="text-lg font-semibold mb-2">{plan.name}</h2>

                <p className="text-3xl font-bold text-green-600">
                  {plan.price}
                  <span className="text-sm text-gray-500 font-normal">/month</span>
                </p>

                <p className="text-gray-500 mt-3 text-sm">
                  {plan.features}
                </p>

              </div>
            ))}

          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4 text-left">Plan Name</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Duration</th>
                    <th className="p-4 text-left">Features</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Active</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>

                <tbody>

                  {plans.map((plan,i)=>(
                    <tr key={i} className="border-t hover:bg-gray-50">

                      <td className="p-4 font-medium">{plan.name}</td>
                      <td className="p-4">{plan.price}</td>
                      <td className="p-4">{plan.duration}</td>
                      <td className="p-4 text-gray-600">{plan.features}</td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${statusBadge(plan.status)}`}>
                          {plan.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                          plan.enabled ? "bg-primary" : "bg-gray-300"
                        }`}>
                          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                            plan.enabled ? "translate-x-6" : ""
                          }`} />
                        </div>
                      </td>

                      <td className="p-4 text-gray-500 cursor-pointer">
                        <FiEdit />
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>

        </>
      )}

      {/* ================= COMMISSION TAB ================= */}
      {activeTab === "commission" && (

        <div className="bg-white p-6 rounded-xl shadow-sm w-full md:w-[600px]">

          <h2 className="text-lg font-semibold mb-2">
            Platform Commission Rate
          </h2>

          <p className="text-gray-500 mb-4 text-sm">
            Commission percentage applied to all transactions on the platform.
          </p>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 text-left">Commission %</th>
                  <th className="p-4 text-left">Effective From</th>
                </tr>
              </thead>

              <tbody>

                {commissionRates.map((c,i)=>(
                  <tr key={i} className="border-t">
                    <td className="p-4 font-medium">{c.rate}</td>
                    <td className="p-4 text-gray-600">{c.effective}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* ================= COUPONS TAB ================= */}
      {activeTab === "coupons" && (

        <>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

            <div>
              <h2 className="text-lg font-semibold">Coupon Codes</h2>
              <p className="text-gray-500 text-sm">
                Create and manage discount coupons for subscriptions.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm">
                <FiTag /> Generate Referral
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 text-sm">
                <FiPlus /> Create Coupon
              </button>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-4">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4 text-left">Code</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Discount</th>
                    <th className="p-4 text-left">Expiry</th>
                    <th className="p-4 text-left">Used</th>
                    <th className="p-4 text-left">Limit</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>

                <tbody>

                  {coupons.map((coupon,i)=>(
                    <tr key={i} className="border-t hover:bg-gray-50">

                      <td className="p-4 font-medium flex items-center gap-2">
                        <FiTag className="text-gray-400"/>
                        {coupon.code}
                      </td>

                      <td className="p-4 text-gray-600">
                        {coupon.type}
                      </td>

                      <td className="p-4 font-medium">
                        {coupon.value}
                      </td>

                      <td className="p-4 text-gray-600">
                        {coupon.expiry}
                      </td>

                      <td className="p-4">
                        {coupon.used}
                      </td>

                      <td className="p-4">
                        {coupon.limit}
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${statusBadge(coupon.status)}`}>
                          {coupon.status}
                        </span>
                      </td>

                      <td className="p-4 text-gray-500 cursor-pointer">
                        <FiEdit />
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </>

      )}

      {showCommissionModal && (
        <AddCommissionModal
          close={() => setShowCommissionModal(false)}
        />
      )}

    </div>
  )
}

export default Pricing