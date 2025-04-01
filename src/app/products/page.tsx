"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { useFilters } from "@/store/Filters";
import { shallow } from "zustand/shallow";

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
        setFilteredProducts(products.products);
        setCurrencies(products.currencys.currencys);
      } catch (error) {
        setProducts([]);
        throw new Error("Failed to fetch products");
      }
    };
    fetchAll();
  }, []);

  //console.log(currencies);
  //console.log(location);

  const { name, brand, available, minPrice, maxPrice, sortBy } = useFilters();

  useEffect(() => {
    setFilteredProducts(products);

    if (name)
      setFilteredProducts(
        products.filter((product: Product) =>
          product.name.toLowerCase().includes(name),
        ),
      );
  }, [name, brand, available, minPrice, maxPrice, sortBy]);

  return (
    <div className="flex flex-col w-full py-6 px-4 sm:px-8 space-y-6">
      <h1 className="font-bold text-3xl text-[#022953]">
        Catálogo de productos
      </h1>
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
