"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LogOut,
  User,
  WashingMachine,
  ShoppingCart,
  Info,
  HandHelping,
  Phone,
  House,
  LogIn,
  Package,
} from "lucide-react";

const handleLogout = () => {
  localStorage.removeItem("userData");
  window.dispatchEvent(new Event("userDataChanged"));
};

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {userData && (
        <Link
          href="/checkout"
          className="w-6 h-6 sm:hidden hover:scale-125 duration-300"
        >
          <ShoppingCart />
        </Link>
      )}
      <div className="flex sm:hidden">
        <button
          className="w-6 h-6 hover:scale-125 duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </button>

        {isOpen && (
          <div className="flex flex-col absolute top-0 right-0 bg-white rounded-l-lg h-screen w-[80vw] p-4 text-[#022953] space-y-4 text-base z-50">
            <div className="flex w-full">
              <h3 className="text-xl font-bold">Menú</h3>
              <button
                className="ml-auto w-6 h-6"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>
            </div>
            <hr className="border-1 border-gray-200" />
            <Link
              href="/"
              className="flex w-full space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <span>
                <House />
              </span>
              <span>Inicio</span>
            </Link>
            <hr className="border-1 border-gray-200" />
            {userData && (
              <>
                <Link
                  href="/"
                  className="flex w-full space-x-2"
                  onClick={() => handleLogout()}
                >
                  <span>
                    <LogOut />
                  </span>
                  <span>Cerrar sesión</span>
                </Link>
                <Link
                  href="/account"
                  className="flex w-full space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <User />
                  </span>
                  <span>Mi cuenta</span>
                </Link>
                <Link
                  href="/record"
                  className="flex w-full space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <Package />
                  </span>
                  <span>Mis pedidos</span>
                </Link>
              </>
            )}
            {!userData && (
              <Link
                href="/login"
                className="flex w-full space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <span>
                  <LogIn />
                </span>
                <span>Iniciar sesión</span>
              </Link>
            )}
            <hr className="border-1 border-gray-200" />
            <Link
              href="/products"
              className="flex w-full space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <span>
                <WashingMachine />
              </span>
              <span>Productos</span>
            </Link>
            {userData && (
              <Link
                href="/checkout"
                className="flex w-full space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <span>
                  <ShoppingCart />
                </span>
                <span>Carrito</span>
              </Link>
            )}
            <hr className="border-1 border-gray-200" />
            <Link
              href="/about"
              className="flex w-full space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <span>
                <Info />
              </span>
              <span>Sobre nosotros</span>
            </Link>
            <Link
              href="/help"
              className="flex w-full space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <span>
                <HandHelping />
              </span>
              <span>Ayuda</span>
            </Link>
            <Link
              href="/contact"
              className="flex w-full space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <span>
                <Phone />
              </span>
              <span>Contáctenos</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
