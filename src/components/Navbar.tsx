"use client";

import Link from "next/link";
import UserButton from "@/components/UserButton";
import { useEffect, useState } from "react";
import { useCart } from "@/store/Cart";
import { usePathname } from "next/navigation";
import { useFilters } from "@/store/Filters";

export default function Navbar() {
  const [userData, setUserData] = useState<string | null>(null);
  const setAmount = useCart((state) => state.setAmount);
  const { amount } = useCart();
  const pathname = usePathname(); // Obtener la ruta actual
  const setCategory = useFilters((state) => state.setCategory);

  const fetchCartItems = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (!userData) {
      console.log("No tengo datos");
      return {};
    }

    try {
      const body = JSON.stringify({
        id_user_action: userData.userId,
        id_user: userData.userId,
        comisiones: false,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/obtener_productos_carrito`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        },
      );

      if (!response.ok) {
        throw new Error("Error al cargar el carrito");
      }

      const data = await response.json();
      //console.log(data);
      //console.log("aaaaaaaaaaaaaaaa");
      setAmount(
        data.carrito.reduce((sum: any, item: any) => sum + item.en_carrito, 0),
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    // Función para actualizar los datos
    const updateUserData = () => {
      setUserData(localStorage.getItem("userData"));
    };

    // Ejecutar al montar el componente
    updateUserData();

    // Escuchar eventos de almacenamiento (cambios en otras pestañas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userData") {
        updateUserData();
      }
    };

    // Escuchar evento personalizado (cambios en la misma pestaña)
    const handleCustomEvent = () => {
      updateUserData();
    };

    // Agregar listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userDataChanged", handleCustomEvent);

    // Limpiar listeners al desmontar
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataChanged", handleCustomEvent);
    };
  }, []);

  return (
    <div className="flex z-10 h-full items-center justify-end text-white space-x-4 text-sm">
      {userData ? (
        <>
          <Link
            href="/"
            className={`hidden sm:block relative hover:text-blue-500 hover:underline transition-colors ${
              pathname === "/" ? "font-bold" : ""
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/products"
            onClick={() => setCategory("")}
            className={`hidden sm:block relative hover:text-blue-500 hover:underline transition-colors ${
              pathname.startsWith("/products") ? "font-bold" : ""
            }`}
          >
            Productos
          </Link>
          <Link
            href="/checkout"
            className={`hidden sm:block relative hover:text-blue-500 hover:underline transition-colors ${
              pathname === "/checkout/" ? "font-bold" : ""
            }`}
          >
            Carrito
            {amount > 0 && (
              <div className="absolute -right-2 -top-4 px-1 bg-red-300 text-red-700 rounded-md">
                {amount}
              </div>
            )}
          </Link>
          <Link
            href={`/record?id=${
              JSON.parse(localStorage.getItem("userData") || "{}").userId ||
              null
            }`}
            className={`hidden sm:block whitespace-nowrap hover:text-blue-500 hover:underline transition-colors ${
              pathname.startsWith("/record") ? "font-bold" : ""
            }`}
          >
            Mis Pedidos
          </Link>
          <UserButton />
        </>
      ) : (
        <>
          <Link
            href="/"
            className={`hidden sm:block relative hover:text-blue-500 hover:underline transition-colors ${
              pathname === "/" ? "font-bold" : ""
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/products"
            className={`hidden sm:block relative hover:text-blue-500 hover:underline transition-colors ${
              pathname.startsWith("/products") ? "font-bold" : ""
            }`}
          >
            Productos
          </Link>
          <Link
            href="/login"
            className={`hidden sm:block hover:text-blue-500 hover:underline transition-colors whitespace-nowrap ${
              pathname === "/login" ? "font-bold" : ""
            }`}
          >
            Iniciar sesión
          </Link>
        </>
      )}
    </div>
  );
}
