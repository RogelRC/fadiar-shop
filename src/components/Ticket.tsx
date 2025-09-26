"use client";

import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ReadyButton from "@/components/ReadyButton";
import { useMemo, useEffect } from "react";
import { useObject } from "@/store/Tickect";
import  Link from "next/link";

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

export default function TicketPage() {
  const searchParams = useSearchParams();
  const order = useObject((state) => state.object?.order);

  useEffect(() => {
    console.log('Order data:', order);
  }, [order]);

  const data = useMemo(() => {
    if (!order) return null;

    const { date, client_name, client_last_names, client_ci, client_cell, id, manager_cell1, municipio, provincia, direccionExacta } = order;

    const formattedDate = date ? formatDate(date) : { dateFormatted: '', timeFormatted: '' };

    const hasDelivery = direccionExacta;
    const pickupAddress = 'Calle 29F entre 114 y 114A, edificio 11413, Ciudad Libertad, Marianao, La Habana, Cuba, Almacén 9A (ENAME)';
    
    return {
      date: formattedDate.dateFormatted,
      time: formattedDate.timeFormatted,
      orderId: id,
      fullName: `${client_name} ${client_last_names}`.trim(),
      ci: client_ci,
      phone: client_cell,
      managerPhone: manager_cell1,
      hasDelivery,
      address: hasDelivery 
        ? `${direccionExacta}, ${municipio}, ${provincia}`
        : pickupAddress,
      products: order.products || []
    };
  }, [order]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No hay ningún pedido nuevo. <Link href="/products" className="text-blue-600">Continuar comprando</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-88px)] w-full bg-white p-4 sm:py-12 justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#022953] text-white p-6 text-center">
          <h1 className="text-2xl font-bold">¡Pedido Realizado!</h1>
          <p className="text-sm opacity-90 mt-1">
            {data.date} a las {data.time}
          </p>
          <p className="text-sm mt-2 font-medium  inline-block px-3 py-1 rounded-full">
            ID de pedido: #{data.orderId}
          </p>
        </div>

        {/* Order Info */}
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-6">
            Su pedido ha sido recibido
          </h2>

          {/* Customer Information */}
          <div className="mb-6 space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-700 mb-2">Datos del Cliente</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>Nombre:</div>
                <div className="font-medium">{data.fullName}</div>

                <div>CI:</div>
                <div className="font-medium">{data.ci}</div>

                <div>Teléfono:</div>
                <div className="font-medium">{data.phone}</div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="pt-2">
              <h3 className="font-medium text-gray-700 mb-2">
                {data.hasDelivery ? 'Dirección de Entrega' : 'Dirección de Recogida'}
              </h3>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded whitespace-pre-line">
                {data.hasDelivery ? (
                  <div className="flex items-start gap-2">
                    <span>🚚</span>
                    <span>{data.address}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span>🏪</span>
                      <span className="font-medium">Recoger en el almacén</span>
                    </div>
                    <div className="pl-6 text-sm">
                      {data.address.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products */}
          {data.products.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Productos</h3>
              <div className="space-y-3">
                {data.products.map((product: any, index: number) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {product.name} x{product.count}
                    </span>
                    <span className="font-medium">
                      {product.prices[0][1]} {product.prices[0][2]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-8">

            <p className="mt-1">Gracias por su compra.</p>
          </div>

          <div className="flex w-full justify-center mt-6">
            <ReadyButton />
          </div>
        </div>
        </div>
      </div>

  );
}
