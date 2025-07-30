"use client";

import { Input } from "@/components/ui/input";
import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

async function handleSubmit(email: string | null, code: string, router: any) {
  if (!email) {
    console.error("Email no encontrado en la URL");
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

    console.log(response);

    if (!response.ok) throw new Error("Error al verificar la cuenta");
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
}

function VerificationForm() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Solo permitir un dígito por campo
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Mover al siguiente campo si se ingresó un dígito
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
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
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedData[i] || "";
      }
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmitClick = async () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      setIsLoading(true);
      await handleSubmit(email, fullCode, router);
      setIsLoading(false);
    }
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
                inputMode="numeric"
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

        <div className="text-center">
          <p className="text-xs text-gray-500">
            ¿No recibiste el código?{" "}
            <button className="text-[#022953] hover:underline font-medium">
              Reenviar código
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
