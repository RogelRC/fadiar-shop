"use client";

{
  /* #022953 */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { form } from "framer-motion/client";

interface FormData {
  ci: string;
  name: string;
  lastname1: string;
  lastname2: string;
  cellphone1: string;
  cellphon2: string;
  address: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

async function handleSubmit(formData: FormData, router: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ci: parseInt(formData.ci),
          cellphone1: parseInt(formData.cellphone1),
          cellphon2: parseInt(formData.cellphon2),
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al registrar");
    }

    router.push(`/verify?email=${encodeURIComponent(formData.email)}`);

    console.log("Registro exitoso");
  } catch (error) {
    console.error(error);
  }
}

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    ci: "",
    name: "",
    lastname1: "",
    lastname2: "",
    cellphone1: "",
    cellphon2: "",
    address: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    type: "Cliente",
  });
  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Registrarse
        </h3>
        <Input
          placeholder="Carnet de identidad"
          value={formData.ci}
          onChange={(e) => setFormData({ ...formData, ci: e.target.value })}
        />
        <div className="flex space-x-4">
          <Input
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Primer apellido"
            value={formData.lastname1}
            onChange={(e) =>
              setFormData({ ...formData, lastname1: e.target.value })
            }
          />
          <Input
            placeholder="Segundo apellido"
            value={formData.lastname2}
            onChange={(e) =>
              setFormData({ ...formData, lastname2: e.target.value })
            }
          />
        </div>
        <div className="flex space-x-4">
          <Input
            placeholder="Celular 1"
            value={formData.cellphone1}
            onChange={(e) =>
              setFormData({ ...formData, cellphone1: e.target.value })
            }
          />
          <Input
            placeholder="Celular 2 (opcional)"
            value={formData.cellphon2}
            onChange={(e) =>
              setFormData({ ...formData, cellphon2: e.target.value })
            }
          />
        </div>
        <Input
          placeholder="Dirección"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <Input
          placeholder="Correo electrónico"
          value={formData.email}
          type="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <Input
          placeholder="Contraseña"
          value={formData.password}
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <Button
          onClick={() => handleSubmit(formData, router)}
          className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg"
        >
          Registrarse
        </Button>
        <span className="text-xs sm:text-sm text-gray-600 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-[#022953] hover:underline">
            Iniciar sesión
          </Link>
        </span>
      </div>
    </div>
  );
}
