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
  const [buttonDisable, setButtonDisabled] = useState(false);

  function handleSetQuantity(quantity: number) {
    setQuantity(quantity);
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000); // Habilitar nuevamente después de 3 segundos
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
        <div className="flex ml-auto items-center">
          <button
            onClick={() => handleSetQuantity(quantity - 1)}
            className={`text-[#022953] rounded-sm transition-all duration-300 ${buttonDisable === false ? "hover:text-white hover:bg-[#022953]" : "cursor-wait"}`}
            disabled={buttonDisable}
          >
            <Minus />
          </button>
          <input
            type="number"
            className="flex w-16 border-gray-300 border-2 rounded-sm text-[#022953] text-center"
            value={quantity}
            onChange={() => handleSetQuantity(quantity)}
            disabled={true}
          />
          <button
            onClick={() => handleSetQuantity(quantity + 1)}
            className={`text-[#022953] rounded-sm transition-all duration-300 ${buttonDisable === false ? "hover:text-white hover:bg-[#022953]" : "cursor-wait"}`}
            disabled={buttonDisable}
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
