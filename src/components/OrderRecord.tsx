"use client";

import { useEffect, useState } from "react";

interface Product {
  img: string;
  name: string;
  prices: [number, number, string][];
}

interface Order {
  id: number;
  date: string;
  state: number;
  direccionExacta?: string;
}

interface Currency {
  value: number;
}

export default function MisPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: number]: Product[];
  }>({});
  const [currency, setCurrency] = useState<string>("CUP");
  const [location, setLocation] = useState<string>("CU");
  const [currencies, setCurrencies] = useState<Currency[]>([
    { value: 1 },
    { value: 1 },
  ]);

  useEffect(() => {
    fetchPedidos();
    detectCountry();
  }, []);

  const fetchPedidos = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pedidos_manager`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_manager: userData.userId,
            managerId: userData.userId,
          }),
        },
      );
      const data: Order[] = await response.json();
      setOrders(data);
      data.forEach((order) => fetchOrderDetails(order.id));
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  const fetchOrderDetails = async (orderId: number) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user_action: userData.userId,
            id_order: orderId,
          }),
        },
      );
      const data: { products: Product[] } = await response.json();
      setSelectedProducts((prev) => ({
        ...prev,
        [orderId]: data.products || [],
      }));
    } catch (error) {
      console.error("Error al obtener detalles del pedido:", error);
    }
  };

  const detectCountry = async () => {
    try {
      const response = await fetch("https://app.fadiar.com/api/get_location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data: { country: string } = await response.json();
      console.log(data);
      if (data.country !== "Cuba") {
        setLocation(data.country);
        setCurrency("USD");
      }
    } catch (error) {
      console.error("Error detecting country:", error);
      // Si falla, mantenemos CU y CUP
    }
  };

  const getEstadoStyle = (state: number) => {
    switch (state) {
      case -1:
        return "bg-red-500 text-white";
      case 0:
        return "bg-blue-100 text-blue-800";
      case 1:
        return "bg-green-500 text-black";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrecioCorrecto = (product: Product) => {
    const precioCUP = product.prices.find((p) => p[2] === "CUP");
    const precioUSD = product.prices.find((p) => p[2] === "USD");

    if (location === "CU" && precioCUP) {
      return `${precioCUP[1]} CUP`;
    }
    if (location !== "CU" && precioUSD) {
      return `${precioUSD[1]} USD`;
    }
    return "Precio no disponible";
  };

  return (
    <div className="flex flex-col w-full p-6 items-center">
      <h1 className="text-3xl font-bold mb-6 text-[#022953]">Mis Pedidos</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="mb-8 border-b border-gray-300 pb-6 w-full md:w-2/3 text-gray-600"
        >
          <div className="mb-4">
            <div className="flex gap-4 items-center">
              <div
                className={`py-1 px-2 font-semibold rounded ${getEstadoStyle(order.state)}`}
              >
                {order.state === -1
                  ? "Cancelada"
                  : order.state === 1
                    ? "Aceptado"
                    : "En espera"}
              </div>
              <div>
                <span className="font-semibold">Fecha:</span>{" "}
                {order.date.split(" ")[0]}
              </div>
              <div>{order.date.split(" ")[1]}</div>
            </div>
          </div>

          {selectedProducts[order.id] && (
            <div className="space-y-6 mt-4">
              {selectedProducts[order.id].map((product, index) => (
                <div key={index} className="flex items-start gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
                    alt={product.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="flex flex-col justify-between border p-4 rounded w-full">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Precio:</span>{" "}
                      {getPrecioCorrecto(product)}
                    </p>
                    {order.direccionExacta && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Ubicación:</span>{" "}
                        {order.direccionExacta}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
