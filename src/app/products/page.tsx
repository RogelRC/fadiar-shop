"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect, useMemo } from "react";
import { useFilters } from "@/store/Filters";
import { Currency, ListFilter, X } from "lucide-react";
import Loading from "@/components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { normalizeText, searchInText } from "@/lib/utils";

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

// Función para calcular similitud de nombres de productos
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
  
  return levenshteinSim;
}
import AuthModal from "@/components/AuthModal";
import CategoryMarquee from "@/components/CategoryMarquee";

interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  img: string;
  prices: [number, number, string][];
  specs: [number, string, string][];
  count: number;
  categoria: any;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [location, setLocation] = useState<string>("");
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const setBrand = useFilters((state) => state.setBrand);
  const setAvailable = useFilters((state) => state.setAvailable);
  const setMinPrice = useFilters((state) => state.setMinPrice);
  const setMaxPrice = useFilters((state) => state.setMaxPrice);
  const setName = useFilters((state) => state.setName);
  const setCategory = useFilters((state) => state.setCategory);

  const [loading, setLoading] = useState<boolean>(true);
  
  // Leer parámetros de URL para aplicar filtros
  useEffect(() => {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Si hay un parámetro de categoría, aplicarlo al filtro
    if (categoryParam) {
      setCategory(decodeURIComponent(categoryParam));
    }
  }, [setCategory]);

  useEffect(() => {
    const fetchAll = async function () {
      try {
        const res = await fetch("https://app.fadiar.com/api/get_location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        //setLocation(!data.country || data.country === "Cuba" ? "CU" : "US");
        setLocation("US")
      } catch (error) {
        //console.error("Error obteniendo la ubicación:", error);
        setLocation("CU");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inventory`,
        );
        const products = await response.json();
        //console.log(products.products);
        setProducts(products.products);
        setCurrencies(products.currencys.currencys);
      } catch (error) {
        setProducts([]);
        throw new Error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // console.log(products);
  // console.log(currencies);

  const { name, brand, available, minPrice, maxPrice, category } = useFilters();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const nameMatch = !name || searchInText(name, product.name);
      const brandMatch = !brand || searchInText(brand, product.brand);
      const availableMatch =
        available === "available"
          ? product.count > 0
          : available === "out"
            ? product.count <= 0
            : true;

      const categoryMatch = !category || (product.categoria?.name && normalizeText(category) === normalizeText(product.categoria.name));

      let price = 0;
      if (location === "CU" && product.prices[0][2] === "CUP")
        price = product.prices[0][1];
      else if (location !== "CU" && product.prices[0][2] === "USD")
        price = product.prices[0][1];
      else if (location === "CU" && product.prices[0][2] === "USD")
        price = product.prices[0][1] * currencies[1].value;
      else if (location !== "CU" && product.prices[0][2] === "CUP")
        price =
          Math.ceil((product.prices[0][1] / currencies[1].value) * 100) / 100;

      const priceMatch =
        (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);

      return (
        nameMatch && brandMatch && availableMatch && priceMatch && categoryMatch
      );
    });
  }, [
    products,
    name,
    brand,
    available,
    minPrice,
    maxPrice,
    category,
    location,
    currencies,
  ]);

  const resetFilters = () => {
    setName("");
    setBrand("");
    setAvailable("");
    setMinPrice(0);
    setMaxPrice(1000000);
    setCategory(""); // <-- nuevo
  };

  // Función para verificar si hay filtros activos
  const hasActiveFilters = () => {
    return name !== "" || brand !== "" || available !== "" || category !== "" || minPrice > 0 || maxPrice < 1000000;
  };

  // Función para obtener productos recomendados
  const getRecommendedProducts = useMemo(() => {
    if (!name || name.length < 2) return [];
    
    const normalizedQuery = normalizeText(name);
    
    // Calcular puntuación para cada producto que NO está en los resultados filtrados
    const scoredProducts = products
      .filter(product => {
        // Excluir productos que ya están en los resultados filtrados
        const isInFilteredResults = filteredProducts.some(fp => fp.id === product.id);
        return !isInFilteredResults;
      })
      .map(product => {
        const searchableText = normalizeText(
          `${product.name} ${product.brand} ${product.model} ${product.description}`
        );
        
        // Incluir categoría en el texto de búsqueda
        const categoryText = product.categoria?.name ? normalizeText(product.categoria.name) : '';
        const fullSearchableText = `${searchableText} ${categoryText}`;
        
        // Calcular diferentes tipos de similitud
        const exactMatch = fullSearchableText.includes(normalizedQuery) ? 1 : 0;
        const nameSimilarity = calculateProductNameSimilarity(normalizedQuery, product.name);
        const brandSimilarity = calculateSimilarity(normalizedQuery, normalizeText(product.brand));
        const categorySimilarity = product.categoria?.name ? 
          calculateSimilarity(normalizedQuery, normalizeText(product.categoria.name)) : 0;
        
        // Puntuación ponderada
        let score = 0;
        
        // Priorizar coincidencias exactas
        if (exactMatch > 0) {
          score += 50;
        }
        
        // Bonus por coincidencia en nombre del producto (ALTA PRIORIDAD)
        score += nameSimilarity * 40;
        
        // Bonus por coincidencia en marca
        score += brandSimilarity * 20;
        
        // Bonus por coincidencia en categoría
        score += categorySimilarity * 15;
        
        return {
          product,
          score
        };
      });

    // Filtrar y ordenar por puntuación
    return scoredProducts
      .filter(item => item.score > 0.1) // Solo productos con puntuación mínima
      .sort((a, b) => b.score - a.score)
      .slice(0, 6) // Máximo 6 recomendaciones
      .map(item => item.product);
  }, [name, products, filteredProducts]);

  if (loading) return <Loading />;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <CategoryMarquee 
        products={products} 
        onCategorySelect={setCategory} 
      />

      <div className="flex flex-col relative w-full py-6 px-4 sm:px-8 space-y-6">
        {/* Menu de filtros*/}
        <AnimatePresence>
          {filterIsOpen && (
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed flex -bottom-6 left-0 w-full z-50 justify-center"
            >
              <div className="flex flex-col lg:w-1/3 sm:w-2/3 w-full h-full bg-white rounded-t-lg p-4 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.3)] border-2 gap-4">
                <div className="flex w-full">
                  <h3 className="text-xl text-[#022953] font-bold">Filtros</h3>
                  <button
                    className="ml-auto w-6 h-6"
                    onClick={() => setFilterIsOpen(false)}
                  >
                    <X />
                  </button>
                </div>
                <div className="relative">
                  <select
                    className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md bg-white"
                    onChange={(e) => setAvailable(e.target.value)}
                    value={available}
                    style={{
                      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.7rem top 50%',
                      backgroundSize: '0.65rem auto',
                      paddingRight: '2.5rem',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <option value="">Disponibles y agotados</option>
                    <option value="available">Disponibles</option>
                    <option value="out">Agotados</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md bg-white"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    style={{
                      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.7rem top 50%',
                      backgroundSize: '0.65rem auto',
                      paddingRight: '2.5rem',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <option value="">Todas las categorías</option>
                    {products
                      .map((product) => product.categoria?.name)
                      .filter((cat, index, arr) => cat && arr.indexOf(cat) === index)
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="relative">
                  <select
                    className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md bg-white"
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                    style={{
                      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.7rem top 50%',
                      backgroundSize: '0.65rem auto',
                      paddingRight: '2.5rem',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <option value="">Todas las marcas</option>
                    {products
                      .map((product) => product.brand)
                      .filter((brand, index, array) => array.indexOf(brand) === index)
                      .map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex p-2 border-2 border-gray-300 rounded-md gap-2 items-center">
                  <span className="flex flex-nowrap w-full">
                    Rango de precios
                  </span>
                  <input
                    type="number"
                    className="flex w-18 text-right"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  ></input>
                  <span>-</span>
                  <input
                    type="number"
                    className="flex w-18"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  ></input>
                </div>
                <button
                  onClick={resetFilters}
                  className="flex w-full items-center justify-center font-bold text-white hover:bg-blue-900 p-2 bg-[#022953]"
                >
                  Reiniciar filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex w-full items-center">
          <h1 className="flex font-bold sm:text-3xl text-xl text-[#022953]">
            Catálogo de productos
          </h1>
          <div className="flex gap-2 ml-auto">
            <AnimatePresence mode="wait">
              {hasActiveFilters() && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  onClick={resetFilters}
                  className="flex items-center justify-center px-2 py-1 rounded-md bg-gray-500 text-white gap-2 hover:scale-110 transition-all duration-300"
                >
                  <span>
                    <X />
                  </span>
                  <span className="hidden sm:inline">Limpiar</span>
                </motion.button>
              )}
            </AnimatePresence>
            <button
              onClick={() => setFilterIsOpen(!filterIsOpen)}
              className="flex items-center justify-center px-2 py-1 rounded-md bg-[#022953] text-white gap-2 hover:scale-110 transition-all duration-300"
            >
              <span>
                <ListFilter />
              </span>
              <span>Filtros</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts
              .sort(
                (a: Product, b: Product) =>
                  (b.count > 0 ? 1 : -1) - (a.count > 0 ? 1 : -1),
              )
              .map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  location={location}
                  currencies={currencies}
                  onAuthRequired={() => setShowAuthModal(true)}
                />
              ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500 mb-4">
                Intenta ajustar los filtros o usar términos de búsqueda diferentes
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#022953] text-white rounded-md hover:bg-[#011a3a] transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Sección de productos recomendados */}
        {name && name.length >= 2 && getRecommendedProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-[#022953]">
                Productos recomendados para "{name}"
              </h2>
              <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {getRecommendedProducts.length} sugerencias
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {getRecommendedProducts
                .sort(
                  (a: Product, b: Product) =>
                    (b.count > 0 ? 1 : -1) - (a.count > 0 ? 1 : -1),
                )
                .map((product: Product) => (
                  <ProductCard
                    key={`recommended-${product.id}`}
                    product={product}
                    location={location}
                    currencies={currencies}
                    onAuthRequired={() => setShowAuthModal(true)}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Botón para volver arriba */}
      <div className="flex justify-center mt-8 mb-12">
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 bg-[#022953] hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Volver arriba
        </button>
      </div>
      
      {/* Modal de autenticación global */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}
