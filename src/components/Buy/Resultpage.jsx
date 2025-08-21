// src/components/PropertyLinks.jsx
import React from "react";

import { assets } from "../../assets/assets";

const sites = [
  { name: "99acres", url: "https://www.99acres.com/", logo: assets.a },
  { name: "MagicBricks", url: "https://www.magicbricks.com/", logo: assets.d }, // dhyan do: magic.png = d
  { name: "Housing.com", url: "https://housing.com/", logo: assets.c },
  { name: "CommonFloor", url: "https://www.commonfloor.com/", logo: assets.b }, // common.png = b
  { name: "NoBroker", url: "https://www.nobroker.in/", logo: assets.e },
];

const PropertyLinks = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-indigo-50 to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-900">
          <p className="text-center text-3xl text-gray-600 mb-12 max-w-2xl mx-auto">
        We proudly collaborate with India’s most trusted real estate platforms.
        Discover your dream property through our <span className="font-semibold text-indigo-600">partner portals</span>.
      </p>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sites.map((site) => (
          <div
            key={site.name}
            className="relative group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
          >
            <img
              src={site.logo}
              alt={site.name}
              className="w-24 h-24 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="text-2xl font-semibold mb-4 text-indigo-800">{site.name}</h3>
            <p className="text-gray-600 mb-6">
              Click below to visit {site.name} and explore properties.
            </p>
            <button
              onClick={() => window.open(site.url, "_blank")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              Visit Site
            </button>

            <div className="absolute inset-0 rounded-2xl border-2 border-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyLinks;
