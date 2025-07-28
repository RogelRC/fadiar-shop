import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Spinner simple */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        
        {/* Texto de carga */}
        <div className="text-gray-600 font-medium">Cargando...</div>
      </div>
    </div>
  );
}
