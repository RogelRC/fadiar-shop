"use client";

import { Plus, Minus } from "lucide-react";

import { useState } from "react";

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  function handleSetQuantity(quantity: number) {
    if (quantity > 0) setQuantity(quantity);
  }

  return (
    <>
      <div className="flex w-full gap-2 justify-center sm:justify-start">
        <button
          onClick={() => handleSetQuantity(quantity + 1)}
          className="flex bg-[#022953] h-10 w-10 text-white items-center justify-center rounded-lg hover:scale-110 transition-all duration-300"
        >
          <Plus />
        </button>
        <input
          type="number"
          value={quantity}
          min="1"
          className="flex bg-white text-[#022953] h-10 w-20 text-center items-center justify-center rounded-lg"
          onChange={(e) => handleSetQuantity(Number(e.target.value))}
        />
        <button
          onClick={() => handleSetQuantity(quantity - 1)}
          className="flex bg-[#022953] h-10 w-10 text-white items-center justify-center rounded-lg hover:scale-110 transition-all duration-300"
        >
          <Minus />
        </button>
        <button className="hidden sm:block bg-[#022953] h-10 w-40 text-white items-center justify-center rounded-lg hover:scale-110 transition-all duration-300">
          Anadir al carrito
        </button>
      </div>
      <button className="sm:hidden bg-[#022953] h-10 w-40 text-white items-center rounded-lg hover:scale-110 transition-all duration-300">
        Anadir al carrito
      </button>
    </>
  );
}
