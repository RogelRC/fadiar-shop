import Link from "next/link";

interface record {
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
}

async function fetchRecord(id: number) {
  try {
    const body = JSON.stringify({
      id_manager: id,
      managerId: id,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pedidos_manager`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch record");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function RecordPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = await searchParams.id;

  const record = await fetchRecord(parseInt(id));

  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 sm:w-2/3 rounded-lg shadow-lg p-6 gap-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Mis pedidos
        </h3>
        <div className="flex flex-col gap-6">
          {record.map((item: record) => (
            <Link
              href={`/record/${item.id}`}
              key={item.id}
              className="relative bg-white rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300 overflow-hidden"
            >
              {/* Etiqueta sobre el estado de la compra */}
              <div className="absolute top-0 right-0 bg-black text-white py-1 px-2 w-32 text-center items-center justify-center rounded-sm">
                {item.state}
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Fecha:</span>
                <span className="text-gray-600">{item.date}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Ubicación:</span>
                <span className="text-gray-600">
                  {item.provincia}, {item.municipio}
                  {item.direccionExacta ? `, ${item.direccionExacta}` : ""}
                </span>
              </div>

              <p></p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
