"use client";

import { User, ShieldUser, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const handleLogout = () => {
  localStorage.removeItem("userData");
  window.dispatchEvent(new Event("userDataChanged"));
};

export default function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verificar si el clic fue fuera del botón y del popover
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="hidden sm:block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="hover:scale-125 duration-300"
      >
        <User />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col absolute right-12 top-16 bg-white rounded-md shadow-lg p-4 w-48 text-[#022953] space-y-4"
          >
            <div className="flex h-full items-center space-x-2 hover:scale-110 transition-all duration-300">
              <ShieldUser />
              <Link href="/account">Mi cuenta</Link>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 hover:scale-110 transition-all duration-300"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Cerrar sesión</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
