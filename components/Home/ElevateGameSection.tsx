"use client";

import AOS from "aos";
import Image from "next/image";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";

export default function ElevateGameSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const features = [
    {
      title: "Advanced Material Technology",
      description: "Cutting-edge materials for superior performance",
    },
    {
      title: "Precision Design",
      description: "Every detail crafted for optimal functionality",
    },
    {
      title: "Champion Quality",
      description: "Trusted by professional athletes worldwide",
    },
  ];

  return (
    <section className="bg-gray-100 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative" data-aos="fade-right">
            <div className="relative z-10">
              <Image
                src="/images/running-man.jpg"
                alt="Athletic Performance"
                width={600}
                height={500}
                className="h-auto w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>

            {/* Decorative Elements */}
            <div className="bg-primary-green absolute -top-8 -left-8 h-32 w-32 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-blue-500 opacity-15 blur-3xl"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-8" data-aos="fade-left">
            <div>
              <h2
                className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Elevate Your
                <br />
                Game, Gear Up
                <br />
                <span className="text-primary-green">with Passion</span>
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>
                Discover the fusion that the right gear can elevate your ultimate performance and make you feel amazing.
                Join thousands of satisfied athletes who trust our premium equipment to reach their peak potential.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4" data-aos="fade-up" data-aos-delay={index * 200}>
                  <div className="bg-primary-green flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl">
                    <TiTick />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-wrap gap-4 pt-6">
              <Link
                href="/collections"
                className="inline-flex transform items-center rounded-full bg-primary-green px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#b8e600] hover:shadow-xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Shop Collection
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/collections"
                className="inline-flex items-center rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-primary-green hover:text-primary-green"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Learn More
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
