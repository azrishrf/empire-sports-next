"use client";

import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface BrandData {
  name: string;
  image: string;
}

export default function TopBrands() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Static brand data
  const brands: BrandData[] = [
    { name: "Nike", image: "/images/category-sneakers.jpeg" },
    { name: "Adidas", image: "/images/adidas.jpeg" },
    { name: "New Balance", image: "/images/new-balance.jpeg" },
    { name: "Puma", image: "/images/puma.jpeg" },
    { name: "Asics", image: "/images/asics.jpeg" },
    { name: "Under Armour", image: "/images/under-armour.jpeg" },
    { name: "Stüssy", image: "/images/category-clothing.jpeg" },
    { name: "Wilson", image: "/images/wilson.jpeg" },
  ];
  const handleBrandClick = (brandName: string) => {
    // Convert brand name to URL-friendly format
    const brandSlug = brandName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/collections/${brandSlug}`);
  };

  return (
    <section className="bg-gray-950 px-4 pt-8 pb-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <div className="bg-primary-green mb-6 inline-flex items-center rounded-full px-6 py-4 text-2xl font-bold text-black">
            <span style={{ fontFamily: "var(--font-syne)" }}>Top Brands</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-syne)" }}>
            Shop by Your Favorite Brands
          </h2>
          <p className="mx-auto max-w-2xl text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Discover premium products from the world&apos;s leading sports and lifestyle brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-40">
                <Image src={brand.image} alt={brand.name} fill className="object-cover" />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Brand Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="transform transition-transform duration-300 group-hover:scale-110">
                  {/* Brand Name */}
                  <h3 className="mb-3 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                    {brand.name}
                  </h3>

                  {/* Shop Now Button */}
                  <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                    <span
                      className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      Shop Now
                    </span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-white/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <p className="mb-6 text-lg text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Can&apos;t find your favorite brand?
          </p>
          <Link
            href="/collections"
            className="bg-primary-green inline-flex items-center rounded-full px-8 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#b8e600]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Browse All Products
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
