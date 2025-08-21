import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyFilterForm = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bhk, setBhk] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [amenities, setAmenities] = useState([]);

  const cityOptions = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];
  const bhkOptions = ["1BHK", "2BHK", "3BHK", "4BHK+"];
  const amenityOptions = ["Lift", "Parking", "Gym", "Pool", "Security"];

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    if (amenities.includes(value)) {
      setAmenities(amenities.filter(a => a !== value));
    } else {
      setAmenities([...amenities, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!location || !price || !bhk || !area || !floor || amenities.length === 0) {
      alert("Please fill all the details before proceeding!");
      return;
    }

    const formData = { location, price, bhk, area, floor, amenities };

    // Save JSON to localStorage
    localStorage.setItem("propertyFormData", JSON.stringify(formData));

    // Navigate to contact page
    navigate("/Contact");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
        Select which type of property you need
      </h2>

      {/* Location */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select City</option>
        {cityOptions.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max Price (INR)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      {/* BHK */}
      <select
        value={bhk}
        onChange={(e) => setBhk(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select BHK Type</option>
        {bhkOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {/* Area */}
      <input
        type="text"
        placeholder="Built-up / Carpet Area (sq.ft)"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      {/* Floor */}
      <select
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select Floor Preference</option>
        <option value="Ground">Ground</option>
        <option value="Middle">Middle</option>
        <option value="Top">Top</option>
      </select>

      {/* Amenities */}
      <div className="flex flex-wrap gap-3">
        {amenityOptions.map(a => (
          <label key={a} className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-100 transition">
            <input
              type="checkbox"
              value={a}
              checked={amenities.includes(a)}
              onChange={handleAmenityChange}
              className="accent-indigo-600"
            />
            <span>{a}</span>
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition"
      >
        Save & Continue
      </button>
    </form>
  );
};

export default PropertyFilterForm;
