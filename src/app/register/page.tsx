"use client";

{
  /* #022953 */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, X, User, Mail, Lock, Loader2 } from "lucide-react";

interface FormData {
  email: string;
  name: string;
  last1: string;
  last2: string;
  password: string;
  confirmPassword: string;
}

interface ValidationState {
  fullName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

async function handleSubmit(formData: any, router: any, setIsSubmitting: (loading: boolean) => void) {
  setIsSubmitting(true);
  try {
    // Separar el nombre completo en nombre y apellidos
    const fullName = formData.fullName.trim();
    const nameParts = fullName.split(' ').filter((part: string) => part.length > 0);
    
    let name = '';
    let last1 = '';
    let last2 = '';
    
    if (nameParts.length >= 1) {
      name = nameParts[0];
    }
    if (nameParts.length >= 2) {
      last1 = nameParts[1];
    }
    if (nameParts.length >= 3) {
      last2 = nameParts[2];
    }
    
    const dataToSend = {
      email: formData.email,
      name: name,
      lastname1: last1,
      lastname2: last2,
      password: formData.password,
      type: formData.type
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      },
    );

    if (!response.ok) {
      console.log(response)
      throw new Error("Error al registrar");
    }

    router.push(`/verify?email=${encodeURIComponent(formData.email)}`);

    console.log("Registro exitoso");
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
}

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    type: "Cliente",
  });

  const [validation, setValidation] = useState<ValidationState>({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Validaciones
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 6;
  };

  const isPasswordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword && password.length > 0;
  };

  const isFullNameValid = (fullName: string) => {
    return fullName.trim().split(' ').filter(part => part.length > 0).length >= 2;
  };

  // Actualizar validaciones y progreso
  useEffect(() => {
    const newValidation = {
      fullName: isFullNameValid(formData.fullName),
      email: isEmailValid(formData.email),
      password: isPasswordValid(formData.password),
      confirmPassword: isPasswordMatch(formData.password, formData.confirmPassword)
    };

    setValidation(newValidation);

    // Calcular progreso
    const validFields = Object.values(newValidation).filter(Boolean).length;
    setProgress((validFields / 4) * 100);
  }, [formData]);

  const isFormValid = Object.values(validation).every(Boolean);

  const getFieldClassName = (isValid: boolean, hasValue: boolean) => {
    if (!hasValue) return "";
    return isValid ? "border-green-500 focus:border-green-500" : "border-red-500 focus:border-red-500";
  };

  return (
    <div className="flex h-full w-full min-h-[100vh] items-center justify-center p-4 bg-gradient-to-br from-[#e7e8e9] to-[#f5f6f7]">
      <div className="flex flex-col bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-[#022953] mb-2">
            Registrarse
          </h3>
          <p className="text-gray-600 text-sm">
            Completa todos los campos para continuar
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progreso del registro</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#022953] to-[#034078] h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="relative mb-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <Input
                placeholder="Nombre y apellidos"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={`pl-10 transition-all duration-200 ${getFieldClassName(validation.fullName, formData.fullName.length > 0)}`}
              />
              {formData.fullName.length > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                  {validation.fullName ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {formData.fullName.length > 0 && !validation.fullName && (
              <p className="text-red-500 text-xs mt-1">
                Ingresa al menos nombre y apellido
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative mb-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <Input
                placeholder="Correo electrónico"
                value={formData.email}
                type="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`pl-10 transition-all duration-200 ${getFieldClassName(validation.email, formData.email.length > 0)}`}
              />
              {formData.email.length > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                  {validation.email ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {formData.email.length > 0 && !validation.email && (
              <p className="text-red-500 text-xs mt-1">
                Ingresa un correo válido
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <Input
                placeholder="Contraseña"
                value={formData.password}
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`pl-10 pr-20 transition-all duration-200 ${getFieldClassName(validation.password, formData.password.length > 0)}`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 z-10">
                {formData.password.length > 0 && (
                  validation.password ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {formData.password.length > 0 && !validation.password && (
              <p className="text-red-500 text-xs mt-1">
                La contraseña debe tener al menos 6 caracteres
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative mb-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <Input
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`pl-10 pr-20 transition-all duration-200 ${getFieldClassName(validation.confirmPassword, formData.confirmPassword.length > 0)}`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 z-10">
                {formData.confirmPassword.length > 0 && (
                  validation.confirmPassword ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {formData.confirmPassword.length > 0 && !validation.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                Las contraseñas no coinciden
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={() => handleSubmit(formData, router, setIsSubmitting)}
          disabled={!isFormValid || isSubmitting}
          className={`w-full h-12 transition-all duration-300 transform ${
            isFormValid 
              ? 'bg-[#022953] hover:bg-[#034078] hover:shadow-lg hover:scale-105' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Registrando...</span>
            </div>
          ) : (
            "Registrarse"
          )}
        </Button>

        {/* Login Link */}
        <span className="text-xs sm:text-sm text-gray-600 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-[#022953] hover:underline font-semibold transition-colors duration-200">
            Iniciar sesión
          </Link>
        </span>
      </div>
    </div>
  );
}