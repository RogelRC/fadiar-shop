"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowBigLeft, ArrowBigRight} from "lucide-react";

const images = ["/slider1.webp", "/slider2.webp", "/slider3.webp"];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Autoplay cada 6s (solo si no se está arrastrando)
    useEffect(() => {
        if (isDragging) return;
        
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(timer);
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
                nextSlide();
            } else {
                // Swipe hacia la derecha (anterior)
                prevSlide();
            }
        }
        
        setIsDragging(false);
        setStartX(0);
        setCurrentX(0);
    }, [isDragging, startX, currentX]);

    // Funciones para manejar el mouse drag (para dispositivos con pantalla táctil)
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
        const threshold = 50; // Umbral mínimo para considerar un swipe
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe hacia la izquierda (siguiente)
                nextSlide();
            } else {
                // Swipe hacia la derecha (anterior)
                prevSlide();
            }
        }
        
        setIsDragging(false);
        setStartX(0);
        setCurrentX(0);
    }, [isDragging, startX, currentX]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div 
            ref={containerRef}
            className="relative w-full aspect-[225/122] overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out w-full h-full"
                style={{ 
                    transform: `translateX(-${current * 100}%)`,
                    transition: isDragging ? 'none' : 'transform 700ms ease-in-out'
                }}
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

            {/* Botones izquierda y derecha */}
            <button
                onClick={prevSlide}
                className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 items-center"
                aria-label="Anterior"
            >
                <ArrowBigLeft />
            </button>
            <button
                onClick={nextSlide}
                className="hidden md:block absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
                aria-label="Siguiente"
            >
                <ArrowBigRight />
            </button>

            {/* Indicadores de slide */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            current === index 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Ir al slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
