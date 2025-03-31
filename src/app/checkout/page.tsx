"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FinalCartItem from "@/components/FinalCartItem";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const provinciasCuba = {
  "Pinar del Río": [
    "Pinar del Río",
    "Consolación del Sur",
    "Guane",
    "La Palma",
    "Los Palacios",
    "Mantua",
    "Minas de Matahambre",
    "San Juan y Martínez",
    "San Luis",
    "Sandino",
    "Viñales",
  ],
  Artemisa: [
    "Artemisa",
    "Alquízar",
    "Bauta",
    "Caimito",
    "Guanajay",
    "Güira de Melena",
    "Mariel",
    "San Antonio de los Baños",
    "Bahía Honda",
    "Candelaria",
    "San Cristóbal",
  ],
  "La Habana": [
    "Arroyo Naranjo",
    "Boyeros",
    "Centro Habana",
    "Cerro",
    "Cotorro",
    "Diez de Octubre",
    "Guanabacoa",
    "Habana del Este",
    "Habana Vieja",
    "La Lisa",
    "Marianao",
    "Playa",
    "Plaza de la Revolución",
    "Regla",
    "San Miguel del Padrón",
  ],
  Mayabeque: [
    "Batabanó",
    "Bejucal",
    "Güines",
    "Jaruco",
    "Madruga",
    "Melena del Sur",
    "Nueva Paz",
    "Quivicán",
    "San José de las Lajas",
    "Santa Cruz del Norte",
  ],
  Matanzas: [
    "Cárdenas",
    "Ciénaga de Zapata",
    "Colón",
    "Jagüey Grande",
    "Jovellanos",
    "Limonar",
    "Los Arabos",
    "Martí",
    "Matanzas",
    "Pedro Betancourt",
    "Perico",
    "Unión de Reyes",
  ],
  Cienfuegos: [
    "Aguada de Pasajeros",
    "Cienfuegos",
    "Cruces",
    "Cumanayagua",
    "Lajas",
    "Palmira",
    "Rodas",
  ],
  "Villa Clara": [
    "Caibarién",
    "Camajuaní",
    "Cifuentes",
    "Corralillo",
    "Encrucijada",
    "Manicaragua",
    "Placetas",
    "Quemado de Güines",
    "Ranchuelo",
    "Remedios",
    "Sagua la Grande",
    "Santa Clara",
    "Santo Domingo",
  ],
  "Sancti Spíritus": [
    "Cabaiguán",
    "Fomento",
    "Jatibonico",
    "La Sierpe",
    "Sancti Spíritus",
    "Taguasco",
    "Trinidad",
    "Yaguajay",
  ],
  "Ciego de Ávila": [
    "Baraguá",
    "Bolivia",
    "Ciego de Ávila",
    "Chambas",
    "Ciro Redondo",
    "Florencia",
    "Majagua",
    "Morón",
    "Primero de Enero",
    "Venezuela",
  ],
  Camagüey: [
    "Camagüey",
    "Carlos Manuel de Céspedes",
    "Esmeralda",
    "Florida",
    "Guaimaro",
    "Jimaguayú",
    "Minas",
    "Najasa",
    "Nuevitas",
    "Santa Cruz del Sur",
    "Sibanicú",
    "Sierra de Cubitas",
    "Vertientes",
  ],
  "Las Tunas": [
    "Amancio",
    "Colombia",
    "Jesús Menéndez",
    "Jobabo",
    "Las Tunas",
    "Majibacoa",
    "Manatí",
    "Puerto Padre",
  ],
  Holguín: [
    "Antilla",
    "Báguanos",
    "Banes",
    "Cacocum",
    "Calixto García",
    "Cueto",
    "Frank País",
    "Gibara",
    "Holguín",
    "Mayarí",
    "Moa",
    "Rafael Freyre",
    "Sagua de Tánamo",
    "Urbano Noris",
  ],
  Granma: [
    "Bartolomé Masó",
    "Bayamo",
    "Buey Arriba",
    "Campechuela",
    "Cauto Cristo",
    "Guisa",
    "Jiguaní",
    "Manzanillo",
    "Media Luna",
    "Niquero",
    "Pilón",
    "Río Cauto",
    "Yara",
  ],
  "Santiago de Cuba": [
    "Contramaestre",
    "Guamá",
    "Mella",
    "Palma Soriano",
    "San Luis",
    "Santiago de Cuba",
    "Segundo Frente",
    "Songo - La Maya",
    "Tercer Frente",
  ],
  Guantánamo: [
    "Baracoa",
    "Caimanera",
    "El Salvador",
    "Guantánamo",
    "Imías",
    "Maisí",
    "Manuel Tames",
    "Niceto Pérez",
    "San Antonio del Sur",
    "Yateras",
  ],
  "Isla de la Juventud": ["Isla de la Juventud"],
};

