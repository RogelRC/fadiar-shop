import Link from "next/link";

interface Record {
  client_cell: number;
  client_ci: number;
  client_last_names: string;
  client_name: string;
  date: string;
  direccionExacta: string;
  id: number;
  id_user: number;
  manager_name: string;
  municipio: string;
  provincia: string;
  state: number;
  user_type: string;
  delivery: number | null;
}

export default function RecordCard(item: Record) {
  const divClassname = `${item.state === -1 ? "bg-red-600 text-white" : item.state === 1 ? "bg-green-500" : item.state === 0 && item.delivery != null ? "bg-blue-500" : "bg-yellow-300"}`;
  const textClassname = `${item.state === -1 ? "Cancelado" : item.state === 1 ? "Aceptado" : item.state === 0 && item.delivery != null ? "Enviado" : "En espera"}`;

  return (
    <Link
      href={`/record/${item.id}?userId=${item.id_user}&orderId=${item.id}`}
      key={item.id}
      className="flex flex-col relative bg-white rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300 overflow-hidden gap-y-2"
    >
      {/* Etiqueta sobre el estado de la compra */}
      <div
        className={`sm:hidden w-fit text-xs font-bold px-2 py-1 rounded ${divClassname}`}
      >
        {textClassname}
      </div>
      <div
        className={`hidden sm:block absolute top-0 right-0 text-xs font-bold px-2 py-1 rounded bg-black ${divClassname}`}
      >
        {textClassname}
      </div>
      <div className="flex gap-2">
        <span>
          <span className="font-bold">Fecha: </span>
          {item.date}
        </span>
      </div>
      <div className="flex gap-2">
        <span>
          <span className="font-bold">Ubicación: </span>
          {item.provincia}, {item.municipio}
          {item.direccionExacta ? `, ${item.direccionExacta}` : ""}
        </span>
      </div>
    </Link>
  );
}
