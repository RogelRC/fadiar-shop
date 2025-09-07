"use client";

import { useState, useEffect } from 'react';

const Maintenance = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022953] via-[#033a6b] to-[#022953] relative overflow-hidden">

      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#022953]/10 to-transparent" />
      </div>

      {/* Geometric decorations */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 w-20 h-20 md:w-32 md:h-32 border border-blue-300/20 rotate-45 animate-spin opacity-40" style={{animationDuration: '30s'}} />
      <div className="absolute bottom-20 right-20 md:bottom-32 md:right-32 w-16 h-16 md:w-24 md:h-24 border border-cyan-300/20 rounded-full animate-pulse opacity-30" />
      <div className="absolute top-1/2 right-10 md:right-20 w-1 h-8 md:w-2 md:h-16 bg-gradient-to-b from-blue-300/40 to-transparent" />
      <div className="absolute bottom-1/4 left-8 md:left-16 w-8 h-1 md:w-16 md:h-2 bg-gradient-to-r from-cyan-300/40 to-transparent" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center">

          {/* Logo with glow effect */}
          <div className="mb-8 md:mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-2xl md:rounded-3xl blur-xl opacity-75 animate-pulse" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl w-full max-w-xs mx-auto">
              <img
                src="/logo.png"
                alt="Fadiar Shop Logo"
                className="w-full h-auto max-h-48 mx-auto object-contain filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 md:mb-6 tracking-wide px-2">
                Sitio en
                <span className="block bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent font-medium">
                  Mantenimiento
                </span>
              </h1>

              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mx-auto mb-6 md:mb-8" />
            </div>



            {/* Progress indication */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex justify-center items-center space-x-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
                <span className="text-gray-400 ml-3 md:ml-4 font-light text-sm md:text-base">Trabajando en ello</span>
              </div>

              {/* Elegant progress bar */}
              <div className="max-w-xs mx-auto">
                <div className="h-px bg-gray-700 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"
                    style={{
                      width: '100%',
                      animation: 'progress 4s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Subtle timestamp */}
            <div className="pt-6 md:pt-8 opacity-60">
              <p className="text-xs md:text-sm text-gray-400 font-mono tracking-wider">
                {time.toLocaleDateString('es-ES')} · {time.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; opacity: 1; }
          50% { width: 100%; opacity: 0.8; }
          100% { width: 0%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Maintenance;