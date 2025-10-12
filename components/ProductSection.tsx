"use client";

import { Product } from "@/data/products";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect } from "react";

interface ServiceItem {
  icon: ReactElement;
  title: string;
  description: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  loading?: boolean;
  showServices?: boolean;
  services?: ServiceItem[];
  className?: string;
}

const defaultServices: ServiceItem[] = [
  {
    icon: (
      <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "FREE TO EXPRESS",
    description: "Fast delivery on all orders",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: "QUALITY CONFIRMED",
    description: "Premium quality guaranteed",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
    title: "CUSTOMER SUPPORT",
    description: "24/7 dedicated support",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "LOVE GUARANTEE",
    description: "Love it or return it",
  },
];

export default function ProductSection({
  title,
  products,
  loading = false,
  showServices = false,
  services = defaultServices,
  className = "",
}: ProductSectionProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  if (loading) {
    return (
      <section className={`bg-white px-4 py-16 ${className}`}>
        <div className="mx-auto max-w-7xl text-center">
          <div className="bg-primary-green mb-8 inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-black">
            Loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-white px-4 py-16 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <div className="bg-primary-green inline-flex items-center rounded-full px-6 py-4 text-3xl font-bold text-black">
            <span style={{ fontFamily: "var(--font-syne)" }}>{title}</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="scrollbar-hide overflow-x-auto md:overflow-visible">
          <div className="flex space-x-4 pb-4 md:grid md:grid-cols-3 md:gap-6 md:space-x-0 md:pb-0 lg:grid-cols-5">
            {products.map((product, index) => (
              <Link
                key={product.id}
                href={`/collections/${product.category.toLowerCase()}/${product.id}`}
                className="group h-full w-64 flex-shrink-0 md:w-auto"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 hover:shadow-lg">
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
                  <div className="flex flex-1 flex-col justify-between space-y-3">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Services Section */}
        {showServices && (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="bg-primary-green mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  {service.icon}
                </div>
                <h3 className="mb-2 font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
