import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Backend API call ka placeholder
    console.log("Subscribed Email:", email);

    toast.success("Thank you for subscribing!", {
      position: "top-center",
      autoClose: 2000,
    });

    setEmail("");
  };

  return (
    <div
      className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden"
      id="Footer"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo + About */}
        <div className="w-full md:w-1/3">
          <img src={assets.logo_dark} alt="Logo" className="w-32" />
          <p className="text-gray-400 mt-4 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/5">
          <h3 className="text-white text-lg font-bold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <a href="/About" className="hover:text-white">
              About us
            </a>
            <a href="/Contact" className="hover:text-white">
              Contact us
            </a>
            <a href="/Testimonials" className="hover:text-white">
              Privacy policy
            </a>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-400 mb-4 max-w-80">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
              transition-all duration-200 w-full md:w-auto"
            />
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 
              text-white font-semibold shadow-md transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 mt-10 text-center text-gray-500 text-sm">
        Copyright 2025 © Real Estates Developers. All Rights Reserved.
      </div>

      <ToastContainer />
    </div>
  );
};

export default Footer;