async function fetchCartItems(userData: any) {
  if (!userData) {
    console.log("No tengo datos");
    return {};
  }

  try {
    const body = JSON.stringify({
      id_user_action: userData.userId,
      id_user: userData.userId,
      comisiones: false,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/obtener_productos_carrito`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      },
    );

    if (!response.ok) {
      throw new Error("Error al cargar el carrito");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getLocation() {
  try {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();
    //console.log(data.countryCode);
    return data.countryCode || "CU";
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return "CU";
  }
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    provincia: "",
    municipio: "",
    address: "",
  });

  const [cartItems, setCartItems] = useState<any[]>([]); // Estado para almacenar los artículos del carrito
  const [currencies, setCurrencies] = useState<any[]>([]); // Estado para almacenar la moneda actual
  const [location, setLocation] = useState<string>("");
  const [itemTotals, setItemTotals] = useState<{ [key: string]: number }>({});
  const [delivery, setDelivery] = useState(0);
  const [tried, setTried] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setTried(true);

    if (
      !formData.provincia ||
      !formData.municipio ||
      (delivery && !formData.address)
    ) {
      setError("Por favor llene todos los campos");
      return;
    }

    setError("");

    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add_order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user_action: userData.userId,
            gestor_id: userData.userId,
            ci_cliente: userData.ci,
            name_cliente: userData.name,
            last_names: `${userData.last1} ${userData.last2}`,
            cellphone_cliente: userData.cell1,
            order_code: userData.nextOrderCode,
            provincia: formData.provincia,
            municipio: formData.municipio,
            direccionExacta: formData.address,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setError(data.message || "Error al comprar");
      }

      const orderParams = new URLSearchParams({
        date: data.order.date,
        ...(formData.address && {
          address: `${formData.address}, ${formData.municipio}, ${formData.provincia}`,
        }),
        price: grandTotal.toFixed(2),
        currency: location === "CU" ? "CUP" : "USD",
      }).toString();

      router.push(`/checkout/ticket?${orderParams}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  const handleTotalChange = (itemId: string, total: number) => {
    setItemTotals((prev) => ({
      ...prev,
      [itemId]: total,
    }));
  };
  const grandTotal = Object.values(itemTotals).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  //console.log(currencies);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem("userData")!);
        const cartItems = await fetchCartItems(user);
        const location = await getLocation();

        setCartItems(user ? cartItems.carrito : {});
        setCurrencies(user ? cartItems.monedas[0].currencys : {});
        setLocation(location);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] justify-center p-4 bg-white">
      <div className="flex flex-col bg-[#f4f4f4] w-120 sm:w-2/3 rounded-lg shadow-lg sm:p-10 p-4 gap-4 sm:gap-6">
        <h1 className="flex font-bold text-xl sm:text-3xl text-[#022953] w-full sm:justify-start justify-center">
          Resumen del carrito
        </h1>
        <div className="flex flex-col gap-4 sm:gap-6">
          {cartItems.map((item) => (
            <FinalCartItem
              key={item.id}
              location={location}
              item={item}
              currencies={currencies}
              onTotalChange={(total) => handleTotalChange(item.id, total)}
            />
          ))}
        </div>
        <div className="flex w-full items-center mt-6">
          <span className="flex text-[#9a9a9a]">Total a pagar</span>
          <span className="flex ml-auto text-[#022953] text-2xl font-bold">
            {grandTotal.toFixed(2)} {location === "CU" ? "CUP" : "USD"}
          </span>
        </div>
        <hr className="flex h-px border-[#9a9a9a] w-full" />
        <div className="flex flex-col gap-2">
          <span className="flex text-[#9a9a9a]">Tú</span>
          <div className="flex items-center gap-4">
            <div className="flex rounded-full bg-[#9a9a9a] w-12 h-12 items-center justify-center text-white p-1">
              <UserRound className="flex w-full h-full" />
            </div>
            <span className="flex text-[#9a9a9a]">
              {JSON.parse(localStorage.getItem("userData") || "{}").name || ""}{" "}
              {JSON.parse(localStorage.getItem("userData") || "{}").last1 || ""}{" "}
              {JSON.parse(localStorage.getItem("userData") || "{}").last2 || ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-[#9a9a9a]">
            <label className="text-[#9a9a9a]">Provincia</label>
            <select
              value={formData.provincia}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  provincia: e.target.value,
                  municipio: "",
                })
              }
              className="w-full p-2 rounded-md border border-gray-300"
            >
              <option value="">Seleccione una provincia</option>
              {Object.keys(provinciasCuba).map((provincia) => (
                <option key={provincia} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 text-[#9a9a9a]">
            <label className="text-[#9a9a9a]">Municipio</label>
            <select
              value={formData.municipio}
              onChange={(e) =>
                setFormData({ ...formData, municipio: e.target.value })
              }
              className="w-full p-2 rounded-md border border-gray-300"
              disabled={!formData.provincia}
            >
              <option value="">Seleccione un municipio</option>
              {formData.provincia &&
                provinciasCuba[
                  formData.provincia as keyof typeof provinciasCuba
                ].map((municipio: string) => (
                  <option key={municipio} value={municipio}>
                    {municipio}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex w-full items-center">
          <span className="flex text-[#9a9a9a] font-bold">
            ¿Necesitas entrega a domicilio?
          </span>
          <input
            type="checkbox"
            checked={delivery === 1}
            onChange={(e) => setDelivery(e.target.checked ? 1 : 0)}
            className="flex ml-auto"
          />
        </div>

        {delivery === 1 && (
          <>
            <span className="flex text-[#9a9a9a]">Dirección</span>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Escriba su direccion aqui"
              className="flex w-full min-h-20 bg-white p-2 placeholder:text-left text-left align-top rounded-md"
            />
          </>
        )}
        <div className="flex w-full justify-center">
          <button
            onClick={handleSubmit}
            className="flex w-full md:w-1/2 h-12 bg-[#022953] font-bold text-white items-center justify-center hover:text-lg transition-all duration-300"
          >
            Confirmar orden
          </button>
        </div>
        {tried && error && (
          <span className="w-full bg-red-300 font-xs p-2 items-center text-center text-red-700 rounded-md">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
