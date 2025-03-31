import Image from "next/image";

import CartTimer from "@/components/CartTimer";
import CartActions from "@/components/CartActions";

export default function CartItem({
  item,
  currencies,
  location,
}: {
  item: any;
  currencies: any;
  location: string;
}) {
  //console.log(item);
  return (
    <>
      {item.aliveUntil > 0 && (
        <div className="flex flex-col gap-4">
          <hr className="flex h-px border-[#9a9a9a] w-full" />

          <div className="flex w-full gap-4 overflow-hidden text-[#022953]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
              alt={item.name}
              width={100}
              height={100}
              className="flex-shrink-0 object-contain rounded-lg"
            />
            <div className="flex flex-col flex-1 min-w-0 text-xs sm:text-base">
              <span className="truncate inline-block max-w-full font-semibold">
                {item.name}
              </span>
              <span className="truncate inline-block max-w-full text-gray-400">
                {item.model}
              </span>
              <CartActions
                item={item}
                location={location}
                currencies={currencies}
              />
              <div className="flex w-full bg-red-200 p-2 rounded-lg text-red-600 gap-2">
                <CartTimer item={item} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
