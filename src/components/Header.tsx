import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import BurgerMenu from "@/components/BurguerMenu";
import Navbar from "@/components/Navbar";

export default function Header() {
  return (
    <header className="relative w-full">
      {/* Fondo degradado */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          background: "linear-gradient(90deg, #011d30, #1a2d52)",
        }}
      />

      {/* Contenido encima del fondo */}
      <div className="relative flex w-full h-22 px-4 sm:px-8 space-x-4 lg:space-x-8 items-center z-10">
        <Link href="/" className="flex-none h-full items-center md:p-0 py-2">
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
            width={60}
            height={80}
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
