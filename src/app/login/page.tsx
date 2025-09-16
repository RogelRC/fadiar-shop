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

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(loginProps: LoginProps, router: any) {
    setIsLoading(true);
    setError("");
    
    try {
      const { identifier, password } = loginProps;
      
      // Validaciones básicas
      if (!identifier.trim()) {
        setError("Por favor ingresa tu correo electrónico");
        setIsLoading(false);
        return;
      }
      
      if (!password.trim()) {
        setError("Por favor ingresa tu contraseña");
        setIsLoading(false);
        return;
      }

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
        console.log(response);
        console.log(response.body);
        
        // Manejo específico de errores según el código de respuesta
        if (response.status === 401) {
          setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
        } else if (response.status === 404) {
          setError("Usuario no encontrado. Verifica tu correo electrónico.");
        } else if (response.status === 422) {
          setError("Datos de entrada inválidos. Verifica el formato de tu correo.");
        } else if (response.status >= 500) {
          setError("Error del servidor. Intenta nuevamente en unos minutos.");
        } else {
          // Intentar obtener mensaje específico del servidor
          const errorMessage = userData?.message || userData?.error || "Error al autenticarse";
          setError(errorMessage);
        }
        
        setIsLoading(false);
        return;
      }

      //console.log(userData);

      // 🔹 Redirigir si necesita validación
      if (userData?.necesita_validacion) {
        router.push("/validate");
        return;
      }

      // 🔹 Redirigir a otra página tras el login (ejemplo: home)
      setError("");
      localStorage.setItem("userData", JSON.stringify(userData));
      window.dispatchEvent(new Event("userDataChanged"));

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Error de conexión. Verifica tu conexión a internet e intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ identifier, password }, router);
  };

  return (
    <div className="flex h-full w-full min-h-[100vh] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Iniciar sesión
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Correo electrónico"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isLoading}
              className={error && !identifier.trim() ? "border-red-500 focus:border-red-500" : ""}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={error && !password.trim() ? "border-red-500 focus:border-red-500" : ""}
            />
          </div>
          
          {error && (
            <div className="w-full bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 text-red-400 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-sm text-red-700 font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </div>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>
        
        <div className="space-y-2">
          <span className="text-xs sm:text-sm text-gray-600 text-center block">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-[#022953] hover:underline">
              Regístrate ahora
            </Link>
          </span>
          <span className="text-xs sm:text-sm text-gray-600 text-center block">
            <Link href="/recovery" className="text-[#022953] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </span>
          <span className="text-xs sm:text-sm text-gray-600 text-center block">
            <Link href="/verify" className="text-[#022953] hover:underline">
              ¿No has verificado tu cuenta?
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}