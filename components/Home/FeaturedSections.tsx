"use client";

import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function FeaturedSections() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const featuredSections = [
    {
      id: 1,
      title: "Elevate Your Run with Our Premium Accessories",
      description: "Discover gear that enhances every stride",
      image: "/images/elevate-running.jpg",
      link: "/collections/running",
      buttonText: "Shop Now",
      className: "bg-gradient-to-br from-blue-200 to-blue-800 text-white md:col-span-2 row-span-1",
    },
    {
      id: 2,
      title: "Where Performance Meets Premium",
      description: "Elite gear for elite athletes",
      image: "/images/dunk-basketball.jpeg",
      link: "/collections/basketball",
      buttonText: "Explore",
      className: "bg-gradient-to-br from-red-300 to-red-700 text-white col-span-1 row-span-1",
    },
    {
      id: 3,
      title: "Smart Style Collections",
      description: "Fashion meets function",
      image: "/images/supreme banner.png",
      link: "/collections/clothing",
      buttonText: "Shop",
      className: "bg-gradient-to-br from-gray-800 to-gray-900 text-white col-span-1 row-span-1",
    },
    {
      id: 4,
      title: "Performance Precision Sport Essentials",
      description: "Engineered for champions",
      //   image: "/images/authentication.png",
      link: "/collections/sneakers",
      buttonText: "Shop",
      className: "bg-gradient-to-br from-primary-green to-[#a8d600] text-black col-span-1 row-span-1",
    },
    {
      id: 5,
      title: "SwiftStride Styles High Performance",
      description: "Speed meets style",
      image: "/images/boxing-glove.jpeg",
      link: "/collections/sneakers",
      buttonText: "Explore",
      className: "bg-gradient-to-br from-yellow-100 to-red-800 text-white col-span-1 row-span-1",
    },
  ];

  return (
    <section className="bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredSections.map((section, index) => (
            <Link
              key={section.id}
              href={section.link}
              className={`${section.className} group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl p-8 transition-all`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Background Image */}
              {section.image && (
                <div className="absolute inset-0 opacity-60 transition-all duration-1000 group-hover:scale-110">
                  <Image src={section.image} alt={section.title} fill className="object-cover" />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <h3
                    className="mb-3 text-xl leading-tight font-bold md:text-2xl"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {section.title}
                  </h3>
                  <p className="mb-6 text-sm opacity-90 md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>
                    {section.description}
                  </p>
                </div>

                <div
                  className="inline-flex w-fit items-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300 group-hover:translate-x-2 hover:bg-white/30"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {section.buttonText}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white/10 blur-lg"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
