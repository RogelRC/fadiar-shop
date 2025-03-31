import { Check } from "lucide-react";
import ReadyButton from "@/components/ReadyButton";

const formatDate = (dateString: string) => {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const date = new Date(dateString.replace(/\+/g, " "));
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return {
    dateFormatted: `${day} de ${month} del ${year}`,
    timeFormatted: `${hours}:${minutes}`,
  };
};

export default function TicketPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = {
    date: searchParams.date?.toString() || "",
    address: searchParams.address
      ? decodeURIComponent(searchParams.address.toString())
      : null,
    price: searchParams.price?.toString() || "0",
    currency: searchParams.currency?.toString() || "CUP",
  };

  const { dateFormatted, timeFormatted } = formatDate(data.date);

  return (
    <div className="flex min-h-[calc(100vh-88px)] w-full bg-white p-4 sm:py-12">
      <div className="flex flex-col w-full sm:w-2/3 min-h-full mx-auto bg-[#f4f4f4] rounded-md px-10 items-center pb-8">
        <div className="flex flex-col items-center justify-center w-full my-14 gap-4">
          <div className="flex w-20 h-20 rounded-full bg-[#022953] items-center justify-center p-2">
            <Check className="text-white h-full w-full" />
          </div>
          <span className="flex text-2xl font-bold text-[#022953]">
            Orden confirmada
          </span>
        </div>
        <div className="flex flex-col w-full text-[#9a9a9a] gap-4">
          <div className="flex w-full gap-4">
            <span className="flex">Día</span>
            <span className="flex ml-auto font-bold">{dateFormatted}</span>
          </div>
          <hr className="flex h-px border-[#9a9a9a] w-full" />
          <div className="flex w-full gap-4">
            <span className="flex">Hora</span>
            <span className="flex ml-auto font-bold">{timeFormatted}</span>
          </div>
          <hr className="flex h-px border-[#9a9a9a] w-full" />
          {data.address && (
            <>
              <div className="flex w-full gap-4">
                <span className="flex">Dirección</span>
                <span className="flex ml-auto font-bold">{data.address}</span>
              </div>
              <hr className="flex h-px border-[#9a9a9a] w-full" />
            </>
          )}
          <div className="flex w-full">
            <span className="flex">Total a pagar</span>
            <span className="flex ml-auto font-extrabold text-[#022953]">
              {data.price} {data.currency}
            </span>
          </div>
        </div>
        <ReadyButton />
      </div>
    </div>
  );
}
