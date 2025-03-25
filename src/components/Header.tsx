import { Search, Menu, User, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  return (
    <header className="flex w-full h-22 overflow-hidden relative bg-black px-4 sm:px-8 space-x-4 lg:space-x-8 items-center">
      {/* Capa de fondo desenfocada */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundImage: "url('/landscape.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />
      {/* Contenido no desenfocado */}
      <Link href="/" className="flex-none z-10 h-full items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={160}
          height={160}
          className="hidden md:block"
        />
        <Image
          src="/favicon.png"
          alt="logo"
          width={65}
          height={80}
          className="md:hidden"
        />
      </Link>

      <SearchBar />

      <div className="flex z-10 h-full items-center justify-end text-white space-x-4 text-sm">
        <Link
          href="/"
          className="hidden sm:block hover:text-blue-500 transition-colors"
        >
          Inicio
        </Link>
        <Link
          href="/products"
          className="hidden sm:block hover:text-blue-500 transition-colors"
        >
          Productos
        </Link>
        <Link
          href="/cart"
          className="hidden sm:block hover:text-blue-500 transition-colors"
        >
          Carrito
        </Link>
        <Link
          href="/record"
          className="hidden sm:block whitespace-nowrap hover:text-blue-500 transition-colors"
        >
          Mis Pedidos
        </Link>
        <button className="hidden sm:block hover:scale-125 duration-300">
          <User />
        </button>
        <button className="w-6 h-6 sm:hidden hover:scale-125 duration-300">
          <ShoppingCart />
        </button>
        <button className="w-6 h-6 sm:hidden hover:scale-125 duration-300">
          <Menu />
        </button>
      </div>
    </header>
  );
}
