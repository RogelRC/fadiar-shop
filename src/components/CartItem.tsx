import Image from "next/image";

export default function CartItem({ item }: { item: any }) {
  return (
    <>
      <div className="flex w-full gap-4 overflow-hidden text-[#022953]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
          alt={item.name}
          width={100}
          height={100}
          className="flex-shrink-0"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="truncate inline-block max-w-full">{item.name}</span>
          <span className="truncate inline-block max-w-full">{item.model}</span>
          <div className="flex max-w-full">
            <span>
              {item.en_carrito} x {item.price} {item.currency}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
