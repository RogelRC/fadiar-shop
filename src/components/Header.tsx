import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import BurgerMenu from "@/components/BurguerMenu";
import Navbar from "@/components/Navbar";

export default function Header() {
  return (
    <header className="flex w-full h-22 relative bg-black px-4 sm:px-8 space-x-4 lg:space-x-8 items-center">
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
      <Link href="/" className="flex-none z-10 h-full items-center md:p-0 py-2">
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

      <div className="flex z-10 h-full items-center justify-end text-white space-x-4 text-sm">
        <Navbar />

        <BurgerMenu />
      </div>
    </header>
  );
}
