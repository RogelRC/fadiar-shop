// components/ReadyButton.tsx
"use client";

import Link from "next/link";

export default function ReadyButton() {
  const handleClick = () => {
    window.dispatchEvent(new Event("cartDataChanged"));
  };

  return (
    <Link
      className="flex h-10 sm:w-1/2 w-full bg-[#022953] text-white items-center justify-center font-bold mt-auto"
      href="/products"
      onClick={handleClick}
    >
      Listo
    </Link>
  );
}
