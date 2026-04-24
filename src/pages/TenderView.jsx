import React from "react";
import { useParams } from "react-router-dom";

const TenderView = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tender View</h1>
      <p>RFQ ID: {id}</p>
    </div>
  );
};

export default TenderView;