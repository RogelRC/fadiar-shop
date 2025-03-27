"use client";

{
  /* #022953 */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

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
  type: "Cliente",
});

export default function Login() {
  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Registrarse
        </h3>
        <Input placeholder="Carnet de identidad" />
        <div className="flex space-x-4">
          <Input placeholder="Nombre" />
          <Input placeholder="Primer apellido" />
          <Input placeholder="Segundo apellido" />
        </div>
        <div className="flex space-x-4">
          <Input placeholder="Celular 1" />
          <Input placeholder="Celular 2 (opcional)" />
        </div>
        <Input placeholder="Dirección" />
        <Input placeholder="Correo electrónico" />
        <Input placeholder="Nombre de usuario" />
        <Input placeholder="Contraseña" />
        <Input placeholder="Confirmar contraseña" />
        <Button className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg">
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
