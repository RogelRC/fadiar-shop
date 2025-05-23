"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFilters } from "@/store/Filters";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  img: string;
  categoria: {
    id: number;
    name: string;
  };
}

interface CategoryGroup {
  category: string;
  products: Product[];
}

export default function CatPre() {
  const [groupedData, setGroupedData] = useState<CategoryGroup[]>([]);
  const setCategory = useFilters((state) => state.setCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`);
      const data = await res.json();

      const products: Product[] = data.products.filter(
        (product: Product) => product.categoria && product.categoria.name,
      );

      const grouped: Record<string, Product[]> = {};

      products.forEach((product) => {
        const catName = product.categoria?.name ?? "Variados";
        if (!grouped[catName]) grouped[catName] = [];
        if (grouped[catName].length < 4) {
          grouped[catName].push({
            id: product.id,
            name: product.name,
            img: product.img,
            categoria: product.categoria,
          });
        }
      });

      const groups: CategoryGroup[] = Object.entries(grouped).map(
        ([category, products]) => ({
          category,
          products,
        }),
      );

      setGroupedData(groups);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-10 p-4">
      {groupedData.map(({ category, products }) => (
        <Link
          href={"/products"}
          onClick={() => setCategory(category)}
          key={category}
          className="border shadow-md p-4 bg-white"
        >
          <h2 className="text-2xl font-semibold mb-3 text-[#022953]">
            {category}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center aspect-square"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm mt-2 text-center truncate w-full text-[#022953] font-semibold">
                  {product.name}
                </p>
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
