import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import API from "../../api";

const countryCurrencyMap = {
  India: "INR",
  USA: "USD",
  UAE: "AED",
  Qatar: "QAR",
  Bahrain: "BHD",
  Saudi: "SAR",
};

const currencySymbols = {
  INR: "₹",
  USD: "$",
  AED: "AED ",
  QAR: "QAR ",
  BHD: "BHD ",
  SAR: "SAR ",
};

const CreatePlanModal = ({ close, refreshPlans, editPlan = null }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    billing: "Monthly",
    features: "",
    status: "Active",
    country: "India",
    currency: "INR",
    discount: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPlan) {
      setForm({
        name: editPlan.name || "",
        price: editPlan.price ?? "",
        billing: editPlan.billing || "Monthly",
        features: editPlan.features || "",
        status: editPlan.status || "Active",
        country: editPlan.country || "India",
        currency: editPlan.currency || "INR",
        discount:
          editPlan.discount !== null && editPlan.discount !== undefined
            ? String(editPlan.discount)
            : "",
      });
    }
  }, [editPlan]);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0) {
      newErrors.price = "Enter a valid price";
    }

    if (
      form.discount !== "" &&
      (isNaN(Number(form.discount)) || Number(form.discount) < 0)
    ) {
      newErrors.discount = "Discount must be a valid positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const autoCurrency = countryCurrencyMap[value] || "USD";
      setForm((prev) => ({
        ...prev,
        country: value,
        currency: autoCurrency,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setForm((prev) => ({
      ...prev,
      price: value,
    }));
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setForm((prev) => ({
      ...prev,
      discount: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        billing: form.billing,
        features: form.features.trim(),
        status: form.status,
        country: form.country,
        currency: form.currency,
        discount: form.discount === "" ? 0 : Number(form.discount),
      };

      const res = editPlan
        ? await API.put(`/subscriptions/${editPlan.id}`, payload)
        : await API.post("/subscriptions/add", payload);

      if (res.data.success) {
        alert(editPlan ? "Plan updated successfully" : "Plan created successfully");
        refreshPlans();
        close();
      } else {
        alert(res.data.message || "Failed to save plan");
      }
    } catch (error) {
      console.error("SAVE PLAN ERROR:", error);
      alert("Failed to save plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-1">
          {editPlan ? "Edit Plan" : "Create New Plan"}
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Add or update subscription plan details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Plan Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Professional"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UAE">UAE</option>
                <option value="Qatar">Qatar</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Saudi">Saudi</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Currency</label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="AED">AED</option>
                <option value="QAR">QAR</option>
                <option value="BHD">BHD</option>
                <option value="SAR">SAR</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Price</label>
              <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
                <span className="px-3 text-gray-600 bg-gray-50 border-r">
                  {currencySymbols[form.currency] || form.currency}
                </span>
                <input
                  type="text"
                  name="price"
                  placeholder="e.g. 99"
                  value={form.price}
                  onChange={handlePriceChange}
                  className="w-full px-3 py-2 focus:outline-none"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Discount (Optional)</label>
              <input
                type="text"
                name="discount"
                placeholder="e.g. 10"
                value={form.discount}
                onChange={handleDiscountChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Billing Cycle</label>
              <select
                name="billing"
                value={form.billing}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="Monthly">Monthly</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Features</label>
            <textarea
              rows="3"
              name="features"
              placeholder="e.g. 25 Users, Unlimited RFQs, Priority Support"
              value={form.features}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900"
            >
              {loading ? "Saving..." : editPlan ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanModal;