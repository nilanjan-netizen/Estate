import React from "react";
import { useNavigate } from "react-router-dom";
import PropertyFilterForm from "./Sorter";

const Result = () => {
  const navigate = useNavigate();

  const handleSubmit = (filters) => {
    // Redirect to /sorter/contact and pass filters as state
    navigate("/contact", { state: { filters } }); 
    // OR use absolute: navigate("/sorter/contact", { state: { filters } });
  };

  return (
    <div>
      <PropertyFilterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Result;
