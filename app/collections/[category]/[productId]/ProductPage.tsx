"use client";

import ProductTabs from "@/components/Product/ProductTabs";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import Image from "next/image";
import { useState } from "react";
import Toastify from "toastify-js";

export default function ProductPage({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-white" data-aos="fade" data-aos-duration="500">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          {/* {product.images && product.images.length > 1 && (
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
          )} */}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 md:text-3xl" style={{ fontFamily: "var(--font-syne)" }}>
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-medium text-gray-900">{product.price}</p>
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
            <h3 className="mb-3 text-sm font-medium text-gray-900">Choose Size In Stock</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes!.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-primary-green bg-primary-green text-black"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-xl border-t border-b border-l border-gray-300 text-black"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-10 w-6 appearance-none border-t border-b border-gray-300 text-center text-sm [-webkit-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-xl border-t border-r border-b border-gray-300 text-black"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-dark-green flex-1 cursor-pointer rounded-2xl px-6 py-3 font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <ProductTabs product={product} />
    </div>
  );
}
