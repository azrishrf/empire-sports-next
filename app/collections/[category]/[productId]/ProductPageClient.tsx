"use client";

import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import Image from "next/image";
import { useState } from "react";
import Toastify from "toastify-js";

interface ProductPageClientProps {
  product: Product;
  breadcrumbItems: Array<{ label: string; href: string }>;
}

export default function ProductPageClient({ product, breadcrumbItems }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const { addItem } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      Toastify({
        text: "Please select a size first!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ef4444",
        },
      }).showToast();
      return;
    }

    if (!product) return;

    // Add item to cart
    addItem(product, selectedSize, quantity);

    // Show success notification
    Toastify({
      text: "Added to cart!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #10b981, #059669)",
      },
    }).showToast();

    // Reset form
    setSelectedSize("");
    setQuantity(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-white">
            <Image
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 overflow-hidden rounded border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-gray-900">{product.price}</p>
          </div>

          {/* Product Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Availability:</span>
              <div className="flex items-center space-x-2">
                {product.availability === "IN STOCK" ? (
                  <span className="inline-block rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">
                    IN STOCK
                  </span>
                ) : (
                  <span className="inline-block rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    OUT OF STOCK
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-300" />

          {/* Size Selection */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-900">CHOOSE UK SIZE IN STOCK</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes!.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-900">QUANTITY</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-lg bg-gray-400 text-white hover:bg-gray-500"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-8 w-12 appearance-none border-t border-b border-gray-300 text-center text-sm [-webkit-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-lg bg-gray-400 text-white hover:bg-gray-500"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-lg bg-[#283071] px-6 py-3 font-bold text-white transition-colors hover:bg-blue-900"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="flex space-x-2 text-sm">
          <button
            onClick={() => setActiveTab("DESCRIPTION")}
            className={`rounded-xl px-6 py-3 font-medium ${
              activeTab === "DESCRIPTION"
                ? "bg-red-800 text-white"
                : "cursor-pointer bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
            }`}
          >
            DESCRIPTION
          </button>
          <button
            onClick={() => setActiveTab("DETAILS")}
            className={`rounded-xl px-6 py-3 font-medium ${
              activeTab === "DETAILS"
                ? "bg-red-800 text-white"
                : "cursor-pointer bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
            }`}
          >
            DETAILS
          </button>
          <button
            onClick={() => setActiveTab("REVIEW")}
            className={`rounded-xl px-6 py-3 font-medium ${
              activeTab === "REVIEW"
                ? "bg-red-800 text-white"
                : "cursor-pointer bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
            }`}
          >
            REVIEW
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
          {activeTab === "DESCRIPTION" && (
            <div>
              <p className="text-sm leading-relaxed text-gray-700">{product.description}</p>
            </div>
          )}
          {activeTab === "DETAILS" && (
            <div>
              <h4 className="mb-3 font-bold">Product Details</h4>
              <table className="w-full border-separate [border-spacing:0.5rem] text-sm text-gray-700">
                <tbody>
                  <tr>
                    <td className="w-32 font-semibold">Brand:</td>
                    <td>{product.brand || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Model:</td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Colorway:</td>
                    <td>{product.colorway || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Category:</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Material:</td>
                    <td>{product.material || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Gender:</td>
                    <td>{product.gender || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "REVIEW" && (
            <div>
              <h4 className="mb-3 font-bold">Customer Reviews</h4>
              <p className="text-gray-700">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
