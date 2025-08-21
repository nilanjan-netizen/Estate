import React, { useEffect, useState } from "react";
import { assets, projectsData } from "../assets/assets";
import { motion } from "framer-motion";
import { saveBooking, getBookings, clearBookings } from "./store/bookingStore";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [bookings, setBookings] = useState([]);

  // 🔹 Load stored bookings on mount
  useEffect(() => {
    setBookings(getBookings());

    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(projectsData.length);
      } else {
        setCardsToShow(1);
      }
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };

  // ✅ Book project (using store)
  const handleBooking = (project) => {
    saveBooking(project);
    setBookings(getBookings()); // refresh bookings list
  };

  // ❌ Unbook specific project
  const handleUnbook = (index) => {
    let updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  // 🗑️ Clear All Bookings
  const handleClearAll = () => {
    clearBookings();
    setBookings([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1.25 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="Projects"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Exclusive Premium Projects{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          that we Completed
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        Crafting Spaces, Building Legacies—Explore Our Portfolio
      </p>

      {/* slider buttons */}
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={prevProject}
          className="p-3 bg-gray-200 rounded mr-2"
        >
          <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button
          onClick={nextProject}
          className="p-3 bg-gray-200 rounded mr-2"
        >
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>

      {/* project slider container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            width: `${(projectsData.length / cardsToShow) * 100}%`,
          }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="relative flex-shrink-0 w-full sm:w-1/4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto mb-14"
              />
              <div className="absolute left-0 right-0 bottom-5 flex justify-center">
                <div className="inline-block bg-sky-100 w-3/4 px-4 py-2 shadow-md text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {project.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {project.price} | {project.location}
                  </p>
                  <button
                    onClick={() => handleBooking(project)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 Show booking list */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">📝 Recent Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="space-y-2">
            {bookings.map((b, i) => (
              <li
                key={i}
                className="p-3 bg-gray-100 rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <span className="font-medium">{b.title}</span> - {b.location}
                  <div className="text-xs text-gray-500">
                    {new Date(b.bookedAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleUnbook(i)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  ❌ Unbook
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bookings yet.</p>
        )}

        {bookings.length > 0 && (
          <button
            onClick={handleClearAll}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑️ Clear All Bookings
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
