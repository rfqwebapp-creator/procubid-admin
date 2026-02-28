// src/components/dashboard/AlertCard.jsx

import React from "react";

const AlertCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 flex gap-3 items-start hover:bg-gray-200 transition">
      {icon && (
        <div className="text-yellow-500 mt-1">
          {icon}
        </div>
      )}

      <div>
        <p className="font-medium text-gray-800">{title}</p>
        {desc && (
          <p className="text-sm text-gray-500 mt-1">{desc}</p>
        )}
      </div>
    </div>
  );
};

export default AlertCard;