"use client";

import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ShopByCategory() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const categories = [
    {
      id: 1,
      title: "Basketball",
      description: "Professional basketball gear",
      image: "/images/category-basketball.jpeg",
      link: "/collections/basketball",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 2,
      title: "Running",
      description: "High-performance running shoes",
      image: "/images/category-running.jpeg",
      link: "/collections/running",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: 3,
      title: "Sneakers",
      description: "Street-style sneakers",
      image: "/images/category-sneakers.jpeg",
      link: "/collections/sneakers",
      color: "from-red-400 to-red-900",
    },
    {
      id: 4,
      title: "Clothing",
      description: "Athletic apparel & gear",
      image: "/images/category-clothing.jpeg",
      link: "/collections/clothing",
      color: "from-gray-400 to-gray-900",
    },
  ];

  return (
    <section className="bg-gray-900 px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <div className="bg-primary-green mb-6 inline-flex items-center rounded-full px-4 py-2 font-bold text-black">
            <span style={{ fontFamily: "var(--font-syne)" }}>Shop by Category</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl" style={{ fontFamily: "var(--font-syne)" }}>
            Find Your Perfect Gear
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link key={category.id} href={category.link} data-aos="fade-up" data-aos-delay={index * 100}>
              <div
                className={`group relative h-80 cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl ${category.color}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-50">
                  <Image src={category.image} alt={category.title} fill className="object-cover" />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="mb-2 text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                      {category.title}
                    </h3>
                    <p className="mb-4 text-sm opacity-90" style={{ fontFamily: "var(--font-poppins)" }}>
                      {category.description}
                    </p>

                    <div className="flex items-center space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>
                        Shop Now
                      </span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <h3 className="mb-6 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-syne)" }}>
            Let&apos;s get in touch
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300" style={{ fontFamily: "var(--font-poppins)" }}>
            Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="focus:border-primary-green w-full rounded-full border border-gray-700 bg-gray-800 px-6 py-3 text-white placeholder-gray-400 transition-colors duration-300 focus:outline-none sm:w-auto"
              style={{ fontFamily: "var(--font-poppins)" }}
            />
            <button
              className="bg-primary-green w-full transform rounded-full px-8 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#b8e600] sm:w-auto"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
