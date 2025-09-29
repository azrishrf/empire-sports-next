"use client";

import AOS from "aos";
import Image from "next/image";
import { useEffect } from "react";

export default function Testimonials() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="bg-gray-900 px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <div className="bg-primary-green mb-6 inline-flex items-center rounded-full px-4 py-2 font-bold text-black">
            <span style={{ fontFamily: "var(--font-syne)" }}>Testimonials</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl" style={{ fontFamily: "var(--font-syne)" }}>
            What Our Customers Say
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-300" style={{ fontFamily: "var(--font-poppins)" }}>
            Join thousands of satisfied customers who trust our premium sports equipment
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="mx-auto mb-16 max-w-4xl text-center" data-aos="fade-up" data-aos-delay="200">
          <div className="rounded-3xl bg-gray-800 p-8 shadow-2xl md:p-12">
            <div className="mb-8">
              <svg className="text-primary-green mx-auto mb-6 h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
            </div>

            <blockquote
              className="mb-8 text-2xl leading-relaxed font-medium md:text-3xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              &quot;I&apos;ve never found a sports accessories store that caters to my needs like this one! The
              selection is unparalleled, and the quality of the products is a top-notch. I&apos;m a customer for
              life&quot;
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Customer"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="text-lg font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                  Marcus Johnson
                </h4>
                <p className="text-gray-400" style={{ fontFamily: "var(--font-poppins)" }}>
                  Professional Chef
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Reviews */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Mohamed Ali",
              image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
              role: "Professional Runner",
              review: "Amazing quality shoes that helped improve my running performance. Highly recommended!",
              rating: 5,
            },
            {
              name: "Sarah Johnson",
              image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
              role: "Basketball Player",
              review: "The basketball gear is top-notch. Great customer service and fast delivery.",
              rating: 5,
            },
            {
              name: "Mike Chen",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
              role: "Fitness Enthusiast",
              review: "Best sports equipment store I've ever shopped at. Will definitely come back!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl bg-gray-800 p-6 shadow-xl"
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <div className="mb-4 flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="text-primary-green h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="mb-6 flex-1 leading-relaxed text-gray-300" style={{ fontFamily: "var(--font-poppins)" }}>
                &quot;{testimonial.review}&quot;
              </p>

              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400" style={{ fontFamily: "var(--font-poppins)" }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
