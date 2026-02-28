// src/components/dashboard/ActivityItem.jsx

import React from "react";

const ActivityItem = ({ title, desc, tag = "info", time }) => {
  const tagStyles = {
    info: "bg-gray-200 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-0">
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        {desc && (
          <p className="text-sm text-gray-500">{desc}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-3 py-1 rounded-full capitalize ${
            tagStyles[tag] || tagStyles.info
          }`}
        >
          {tag}
        </span>
        {time && (
          <span className="text-xs text-gray-400">{time}</span>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;