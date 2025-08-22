"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useFilters } from "@/store/Filters";
import { normalizeText } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  img: string;
  categoria: any;
}

// Función para calcular la distancia de Levenshtein usando programación dinámica
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  // Crear matriz DP
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Inicializar primera fila y columna
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  
  // Llenar la matriz DP
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // Eliminación
          dp[i][j - 1] + 1,     // Inserción
          dp[i - 1][j - 1] + 1  // Sustitución
        );
      }
    }
  }
  
  return dp[m][n];
}

// Función para calcular similitud basada en distancia de Levenshtein
function calculateSimilarity(str1: string, str2: string): number {
  const normalizedStr1 = normalizeText(str1);
  const normalizedStr2 = normalizeText(str2);
  const distance = levenshteinDistance(normalizedStr1, normalizedStr2);
  const maxLength = Math.max(normalizedStr1.length, normalizedStr2.length);
  return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
}

// Función para encontrar coincidencias parciales (substring)
function findPartialMatches(query: string, text: string): number {
  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);
  
  if (normalizedText.includes(normalizedQuery)) {
    return normalizedQuery.length / normalizedText.length;
  }
  
  // Buscar palabras individuales
  const queryWords = normalizedQuery.split(/\s+/);
  const textWords = normalizedText.split(/\s+/);
  
  let totalScore = 0;
  for (const queryWord of queryWords) {
    let bestScore = 0;
    for (const textWord of textWords) {
      if (textWord.includes(queryWord)) {
        bestScore = Math.max(bestScore, queryWord.length / textWord.length);
      }
    }
    totalScore += bestScore;
  }
  
  return totalScore / queryWords.length;
}

// Función para calcular similitud con equivalencias de caracteres
function calculateCharacterEquivalence(str1: string, str2: string): number {
  const normalizedStr1 = normalizeText(str1);
  const normalizedStr2 = normalizeText(str2);
  
  // Si son idénticos después de normalización, máxima similitud
  if (normalizedStr1 === normalizedStr2) {
    return 1;
  }
  
  // Calcular similitud basada en caracteres equivalentes
  let matches = 0;
  const maxLength = Math.max(normalizedStr1.length, normalizedStr2.length);
  
  for (let i = 0; i < Math.min(normalizedStr1.length, normalizedStr2.length); i++) {
    if (normalizedStr1[i] === normalizedStr2[i]) {
      matches++;
    }
  }
  
  return maxLength === 0 ? 1 : matches / maxLength;
}

