"use client";

import { ShoppingCart, X } from "lucide-react";
import CartItem from "@/components/CartItem";
import { useState, useEffect } from "react";
import Link from "next/link";

async function fetchCartItems(userData: any) {
  if (!userData) return "{}";

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

async function getLocation() {
  try {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();
    //console.log(data.countryCode);
    return data.countryCode || "CU";
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return "CU";
  }
}

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]); // Estado para almacenar los artículos del carrito
  const [currencies, setCurrencies] = useState<string>(""); // Estado para almacenar la moneda actual
  const [location, setLocation] = useState<string>("");
  const [userData, setUserData] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await fetchCartItems(userData);
        const location = await getLocation();

        if (userData) {
          setAmount(
            cartItems.carrito.reduce(
              (acc: any, item: any) => acc + item.en_carrito,
              0,
            ),
          );
        } else setAmount(0);

        setCartItems(cartItems.carrito);
        setCurrencies(userData ? cartItems.monedas[0].currencys : {});
        setLocation(location);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [amount, isOpen, userData]);

  useEffect(() => {
    const updateUserData = () => {
      setUserData(localStorage.getItem("userData"));
    };
    const updateCartData = () => {
      setAmount(-1);
    };

    // Ejecutar al montar el componente
    updateUserData();
    updateCartData();

    // Escuchar eventos de almacenamiento (cambios en otras pestañas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userData") {
        updateUserData();
      }
    };
    const handleCustomEvent = () => {
      updateCartData();
      updateUserData();
    };

    // Agregar listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userDataChanged", handleCustomEvent);
    window.addEventListener("cartDataChanged", handleCustomEvent);

    // Limpiar listeners al desmontar
    return () => {
      window.removeEventListener("cartDataChanged", handleCustomEvent);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataChanged", handleCustomEvent);
    };
  }, []);

  return (
    <>
      {!isOpen && amount > 0 && userData && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg bg-blue-600 items-center justify-center text-white hover:bg-blue-700 hover:cursor-pointer hover:scale-110 transition-all duration-300 z-50"
        >
          <ShoppingCart className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {amount}
          </div>
        </button>
      )}
      {isOpen && amount > 0 && userData && (
        <div className="fixed flex flex-col bottom-2 right-2 ml-40 w-132  max-h-[calc(100vh-16px)] max-w-[calc(100vw-16px)] bg-white shadow-xl sm:p-8 p-4 text-[#022953] rounded-lg gap-4 z-50 overflow-y-scroll">
          <div className="flex w-full">
            <h3 className="text-xl font-bold">Tu carrito</h3>
            <button onClick={() => setIsOpen(!isOpen)} className="ml-auto">
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                currencies={currencies}
                location={location}
              />
            ))}
          </div>
          <hr className="border-1 border-gray-200" />
          <Link
            href="/checkout"
            className="flex w-full p-2 bg-[#022953] text-white font-bold justify-center hover:scale-105 transition-all duration-300"
          >
            Verificar compra
          </Link>
        </div>
      )}
    </>
  );
}
