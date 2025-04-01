"use client";

import ProductCard from "./ProductCard";

interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  img: string;
  prices: [number, number, string][];
  specs: [number, string, string][];
  count: number;
}

export default function ProductList() {
  return (
    <>
      {filteredProducts
        .sort(
          (a: Product, b: Product) =>
            (b.count > 0 ? 1 : -1) - (a.count > 0 ? 1 : -1),
        )
        .map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            location={location}
            currencies={currencies}
          />
        ))}
    </>
  );
}
