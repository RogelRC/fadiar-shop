"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import AddToCart from "@/components/AddToCart";
import Loading from "@/components/Loading";
import AuthModal from "@/components/AuthModal";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string;
  prices: [number, number, string][];
  brand: string;
  categoria: any;
}

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
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
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

  // Fetch all products when component mounts
  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoadingRelated(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inventory`
        );
        const data = await response.json();
        setAllProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Update related products when product or allProducts changes
  useEffect(() => {
    if (product && allProducts.length > 0) {
      updateRelatedProducts();
    }
  }, [product, allProducts]);

  function updateRelatedProducts() {
    if (!product?.product?.categoria?.name) {
      setRelatedProducts([]);
      return;
    }

    const currentCategory = product.product.categoria.name;
    const currentProductId = product.product.id;

    // Filter products by the same category, exclude current product, only available products (count > 0), and limit to 4
    const related = allProducts
      .filter(p => 
        p.categoria?.name === currentCategory && 
        p.id !== currentProductId &&
        p.count > 0  // Only include available products
      )
      .slice(0, 4);

    setRelatedProducts(related);
  }

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

  function renderRelatedProductPrice(price: [number, number, string]) {
    const [_, value, curr] = price;
    if (location === "CU" && curr === "CUP") return `${value} CUP`;
    if (location !== "CU" && curr === "USD") return `${value} USD`;
    if (location === "CU" && curr === "USD")
      return `${value * currencies[1].value} CUP`;
    if (location !== "CU" && curr === "CUP")
      return `${Math.ceil((value / currencies[1].value) * 100) / 100} USD`;
    return "";
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

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-[#022953]">También te puede interesar</h2>
            {/* Desktop View - Right Aligned */}
            {product?.product?.categoria?.id && (
              <div className="hidden sm:block">
                <Link 
                  href={`/products?category=${encodeURIComponent(product.product.categoria.name)}`}
                  className="flex items-center text-[#022953] hover:text-blue-700 transition-colors"
                >
                  Ver más productos <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id} 
                href={`/products/id?itemId=${relatedProduct.id}`}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${relatedProduct.img || relatedProduct.image}`}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{relatedProduct.brand}</p>
                  <p className="mt-2 font-medium text-[#022953]">
                    {renderRelatedProductPrice(relatedProduct.prices[0])}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Mobile View - Full Width Button */}
          {product?.product?.categoria?.id && (
            <div className="block sm:hidden w-full mt-6">
              <Link 
                href={`/products?category=${encodeURIComponent(product.product.categoria.name)}`}
                className="flex items-center justify-center w-full text-[#022953] hover:text-blue-700 transition-colors border border-[#022953] rounded-lg py-2.5 px-6 font-medium hover:bg-gray-50"
              >
                Ver más productos <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
