"use client";

import { Input } from "@/components/ui/input";
import { useState, Suspense } from "react";
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

    if (!response.ok) throw new Error("Error al verificar la cuenta");
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
}

function VerificationForm() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex h-full w-full min-h-[100vh] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Verificar cuenta
        </h3>
        <Input
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg"
          onClick={() => handleSubmit(email, code, router)}
          disabled={!email}
        >
          Verificar
        </Button>
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