// Función específica para calcular similitud de nombres de productos
function calculateProductNameSimilarity(query: string, productName: string): number {
  const normalizedQuery = normalizeText(query);
  const normalizedName = normalizeText(productName);
  
  // Si son idénticos, máxima similitud
  if (normalizedQuery === normalizedName) {
    return 1;
  }
  
  // Si el nombre contiene la consulta, alta similitud
  if (normalizedName.includes(normalizedQuery)) {
    return 0.9;
  }
  
  // Si la consulta contiene el nombre, similitud moderada
  if (normalizedQuery.includes(normalizedName)) {
    return 0.7;
  }
  
  // Calcular similitud de Levenshtein
  const levenshteinSim = calculateSimilarity(normalizedQuery, normalizedName);
  
  // Calcular similitud de caracteres
  const charSim = calculateCharacterEquivalence(normalizedQuery, normalizedName);
  
  // Combinar similitudes con mayor peso en Levenshtein
  return (levenshteinSim * 0.7) + (charSim * 0.3);
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const setName = useFilters((state) => state.setName);

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`);
        const data = await response.json();
        setAllProducts(data.products || []);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generar sugerencias mejoradas usando programación dinámica
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const normalizedQuery = normalizeText(query);
    
    // Calcular puntuación para cada producto
    const scoredProducts = allProducts.map(product => {
      const searchableText = normalizeText(
        `${product.name} ${product.brand} ${product.model} ${product.description}`
      );
      
      // Incluir categoría en el texto de búsqueda
      const categoryText = product.categoria?.name ? normalizeText(product.categoria.name) : '';
      const fullSearchableText = `${searchableText} ${categoryText}`;
      
      // Calcular diferentes tipos de similitud
      const exactMatch = fullSearchableText.includes(normalizedQuery) ? 1 : 0;
      const partialMatch = findPartialMatches(normalizedQuery, fullSearchableText);
      const levenshteinSimilarity = calculateSimilarity(normalizedQuery, fullSearchableText);
      const characterEquivalence = calculateCharacterEquivalence(normalizedQuery, fullSearchableText);
      
      // Puntuación ponderada
      let score = 0;
      
      // Priorizar coincidencias exactas
      if (exactMatch > 0) {
        score += 100;
      }
      
      // Bonus por coincidencia en nombre del producto (ALTA PRIORIDAD)
      const nameSimilarity = calculateProductNameSimilarity(normalizedQuery, product.name);
      score += nameSimilarity * 100; // Máxima prioridad para nombres de productos
      
      // Bonus por coincidencia en marca
      const brandSimilarity = calculateSimilarity(normalizedQuery, normalizeText(product.brand));
      score += brandSimilarity * 25; // Aumentado moderadamente
      
      // Coincidencias parciales generales
      score += partialMatch * 30; // Reducido significativamente
      
      // Similitud de Levenshtein general
      score += levenshteinSimilarity * 20; // Reducido
      
      // Equivalencia de caracteres (tildes, diéresis, etc.)
      score += characterEquivalence * 15; // Reducido
      
      // Bonus por coincidencia en categoría (menor prioridad)
      if (product.categoria?.name) {
        const categorySimilarity = calculateSimilarity(normalizedQuery, normalizeText(product.categoria.name));
        score += categorySimilarity * 15; // Reducido significativamente
        
        // Bonus extra si la categoría coincide exactamente
        if (normalizeText(product.categoria.name).includes(normalizedQuery)) {
          score += 20; // Reducido
        }
      }
      
      return {
        product,
        score
      };
    });

    // Filtrar y ordenar por puntuación
    const filtered = scoredProducts
      .filter(item => item.score > 0.1) // Solo productos con puntuación mínima
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Máximo 5 sugerencias
      .map(item => item.product);

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query, allProducts]);

  // Debounce para búsqueda en tiempo real
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 2) {
        // Normalizar la consulta antes de buscar
        const normalizedQuery = normalizeText(query);
        setName(normalizedQuery);
        router.push("/products");
      } else if (query.length === 0) {
        // Si el campo está vacío, solo limpiar la búsqueda sin redireccionar
        setName("");
      }
    }, 500); // Esperar 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timeoutId);
  }, [query, setName, router]);

  const handleSearch = () => {
    // Normalizar la consulta antes de buscar
    const normalizedQuery = normalizeText(query);
    setName(normalizedQuery);
    setShowSuggestions(false);
    router.push("/products");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setQuery(product.name);
    setName(normalizeText(product.name));
    setShowSuggestions(false);
    router.push("/products");
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setName(""); // Limpiar el filtro de búsqueda
    // No necesitamos router.push aquí porque el useEffect se encargará
  };

  return (
    <div ref={searchRef} className="relative flex z-10 w-full items-center text-white lg:mx-20 md:mx-10 border-b-2 focus-within:border-blue-500 transition-colors duration-300">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full h-8 outline-none bg-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length >= 2 && setShowSuggestions(true)}
      />
      
      {query && (
        <button 
          onClick={clearSearch}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      )}
      
      <button 
        onClick={handleSearch}
        className="p-1 hover:bg-white/10 rounded-full transition-colors"
      >
        <Search size={20} />
      </button>

      {/* Sugerencias */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50"
          >
            {suggestions.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(product)}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0 mr-3 overflow-hidden">
                  {product.img && (
                    <img 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {product.brand} • {product.model}
                  </div>
                  {product.categoria?.name && (
                    <div className="text-xs text-blue-600 font-medium">
                      📂 {product.categoria.name}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
