"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
  id: string;
  name: string;
  last1: string;
  last2: string;
  email: string;
  type: string;
  phone?: string;
}

interface Address {
  id: number;
  provincia: string | number;
  municipio: string;
  direccion: string | number;
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const EyeIcon = ({ show }: { show: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    {show ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    )}
  </svg>
);

export default function AccountPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
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
    "Artemisa": [
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
    "Mayabeque": [
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
    "Matanzas": [
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
    "Cienfuegos": [
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
    "Camagüey": [
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
    "Holguín": [
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
    "Granma": [
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
    "Guantánamo": [
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
  };

  const [formData, setFormData] = useState({
    provincia: '',
    municipio: '',
    direccion: ''
  });
  
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [formError, setFormError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      router.push("/login");
      return;
    }

    try {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      fetchUserAddresses();
    } catch (err) {
      console.error("Error parsing user data:", err);
      router.push("/login");
    }
  }, [router]);

  const fetchUserAddresses = async () => {
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

      if (response.ok) {
        const data = await response.json();
        // The API returns addresses in data.listado
        setAddresses(Array.isArray(data?.listado) ? data.listado : []);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'provincia') {
      // When province changes, update municipios and reset municipio selection
      const selectedProvincia = value as keyof typeof provinciasCuba;
      const newMunicipios = selectedProvincia ? provinciasCuba[selectedProvincia] || [] : [];
      setMunicipios(newMunicipios);
      
      setFormData(prev => ({
        ...prev,
        provincia: value,
        municipio: '' // Reset municipio when province changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.provincia || !formData.municipio || !formData.direccion) {
      setFormError('Todos los campos son obligatorios');
      return;
    }

    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        router.push("/login");
        return;
      }
      
      const userData = JSON.parse(storedUserData);

      const endpoint = editingAddress 
        ? 'editar-direccion-domicilio-cliente'
        : 'crear-direccion-domicilio-cliente';
      
      const requestBody: any = {
        id_user: userData.userId,
        provincia: formData.provincia,
        municipio: formData.municipio,
        direccion: formData.direccion
      };
      
      if (editingAddress) {
        requestBody.id_direccion = editingAddress.id;
      }

      console.log(requestBody);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la dirección');
      }

      // Refresh addresses
      await fetchUserAddresses();
      
      // Reset form
      setFormData({ provincia: '', municipio: '', direccion: '' });
      setShowAddressForm(false);
      setEditingAddress(null);
      
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Error al guardar la dirección');
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    const provincia = String(address.provincia);
    setFormData({
      provincia,
      municipio: String(address.municipio),
      direccion: String(address.direccion)
    });
    
    // Update municipios based on the selected province
    if (provincia && provinciasCuba[provincia as keyof typeof provinciasCuba]) {
      setMunicipios(provinciasCuba[provincia as keyof typeof provinciasCuba]);
    }
    
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta dirección?')) return;
    
    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        router.push("/login");
        return;
      }
      
      const userData = JSON.parse(storedUserData);

      console.log(id);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eliminar-direccion-domicilio-cliente`, {
        headers:{
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id_direccion: id
        })
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la dirección');
      }

      // Refresh addresses
      if (userData) {
        await fetchUserAddresses();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Error al eliminar la dirección');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    try {
      if (!userData) return;

      const form = new FormData();
      form.append("name", userData.name);
      form.append("lastname1", userData.last1);
      form.append("lastname2", userData.last2);
      form.append("current_password", currentPassword);
      form.append("new_password", newPassword);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/changePassword`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cambiar contraseña");
      }

      setNewPassword("");
      setConfirmNewPassword("");
      setChangingPassword(false);
      alert("¡Contraseña actualizada!");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Error");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#022953] mb-8">
          Mi Cuenta - Fadiar
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sección de Información de Usuario */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Información de usuario
              </h3>
              <AnimatePresence mode="wait">
                <motion.dl
                  key="displayInfo"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  className="space-y-4"
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Nombre completo
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {userData.name} {userData.last1} {userData.last2}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Correo electrónico
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {userData.email}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Teléfono
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {userData.phone && parseInt(userData.phone) >= 0
                        ? userData.phone
                        : "No asignado"}
                    </dd>
                  </div>
                </motion.dl>
              </AnimatePresence>
            </div>

            {/* Sección de Seguridad */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Seguridad
              </h3>
              <div className="space-y-4">
                {changingPassword ? (
                  <AnimatePresence mode="wait">
                    <motion.form
                      key="passwordForm"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={containerVariants}
                      onSubmit={handlePasswordChange}
                      className="space-y-4"
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Contraseña actual
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#022953] pr-10"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <EyeIcon show={showCurrentPassword} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nueva contraseña
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#022953] pr-10"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <EyeIcon show={showNewPassword} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Confirmar nueva contraseña
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmNewPassword ? "text" : "password"}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#022953] pr-10"
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmNewPassword(!showConfirmNewPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <EyeIcon show={showConfirmNewPassword} />
                          </button>
                        </div>
                      </div>

                      {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                      )}

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-[#022953] text-white py-2 px-4 rounded-md hover:bg-[#011a3a] transition-colors"
                        >
                          Guardar cambios
                        </button>
                        <button
                          type="button"
                          onClick={() => setChangingPassword(false)}
                          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </motion.form>
                  </AnimatePresence>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="securityInfo"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={containerVariants}
                      className="space-y-4"
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => setChangingPassword(true)}
                        className="w-full text-left p-3 rounded-md bg-[#022953] text-white hover:bg-[#011a3a] transition-colors"
                      >
                        Cambiar contraseña
                      </button>

                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800">
                          Datos de seguridad
                        </h4>
                        <dl className="mt-2 space-y-2">
                          <div>
                            <dt className="text-xs font-medium text-blue-700">
                              Nombre completo
                            </dt>
                            <dd className="text-sm text-blue-900">
                              {userData.name} {userData.last1} {userData.last2}
                            </dd>
                          </div>
                          {userData.email && (
                            <div>
                              <dt className="text-xs font-medium text-blue-700">
                                Correo
                              </dt>
                              <dd className="text-sm text-blue-900">
                                {userData.email}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
          
          {/* Sección de Direcciones */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Mis Direcciones</h3>
              <button
                onClick={() => {
                  setShowAddressForm(!showAddressForm);
                  if (showAddressForm) {
                    setEditingAddress(null);
                    setFormData({ provincia: '', municipio: '', direccion: '' });
                  }
                }}
                className="bg-[#022953] text-white py-2 px-4 rounded-md hover:bg-[#011a3a] transition-colors text-sm"
              >
                {showAddressForm ? 'Cancelar' : 'Agregar Dirección'}
              </button>
            </div>

            {showAddressForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-md font-medium mb-4">
                    {editingAddress ? 'Editar Dirección' : 'Nueva Dirección'}
                  </h4>
                  
                  {formError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                      {formError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmitAddress} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Provincia *
                      </label>
                      <select
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#022953] bg-white"
                        required
                      >
                        <option value="">Seleccione una provincia</option>
                        {Object.keys(provinciasCuba).map((provincia) => (
                          <option key={provincia} value={provincia}>
                            {provincia}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Municipio *
                      </label>
                      <select
                        name="municipio"
                        value={formData.municipio}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#022953] bg-white"
                        required
                        disabled={!formData.provincia}
                      >
                        <option value="">Seleccione un municipio</option>
                        {municipios.map((municipio) => (
                          <option key={municipio} value={municipio}>
                            {municipio}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#022953]"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                          setFormData({ provincia: '', municipio: '', direccion: '' });
                        }}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm text-white bg-[#022953] rounded-md hover:bg-[#011a3a]"
                      >
                        {editingAddress ? 'Actualizar' : 'Agregar'} Dirección
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {isLoading ? (
              <div className="text-center py-8">Cargando direcciones...</div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No tienes direcciones guardadas. Agrega una para comenzar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="p-1 text-gray-600 hover:text-[#022953]"
                        title="Editar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-1 text-gray-600 hover:text-red-600"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <h4 className="font-medium text-gray-800 mt-2">
                      {String(address.provincia)}, {String(address.municipio)}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{String(address.direccion)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
