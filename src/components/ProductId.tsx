"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/store/Cart";
import { Plus, Minus, X, ArrowRight, ShoppingCart, Share2 } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/Loading";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    return "US";
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
  const router = useRouter();

  // Product and UI state
  const [product, setProduct] = useState<any | null>(null);
  const [location, setLocation] = useState("CU");
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Cart state
  const [quantity, setQuantity] = useState(1);
  const [count, setCount] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const setAmount = useCart((state) => state.setAmount);
  const { amount: cartAmount } = useCart();

  const productPriceData = [
    { id: 10, oldPrice: 50 },
    { id: 86, oldPrice: 30 },
    { id: 53, oldPrice: 8 },
    { id: 52, oldPrice: 12 },
    { id: 32, oldPrice: 380 },
    { id: 30, oldPrice: 220 },
    { id: 31, oldPrice: 300 },
    { id: 50, oldPrice: 45 },
    { id: 90, oldPrice: 300 },
    { id: 63, oldPrice: 25 },
    { id: 62, oldPrice: 30 },
    { id: 61, oldPrice: 50 },
    { id: 80, oldPrice: 300 },
    { id: 83, oldPrice: 800 },
    { id: 85, oldPrice: 320 },
    { id: 84, oldPrice: 560 },
    { id: 64, oldPrice: 750 },
    { id: 48, oldPrice: 600 },
    { id: 51, oldPrice: 40 },
    { id: 60, oldPrice: 40 },
    { id: 54, oldPrice: 6 },
    { id: 39, oldPrice: 80 },
    { id: 88, oldPrice: 70 },
    { id: 87, oldPrice: 75 },
    { id: 56, oldPrice: 20 },
    { id: 71, oldPrice: 730 },
    { id: 34, oldPrice: 500 },
    { id: 47, oldPrice: 320 },
    { id: 28, oldPrice: 215 },
    { id: 9, oldPrice: 60 },
    { id: 78, oldPrice: 50 },
    { id: 77, oldPrice: 40 },
    { id: 58, oldPrice: 1600 },
    { id: 57, oldPrice: 2100 },
    { id: 44, oldPrice: 1600 },
    { id: 45, oldPrice: 1800 },
    { id: 81, oldPrice: 115 },
    { id: 82, oldPrice: 115 },
    { id: 89, oldPrice: 25 },
    { id: 4, oldPrice: 500 },
    { id: 5, oldPrice: null }, // Sin precio
    { id: 27, oldPrice: 260 },
    { id: 66, oldPrice: 260 },
    { id: 93, oldPrice: 260 },
    { id: 33, oldPrice: 290 },
    { id: 36, oldPrice: 320 },
    { id: 1, oldPrice: 360 },
    { id: 14, oldPrice: 35 },
    { id: 37, oldPrice: 35 },
    { id: 23, oldPrice: 45 },
    { id: 65, oldPrice: 30 },
    { id: 68, oldPrice: 30 },
    { id: 67, oldPrice: 40 },
    { id: 40, oldPrice: 50 },
    { id: 8, oldPrice: 60 },
    { id: 74, oldPrice: 250 },
    { id: 76, oldPrice: 570 },
    { id: 49, oldPrice: 12 },
    { id: 55, oldPrice: 10 },
    { id: 12, oldPrice: 45 },
    { id: 11, oldPrice: 30 },
    { id: 35, oldPrice: 600 },
    { id: 41, oldPrice: 750 },
    { id: 38, oldPrice: 550 },
    { id: 69, oldPrice: 525 },
    { id: 46, oldPrice: 340 },
    { id: 91, oldPrice: 300 },
    { id: 29, oldPrice: 300 },
    { id: 24, oldPrice: 200 },
    { id: 25, oldPrice: 300 },
    { id: 26, oldPrice: 450 },
    { id: 21, oldPrice: 375 },
    { id: 13, oldPrice: 350 },
    { id: 7, oldPrice: 880 },
    { id: 16, oldPrice: 670 },
    { id: 43, oldPrice: 1500 },
    { id: 42, oldPrice: 1000 },
    { id: 17, oldPrice: 35 },
    { id: 18, oldPrice: 30 },
    { id: 6, oldPrice: 50 },
    { id: 19, oldPrice: 50 },
    { id: 92, oldPrice: 60 },
    { id: 70, oldPrice: 45 },
    { id: 79, oldPrice: 45 },
    { id: 22, oldPrice: 55 },
    { id: 73, oldPrice: 30 },
    { id: 72, oldPrice: 35 },
    { id: 59, oldPrice: 45 }
  ];

  const thisProduct = productPriceData.find((p) => p.id === product?.product?.id);
  let oldPrice = thisProduct ? thisProduct.oldPrice : null;
  let cambiado = false;

  // Handle quantity changes
  const handleQuantityChange = (newQuantity: number) => {
    const maxQuantity = product?.product?.count || 1;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Handle adding to cart
  const handleAddToCart = async (productId: number, qty: number) => {
    setIsAddingToCart(true);

    if (!localStorage.getItem("userData")) {
      setShowAuthModal(true);
      setIsAddingToCart(false);
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData") || '{}') as { userId?: string };

      if (!userData.userId) {
        setShowAuthModal(true);
        setIsAddingToCart(false);
        return;
      }

      const body = JSON.stringify({
        id_user_action: parseInt(userData.userId),
        id_user: parseInt(userData.userId),
        id_product: productId,
        count: qty,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/agregar_producto_carrito`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Update cart count
      setAmount(cartAmount + qty);

      // Show success message or navigate to cart
      // router.push('/checkout'); // Uncomment to redirect to cart after adding
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
      handleQuantityChange(1)
    }
  };

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
    if (location !== "CU" && currency === "USD") return `${value} USD`;
    if (location !== "CU" && currency === "CUP") {
      if (!cambiado) {
        oldPrice = (oldPrice || 0) / currencies[1].value;
        oldPrice = Number(oldPrice.toFixed(2));
        cambiado = true;
      }


      return `${Math.ceil((value / currencies[1].value) * 100) / 100} USD`;
    }
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
            {product.product.count === 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl z-10">
                <span className="">Agotado temporalmente</span>
              </span>
            )}
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

        {/* Mobile Layout */}
        <div className="block sm:hidden w-full py-2">
          {/* Price Row */}
          <div className="flex w-full justify-between items-center mb-4">
            <div className="flex flex-col gap-2">
              {oldPrice !== null && oldPrice !== 0 && oldPrice !== undefined && Number(renderPrice()?.split(' ')[0]) !== oldPrice && (
                <div className="flex items-center">
                  <span className="font-semibold text-3xl text-[#022953] font-sans line-through" style={{ fontWeight: 1000 }}>

                    {oldPrice} USD
                  </span>
                  <span className="bg-red-600 rounded-xl px-2 py-1 text-white font-bold ml-2">
                    -{Math.round(((oldPrice - Number(renderPrice()?.split(' ')[0])) / oldPrice) * 100)}%
                  </span>
                </div>
              )}
              <span className="font-semibold text-3xl text-[#022953] font-sans" style={{ fontWeight: 1000 }}>

                {renderPrice()}
              </span>
            </div>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                } catch (err) {
                  console.error('Error al copiar el enlace:', err);
                }
              }}
              className="p-2 text-[#022953] hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Compartir producto"
              title="Copiar enlace"
            >
              <Share2 className="w-6 h-6" />
              {isCopied && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ¡Enlace copiado!
                </span>
              )}
            </button>
          </div>


          {/* Quantity and Add to Cart Row */}
          <div className={`flex items-center justify-between w-full gap-4 ${product?.product?.count === 0 ? "hidden" : ""}`}>
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 overflow-hidden">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="bg-gray-100 h-10 w-10 flex items-center justify-center text-[#022953] disabled:opacity-50 font-extrabold"
              >
                <Minus strokeWidth={5} size={16} />
              </button>

              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value) || 1)}
                min="1"
                max={product?.product?.count || 1}
                className="w-12 h-10 text-center border-x border-gray-300 font-extrabold"
              />

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (product?.product?.count || 1)}
                className="bg-gray-100 h-10 w-10 flex items-center justify-center text-[#022953] disabled:opacity-50 font-extrabold"
              >
                <Plus strokeWidth={5} size={16} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product?.product?.id, quantity)}
              disabled={isAddingToCart || !product?.product?.id}
              className={`flex-1 h-10 px-4 font-medium text-white ${isAddingToCart ? 'bg-blue-400' : 'bg-[#022953] hover:bg-blue-700'
                } transition-colors duration-200 flex items-center justify-center rounded-sm`}
            >
              {isAddingToCart ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm">
                  Añadir al carrito <ShoppingCart />
                </span>
              )}
            </button>
          </div>

        </div>

        <div className="flex flex-col w-full self-start bg-white sm:rounded-lg sm:p-6 text-gray-800 sm:shadow-sm sm:border sm:border-gray-200 gap-y-3">
          <h1 className="text-2xl font-bold">{product.product.name}</h1>
          <h3 className="text-lg font-semibold mt-2">Descripción:</h3>
          <p className="mb-2">{product.product.description}</p>
          <h3 className="text-lg font-semibold">Propiedades:</h3>
          {product.product.specs.map((spec: any) => (
            <div key={spec[0]} className="flex justify-between items-center py-1 border-b border-black/20">
              <span className="font-medium">{spec[1]}:</span>
              <span className="text-right">{spec[2]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="flex flex-col w-full bg-[#eff6ff] text-[#022953] p-4 sm:p-10 gap-y-4 sm:gap-y-8 items-center sm:items-start">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-2">
              {oldPrice !== null && oldPrice !== 0 && oldPrice !== undefined && Number(renderPrice()?.split(' ')[0]) !== oldPrice && oldPrice > Number(renderPrice()?.split(' ')[0]) && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-3xl text-[#022953] font-sans line-through" style={{ fontWeight: 1000 }}>
                    {oldPrice} USD
                  </span>
                  <span className="px-2 py-1 rounded-full bg-red-500 text-white font-bold">
                    -{Math.round(((oldPrice - Number(renderPrice()?.split(' ')[0])) / oldPrice) * 100)}%
                  </span>
                </div>
              )}
              <span className="font-semibold text-3xl text-[#022953] font-sans" style={{ fontWeight: 1000 }}>
                {renderPrice()}
              </span>
            </div>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                } catch (err) {
                  console.error('Error al copiar el enlace:', err);
                }
              }}
              className="p-2 text-[#022953] hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Compartir producto"
              title="Copiar enlace"
            >
              <Share2 className="w-6 h-6" />
              {isCopied && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ¡Enlace copiado!
                </span>
              )}
            </button>
          </div>
          <div className={`flex items-center gap-2 ${product.product.count === 0 ? "hidden" : ""}`}>
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="bg-[#022953] h-10 w-10 text-white flex items-center justify-center rounded-lg disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value) || 1)}
              min="1"
              max={product?.product?.count || 1}
              className="w-16 h-10 text-center border border-gray-300 rounded-lg"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= (product?.product?.count || 1)}
              className="bg-[#022953] h-10 w-10 text-white flex items-center justify-center rounded-lg disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => handleAddToCart(product?.product?.id, quantity)}
              disabled={isAddingToCart || !product?.product?.id}
              className="bg-[#022953] h-10 px-4 text-white rounded-lg font-medium ml-2 disabled:opacity-50"
            >
              {isAddingToCart ? 'Añadiendo...' : 'Añadir al carrito'}
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#022953]">Iniciar sesión</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <p className="mb-4">Por favor inicia sesión para continuar con tu compra.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  router.push('/login');
                }}
                className="px-4 py-2 bg-[#022953] text-white rounded-md hover:bg-blue-700"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}

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
