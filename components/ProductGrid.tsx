"use client";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  image: string;
  createdAt?: Timestamp;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("newest");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        const dateA = a.createdAt
          ? a.createdAt instanceof Timestamp
            ? a.createdAt.toDate().getTime()
            : new Date(a.createdAt).getTime()
          : 0;
        const dateB = b.createdAt
          ? b.createdAt instanceof Timestamp
            ? b.createdAt.toDate().getTime()
            : new Date(b.createdAt).getTime()
          : 0;
        return dateB - dateA;

      case "price-low":
        return parseFloat(a.price.replace("RM", "")) - parseFloat(b.price.replace("RM", ""));
      case "price-high":
        return parseFloat(b.price.replace("RM", "")) - parseFloat(a.price.replace("RM", ""));
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Sort Control */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded border border-gray-400 px-3 py-1 pr-8 text-sm hover:ring-1 hover:ring-black focus:ring-1 focus:ring-black focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
            <IoMdArrowDropdown
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 transition-colors duration-150 select-none group-focus-within:text-black group-hover:text-black"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
