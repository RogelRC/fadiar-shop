"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import BurgerMenu from "@/components/BurguerMenu";
import Navbar from "@/components/Navbar";

export default function Header() {
  const pathname = usePathname();
  
  // Rutas donde el header debe estar oculto
  const hiddenRoutes = ['/login', '/register', '/recovery', '/verify'];
  
  // Normalizar el pathname removiendo la barra final si existe
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  // Si la ruta actual está en la lista de rutas ocultas, no renderizar el header
  if (hiddenRoutes.includes(normalizedPathname)) {
    return null;
  }

  return (
    <header className="w-full sticky top-0 left-0 z-50">
      {/* Fondo degradado */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          background: "linear-gradient(90deg, #011d30, #1a2d52)",
        }}
      />

      {/* Contenido encima del fondo */}
      <div className="relative flex w-full h-22 px-4 sm:px-8 space-x-4 lg:space-x-8 items-center z-10">
        <Link href="/" className="flex h-full items-center md:p-0 py-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="hidden md:block"
          />
          <Image
            src="/favicon.png"
            alt="logo"
            width={60}
            height={60}
            className="md:hidden"
          />
        </Link>

        <SearchBar />

        <div className="flex h-full items-center justify-end text-white space-x-4 text-sm ml-auto">
          <Navbar />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}
