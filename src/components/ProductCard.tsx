import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/store/Cart";
import { useEffect, useState } from "react";

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

interface Currency {
  currency: string;
  id: number;
  value: number;
}

export default function ProductCard({
  product,
  location,
  currencies,
}: {
  product: Product;
  location: string;
  currencies: Currency[];
}) {
  const setAmount = useCart((state) => state.setAmount);
  const { amount: cartAmount } = useCart();
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (wait === true) {
      setTimeout(() => {
        setWait(false);
      }, 3000);
    }
  }, [wait]);

  const handleAddToCart = async (productId: number, quantity: number) => {
    setWait(true);

    if (!localStorage.getItem("userData")) {
      throw new Error("User data not found");
    }

    // Implement logic to add item to cart
    const body = JSON.stringify({
      id_user_action: parseInt(
        JSON.parse(localStorage.getItem("userData")!).userId,
      ),
      id_user: parseInt(JSON.parse(localStorage.getItem("userData")!).userId),
      id_product: productId,
      count: quantity,
    });

    //console.log(body);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/agregar_producto_carrito`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    setAmount(cartAmount + 1);
  };

  return (
    <div className="flex flex-col relative z-0 shadow-xl hover:scale-105 transition-all duration-300 rounded-b-lg overflow-hidden">
      {/* Enlace clickable */}
      <Link href={`/products/id?itemId=${product.id}`}>
        <div className="flex flex-col z-0">
          <div className="flex relative aspect-square w-full bg-gray-50 z-10">
            {product.count === 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl z-10">
                <span className="sm:hidden">Agotado</span>
                <span className="hidden sm:block">Agotado temporalmente</span>
              </span>
            )}
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
              alt={product.name}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col bg-[#022953] p-2 text-white rounded-t-lg -mt-2 z-10">
            <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {product.name}
            </span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
              Marca {product.brand}
            </span>
            <span>
              {location === "CU" && product.prices[0][2] === "CUP" && (
                <>{product.prices[0][1]} CUP</>
              )}
              {location !== "CU" && product.prices[0][2] === "USD" && (
                <>{product.prices[0][1]} USD</>
              )}
              {location === "CU" && product.prices[0][2] === "USD" && (
                <>{product.prices[0][1] * currencies[1].value} CUP</>
              )}
              {location !== "CU" && product.prices[0][2] === "CUP" && (
                <>
                  {Math.ceil(
                    (product.prices[0][1] / currencies[1].value) * 100,
                  ) / 100}{" "}
                  USD
                </>
              )}
            </span>
          </div>
        </div>
      </Link>

      {/* Botón fuera del Link */}
      <Button
        onClick={() => {
          setAmount(cartAmount + 1);
          handleAddToCart(product.id, 1);
        }}
        className="absolute bottom-2 right-2 items-center justify-center rounded-full bg-white text-[#022953] z-20 hover:bg-gray-300"
        disabled={product.count <= 0 || wait}
      >
        <ShoppingCart className="w-8 h-8" />
      </Button>
    </div>
  );
}
