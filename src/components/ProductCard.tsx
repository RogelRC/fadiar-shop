import Image from "next/image";
import Link from "next/link";

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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <li key={product.id} className="flex flex-col w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
          alt={product.name}
          width={500}
          height={500}
        />
        <div className="flex flex-col">
          <span>{product.name}</span>
          <span>Marca {product.brand}</span>
          <span>
            {product.prices[0][1]} {product.prices[0][2]}
          </span>
        </div>
      </li>
    </Link>
  );
}
