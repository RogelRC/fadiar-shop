export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative">
        {/* Spinner principal */}
        <div className="relative w-20 h-20">
          {/* Anillos concéntricos */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-200/50 animate-ping"></div>
          <div className="absolute inset-1 rounded-full border-2 border-blue-300/50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-2 rounded-full border-2 border-blue-400/50 animate-ping" style={{ animationDelay: '1s' }}></div>
          
          {/* Spinner giratorio */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 border-b-blue-400 animate-spin"></div>
          
          {/* Centro con logo o icono */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Efectos de partículas */}
        <div className="absolute -inset-8">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-600 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.9s' }}></div>
        </div>
        
        {/* Texto y progreso */}
        <div className="mt-6 text-center">
          <div className="text-blue-700 font-medium text-sm mb-3">Preparando todo para ti...</div>
          
          {/* Barra de progreso animada */}
          <div className="w-32 h-1 bg-blue-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          
          {/* Indicadores de puntos */}
          <div className="flex space-x-1 justify-center mt-3">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 