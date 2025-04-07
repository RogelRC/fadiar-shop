"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RecordCard from "@/components/RecordCard";

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

export default function TicketPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setRecords(data);
      } catch (error) {
        console.error("Error fetching record:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRecord(parseInt(id));
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] justify-center p-4 bg-white">
      <div className="flex flex-col bg-[#f4f4f4] w-120 sm:w-2/3 rounded-lg shadow-lg p-6 gap-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Mis pedidos
        </h3>

        {loading ? (
          <p className="text-center text-gray-600">Cargando pedidos...</p>
        ) : records.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay pedidos disponibles.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {records.map((item) => (
              <RecordCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
