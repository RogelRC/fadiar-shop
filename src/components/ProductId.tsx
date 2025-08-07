"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import AddToCart from "@/components/AddToCart";
import Loading from "@/components/Loading";
import AuthModal from "@/components/AuthModal";
import { X } from "lucide-react";

async function getLocation() {
  try {
    const res = await fetch("https://app.fadiar.com/api/get_location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    //return !data.country || data.country === "Cuba" ? "CU" : "US";
    return "US";
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return "CU";
  }
}

async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getProductForVisual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_product: parseInt(id),
          id_user_action: 0,
        }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch product");
  }
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("itemId");

  const [product, setProduct] = useState<any | null>(null);
  const [location, setLocation] = useState("CU");
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const [productData, locationData] = await Promise.all([
        getProduct(id || ""),
        getLocation(),
      ]);
      setProduct(productData);
      setLocation(locationData);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    if (product) {
      console.log(product);
    }
  }, [product]);

  if (!id) {
    return <div>Producto no encontrado.</div>;
  }

  if (!product) {
    return <Loading />;
  }

  const currencies = product.currencys.currencys;
  const price = product.product.prices[0];
  const value = price[1];
  const currency = price[2];

  function renderPrice() {
    if (location === "CU" && currency === "CUP") return `${value} CUP`;
    if (location !== "CU" && currency === "USD") return `${value} USD`;
    if (location === "CU" && currency === "USD")
      return `${value * currencies[1].value} CUP`;
    if (location !== "CU" && currency === "CUP")
      return `${Math.ceil((value / currencies[1].value) * 100) / 100} USD`;
  }

  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-8 sm:p-8 p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-8 gap-4">
        <div className="relative">
          <div 
            className="cursor-zoom-in"
            onClick={() => setIsImageZoomed(true)}
          >
            <Image
              ref={imageRef}
              src={`${process.env.NEXT_PUBLIC_API_URL}/${product.product.image}`}
              alt={product.product.name}
              width={800}
              height={800}
              className="rounded-lg shadow-lg w-full h-auto"
              priority
            />
          </div>
          
          {/* Zoomed Image Overlay */}
          {isImageZoomed && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 cursor-zoom-out"
              onClick={() => setIsImageZoomed(false)}
            >
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageZoomed(false);
                }}
              >
                <X size={32} />
              </button>
              <div className="max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${product.product.image}`}
                  alt={product.product.name}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          <span className="flex relative w-1/2 bg-[#022953] p-2 sm:px-6 text-nowrap text-white font-semibold justify-center sm:justify-end -mt-4">
            Marca {product.product.brand}
          </span>
        </div>

        <div className="block sm:hidden">
          <div className="flex flex-col w-full bg-[#eff6ff] text-[#022953] p-4 sm:p-10 gap-y-4 sm:gap-y-8 items-center sm:items-start">
            <span className="flex font-bold text-4xl justify-center sm:justify-start">
              {renderPrice()}
            </span>
            <AddToCart
              productId={product.product.id}
              amount={parseInt(product.product.count)}
              onAuthRequired={() => setShowAuthModal(true)}
            />
          </div>
        </div>

        <div className="flex flex-col w-full self-start bg-[#022953] rounded-xl p-4 sm:p-10 text-white gap-y-2">
          <h1 className="text-3xl font-bold">{product.product.name}</h1>
          <h3 className="text-lg font-semibold mt-2">Descripción:</h3>
          <p className="mb-2">{product.product.description}</p>
          <h3 className="text-lg font-semibold">Propiedades:</h3>
          {product.product.specs.map((spec: any) => (
            <div key={spec[0]} className="flex justify-between items-center py-1 border-b border-white/20">
              <span className="font-medium">{spec[1]}:</span>
              <span className="text-right">{spec[2]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="flex flex-col w-full bg-[#eff6ff] text-[#022953] p-4 sm:p-10 gap-y-4 sm:gap-y-8 items-center sm:items-start">
          <span className="flex font-bold text-4xl justify-center sm:justify-start">
            {renderPrice()}
          </span>
          <AddToCart
            productId={product.product.id}
            amount={parseInt(product.product.count)}
            onAuthRequired={() => setShowAuthModal(true)}
          />
        </div>
      </div>
      
      {/* Modal de autenticación */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
