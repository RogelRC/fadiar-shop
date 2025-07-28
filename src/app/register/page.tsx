"use client";

{
  /* #022953 */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
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
        body: JSON.stringify(formData),
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
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    type: "Cliente",
  });
  return (
    <div className="flex h-full w-full min-h-[100vh] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Registrarse
        </h3>
        <Input
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <Input
          placeholder="Correo electrónico"
          value={formData.email}
          type="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
