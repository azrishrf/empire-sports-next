"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FadeSlideShow() {
  const [index, setIndex] = useState(0);
  const images = [
    { src: "/images/basketball banner.png", alt: "Basketball Banner" },
    { src: "/images/supreme banner.png", alt: "Supreme Banner" },
    { src: "/images/running banner.png", alt: "Running Banner" },
  ];
  const interval = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <section className="mt-10">
      <div className="relative mx-auto aspect-video max-h-[600px] w-full overflow-hidden">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={1200}
            height={400}
            className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
