import React from "react";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "T-shirt", price: 299 },
  { id: 2, name: "Shoes", price: 999 },
  { id: 3, name: "Watch", price: 1299 },
];

export default function ProductList() {
  const { dispatch } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <button
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
} 