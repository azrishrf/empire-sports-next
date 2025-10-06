"use client";

import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function AboutUsPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const teamMembers = [
    {
      name: "Azri Ishraf",
      role: "Founder & CEO",
      description: "Software engineer turned entrepreneur with a passion for business and sports",
      image: "/images/founder.jpeg",
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      description: "Expert in athletic performance gear and product innovation",
      image: "/images/sarah.jpeg",
    },
    {
      name: "Mike Rodriguez",
      role: "Brand Partnerships",
      description: "Building relationships with world-class sports brands",
      image: "/images/wilson.jpeg",
    },
  ];

  const values = [
    {
      icon: "🏆",
      title: "Excellence",
      description:
        "We partner with only the finest sports brands to bring you premium quality products that enhance your athletic performance.",
    },
    {
      icon: "🤝",
      title: "Community",
      description:
        "Building a passionate community of athletes, fitness enthusiasts, and sports lovers who inspire each other to achieve greatness.",
    },
    {
      icon: "🚀",
      title: "Innovation",
      description:
        "Constantly evolving to bring you the latest innovations in sports technology, fashion, and performance gear.",
    },
    {
      icon: "💚",
      title: "Sustainability",
      description:
        "Committed to environmental responsibility by partnering with brands that prioritize sustainable manufacturing practices.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Empire Sports Founded",
      description: "Started with a vision to make premium sports gear accessible to everyone",
    },
    {
      year: "2021",
      title: "Brand Partnerships",
      description: "Established partnerships with Nike, Adidas, New Balance, and other leading brands",
    },
    {
      year: "2022",
      title: "Community Growth",
      description: "Reached 50,000+ satisfied customers across the region",
    },
    {
      year: "2023",
      title: "Digital Innovation",
      description: "Launched our advanced e-commerce platform with personalized shopping experience",
    },
    {
      year: "2024",
      title: "Expansion",
      description: "Expanded our product range to include premium athletic wear and accessories",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="px-4 text-center text-white">
            <h1
              className="mb-4 text-3xl font-bold md:text-6xl"
              style={{ fontFamily: "var(--font-syne)" }}
              data-aos="fade-up"
            >
              Who We Are
            </h1>
            <p className="mx-auto max-w-3xl text-lg opacity-90 md:text-xl" data-aos="fade-up" data-aos-delay="200">
              Empowering athletes and fitness enthusiasts with premium sports gear from the world&apos;s leading brands
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto !max-w-[1300px] px-4 !py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h2
              className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Our Story
            </h2>
            <p className="mb-6 leading-relaxed text-gray-600">
              Empire Sports was born from a simple belief: every athlete deserves access to the best gear that can help
              them reach their full potential. Founded by former professional athletes and sports enthusiasts, we
              understand the importance of quality, performance, and style.
            </p>
            <p className="mb-6 leading-relaxed text-gray-600">
              What started as a small sports retail vision has grown into a trusted destination for premium athletic
              wear, footwear, and accessories. We&apos;ve built strong partnerships with iconic brands like Nike,
              Adidas, New Balance, Puma, and many more.
            </p>
            <p className="leading-relaxed text-gray-600">
              Today, Empire Sports continues to evolve, always staying true to our mission of making premium sports gear
              accessible while building a community of passionate athletes who inspire each other to achieve greatness.
            </p>
          </div>
          <div data-aos="fade-left" className="relative">
            <div className="relative h-96 overflow-hidden rounded-2xl shadow-2xl">
              <Image src="/images/elevate-running.jpg" alt="Empire Sports Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-[1400px] px-4">
          <div className="mb-12 text-center">
            <div
              className="bg-primary-green mb-6 inline-flex items-center rounded-full px-6 py-4 text-3xl font-bold text-black"
              data-aos="fade-up"
            >
              <span style={{ fontFamily: "var(--font-syne)" }}>Our Values</span>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="200">
              The principles that drive everything we do at Empire Sports
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="transform rounded-xl bg-white p-8 text-center shadow-lg"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* <div className="mb-4 text-4xl">{value.icon}</div> */}
                <h3 className="mb-4 text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                  {value.title}
                </h3>
                <p className="leading-relaxed text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Journey Section */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-[1400px] px-4 py-16">
          <div className="mb-12 text-center">
            <div
              className="bg-primary-green mb-6 inline-flex items-center rounded-full px-6 py-4 text-3xl font-bold text-black"
              data-aos="fade-up"
            >
              <span style={{ fontFamily: "var(--font-syne)" }}> Our Journey</span>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-white" data-aos="fade-up" data-aos-delay="200">
              Milestones that shaped Empire Sports into what it is today
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform bg-gray-300 md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col items-center md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                  >
                    <div className="transform rounded-xl bg-gray-200 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <span
                        className="bg-primary-green mb-4 rounded-xl px-4 text-2xl font-bold text-gray-900"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {milestone.year}
                      </span>
                      <h3 className="mt-3 mb-1 text-xl font-bold text-black" style={{ fontFamily: "var(--font-syne)" }}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-700">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden w-2/12 justify-center md:flex">
                    <div className="bg-primary-green border-primary-green h-4 w-4 rounded-full border-4 shadow-lg"></div>
                  </div>

                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-[1400px] px-4">
          <div className="mb-12 text-center">
            <h2
              className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
              style={{ fontFamily: "var(--font-syne)" }}
              data-aos="fade-up"
            >
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="200">
              The passionate individuals behind Empire Sports
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-800 hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                    {member.name}
                  </h3>
                  <p className="text-primary-green mb-3 font-medium">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto max-w-[1400px] px-4 text-center">
          <h2
            className="mb-6 text-3xl font-bold text-white md:text-4xl"
            style={{ fontFamily: "var(--font-syne)" }}
            data-aos="fade-up"
          >
            Ready to Elevate Your Game?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300" data-aos="fade-up" data-aos-delay="200">
            Join thousands of customers who trust Empire Sports for their premium gear needs
          </p>
          <div
            className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link
              href="/collections"
              className="bg-dark-green inline-block max-w-40 rounded-lg px-8 py-3 text-lg font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Shop Now
            </Link>
            <Link
              href="/brands"
              className="inline-block max-w-52 rounded-lg border-2 border-white px-8 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-white hover:text-gray-900"
            >
              Explore Brands
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
