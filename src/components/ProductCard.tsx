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
    <Link
      href={`/products/${product.id}`}
      className="shadow-lg hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden"
    >
      <div
        key={product.id}
        className="relative aspect-square w-full bg-gray-50"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
          alt={product.name}
          fill
          className="object-fill w-full h-full"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="relative flex flex-col bg-[#022953] rounded-t-lg p-2 -mt-2  text-white">
        <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {product.name}
        </span>
        <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
          Marca {product.brand}
        </span>
        <span>
          {product.prices[0][1]} {product.prices[0][2]}
        </span>
        <Image
          src="/Group81.svg"
          alt="Ver"
          width={32}
          height={32}
          className="absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8"
        />
      </div>
    </Link>
  );
}
