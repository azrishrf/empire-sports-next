"use client";

import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopTrending() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    const fetchProducts = async () => {
      try {
        const featuredProducts = await ProductService.getFeaturedProducts(5);
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="bg-primary-green mb-8 inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-black">
            Loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <div className="bg-primary-green inline-flex items-center rounded-full px-6 py-4 text-3xl font-bold text-black">
            <span style={{ fontFamily: "var(--font-syne)" }}>Top Trending</span>
          </div>

          {/* <div className="mb-8 flex flex-wrap justify-center gap-6">
            <button
              className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary-green hover:text-black"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              All
            </button>
            <button
              className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary-green hover:text-black"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Basketball
            </button>
            <button
              className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary-green hover:text-black"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Running Shoes
            </button>
          </div> */}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/collections/${product.category.toLowerCase()}/${product.id}`}
              className="group"
            >
              <div
                className="group-hover:-translate-y- rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                      View Details
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3
                    className="line-clamp-2 font-semibold text-gray-900 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                      {product.price}
                    </span>

                    {product.availability === "IN STOCK" && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-xs text-gray-500">(4.8)</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Services Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-primary-green mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
              FREE TO EXPRESS
            </h3>
            <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>
              Fast delivery on all orders
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-primary-green mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
              QUALITY CONFIRMED
            </h3>
            <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>
              Premium quality guaranteed
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-primary-green mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
              CUSTOMER SUPPORT
            </h3>
            <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>
              24/7 dedicated support
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm" data-aos="fade-up" data-aos-delay="400">
            <div className="bg-primary-green mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
              LOVE GUARANTEE
            </h3>
            <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>
              Love it or return it
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
