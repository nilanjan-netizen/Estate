import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

const Contact = () => {
  const { user } = useUser();
  const [result, setResult] = useState("");

  const [formFields, setFormFields] = useState({
    Name: user?.fullName || "",
    Email: user?.primaryEmailAddress?.emailAddress || "",
    location: "",
    price: "",
    bhk: "",
    area: "",
    floor: "",
    amenities: [],
    Message: "",
  });

  const cityOptions = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];
  const bhkOptions = ["1BHK", "2BHK", "3BHK", "4BHK+"];
  const floorOptions = ["Ground", "Middle", "Top"];
  const amenityOptions = ["Lift", "Parking", "Gym", "Pool", "Security"];

  useEffect(() => {
    const savedData = localStorage.getItem("propertyFormData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setFormFields(prev => ({
        ...prev,
        ...data,
        Message: `Property details:\nLocation: ${data.location}\nPrice: ${data.price}\nBHK: ${data.bhk}\nArea: ${data.area}\nFloor: ${data.floor}\nAmenities: ${data.amenities.join(", ")}`,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "amenities") {
      let updatedAmenities = [...formFields.amenities];
      if (checked) updatedAmenities.push(value);
      else updatedAmenities = updatedAmenities.filter(a => a !== value);
      setFormFields(prev => ({ ...prev, amenities: updatedAmenities }));
    } else {
      setFormFields(prev => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData();
    formData.append("access_key", "2d3dfd01-c449-4a98-bb14-ca21d713f85f");
    formData.append("Name", formFields.Name);
    formData.append("Email", formFields.Email);
    formData.append("Message", formFields.Message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        toast.success("Form Submitted Successfully");
        setResult("");
      } else {
        toast.error(data.message);
        setResult("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Submission failed!");
      setResult("");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 400 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="relative py-20 px-6 lg:px-32 bg-gradient-to-br from-sky-100 via-white to-indigo-100 overflow-hidden"
      id="Contact"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <form onSubmit={onSubmit} className="lg:col-span-2 bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20 hover:shadow-blue-200 transition-all duration-300 space-y-6">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Contact With Us
          </h1>

          {/* User info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Name</label>
              <input name="Name" value={formFields.Name} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Email</label>
              <input name="Email" type="email" value={formFields.Email} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>

          {/* Property details grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Location</label>
              <select name="location" value={formFields.location} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" required>
                <option value="">Select City</option>
                {cityOptions.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Price</label>
              <input type="number" name="price" value={formFields.price} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">BHK</label>
              <select name="bhk" value={formFields.bhk} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" required>
                <option value="">Select BHK</option>
                {bhkOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Area</label>
              <input type="text" name="area" value={formFields.area} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Floor</label>
              <select name="floor" value={formFields.floor} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" required>
                <option value="">Select Floor</option>
                {floorOptions.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map(a => (
                  <label key={a} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100 transition">
                    <input type="checkbox" name="amenities" value={a} checked={formFields.amenities.includes(a)} onChange={handleChange} />
                    {a}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Message</label>
            <textarea name="Message" value={formFields.Message} onChange={handleChange} className="w-full p-3 border rounded-xl h-40 resize-none focus:ring-2 focus:ring-indigo-500" placeholder="Your message..." required />
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90">
            {result ? result : "Send Message"}
          </button>
        </form>

        {/* Logged-in User Card */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-2 border-4 border-white shadow-lg">
            <span className="text-4xl font-bold">{user?.firstName?.[0] || "?"}</span>
          </div>
          {user ? (
            <>
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-sm text-white/80">{user.primaryEmailAddress?.emailAddress}</p>
              <div className="mt-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-sm font-medium shadow-inner">
                ✅ Logged In
              </div>
            </>
          ) : (
            <p className="text-gray-200">Not signed in</p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
