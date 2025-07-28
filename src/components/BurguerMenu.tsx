"use client";

import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/Cart";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useFilters } from "@/store/Filters";

import {
  LogOut,
  User,
  WashingMachine,
  ShoppingCart,
  Info,
  HandHelping,
  Phone,
  House,
  LogIn,
  Package,
  Grid3X3,
} from "lucide-react";

interface Category {
  id: number;
  id_padre: number | null;
  name: string;
  hijos: Category[];
}

const handleLogout = () => {
  localStorage.removeItem("userData");
  window.dispatchEvent(new Event("userDataChanged"));
};

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [categoriesSectionExpanded, setCategoriesSectionExpanded] = useState(false);
  const setAmount = useCart((state) => state.setAmount);
  const { amount } = useCart();
  const [userData, setUserData] = useState<string | null>(null);
  const setCategory = useFilters((state) => state.setCategory);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://app.fadiar.com/api/get_categories_tree");
      if (!response.ok) {
        throw new Error("Error al cargar categorías");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCartItems = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (!userData) {
      console.log("No tengo datos");
      return {};
    }

    try {
      const body = JSON.stringify({
        id_user_action: userData.userId,
        id_user: userData.userId,
        comisiones: false,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/obtener_productos_carrito`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        },
      );

      if (!response.ok) {
        throw new Error("Error al cargar el carrito");
      }

      const data = await response.json();
      //console.log(data);
      //console.log("aaaaaaaaaaaaaaaa");
      setAmount(
        data.carrito.reduce((sum: any, item: any) => sum + item.en_carrito, 0),
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Función para actualizar los datos
    const updateUserData = () => {
      setUserData(localStorage.getItem("userData"));
    };

    // Ejecutar al montar el componente
    updateUserData();

    // Escuchar eventos de almacenamiento (cambios en otras pestañas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userData") {
        updateUserData();
      }
    };

    // Escuchar evento personalizado (cambios en la misma pestaña)
    const handleCustomEvent = () => {
      updateUserData();
    };

    // Agregar listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userDataChanged", handleCustomEvent);

    // Limpiar listeners al desmontar
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataChanged", handleCustomEvent);
    };
  }, []);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (categoryName: string) => {
    setCategory(categoryName);
    setIsOpen(false);
  };

  const renderCategories = (cats: Category[], level: number = 0) => {
    return cats.map((category) => (
      <div key={category.id} className="w-full">
        <div 
          className={`flex w-full space-x-2 items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors ${
            level > 0 ? 'ml-4' : ''
          }`}
          onClick={() => {
            if (category.hijos && category.hijos.length > 0) {
              toggleCategory(category.id);
            } else {
              handleCategoryClick(category.name);
            }
          }}
        >
          {category.hijos && category.hijos.length > 0 ? (
            <span className="w-4 h-4">
              {expandedCategories.includes(category.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          ) : (
            <span className="w-4 h-4"></span>
          )}
          <span className="flex-1">{category.name}</span>
        </div>
        
        {category.hijos && category.hijos.length > 0 && expandedCategories.includes(category.id) && (
          <div className="ml-4 border-l border-gray-200">
            {renderCategories(category.hijos, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {userData && (
        <Link
          href="/checkout"
          className="relative w-6 h-6 sm:hidden hover:scale-125 duration-300"
        >
          <ShoppingCart />
          {amount > 0 && (
            <div className="absolute -right-2 -top-4 px-1 bg-red-300 text-red-700 rounded-md">
              {amount}
            </div>
          )}
        </Link>
      )}
      <div className="flex sm:hidden">
        <button
          className="w-6 h-6 hover:scale-125 duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col fixed top-0 right-0 bg-white rounded-l-lg h-screen w-[80vw] p-4 text-[#022953] space-y-4 text-base z-50 overflow-y-auto"
            >
              <div className="flex w-full">
                <h3 className="text-xl font-bold">Menú</h3>
                <button
                  className="ml-auto w-6 h-6"
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                </button>
              </div>
              <hr className="border-1 border-gray-200" />
              <Link
                href="/"
                className="flex w-full space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <span>
                  <House />
                </span>
                <span>Inicio</span>
              </Link>
              <hr className="border-1 border-gray-200" />
              
              {userData && (
                <>
                  <Link
                    href="/"
                    className="flex w-full space-x-2"
                    onClick={() => handleLogout()}
                  >
                    <span>
                      <LogOut />
                    </span>
                    <span>Cerrar sesión</span>
                  </Link>
                  <Link
                    href="/account"
                    className="flex w-full space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>
                      <User />
                    </span>
                    <span>Mi cuenta</span>
                  </Link>
                  <Link
                    href={`/record?id=${
                      JSON.parse(localStorage.getItem("userData") || "{}")
                        .userId || null
                    }`}
                    className="flex w-full space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>
                      <Package />
                    </span>
                    <span>Mis pedidos</span>
                  </Link>
                </>
              )}
              {!userData && (
                <Link
                  href="/login"
                  className="flex w-full space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <LogIn />
                  </span>
                  <span>Iniciar sesión</span>
                </Link>
              )}
              <hr className="border-1 border-gray-200" />
              <Link
                href="/products"
                className="flex w-full space-x-2"
                onClick={() => {
                  setIsOpen(false);
                  setCategory("");
                }}
              >
                <span>
                  <WashingMachine />
                </span>
                <span>Productos</span>
              </Link>
              
              {/* Sección de Categorías Expandible */}
              <div 
                className="flex w-full space-x-2 items-center font-semibold text-[#022953] cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setCategoriesSectionExpanded(!categoriesSectionExpanded)}
              >
                <span>
                  <Grid3X3 />
                </span>
                <span className="flex-1">Categorías</span>
                <span className="w-4 h-4">
                  {categoriesSectionExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              </div>
              
              <AnimatePresence>
                {categoriesSectionExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1 overflow-hidden"
                  >
                    {renderCategories(categories)}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {userData && (
                <Link
                  href="/checkout"
                  className="flex w-full space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <ShoppingCart />
                  </span>
                  <span>Carrito</span>
                </Link>
              )}
              {/*
                <hr className="border-1 border-gray-200" />
                <Link
                  href="/about"
                  className="flex w-full space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <Info />
                  </span>
                  <span>Sobre nosotros</span>
                </Link>
                <Link
                  href="/help"
                  className="flex w-full space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <HandHelping />
                  </span>
                  <span>Ayuda</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex w-full space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <Phone />
                  </span>
                  <span>Contáctenos</span>
                </Link> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
