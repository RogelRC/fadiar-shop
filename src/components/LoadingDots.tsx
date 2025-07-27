interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingDots({ size = 'md', text = 'Cargando', className = '' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-2 h-2 space-x-1',
    md: 'w-3 h-3 space-x-1.5',
    lg: 'w-4 h-4 space-x-2'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Puntos animados */}
      <div className="flex items-center mb-3">
        <div className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-bounce`} style={{ animationDelay: '0s' }}></div>
        <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
        <div className={`${sizeClasses[size]} bg-blue-700 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
      </div>
      
      {/* Texto */}
      {text && (
        <div className={`text-blue-600 font-medium ${textSizes[size]} animate-pulse`}>
          {text}
        </div>
      )}
    </div>
  );
}

// Variante para pantalla completa
export function LoadingDotsFullScreen({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="text-center">
        {/* Círculo de fondo con efecto de ondas */}
        <div className="relative mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
          </div>
          
          {/* Ondas de expansión */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 animate-ping"></div>
          <div className="absolute -inset-2 rounded-full border-2 border-blue-400/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -inset-4 rounded-full border-2 border-blue-500/10 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Puntos animados */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce mx-1" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Texto */}
        <div className="text-blue-700 font-semibold text-lg animate-pulse">
          {text}
        </div>
      </div>
    </div>
  );
} 