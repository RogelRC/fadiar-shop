{
  /* #022953 */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-full w-full min-h-[calc(100vh-88px)] items-center justify-center p-4 bg-[#e7e8e9]">
      <div className="flex flex-col bg-white w-120 rounded-lg shadow-lg p-6 space-y-6">
        <h3 className="text-center text-3xl font-bold text-[#022953]">
          Recuperar contraseña
        </h3>
        <Input placeholder="Correo electrónico" />
        <Button className="w-full bg-[#022953] hover:bg-[#034078] hover:shadow-lg">
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
