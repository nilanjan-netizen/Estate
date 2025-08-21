import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const menuLinks = [
    { name: "Home", to: "/", style: "px-4 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md" },
    { name: "Luxury Projects", to: "/Projects", style: "px-4 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition duration-300 shadow-md" },
    { name: "BUY", to: "/Sorter", style: "px-4 py-2 rounded-full font-bold text-green-700 bg-green-100 hover:bg-green-700 hover:text-white transition duration-300 shadow-inner" },
    { name: "Check-Out", to: "/cart", style: "px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300 shadow-lg" },
    { name: "Partners", to: "/Partners", style: "px-4 py-2 rounded-lg font-semibold text-indigo-600 border-2 border-indigo-600 hover:text-white hover:bg-indigo-600 transition duration-300" },
    { name: "About", to: "/About", style: "px-4 py-2 rounded-lg hover:text-red-500 transition duration-300" },
    { name: "Testimonials", to: "/Testimonials", style: "px-4 py-2 rounded-lg hover:text-red-500 transition duration-300" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-transparent">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-32 md:w-40" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-lg font-medium">
          {menuLinks.map((link) => (
            <Link key={link.name} to={link.to} className={link.style}>
              {link.name}
            </Link>
          ))}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-white px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition duration-300">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-full h-full bg-white z-20 transform transition-transform duration-300 ${
          showMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <img onClick={() => setShowMobileMenu(false)} src={assets.cross_icon} className="w-6" alt="close" />
        </div>

        <ul className="flex flex-col items-center gap-4 mt-6 text-lg font-medium">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              onClick={() => setShowMobileMenu(false)}
              to={link.to}
              className={`${link.style} w-3/4 text-center`}
            >
              {link.name}
            </Link>
          ))}
        </ul>

        {/* Mobile Auth Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-white px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition duration-300">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
