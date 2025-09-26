"use client";

import { useState, useEffect } from "react";
import FinalCartItem from "@/components/FinalCartItem";
import { UserRound, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/Cart";
import { useObject } from "@/store/Tickect";

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
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getLocation() {
  try {
    const res = await fetch("https://app.fadiar.com/api/get_location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    return !data.country || data.country === "Cuba" ? "CU" : "US";
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return "US";
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const setAmount = useCart((state) => state.setAmount);
  const setObject = useObject((state) => state.setObject);
  const [cartItems, setCartItems] = useState<any[] | null>(null); // null means loading, [] means loaded but empty
  const [currencies, setCurrencies] = useState<any[]>([]); // Estado para almacenar la moneda actual
  const [location, setLocation] = useState<string>("US");
  const [itemTotals, setItemTotals] = useState<{ [key: string]: number }>({});
  const [delivery, setDelivery] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tried, setTried] = useState(false);
  const [error, setError] = useState("");
  const [useMyAddress, setUseMyAddress] = useState(true);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  // Form state
  interface FormData {
    provincia: string;
    municipio: string;
    direccionExacta: string | null;
    phone: string;
    ci_cliente: string;
  }

  const [formData, setFormData] = useState<FormData>({
    provincia: "",
    municipio: "",
    direccionExacta: "",
    phone: "",
    ci_cliente: ""
  });

  // Form validation state
  const [validation, setValidation] = useState({
    provincia: false,
    municipio: false,
    direccionExacta: false,
    phone: false,
    ci_cliente: false,
    addressSelected: false
  });

  const [progress, setProgress] = useState(0);

  // Calculate subtotal using itemTotals
  const subtotal = Object.values(itemTotals).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  // Add delivery fee if delivery is selected
  const deliveryFee = delivery === 1 ? 5 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Uncheck delivery if province is changed to something other than Havana
  useEffect(() => {
    if (formData.provincia !== 'La Habana' && delivery === 1) {
      setDelivery(0);
      setIsExpanded(false);
    }
  }, [formData.provincia, delivery]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        if (!storedUserData) {
          router.push("/login");
          return;
        }
        
        const userData = JSON.parse(storedUserData);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/obtener-direccion-domicilio-cliente`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ id_user: userData.userId }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener direcciones');
        }

        const data = await response.json();
        //console.log(await data.listado)
        setAddresses(data.listado);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  // Update validation and progress
  useEffect(() => {
    const isUsingSavedAddress = useMyAddress && selectedAddress !== null;
    
    // Only validate address fields if not using a saved address
    const addressValid = isUsingSavedAddress || 
      (formData.provincia.trim() !== "" && formData.municipio.trim() !== "");
    
    const newValidation = {
      provincia: isUsingSavedAddress ? true : formData.provincia.trim() !== "",
      municipio: isUsingSavedAddress ? true : formData.municipio.trim() !== "",
      phone: /^\+?[0-9\s-]{8,}$/.test(formData.phone), // At least 8 digits, country code optional
      ci_cliente: /^\d{11}$/.test(formData.ci_cliente), // Exactly 11 digits
      addressSelected: addressValid,
      direccionExacta: delivery === 1 ? (formData.direccionExacta || "").trim() !== "" : true
    };

    setValidation(prev => ({
      ...prev,
      ...newValidation
    }));

    // Calculate progress
    const requiredFields = delivery === 1 ? 5 : 4; // Total fields that could be required (including idCard)
    const validFields = Object.values(newValidation).filter(Boolean).length;
    const calculatedProgress = Math.min(100, (validFields / (delivery === 1 ? 5 : 4)) * 100);
    setProgress(calculatedProgress);
  }, [formData, delivery]);

  const handleSubmit = async () => {
    setTried(true);

    // Check all required fields
    const isFormValid =
      formData.provincia.trim() !== "" &&
      formData.municipio.trim() !== "" &&
      (delivery === 0 || (formData.direccionExacta || "").trim() !== "") &&
      formData.phone.trim() !== "" &&
      /^\d{11}$/.test(formData.ci_cliente);

    if (!isFormValid) {
      setError("Por favor llene todos los campos obligatorios correctamente");
      return;
    }

    setError("");

    try {
      const userData =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("userData") || "{}")
          : {};

      // Get user details from userData
      const name = userData.name || "";
      const apellidos_cliente = `${userData.last1 || ""} ${userData.last2 || ""}`.trim();

      if(delivery === 0){
          formData.direccionExacta = null;
      }

      const orderData = {
        ...formData,
        name_cliente: name,
        last_names: apellidos_cliente,
        cellphone_cliente: formData.phone,
        id_user_action: userData.userId,
        id_user: userData.userId,
        gestor_id: userData.userId,
        delivery,
        total: grandTotal,
        location,
        items: cartItems?.map((item) => ({
          id_product: item.id,
          count: item.count,
          price: item.prices[0][3] || item.prices[0][1],
          currency: item.prices[0][2],
        })),
      };

      console.log('orderData');
      console.log(orderData)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add_order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        },
      );

      const data = await response.json();

      // Save the order response to the global state
      setObject(data);

      //console.log('API Response:', data); // Log the full response

      if (!response.ok) {
        setError(data.message || "Error al comprar");
        return; // Exit early if there's an error
      }

      if (!data || !data.order || !data.order.date) {
        console.error('Unexpected API response structure:', data);
        setError("Formato de respuesta inesperado del servidor");
        return;
      }

      setAmount(0);

      const orderParams = new URLSearchParams({
        date: data.order.date,
        ...(formData.direccionExacta && {
          direccionExacta: `${formData.direccionExacta}, ${formData.municipio}, ${formData.provincia}`,
        }),
        price: grandTotal.toFixed(2),
        currency: "USD",
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

  //console.log(currencies);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user =
          typeof window !== "undefined"
            ? await JSON.parse(localStorage.getItem("userData")!)
            : null;
        const cartItems = await fetchCartItems(user);
        const location = await getLocation();

        setCartItems(user ? cartItems.carrito : {});
        setCurrencies(user ? cartItems.monedas[0].currencys : {});
        setLocation("US");
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  if (cartItems === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600 font-medium">Cargando tu carrito...</div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)] p-4 bg-white">
        <div className="text-center max-w-md p-8 bg-[#f4f4f4] rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-[#022953] mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-6">Aún no has agregado productos a tu carrito. Comienza a explorar nuestros productos y encuentra lo que necesitas.</p>
          <button
            onClick={() => router.push('/products')}
            className="w-full bg-[#022953] text-white font-bold py-3 px-6 rounded hover:bg-opacity-90 transition-colors"
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] justify-center p-4 bg-white">
      <div className="flex flex-col bg-[#f4f4f4] w-120 md:w-1/2 sm:w-2/3 rounded-lg shadow-lg sm:p-10 p-4 gap-4 sm:gap-6">
        <div className="w-full">
          <h1 className="flex font-bold text-xl sm:text-3xl text-[#022953] w-full sm:justify-start justify-center mb-6">
            Resumen del carrito
          </h1>
        </div>
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
        <div className="flex flex-col w-full gap-2 mt-6">
          <div className="flex w-full items-center">
            <span className="flex text-[#9a9a9a]">Subtotal</span>
            <span className="flex ml-auto text-[#022953] text-lg">
              {subtotal.toFixed(2)} {location === "CU" ? "CUP" : "USD"}
            </span>
          </div>
          {delivery === 1 && (
            <div className="flex w-full items-center">
              <div className="flex flex-col">
                <span className="text-[#9a9a9a]">Entrega a domicilio</span>
                <span className="text-xs text-gray-500">*El precio puede variar según la distancia. Nos pondremos en contacto con usted.</span>
              </div>
              <span className="flex ml-auto text-[#022953] text-lg">
                +{deliveryFee.toFixed(2)} {location === "CU" ? "CUP" : "USD"}
              </span>
            </div>
          )}
          <div className="flex w-full items-center pt-2 border-t border-gray-200 mt-2">
            <span className="flex text-[#9a9a9a] font-bold">Total a pagar</span>
            <span className="flex ml-auto text-[#022953] text-2xl font-bold">
              {grandTotal.toFixed(2)} {location === "CU" ? "CUP" : "USD"}
            </span>
          </div>
        </div>
        <hr className="flex h-px border-[#9a9a9a] w-full" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="flex text-[#9a9a9a]">Tú</span>
            <div className="flex items-center gap-4">
              <div className="flex rounded-full bg-[#9a9a9a] w-12 h-12 items-center justify-center text-white p-1">
                <UserRound className="flex w-full h-full" />
              </div>
              <span className="flex text-[#9a9a9a]">
                {typeof window !== "undefined"
                  ? `${JSON.parse(localStorage.getItem("userData") || "{}").name || ""} ${JSON.parse(localStorage.getItem("userData") || "{}").last1 || ""} ${JSON.parse(localStorage.getItem("userData") || "{}").last2 || ""}`
                  : ""}
              </span>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[#9a9a9a]">
              Número de teléfono del receptor
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9+\s-]/g, '');
                  setFormData({ ...formData, phone: value });
                }}
                placeholder="Ej: 55555555 o +53 55555555"
                className={`w-full p-2 rounded-md border ${tried && !validation.phone && formData.phone
                  ? 'border-red-500'
                  : 'border-gray-300'
                  } ${formData.phone ? (validation.phone ? 'border-green-500' : 'border-red-500') : ''}`}
                required
              />
              {formData.phone && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validation.phone ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {tried && !validation.phone && formData.phone && (
              <p className="text-red-500 text-sm">
                Por favor ingrese un número de teléfono válido
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#9a9a9a]">Carnet de identidad del receptor</label>
            <div className="relative">
              <input
                type="text"
                value={formData.ci_cliente || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
                  setFormData({ ...formData, ci_cliente: value });
                }}
                placeholder="Ej: 12345678901"
                className={`w-full p-2 rounded-md border ${tried && !validation.ci_cliente && formData.ci_cliente
                  ? 'border-red-500'
                  : 'border-gray-300'
                  } ${formData.ci_cliente ? (validation.ci_cliente ? 'border-green-500' : 'border-red-500') : ''
                  }`}
                required
              />
              {formData.ci_cliente && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validation.ci_cliente ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {tried && !validation.ci_cliente && formData.ci_cliente && (
              <p className="text-red-500 text-sm">
                Por favor ingrese un carnet de identidad válido
              </p>
            )}
          </div>
        </div>
        {addresses.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="useSavedAddress"
                checked={useMyAddress}
                onChange={() => setUseMyAddress(!useMyAddress)}
                className="h-4 w-4 rounded border-gray-300 text-[#022953] focus:ring-[#022953]"
              />
              <label htmlFor="useSavedAddress" className="text-[#9a9a9a] cursor-pointer">
                Usar una dirección guardada
              </label>
            </div>

            {useMyAddress && (
              <div className="flex flex-col gap-2">
                <label className="text-[#9a9a9a]">Selecciona una dirección:</label>
                <div className="grid gap-2">
                  {addresses.map((address) => (
                    <div 
                      key={address.id} 
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedAddress === address.id 
                          ? 'border-[#022953] bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => {
                        setSelectedAddress(address.id);
                        setFormData(prev => ({
                          ...prev,
                          provincia: address.provincia,
                          municipio: address.municipio,
                          direccionExacta: address.direccion || ''
                        }));
                      }}
                    >
                      <p className="font-medium">{address.direccion}</p>
                      <p className="text-sm">{address.municipio}, {address.provincia}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`flex flex-col gap-4 w-full ${useMyAddress && addresses.length > 0 ? 'hidden' : ''}`}>
          {addresses.length > 0 && (
            <p className="text-sm text-gray-600">O ingresa una dirección manualmente:</p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-[#9a9a9a]">Provincia</label>
            <div className="relative">
              <select
                value={formData.provincia}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    provincia: e.target.value,
                    municipio: "",
                  })
                }
                className={`w-full p-2 rounded-md border ${formData.provincia ? 'border-green-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Seleccione una provincia</option>
                {Object.keys(provinciasCuba).map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
              {formData.provincia && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9a9a9a]">Municipio</label>
            <div className="relative">
              <select
                value={formData.municipio}
                onChange={(e) =>
                  setFormData({ ...formData, municipio: e.target.value })
                }
                className={`w-full p-2 rounded-md border ${formData.municipio ? 'border-green-500' : 'border-gray-300'
                  }`}
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
              {formData.municipio && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Option */}
        <div className="flex flex-col gap-2 mt-4">
          <label className={`flex items-center justify-between ${
            formData.provincia === 'La Habana' ? 'text-[#9a9a9a]' : 'text-gray-400'
          }`}>
            <span className="flex items-center">
              ¿Necesitas entrega a domicilio?
              {formData.provincia !== 'La Habana' && (
                <span className="text-xs ml-2">(Disponible solo en La Habana)</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="deliveryCheckbox"
                checked={delivery === 1}
                disabled={formData.provincia !== 'La Habana'}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setDelivery(isChecked ? 1 : 0);
                  setIsAnimating(true);
                  if (isChecked) {
                    setIsExpanded(true);
                  } else {
                    setFormData(prev => ({ ...prev, direccionExacta: '' }));
                  }
                }}
                className={`h-5 w-5 rounded border-gray-300 text-[#022953] focus:ring-[#022953] ${
                  formData.provincia === 'La Habana' 
                    ? 'cursor-pointer' 
                    : 'cursor-not-allowed opacity-50'
                }`}
              />
              {delivery === 1 && formData.provincia === 'La Habana' && (
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  +${deliveryFee.toFixed(2)} {location === "CU" ? "CUP" : "USD"}
                </span>
              )}
            </div>
          </label>
          
          {delivery === 1 && formData.provincia === 'La Habana' && (
            <div className="text-xs text-gray-500 mt-1">
              *El precio puede variar según la ubicación exacta. Nos pondremos en contacto contigo para confirmar el costo final.
            </div>
          )}
        </div>

        {/* Delivery Address - Only show when using manual address or no address is selected */}
        {(!useMyAddress || selectedAddress === null) && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              delivery === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
            onTransitionEnd={() => {
              if (delivery === 0) {
                setIsExpanded(false);
              }
              setIsAnimating(false);
            }}
            style={{
              visibility: isExpanded || isAnimating ? 'visible' : 'hidden'
            }}
          >
            {isExpanded && (
              <div className="flex flex-col gap-2 w-full pt-2">
                <label className="text-[#9a9a9a]">Dirección exacta</label>
                <div className="relative">
                  <textarea
                    value={formData.direccionExacta || ""}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, direccionExacta: e.target.value }))
                    }
                    required={delivery === 1}
                    placeholder="Escriba su dirección completa aquí (calle, número, entre calles, edificio, apartamento, etc.)"
                    className={`w-full p-2 min-h-20 bg-white placeholder:text-left text-left align-top rounded-md border focus:ring-2 focus:ring-[#022953] focus:border-transparent transition-all duration-200 ${
                      tried && delivery === 1 && !formData.direccionExacta
                        ? 'border-red-500'
                        : formData.direccionExacta
                          ? 'border-green-500'
                          : 'border-gray-300'
                    }`}
                  />
                  {formData.direccionExacta && (
                    <div className="absolute right-3 top-3">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {tried && delivery === 1 && !formData.direccionExacta && (
                  <p className="text-red-500 text-sm">
                    Por favor ingrese una dirección de entrega válida
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {formData.provincia && formData.municipio && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Ubicación seleccionada:</strong> {formData.municipio}, {formData.provincia}
              {delivery === 1 && formData.direccionExacta && (
                <span className="block mt-1">
                  <strong>Dirección de entrega:</strong> {formData.direccionExacta}
                </span>
              )}
            </p>
          </div>
        )}

        <div className="w-full mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen del pedido</h3>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)} {location === "CU" ? "CUP" : "USD"}</span>
            </div>
            {delivery === 1 && (
              <div className="flex justify-between mb-2">
                <span>Envío:</span>
                <span>${deliveryFee.toFixed(2)} {location === "CU" ? "CUP" : "USD"}</span>
              </div>
            )}
            <div className="border-t border-gray-200 my-3"></div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${(subtotal + (delivery === 1 ? deliveryFee : 0)).toFixed(2)} {location === "CU" ? "CUP" : "USD"}</span>
            </div>
          </div>
        </div>

        {/*
        <div className="w-full mt-4 mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progreso del formulario</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#022953] to-[#034078] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        */}

        <div className="hidden w-full h-full bg-blue-500/10 md:p-10 p-4 items-center justify-center text-center md:text-2xl rounded-md text-blue-900">
          Lo sentimos, no se pueden hacer pedidos temporalmente
        </div>

        <div className="flex w-full justify-center">
          <button
            onClick={handleSubmit}
            className="flex w-full md:w-1/2 h-12 bg-[#022953] font-bold text-white items-center justify-center hover:text-lg transition-all duration-300 rounded-md"
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