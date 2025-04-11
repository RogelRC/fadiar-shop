import { create } from "zustand";

interface filtersState {
  name: string;
  brand: string;
  category: string; // Nueva propiedad
  available: string;
  minPrice: number;
  maxPrice: number;
  setName: (name: string) => void;
  setBrand: (brand: string) => void;
  setCategory: (category: string) => void; // Nuevo setter
  setAvailable: (available: string) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
}

export const useFilters = create<filtersState>((set) => ({
  name: "",
  brand: "",
  category: "", // Inicializar categoría
  available: "",
  minPrice: 0,
  maxPrice: 1000000,
  setName: (name: string) => set({ name }),
  setBrand: (brand: string) => set({ brand }),
  setCategory: (category: string) => set({ category }), // Setter de categoría
  setAvailable: (available: string) => set({ available }),
  setMinPrice: (minPrice: number) => set({ minPrice }),
  setMaxPrice: (maxPrice: number) => set({ maxPrice }),
}));
