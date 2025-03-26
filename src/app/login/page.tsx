"use client";

{
  /* #022953 */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginProps {
  identifier: string;
  password: string;
}

async function handleLogin(loginProps: LoginProps, router: any) {
  try {
    const { identifier, password } = loginProps;
    const isEmail: boolean = identifier.includes("@");

    const body = JSON.stringify({
      [isEmail ? "email" : "username"]: identifier,
      password,
      version_web: "999.999.999",
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const userData = await response.json();

    if (!response.ok) {
      throw new Error(userData?.message || "Error al iniciar sesión");
    }

    console.log(userData);

    // 🔹 Redirigir si necesita validación
    if (userData?.necesita_validacion) {
      router.push("/validate");
      return;
    }

    // 🔹 Redirigir a otra página tras el login (ejemplo: home)

    localStorage.setItem("userData", JSON.stringify(userData));
    router.push("/products");
  } catch (error) {
    throw error;
  }
}

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Iniciar sesión
        </h3>
        <Input
          placeholder="Usuario o correo electrónico"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg"
          onClick={() => handleLogin({ identifier, password }, router)}
        >
          Iniciar sesión
        </Button>
        <span className="text-xs sm:text-sm text-gray-600 text-center">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-[#022953] hover:underline">
            Regístrate ahora
          </Link>
        </span>
        <span className="text-xs sm:text-sm text-gray-600 text-center">
          <Link href="/recovery" className="text-[#022953] hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </span>
      </div>
    </div>
  );
}
