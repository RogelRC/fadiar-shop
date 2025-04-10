"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddToCart from "@/components/AddToCart";
import Loading from "@/components/Loading";

async function getLocation() {
  try {
    const res = await fetch("https://app.fadiar.com/api/get_location");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return !data.country || data.country === "Cuba" ? "CU" : "US";
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return "CU";
  }
}

async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getProductForVisual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_product: parseInt(id),
          id_user_action: 0,
        }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch product");
  }
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("itemId");

  const [product, setProduct] = useState<any | null>(null);
  const [location, setLocation] = useState("CU");

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const [productData, locationData] = await Promise.all([
        getProduct(id || ""),
        getLocation(),
      ]);
      setProduct(productData);
      setLocation(locationData);
    }

    fetchData();
  }, [id]);

  if (!id) {
    return <div>Producto no encontrado.</div>;
  }

  if (!product) {
    return <Loading />;
  }

  const currencies = product.currencys.currencys;
  const price = product.product.prices[0];
  const value = price[1];
  const currency = price[2];

  function renderPrice() {
    if (location === "CU" && currency === "CUP") return `${value} CUP`;
    if (location !== "CU" && currency === "USD") return `${value} USD`;
    if (location === "CU" && currency === "USD")
      return `${value * currencies[1].value} CUP`;
    if (location !== "CU" && currency === "CUP")
      return `${Math.ceil((value / currencies[1].value) * 100) / 100} USD`;
  }

  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-8 sm:p-8 p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-8 gap-4">
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product.product.image}`}
            alt={product.product.name}
            width={800}
            height={800}
            className="rounded-lg shadow-lg"
          />
          <span className="flex relative w-1/2 bg-[#022953] p-2 sm:px-6 text-nowrap text-white font-semibold justify-center sm:justify-end -mt-4">
            Marca {product.product.brand}
          </span>
        </div>

        <div className="block sm:hidden">
          <div className="flex flex-col w-full bg-[#eff6ff] text-[#022953] p-4 sm:p-10 gap-y-4 sm:gap-y-8 items-center sm:items-start">
            <span className="flex font-bold text-4xl justify-center sm:justify-start">
              {renderPrice()}
            </span>
            <AddToCart
              productId={product.product.id}
              amount={parseInt(product.product.count)}
            />
          </div>
        </div>

        <div className="flex flex-col w-full self-start bg-[#022953] rounded-xl p-4 sm:p-10 text-white gap-y-2">
          <h1 className="text-3xl font-bold">{product.product.name}</h1>
          <h3 className="text-lg font-semibold">Propiedades:</h3>
          <span style={{ whiteSpace: "pre-line" }}>
            {product.product.description}
          </span>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="flex flex-col w-full bg-[#eff6ff] text-[#022953] p-4 sm:p-10 gap-y-4 sm:gap-y-8 items-center sm:items-start">
          <span className="flex font-bold text-4xl justify-center sm:justify-start">
            {renderPrice()}
          </span>
          <AddToCart
            productId={product.product.id}
            amount={parseInt(product.product.count)}
          />
        </div>
      </div>
    </div>
  );
}
