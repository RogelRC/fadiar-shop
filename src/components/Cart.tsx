"use client";

import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg bg-blue-600 items-center justify-center text-white hover:bg-blue-700 hover:cursor-pointer hover:scale-110 transition-all duration-300"
        >
          <ShoppingCart className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            12
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
