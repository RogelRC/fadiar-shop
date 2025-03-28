"use client";

import { ShoppingCart, X } from "lucide-react";
import { M_PLUS_1 } from "next/font/google";
import { useState, useEffect } from "react";

async function fetchCartItems() {
  try {
    // Fetch cart items from the server
    const body = JSON.stringify({
      id_user_action: parseInt(
        JSON.parse(localStorage.getItem("userData")!).userId,
      ),
      id_user: parseInt(JSON.parse(localStorage.getItem("userData")!).userId),
      comisiones: false,
    });

    // Fetch cart items from the server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/obtener_productos_carrito`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await fetchCartItems();
        console.log(cartItems);
        setAmount(
          cartItems.carrito.reduce(
            (acc: any, item: any) => acc + item.en_carrito,
            0,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [amount]);

  useEffect(() => {
    const updateCartData = () => {
      setAmount(-1);
    };

    // Ejecutar al montar el componente
    updateCartData();

    const handleCustomEvent = () => {
      updateCartData();
    };

    window.addEventListener("cartDataChanged", handleCustomEvent);

    // Limpiar listeners al desmontar
    return () => {
      window.removeEventListener("cartDataChanged", handleCustomEvent);
    };
  }, []);

  return (
    <>
      {!isOpen && amount > 0 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg bg-blue-600 items-center justify-center text-white hover:bg-blue-700 hover:cursor-pointer hover:scale-110 transition-all duration-300"
        >
          <ShoppingCart className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {amount}
          </div>
        </button>
      )}
      {isOpen && (
        <div className="fixed flex flex-col bottom-2 right-2 ml-40 w-100 max-w-[calc(100vw-16px)] bg-white shadow-lg sm:p-8 p-4 text-[#022953] rounded-lg">
          <div className="flex w-full">
            <h3 className="text-xl font-bold">Tu carrito</h3>
            <button onClick={() => setIsOpen(!isOpen)} className="ml-auto">
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
