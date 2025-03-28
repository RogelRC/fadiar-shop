"use client";

import { useEffect, useState } from "react";

export default function CartTimer({ item }: { item: any }) {
  const [timeLeft, setTimeLeft] = useState(item.aliveUntil);

  useEffect(() => {
    if (timeLeft === 0) {
      window.dispatchEvent(new Event("cartDataChanged"));
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev: any) => prev - 1); // Usar el estado anterior
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]); // Dependencia correcta

  return (
    <div className="flex items-center justify-between gap-2 text-sm sm:text-base">
      <span className="flex sm:w-fit whitespace-nowrap w-full">
        Tiempo restante:
      </span>
      <span className="flex">
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </span>
    </div>
  );
}
