import Image from "next/image";
import { ShoppingCart, Loader2, Check, Plus, Minus, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/store/Cart";
import { useEffect, useRef, useState } from "react";
import AuthModal from "./AuthModal";

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

interface Currency {
  currency: string;
  id: number;
  value: number;
}

export default function ProductCard({
  product,
  location,
  currencies,
  onAuthRequired,
}: {
  product: Product;
  location: string;
  currencies: Currency[];
  onAuthRequired?: () => void;
}) {
  const setAmount = useCart((state) => state.setAmount);
  const { amount: cartAmount } = useCart();
  const [wait, setWait] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const quantitySelectorRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const rapidChangeInterval = useRef<NodeJS.Timeout | null>(null);
  const rapidChangeStartTime = useRef<number>(0);

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

  const oldPrice = productPriceData.find((data) => data.id === product.id)?.oldPrice;

  useEffect(() => {
    if (wait === true) {
      setTimeout(() => {
        setWait(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1500);
      }, 2000);
    }
  }, [wait]);

  const handleAddToCart = async (productId: number, quantityToAdd: number) => {
    setWait(true);

    if (!localStorage.getItem("userData")) {
      onAuthRequired?.();
      setWait(false);
      return;
    }

    // Implement logic to add item to cart
    const body = JSON.stringify({
      id_user_action: parseInt(
        JSON.parse(localStorage.getItem("userData")!).userId,
      ),
      id_user: parseInt(JSON.parse(localStorage.getItem("userData")!).userId),
      id_product: productId,
      count: quantityToAdd,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/agregar_producto_carrito`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Update cart count with the actual quantity added
      setAmount(cartAmount + quantityToAdd);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setWait(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  };

  // Handle clicks outside the quantity selector
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quantitySelectorRef.current && !quantitySelectorRef.current.contains(event.target as Node)) {
        setShowQuantitySelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const startRapidChange = (direction: 'increase' | 'decrease', e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Initial immediate change
    handleSingleChange(direction);

    // Set start time for rapid change delay
    rapidChangeStartTime.current = Date.now();

    // Start rapid change after 1 second
    rapidChangeInterval.current = setInterval(() => {
      if (Date.now() - rapidChangeStartTime.current >= 1000) {
        handleSingleChange(direction);
      }
    }, 100);
  };

  const stopRapidChange = () => {
    if (rapidChangeInterval.current) {
      clearInterval(rapidChangeInterval.current);
      rapidChangeInterval.current = null;
    }
  };

  const handleSingleChange = (direction: 'increase' | 'decrease') => {
    setQuantity(prev => {
      const newQuantity = direction === 'increase' ? prev + 1 : prev - 1;
      return newQuantity >= 1 && newQuantity <= 100 ? newQuantity : prev;
    });
  };

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (rapidChangeInterval.current) {
        clearInterval(rapidChangeInterval.current);
      }
    };
  }, []);

  const handleAddToCartWithQuantity = () => {
    handleAddToCart(product.id, quantity);
    setShowQuantitySelector(false);
    setQuantity(1); // Reset quantity after adding to cart
  };

  const handleCartButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!showQuantitySelector) {
      handleAddToCart(product.id, 1);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.count > 0) {
      //setShowQuantitySelector(true);
    }
  };

  const startLongPress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    longPressTimer.current = setTimeout(() => {
      if (product.count > 0) {
        //setShowQuantitySelector(true);
      }
    }, 500); // 500ms for long press
  };

  const endLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <div className="flex flex-col relative z-0 shadow-xl hover:scale-105 transition-all duration-300 rounded-b-lg overflow-hidden bg-[#022953]">
      {/* Enlace clickable */}
      <Link href={`/products/id?itemId=${product.id}`}>
        <div className="flex flex-col z-0">
          <div className="flex relative aspect-square w-full bg-gray-50 z-10">
            {product.count === 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl z-10">
                <span className="">Agotado temporalmente</span>
              </span>
            )}
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
              alt={product.name}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col bg-[#022953] p-2 text-white rounded-t-lg -mt-2 z-10">
            <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {product.name}
            </span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
              Marca {product.brand}
            </span>
            <span>
              {location !== "CU" && product.prices[0][2] === "USD" && (
                <div className="flex flex-col">
                  {(oldPrice || 999999999) > product.prices[0][1] && oldPrice && (
                    <div className="flex gap-4">
                      <span className="line-through">
                        {oldPrice} USD
                      </span>
                      <span className="rounded-md bg-red-500 px-1">
                        -{(100 - (product.prices[0][1] / (oldPrice || 999999999) * 100)).toFixed(0)}%
                      </span>
                    </div>
                  )}
                  <span>{product.prices[0][1]} USD</span>
                </div>
              )}
              {location !== "CU" && product.prices[0][2] === "CUP" && (
                <div>
                  <span>
                    {Math.ceil(
                      (product.prices[0][1] / currencies[1].value) * 100,
                    ) / 100}{" "}
                    USD
                  </span>
                </div>
              )}
            </span>
          </div>
        </div>
      </Link>

      {/* Mostrar botón de carrito solo si el producto está disponible */}
      {product.count > 0 && (
        <div className="absolute bottom-2 right-2 z-20 flex flex-col items-end">
          {/* Selector de cantidad */}
          {showQuantitySelector && (
            <div
              ref={quantitySelectorRef}
              className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 flex flex-col items-center space-y-2 border border-gray-200"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                <button
                  onClick={() => setShowQuantitySelector(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => startRapidChange('decrease', e)}
                  onMouseUp={stopRapidChange}
                  onMouseLeave={stopRapidChange}
                  onTouchStart={(e) => startRapidChange('decrease', e as unknown as React.TouchEvent)}
                  onTouchEnd={stopRapidChange}
                  disabled={quantity <= 1}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 select-none active:bg-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium select-none">{quantity}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => startRapidChange('increase', e)}
                  onMouseUp={stopRapidChange}
                  onMouseLeave={stopRapidChange}
                  onTouchStart={(e) => startRapidChange('increase', e as unknown as React.TouchEvent)}
                  onTouchEnd={stopRapidChange}
                  disabled={quantity >= Math.min(product.count, 100)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 select-none active:bg-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={handleAddToCartWithQuantity}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                Añadir al carrito
              </Button>
            </div>
          )}

          {/* Botón del carrito */}
          <Button
            onClick={handleCartButtonClick}
            onContextMenu={handleContextMenu}
            onMouseDown={startLongPress}
            onMouseUp={endLongPress}
            onMouseLeave={endLongPress}
            onTouchStart={startLongPress}
            onTouchEnd={endLongPress}
            className="items-center justify-center rounded-full bg-white text-[#022953] hover:bg-gray-300 transition-all duration-300"
            disabled={wait || success}
            title="Clic para añadir 1, clic derecho o mantén presionado para elegir cantidad"
          >
            {wait ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : success ? (
              <Check className="w-8 h-8 text-green-600" />
            ) : (
              <ShoppingCart className="w-8 h-8" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
