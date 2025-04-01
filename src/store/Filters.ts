import { create } from "zustand";

interface filtersState {
  name: string;
  brand: string;
  available: string;
  minPrice: number;
  maxPrice: number;
  setName: (name: string) => void;
  setBrand: (brand: string) => void;
  setAvailable: (available: string) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
}

export const useFilters = create<filtersState>((set, get) => ({
  name: "",
  brand: "",
  available: "",
  minPrice: 0,
  maxPrice: 1000000,
  setName: (name: string) => set({ name }),
  setBrand: (brand: string) => set({ brand }),
  setAvailable: (available: string) => set({ available }),
  setMinPrice: (minPrice: number) => set({ minPrice }),
  setMaxPrice: (maxPrice: number) => set({ maxPrice }),
}));
