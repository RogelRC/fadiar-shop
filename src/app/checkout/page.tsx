"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FinalCartItem from "@/components/FinalCartItem";

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

  console.log(currencies);

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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
