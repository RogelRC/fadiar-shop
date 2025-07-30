"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { LogIn, X } from "lucide-react";
import Link from "next/link";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con difuminado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative">
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Contenido */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#022953] rounded-full flex items-center justify-center mx-auto">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#022953]">
                    Inicia sesión
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Necesitas iniciar sesión para agregar productos al carrito
                  </p>
                </div>
                
                <div className="space-y-3 pt-4">
                  <Link href="/login" onClick={onClose}>
                    <Button className="w-full bg-[#022953] hover:bg-[#034078]">
                      Iniciar sesión
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 