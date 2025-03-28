"use client";

import { Plus, Minus, Cog } from "lucide-react";

import { useEffect, useState } from "react";

async function handleAddToCart(productId: number, quantity: number) {
  if (!localStorage.getItem("userData")) {
    throw new Error("User data not found");
  }

  // Implement logic to add item to cart
  const body = JSON.stringify({
    id_user_action: parseInt(
      JSON.parse(localStorage.getItem("userData")!).userId,
    ),
    id_user: parseInt(JSON.parse(localStorage.getItem("userData")!).userId),
    id_product: productId,
    count: quantity,
  });

  //console.log(body);

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

  window.dispatchEvent(new Event("cartDataChanged"));

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }
}

export default function AddToCart({
  productId,
  amount,
}: {
  productId: number;
  amount: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [count, setCount] = useState(amount);

  useEffect(() => {
    setCount(amount);
  }, [amount]);

  useEffect(() => {
    setQuantity(Math.min(count, 1));
  }, [count]);

  function handleSetQuantity(quantity: number) {
    if (quantity > count) setQuantity(count);
    else if (quantity > 0) setQuantity(quantity);
  }

  return (
    <>
      {count > 0 ? (
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
              onChange={(e) => handleSetQuantity(Number(e.target.value))}
              min="1"
              max={count.toString()}
              className="flex bg-white text-[#022953] h-10 w-20 text-center items-center justify-center rounded-lg"
            />
            <button
              onClick={() => handleSetQuantity(quantity - 1)}
              className="flex bg-[#022953] h-10 w-10 text-white items-center justify-center rounded-lg hover:scale-110 transition-all duration-300"
            >
              <Minus />
            </button>
            <button
              onClick={() => {
                setCount(count - quantity);
                handleAddToCart(productId, quantity);
              }}
              className="hidden sm:block bg-[#022953] h-10 w-40 text-white items-center justify-center rounded-lg hover:scale-110 transition-all duration-300"
            >
              Añadir al carrito
            </button>
          </div>
          <button
            onClick={() => {
              setCount(count - quantity);
              handleAddToCart(productId, quantity);
            }}
            className="sm:hidden bg-[#022953] h-10 w-40 text-white items-center rounded-lg hover:scale-110 transition-all duration-300"
          >
            Añadir al carrito
          </button>
        </>
      ) : (
        <div className="flex items-center sm:text-3xl text-lg">
          Lo sentimos, este producto se encuentra agotado temporalmente
        </div>
      )}
    </>
  );
}
