"use client";

import { Minus, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/store/Cart";

export default function FinalCartItem({
  item,
  location,
  currencies,
  onTotalChange, // Nuevo prop
}: {
  item: any;
  location: string;
  currencies: any[];
  onTotalChange?: (total: number) => void; // Tipo del callback
}) {
  const [quantity, setQuantity] = useState(item.en_carrito);
  const [visible, setVisible] = useState(true);
  const [prevQuantity, setPrevQuantity] = useState(item.en_carrito);
  const [buttonDisable, setButtonDisabled] = useState(false);
  const setAmount = useCart((state) => state.setAmount);
  const { amount } = useCart();

  const price = useMemo(() => {
    let calculatedPrice = 0;
    if (location === "CU" && item.prices[0][2] === "CUP") {
      calculatedPrice = item.prices[0][1];
    } else if (location !== "CU" && item.prices[0][2] === "USD") {
      calculatedPrice = item.prices[0][1];
    } else if (location === "CU" && item.prices[0][2] === "USD") {
      calculatedPrice = item.prices[0][1] * currencies[1]?.value || 0;
    } else if (location !== "CU" && item.prices[0][2] === "CUP") {
      calculatedPrice =
        Math.ceil((item.prices[0][1] / currencies[1]?.value) * 100) / 100 || 0;
    }
    return calculatedPrice;
  }, [location, currencies, item.prices]);

  // Efecto para notificar cambios en el total
  useEffect(() => {
    if (onTotalChange) {
      const total = price * quantity;
      onTotalChange(total);
    }
  }, [quantity]);

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
          setQuantity(prevQuantity);
          throw new Error("Error al actualizar el carrito");
        }

        console.log(await response.json());

        setPrevQuantity(quantity);
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

  function handleSetQuantity(q: number) {
    if (q == quantity - 1) {
      setAmount(amount - 1);
    } else if (q == quantity + 1) {
      setAmount(amount + 1);
    }

    setQuantity(q);
    if (q <= 0) setVisible(false);
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000); // Habilitar nuevamente después de 3 segundos
  }

  return (
    <>
      {visible && (
        <div className="flex w-full h-28 bg-white">
          <div className="flex-shrink-0 h-full aspect-square overflow-hidden p-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
              alt={item.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col w-full max-w-full text-sm p-2 text-[#9f9f9f]">
            <span className="flex w-full font-semibold">{item.name}</span>
            <span className="flex w-full text-sm">Marca {item.brand}</span>
            <div className="flex flex-1">
              <span className="flex font-bold mt-auto text-[#022953]">
                {location === "CU" && item.prices[0][2] === "CUP" && (
                  <>{item.prices[0][1]} CUP</>
                )}
                {location !== "CU" && item.prices[0][2] === "USD" && (
                  <>{item.prices[0][1]} USD</>
                )}
                {location === "CU" && item.prices[0][2] === "USD" && (
                  <>{item.prices[0][1] * currencies[1].value} CUP</>
                )}
                {location !== "CU" && item.prices[0][2] === "CUP" && (
                  <>
                    {Math.ceil(
                      (item.prices[0][1] / currencies[1].value) * 100,
                    ) / 100}{" "}
                    USD
                  </>
                )}
              </span>

              <div className="flex ml-auto items-end">
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
        </div>
      )}
    </>
  );
}
