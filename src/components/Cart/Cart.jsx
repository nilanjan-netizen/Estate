import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookings, deleteBooking, clearBookings } from "../store/bookingStore";

const Cart = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleRemove = (index) => {
    deleteBooking(index);
    setBookings(getBookings());
  };

  const handleClear = () => {
    clearBookings();
    setBookings([]);
  };

  const totalPrice = bookings.reduce(
    (sum, b) => sum + (Number(b.price?.toString().replace(/\D/g, "")) || 0),
    0
  );

  // Replace this with your active Stripe Test Payment Link
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_6oU9AS9tPgr90s6gSzgjC01";

  const handleCheckout = () => {
    if (bookings.length === 0) {
      alert("No bookings to checkout!");
      return;
    }

    // Open Stripe checkout in a new tab
    const checkoutWindow = window.open(STRIPE_PAYMENT_LINK, "_blank");

    // Poll every 500ms to detect if the user closes the tab
    const timer = setInterval(() => {
      if (checkoutWindow.closed) {
        clearInterval(timer);

        // Demo logic: simulate success/failure
        const demoSuccess = true; // change to false to simulate failure

        if (demoSuccess) {
          navigate("/about"); // success redirect
        } else {
          navigate("/"); // failure redirect
        }
      }
    }, 500);
  };

  return (
    <div className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((b, i) => (
            <div key={i} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{b.title}</h2>
                <p className="text-gray-600">{b.location}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-blue-600 font-bold">{b.price}</div>
                <button
                  onClick={() => handleRemove(i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-blue-100 rounded shadow text-right font-bold text-lg">
            Total: ₹{totalPrice}
          </div>

          <div className="flex justify-between mt-6 gap-4">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear All
            </button>

            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings yet.</p>
      )}
    </div>
  );
};

export default Cart;
