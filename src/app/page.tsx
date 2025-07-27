"use client";

import { useState, useEffect } from "react";
import HeroSlider from "@/components/HeroSlider";
import CatPre from "@/components/CatPre";
import NewProducts from "@/components/NewProducts";
import Loading from "@/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simular tiempo de carga mínimo para una mejor experiencia
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 segundos mínimo de carga

    return () => clearTimeout(timer);
  }, []);

  // Si aún está cargando, mostrar el componente de carga
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="relative z-0">
        <HeroSlider />
      </div>
      <div className="relative z-10 -mt-4">
        {" "}
        {/* Ajusta el margen si quieres que suba sobre el slider */}
        <NewProducts />
      </div>
      <CatPre />
    </div>
  );
}
