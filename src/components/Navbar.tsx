"use client";

import Link from "next/link";
import UserButton from "@/components/UserButton";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userData, setUserData] = useState<string | null>(null);

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
            href="/cart"
            className="hidden sm:block hover:text-blue-500 hover:underline transition-colors"
          >
            Carrito
          </Link>
          <Link
            href={`/record?id=${JSON.parse(localStorage.getItem("userData") || "{}").userId || null}`}
            className="hidden sm:block whitespace-nowrap hover:text-blue-500 hover:underline transition-colors"
          >
            Mis Pedidos
          </Link>
          <UserButton />
        </>
      ) : (
        <Link
          href="/login"
          className="hidden sm:block hover:text-blue-500 hover:underline transition-colors whitespace-nowrap"
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
}
