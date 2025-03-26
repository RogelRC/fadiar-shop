"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    const url = trimmedQuery
      ? `/products?name=${encodeURIComponent(trimmedQuery)}`
      : "/products";
    router.push(url);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex z-10 w-full items-center text-white lg:mx-20 md:mx-10 border-b-2 focus-within:border-blue-500 transition-colors duration-300">
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full h-8 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>
        <Search />
      </button>
    </div>
  );
}
