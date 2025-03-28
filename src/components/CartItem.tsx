import Image from "next/image";

import CartTimer from "@/components/CartTimer";

export default function CartItem({
  item,
  currencies,
  location,
}: {
  item: any;
  currencies: any;
  location: string;
}) {
  console.log(item);
  return (
    <>
      <hr className="border-1 border-gray-200" />

      <div className="flex w-full gap-4 overflow-hidden text-[#022953]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
          alt={item.name}
          width={100}
          height={100}
          className="flex-shrink-0"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="truncate inline-block max-w-full font-semibold">
            {item.name}
          </span>
          <span className="truncate inline-block max-w-full text-gray-400">
            {item.model}
          </span>
          <div className="flex max-w-full">
            <span>
              {item.en_carrito} x{" "}
              {location === "CU" && item.moneda_precio_base === "CUP" && (
                <>{`${item.prices[0][1]} CUP`}</>
              )}
              {location === "CU" && item.moneda_precio_base === "USD" && (
                <>{`${item.prices[0][1] * currencies[1].value} CUP`}</>
              )}
              {location === "US" && item.moneda_precio_base === "USD" && (
                <>{`${item.prices[0][1]} USD`}</>
              )}
              {location === "US" && item.moneda_precio_base === "CUP" && (
                <>{`${(Math.ceil((item.prices[0][1] / currencies[1].value) * 100) / 100).toFixed(2)} USD`}</>
              )}
            </span>
          </div>

          <div className="flex w-full bg-red-200 p-2 rounded-lg text-red-600 gap-2">
            <CartTimer item={item} />
          </div>
        </div>
      </div>
    </>
  );
}
