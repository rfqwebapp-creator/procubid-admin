// src/components/dashboard/StatCard.jsx

import React from "react";

const StatCard = ({ title, value, sub, icon, subColor = "text-green-600" }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
          {title}
        </p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        {sub && (
          <p className={`text-sm mt-1 ${subColor}`}>
            {sub}
          </p>
        )}
      </div>

      {icon && (
        <div className="bg-gray-100 p-3 rounded-lg text-teal-600">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;