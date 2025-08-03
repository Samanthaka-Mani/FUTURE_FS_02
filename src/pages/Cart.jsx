// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const { cart, removeFromCart, increment, decrement } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-6">
          <FaShoppingCart className="text-2xl mr-2 text-blue-600" />
          <h2 className="text-3xl font-bold">Shopping Cart</h2>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow-sm border"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded text-lg font-bold hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border rounded-md px-2 py-1"
                  />
                  <button
                    onClick={() => increment(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded text-lg font-bold hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">
                Total: <span className="text-green-600">₹{total}</span>
              </p>
              <Link
                to="/checkout"
                className="inline-block mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 font-medium"
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
