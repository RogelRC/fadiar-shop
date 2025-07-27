import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="relative">
        {/* Círculo principal con gradiente */}
        <div className="relative w-24 h-24">
          {/* Círculo exterior animado */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"></div>
          
          {/* Círculo de carga principal */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 animate-spin"></div>
          
          {/* Círculo interior con gradiente */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <div className="w-8 h-8 relative animate-pulse">
              <Image
                src="/vercel.svg"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Puntos flotantes */}
        <div className="absolute -top-4 -left-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -top-4 -right-4 w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        
        {/* Texto de carga */}
        <div className="mt-8 text-center">
          <div className="text-blue-600 font-semibold text-lg mb-2">Cargando...</div>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
