"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const images = ["/slider1.webp", "/slider2.webp", "/slider3.webp"];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index: number) => setCurrent(index);

  // Opcional: autoplay cada 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] max-h-[90vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <Link
            href="/products"
            key={index}
            className="flex-shrink-0 w-full h-full relative"
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/30 hover:bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
