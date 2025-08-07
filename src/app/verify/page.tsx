"use client";

import { Input } from "@/components/ui/input";
import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

async function handleSubmit(email: string | null, code: string, router: any, setVerificationMessage: (message: string) => void) {
  if (!email) {
    console.error("Email no encontrado en la URL");
    setVerificationMessage("❌ Error: Email no encontrado en la URL");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/email_verification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.message || "Error al verificar la cuenta";
      setVerificationMessage(`❌ ${errorMessage}`);
      return;
    }

    // Si la verificación es exitosa, autenticar automáticamente
    if (data.login_info) {
      setVerificationMessage("✅ Cuenta verificada exitosamente. Redirigiendo...");
      
      // Guardar los datos del usuario en localStorage
      localStorage.setItem("userData", JSON.stringify(data.login_info));
      
      // Disparar evento para actualizar el estado global
      window.dispatchEvent(new Event("userDataChanged"));
      
      // Pequeño delay para mostrar el mensaje de éxito
      setTimeout(() => {
        router.push("/products");
      }, 1500);
    } else {
      // Si no hay datos de login, redirigir al login
      setVerificationMessage("⚠️ Verificación exitosa pero sin datos de login. Redirigiendo al login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  } catch (error) {
    console.error(error);
    setVerificationMessage("❌ Error de conexión. Verifica tu conexión a internet.");
  }
}

async function handleResendCode(email: string | null, setResendMessage: (message: string) => void) {
  if (!email) {
    console.error("Email no encontrado en la URL");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/resend_verification_email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al reenviar el código");
    }

    setResendMessage("✅ Código reenviado exitosamente. Revisa tu correo electrónico.");
  } catch (error) {
    console.error(error);
    setResendMessage("❌ Error al reenviar el código. Intenta nuevamente.");
  }
}

function VerificationForm() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Solo permitir un carácter por campo
    
    // Solo permitir caracteres alfanuméricos
    if (!/^[a-zA-Z0-9]$/.test(value) && value !== "") return;
    
    const newCode = [...code];
    newCode[index] = value.toUpperCase(); // Convertir a mayúsculas para consistencia
    setCode(newCode);

    // Mover al siguiente campo si se ingresó un carácter
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Verificar si el código está completo y enviar automáticamente
    const updatedCode = [...newCode];
    if (updatedCode.every(char => char !== "") && updatedCode.join("").length === 6) {
      setTimeout(() => {
        handleSubmitClick();
      }, 100); // Pequeño delay para asegurar que el estado se actualice
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Si el campo está vacío y se presiona backspace, ir al campo anterior
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    
    // Extraer solo los primeros 6 caracteres alfanuméricos del texto pegado
    const alphanumeric = pastedData.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6);
    
    if (alphanumeric.length === 6) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = alphanumeric[i] || "";
      }
      setCode(newCode);
      inputRefs.current[5]?.focus();
      
      // Enviar automáticamente después de pegar el código completo
      setTimeout(() => {
        handleSubmitClick();
      }, 100);
    }
  };

  const handleSubmitClick = async () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      setIsLoading(true);
      setVerificationMessage(""); // Limpiar mensajes anteriores
      await handleSubmit(email, fullCode, router, setVerificationMessage);
      setIsLoading(false);
    }
  };

  // Efecto para manejar el countdown
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendClick = async () => {
    setIsResending(true);
    setResendMessage("");
    await handleResendCode(email, setResendMessage);
    setIsResending(false);
    setResendCountdown(300); // 5 minutos = 300 segundos
  };

  return (
    <div className="flex h-full w-full min-h-[100vh] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-[#022953]">
            Verificar cuenta
          </h3>
          <div className="text-gray-600 space-y-2">
            <p className="text-sm">
              Hemos enviado un código de verificación de 6 dígitos a:
            </p>
            <p className="font-medium text-[#022953]">{email}</p>
            <p className="text-xs text-gray-500">
              Revisa tu bandeja de entrada y spam. El código expira en 10 minutos.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 text-center">
            Ingresa el código de verificación
          </label>
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 focus:border-[#022953] focus:ring-2 focus:ring-[#022953] focus:ring-opacity-50"
                placeholder=""
              />
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg disabled:opacity-50"
          onClick={handleSubmitClick}
          disabled={!email || code.join("").length !== 6 || isLoading}
        >
          {isLoading ? "Verificando..." : "Verificar cuenta"}
        </Button>

        <div className="text-center space-y-2">
          {verificationMessage && (
            <div className={`text-sm p-3 rounded-md ${
              verificationMessage.includes("✅") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : verificationMessage.includes("⚠️")
                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {verificationMessage}
            </div>
          )}
          
          {resendMessage && (
            <div className={`text-sm p-3 rounded-md ${
              resendMessage.includes("✅") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {resendMessage}
            </div>
          )}
          
          <p className="text-xs text-gray-500">
            ¿No recibiste el código?{" "}
            <button 
              className="text-[#022953] hover:underline font-medium disabled:opacity-50"
              onClick={handleResendClick}
              disabled={isResending || resendCountdown > 0}
            >
              {isResending 
                ? "Reenviando..." 
                : resendCountdown > 0 
                  ? `Reenviar en ${formatCountdown(resendCountdown)}`
                  : "Reenviar código"
              }
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <VerificationForm />
    </Suspense>
  );
}
