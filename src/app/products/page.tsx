"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect, useMemo } from "react";
import { useFilters } from "@/store/Filters";
import { ListFilter, X } from "lucide-react";

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
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [location, setLocation] = useState<string>("");
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const setBrand = useFilters((state) => state.setBrand);
  const setAvailable = useFilters((state) => state.setAvailable);
  const setMinPrice = useFilters((state) => state.setMinPrice);
  const setMaxPrice = useFilters((state) => state.setMaxPrice);
  const setName = useFilters((state) => state.setName);

  useEffect(() => {
    const fetchAll = async function () {
      try {
        const res = await fetch("http://ip-api.com/json/");
        const data = await res.json();
        //console.log(data.countryCode);
        setLocation(data.countryCode || "CU");
      } catch (error) {
        console.error("Error obteniendo la ubicación:", error);
        setLocation("CU");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inventory`,
        );
        const products = await response.json();
        setProducts(products.products);
        setCurrencies(products.currencys.currencys);

        console.log(products);
      } catch (error) {
        setProducts([]);
        throw new Error("Failed to fetch products");
      }
    };
    fetchAll();
  }, []);

  //console.log(currencies);
  //console.log(location);

  const { name, brand, available, minPrice, maxPrice } = useFilters();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const nameMatch =
        !name || product.name.toLowerCase().includes(name.toLowerCase());
      const brandMatch =
        !brand || product.brand.toLowerCase().includes(brand.toLowerCase());
      const availableMatch =
        available === "available"
          ? product.count > 0
          : available === "out"
            ? product.count <= 0
            : true;
      const priceMatch =
        (!minPrice || product.prices[0][1] >= minPrice) &&
        (!maxPrice || product.prices[0][1] <= maxPrice);

      return nameMatch && brandMatch && availableMatch && priceMatch;
    });
  }, [products, name, brand, available, minPrice, maxPrice]);

  const resetFilters = () => {
    setName("");
    setBrand("");
    setAvailable("");
    setMinPrice(0);
    setMaxPrice(1000000);
  };

  return (
    <div className="flex flex-col relative w-full py-6 px-4 sm:px-8 space-y-6">
      {/* Menu de filtros*/}
      {filterIsOpen && (
        <div className="fixed flex -bottom-6 left-0 w-full z-50 justify-center">
          <div className="flex flex-col lg:w-1/3 sm:w-2/3 w-full h-full bg-white rounded-t-lg p-4 shadow-2xl border-2 border-gray-400 gap-4">
            <div className="flex w-full">
              <h3 className="text-xl text-[#022953] font-bold">Filtros</h3>
              <button
                className="ml-auto w-6 h-6"
                onClick={() => setFilterIsOpen(false)}
              >
                <X />
              </button>
            </div>
            <select
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              onChange={(e) => setAvailable(e.target.value)}
              value={available} // Añade esta línea
            >
              <option value="">Disponibles y agotados</option>
              <option value="available">Disponibles</option>
              <option value="out">Agotados</option>
            </select>
            <select
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              onChange={(e) => setBrand(e.target.value)}
              value={brand} // Añade esta línea
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
            <div className="flex p-2 border-2 border-gray-300 rounded-md gap-2 items-center">
              <span className="flex flex-nowrap w-full">Rango de precios</span>
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
        </div>
      )}
      <div className="flex w-full items-center">
        <h1 className="flex font-bold sm:text-3xl text-xl text-[#022953]">
          Catálogo de productos
        </h1>
        <button
          onClick={() => setFilterIsOpen(!filterIsOpen)}
          className="flex items-center justify-center px-2 py-1 rounded-md ml-auto bg-[#022953] text-white gap-2 hover:scale-110 transition-all duration-300"
        >
          <span>
            <ListFilter />
          </span>
          <span>Filtros</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts
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
            />
          ))}
      </div>
    </div>
  );
}
