import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

// Importing product images
import tshirtImg from "../assets/tshirt.jpg";
import graphicImg from "../assets/graphictee.jpg";
import shoesImg from "../assets/shoes.jpg";
import watchImg from "../assets/watch.jpg";
import bagImg from "../assets/laptopbag.jpg";
import backpackImg from "../assets/backpack.jpg";
import hpImg from "../assets/wireless.jpg";           // Wireless headphones
import laptopImg from "../assets/gaminglaptop.jpg";
import novelImg from "../assets/fictionnovel.jpg";
import walletImg from "../assets/leatherwallet.jpg";
import speakersImg from "../assets/speaker.jpg";
import spectsImg from "../assets/sunglasses.jpg";

// Diverse product list
const allProducts = [
  { id: 1, name: "Basic T-shirt", price: 299, category: "T-shirt", image: tshirtImg },
  { id: 2, name: "Running Shoes", price: 999, category: "Shoes", image: shoesImg },
  { id: 3, name: "Classic Watch", price: 1299, category: "Watch", image: watchImg },
  { id: 4, name: "Laptop Bag", price: 799, category: "Bags", image: bagImg },
  { id: 5, name: "Wireless Headphones", price: 2499, category: "Electronics", image: hpImg },
  { id: 6, name: "Sunglasses", price: 599, category: "Accessories", image: spectsImg },
  { id: 7, name: "Leather Wallet", price: 499, category: "Accessories", image: walletImg},
  { id: 8, name: "Gaming Laptop", price: 54999, category: "Electronics", image: laptopImg },
  { id: 9, name: "Fiction Novel", price: 299, category: "Books", image: novelImg },
  { id: 10, name: "Casual Backpack", price: 1099, category: "Bags", image: backpackImg },
  { id: 11, name: "Graphic Tee", price: 499, category: "T-shirt", image: graphicImg },
  { id: 12, name: "Bluetooth Speaker", price: 1999, category: "Electronics", image: speakersImg },
];

export default function Home() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("low");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const categories = [...new Set(allProducts.map((p) => p.category))];

  useEffect(() => {
    const filterProducts = () => {
      let tempProducts = allProducts;

      // Search filter
      if (search) {
        tempProducts = tempProducts.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Category filter
      if (selectedCategories.length > 0) {
        tempProducts = tempProducts.filter((p) =>
          selectedCategories.includes(p.category)
        );
      }

      // Sort filter
      if (sortOrder === "low") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "high") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(tempProducts);
    };

    filterProducts();
  }, [search, selectedCategories, sortOrder]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r h-screen sticky top-0">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>

        {/* Sort By */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Sort By</h3>
          <div>
            <label className="block">
              <input
                type="radio"
                name="sort"
                value="low"
                checked={sortOrder === "low"}
                onChange={() => setSortOrder("low")}
              />
              <span className="ml-2">Price: Low to High</span>
            </label>
            <label className="block">
              <input
                type="radio"
                name="sort"
                value="high"
                checked={sortOrder === "high"}
                onChange={() => setSortOrder("high")}
              />
              <span className="ml-2">Price: High to Low</span>
            </label>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          {categories.map((category) => (
            <label key={category} className="block">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span className="ml-2">{category}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold">Mini E-Commerce Store</h1>
          <p className="mt-2 text-gray-600">Find your favorites at affordable prices.</p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-xl text-gray-600">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-contain rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700 mb-4">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
