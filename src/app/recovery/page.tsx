"use client";

{
  /* #022953 */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async function handleRecovery() {
    try {
      const body = JSON.stringify({
        email: email,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recuperar_credenciales_por_correo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        },
      );

      const data = await response.json();

      router.push("/login");

      if (!response.ok) {
        throw new Error(data.message || "Error el procesar la solicitud");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Recuperar contraseña
        </h3>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <Button
          onClick={handleSubmit}
          className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg"
        >
          Recuperar contraseña
        </Button>
        <span className="text-xs sm:text-sm text-gray-600 text-center">
          ¿Recuerdas tu contraseña?{" "}
          <Link href="/login" className="text-[#022953] hover:underline">
            Volver al inicio de sesión
          </Link>
        </span>
      </div>
    </div>
  );
}
