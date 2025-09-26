import Image from "next/image";
import { ShoppingCart, Loader2, Check, Plus, Minus, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/store/Cart";
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  img: string;
  prices: [number, number, string, number][];
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
    oldPrice,
  onAuthRequired,
}: {
  product: Product;
  location: string;
  currencies: Currency[];
  oldPrice: number;
  onAuthRequired?: () => void;
}) {
  const setAmount = useCart((state) => state.setAmount);
  const { amount: cartAmount } = useCart();
  const [wait, setWait] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const quantitySelectorRef = useRef<HTMLDivElement>(null);
  const rapidChangeInterval = useRef<NodeJS.Timeout | null>(null);
  const rapidChangeStartTime = useRef<number>(0);

  useEffect(() => {
    if (wait) {
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

    handleSingleChange(direction);

    rapidChangeStartTime.current = Date.now();

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
    setQuantity(1);
  };

  const handleCartButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuantitySelector(true);
  };

  return (
    <div className="flex flex-col relative z-0 shadow-xl hover:scale-105 transition-all duration-300 rounded-b-lg overflow-hidden bg-[#022953]">
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
            <span className={`${product.count <= 0 ? "hidden": ""}`}>
              {location !== "CU" && product.prices[0][2] === "USD" && (
                <div className="flex flex-col">
                  {(oldPrice || 999999999) > (product.prices[0][3] || product.prices[0][1]) && oldPrice && (
                    <div className="flex gap-4">
                      <span className="line-through">
                        {oldPrice} USD
                      </span>
                      <span className="rounded-md bg-red-500 px-1">
                        -{(100 - ((product.prices[0][3] || product.prices[0][1]) / (oldPrice || 999999999) * 100)).toFixed(0)}%
                      </span>
                    </div>
                  )}
                  <span>{(product.prices[0][3] || product.prices[0][1])} USD</span>
                </div>
              )}
              {location !== "CU" && product.prices[0][2] === "CUP" && (
                <div>
                  <span>
                    {Math.ceil(
                      ((product.prices[0][3] || product.prices[0][1]) / currencies[1].value) * 100,
                    ) / 100}{" "}
                    USD
                  </span>
                </div>
              )}
            </span>
          </div>
        </div>
      </Link>

      {product.count > 0 && (
        <div className="absolute bottom-2 right-2 z-20 flex flex-col items-end">

          {!showQuantitySelector ? (
            <Button
              onClick={handleCartButtonClick}
              className="items-center justify-center rounded-full bg-white text-[#022953] hover:bg-gray-300 transition-all duration-300"
              disabled={wait || success}
              title="Clic para elegir cantidad"
            >
              {wait ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : success ? (
                <Check className="w-8 h-8 text-green-600" />
              ) : (
                <ShoppingCart className="w-8 h-8" />
              )}
            </Button>
          ) : (
            <motion.div
              ref={quantitySelectorRef}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-lg"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity(prev => Math.max(1, prev - 1));
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity(prev => Math.min(product.count, prev + 1));
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCartWithQuantity();
                }}
                className="px-3 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <Check className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
