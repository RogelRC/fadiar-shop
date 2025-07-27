"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/frame1.webp", "/frame2.webp", "/frame3.webp"];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Autoplay cada 6s (solo si no se está arrastrando)
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isDragging]);

  // Funciones para manejar el swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Umbral mínimo para considerar un swipe
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe hacia la izquierda (siguiente)
        handleNext();
      } else {
        // Swipe hacia la derecha (anterior)
        handlePrev();
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  }, [isDragging, startX, currentX]);

  // Funciones para manejar el mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  }, [isDragging, startX, currentX]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[90vh] overflow-hidden bg-black cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{
            opacity: 0,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: 0.8 },
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <div className="absolute bottom-8 left-8 text-white">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4">
          CATÁLOGO
        </h1>
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === idx ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 right-8 z-10">
        <NavArrow direction="left" onClick={handlePrev} />
        <NavArrow direction="right" onClick={handleNext} />
      </div>
    </div>
  );
}

function NavArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-white/10 rounded-full transition-colors"
      aria-label={`Slide ${direction === "left" ? "anterior" : "siguiente"}`}
    >
      <Image
        src="/Iconos-06.svg"
        alt=""
        width={40}
        height={40}
        className={direction === "left" ? "" : "rotate-180"}
      />
    </button>
  );
}
