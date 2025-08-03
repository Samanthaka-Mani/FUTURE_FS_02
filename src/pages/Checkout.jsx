import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Import CartContext
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, totalAmount } = useCart();  // Access cart and totalAmount from CartContext
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !shippingAddress || !paymentMethod) {
      toast.error("Please fill out all fields");
      return;
    }

    toast.success(`Order placed successfully for ${name}`);
    setName("");
    setEmail("");
    setShippingAddress("");
    setPaymentMethod("");
  };

  return (
    <div className="min-h-screen bg-lightGray flex items-center justify-center p-8">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-3xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Complete Your Checkout
        </h2>

        {/* Dynamic Order Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>

          {/* Dynamically display cart items */}
          {cart.length === 0 ? (
            <div className="text-lg text-center text-gray-500">Your cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between text-lg mb-2">
                <span>{item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))
          )}

          <hr className="my-4" />
          {/* Displaying the Total Amount */}
          <div className="font-semibold text-xl flex justify-between">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="1234 Main St, City, Country"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="payment" className="block text-lg font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="">Select Payment Method</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
