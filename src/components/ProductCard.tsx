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
      <li key={product.id} className="relative aspect-square w-full bg-gray-50">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
          alt={product.name}
          fill
          className="object-fill w-full h-full"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </li>
      <div className="relative flex flex-col bg-[#022953] rounded-lg p-2 -mt-2 z-50 text-white">
        <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {product.name}
        </span>
        <span>Marca {product.brand}</span>
        <span>
          {product.prices[0][1]} {product.prices[0][2]}
        </span>
      </div>
    </Link>
  );
}
