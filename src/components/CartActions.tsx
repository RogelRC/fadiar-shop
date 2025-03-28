"use client";

import { useState, useEffect } from "react";

import { X, Plus, Minus } from "lucide-react";

export default function CartActions({
  item,
  location,
  currencies,
}: {
  item: any;
  location: string;
  currencies: any;
}) {
  const [quantity, setQuantity] = useState(item.en_carrito);

  function handleMinusClick(
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
  ) {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handlePlusClick(
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
  ) {
    setQuantity(quantity + 1);
  }

  function handleDeleteClick(
    item: any,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
  ) {
    setQuantity(0);
  }

  useEffect(() => {
    const updateCart = async () => {
      try {
        const body = JSON.stringify({
          id_user_action:
            JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
          id_user:
            JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
          id_product: item.id,
          newCount: quantity,
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/modificar_cantidad_producto_carrito`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          },
        );

        if (!response.ok) {
          throw new Error("Error al actualizar el carrito");
        }
      } catch (error) {
        console.error("Error actualizando el carrito:", error);
      }
    };

    const deleteItem = async () => {
      try {
        const body = JSON.stringify({
          id_user_action:
            JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
          id_user:
            JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
          id_product: item.id,
        });
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/eliminar_producto_carrito`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          },
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el item del carrito");
        }
        window.dispatchEvent(new Event("cartDataChanged"));
      } catch (error) {
        console.error("Error eliminando el item del carrito:", error);
      }
    };

    quantity > 0 ? updateCart() : deleteItem();
  }, [quantity]);

  return (
    <div className="flex max-w-full">
      <div className="flex flex-1/2">
        <span>
          {quantity} x{" "}
          {location === "CU" && item.moneda_precio_base === "CUP" && (
            <>{`${item.prices[0][1]} CUP`}</>
          )}
          {location === "CU" && item.moneda_precio_base === "USD" && (
            <>{`${item.prices[0][1] * currencies[1].value} CUP`}</>
          )}
          {location !== "CU" && item.moneda_precio_base === "USD" && (
            <>{`${item.prices[0][1]} USD`}</>
          )}
          {location !== "CU" && item.moneda_precio_base === "CUP" && (
            <>{`${(Math.ceil((item.prices[0][1] / currencies[1].value) * 100) / 100).toFixed(2)} USD`}</>
          )}
        </span>
      </div>
      <div className="flex flex-1/2">
        <button
          onClick={() => handleMinusClick(quantity, setQuantity)}
          className="ml-2 flex h-8 items-center justify-center bg-gray-200 rounded-lg hover:scale-110 transition-all duration-300"
        >
          <Minus size={32} />
        </button>
        <button
          onClick={() => handlePlusClick(quantity, setQuantity)}
          className="ml-2 flex h-8 items-center justify-center bg-gray-200 rounded-lg hover:scale-110 transition-all duration-300"
        >
          <Plus size={32} />
        </button>
        <button
          onClick={() => handleDeleteClick(quantity, setQuantity)}
          className="ml-4 sm:ml-auto flex h-8 items-center justify-center bg-red-200  rounded-lg hover:scale-110 transition-all duration-300"
        >
          <X size={32} />
        </button>
      </div>
    </div>
  );
}
