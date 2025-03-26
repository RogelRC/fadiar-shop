"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  LogOut,
  User,
  WashingMachine,
  ShoppingCart,
  Info,
  HandHelping,
  Phone,
} from "lucide-react";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex sm:hidden">
      <button
        className="w-6 h-6 hover:scale-125 duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>

      {isOpen && (
        <div className="flex flex-col absolute top-0 right-0 bg-white rounded-l-lg h-screen w-[80vw] p-4 text-[#022953] space-y-4 text-base">
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
          <button
            className="flex w-full space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <span>
              <LogOut />
            </span>
            <span>Cerrar sesión</span>
          </button>
          <Link href="/account" className="flex w-full space-x-2">
            <span>
              <User />
            </span>
            <span>Mi cuenta</span>
          </Link>
          <hr className="border-1 border-gray-200" />
          <Link href="/products" className="flex w-full space-x-2">
            <span>
              <WashingMachine />
            </span>
            <span>Productos</span>
          </Link>
          <Link href="/cart" className="flex w-full space-x-2">
            <span>
              <ShoppingCart />
            </span>
            <span>Carrito</span>
          </Link>
          <hr className="border-1 border-gray-200" />
          <Link href="/about" className="flex w-full space-x-2">
            <span>
              <Info />
            </span>
            <span>Sobre nosotros</span>
          </Link>
          <Link href="/help" className="flex w-full space-x-2">
            <span>
              <HandHelping />
            </span>
            <span>Ayuda</span>
          </Link>
          <Link href="/contact" className="flex w-full space-x-2">
            <span>
              <Phone />
            </span>
            <span>Contáctenos</span>
          </Link>
        </div>
      )}
    </div>
  );
}
