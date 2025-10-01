"use client";

import AOS from "aos";
import Link from "next/link";
import { useEffect } from "react";
import { FaBoltLightning } from "react-icons/fa6";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <section
        className="relative max-h-[350px] overflow-hidden sm:max-h-none"
        style={{
          backgroundImage: "url('/images/header-image-2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 md:pt-20 md:pb-16 lg:px-8">
          <div className="grid items-center gap-12 lg:min-h-[600px] lg:grid-cols-2">
            {/* Content */}
            <div className="space-y-8 text-white">
              <div data-aos="fade-right" data-aos-delay="400">
                <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-syne)" }}>
                  Unleash Your
                  <br />
                  <span className="text-primary-green">Potential</span> with
                  <br />
                  Elite Gear
                </h1>
              </div>

              <div data-aos="fade-right" data-aos-delay="600" className="hidden lg:block">
                <p
                  className="max-w-lg text-lg leading-relaxed text-gray-300 md:text-xl"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Discover premium sports equipment and apparel designed to elevate your performance and style.
                </p>
              </div>

              <div data-aos="fade-right" data-aos-delay="800">
                <Link
                  href="/collections"
                  className="bg-primary-green hover:shadow-primary-green/25 md:y-4 inline-flex transform items-center rounded-full px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#b8e600] hover:shadow-xl md:px-8 md:text-lg"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  SHOP NOW
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Banner */}
        <div className="right-0 bottom-0 left-0 overflow-hidden bg-black py-3 text-white">
          <div
            className="animate-marquee text-sm font-medium whitespace-nowrap md:text-base"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="mx-8">NEW DEALS - UP TO 50% OFF</span>
            <FaBoltLightning className="text-primary-green inline" />
            <span className="mx-8"> BLACK FRIDAY - UP TO 70% OFF</span>
            <FaBoltLightning className="text-primary-green inline" />
            <span className="mx-8">BLACK DEALS - UP TO 50% OFF</span>
            <FaBoltLightning className="text-primary-green inline" />
            <span className="mx-8"> NEW DEALS - UP TO 50% OFF</span>
            <FaBoltLightning className="text-primary-green inline" />
            <span className="mx-8"> BLACK FRIDAY - UP TO 70% OFF</span>
            <FaBoltLightning className="text-primary-green inline" />
            <span className="mx-8"> BLACK DEALS - UP TO 50% OFF</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </>
  );
}
