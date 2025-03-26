import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  img: string;
  prices: [number, number, string][];
  specs: [number, string, string][];
}

export default async function ProductsPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`);
  const products = await response.json();

  return (
    <div className="flex flex-col w-full p-6 space-y-6">
      <h1>Catálogo de productos</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
