"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

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

export default function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [location, setLocation] = useState<string>("");
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

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
        console.error("Error obteniendo la ubicación:", error);
        setLocation("CU");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getNewerProducts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ count: 5 }),
          },
        );
        const products = await response.json();
        console.log(products.products);
        setProducts(products.products);
        setCurrencies(products.currencys.currencys);
      } catch (error) {
        setProducts([]);
        throw new Error("Failed to fetch products");
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="w-full overflow-x-auto sm:px-10 px-4 -mt-2 md:overflow-visible">
      <div
        className="flex gap-4 md:gap-6 md:flex-nowrap"
        style={{ minWidth: "min-content" }}
      >
        {[...products].reverse().map((product) => (
          <div
            key={product.id}
            className="grid gird-cols-4 min-w-[200px] md:min-w-0 md:w-1/4 p-3 bg-white shadow-lg"
          >
            <ProductCard
              product={product}
              location={location}
              currencies={currencies}
              onAuthRequired={() => setShowAuthModal(true)}
            />
          </div>
        ))}
      </div>
      
      {/* Modal de autenticación */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
