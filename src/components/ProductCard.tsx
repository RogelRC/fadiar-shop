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
    <div className="flex flex-col relative z-0 shadow-xl hover:scale-105 transition-all duration-300 rounded-b-lg overflow-hidden">
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
              {location === "CU" && product.prices[0][2] === "CUP" && (
                <>{product.prices[0][1]} CUP</>
              )}
              {location !== "CU" && product.prices[0][2] === "USD" && (
                <>{product.prices[0][1]} USD</>
              )}
              {location === "CU" && product.prices[0][2] === "USD" && (
                <>{product.prices[0][1] * currencies[1].value} CUP</>
              )}
              {location !== "CU" && product.prices[0][2] === "CUP" && (
                <>
                  {Math.ceil(
                    (product.prices[0][1] / currencies[1].value) * 100,
                  ) / 100}{" "}
                  USD
                </>
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
