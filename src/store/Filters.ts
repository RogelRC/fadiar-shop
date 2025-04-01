import { create } from "zustand";

interface filtersState {
  name: string;
  brand: string;
  available: number;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  setName: (name: string) => void;
  setBrand: (brand: string) => void;
  setAvailable: (available: number) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setSortBy: (sortBy: string) => void;
}

export const useFilters = create<filtersState>((set, get) => ({
  name: "",
  brand: "",
  available: 0,
  minPrice: 0,
  maxPrice: 0,
  sortBy: "availability",
  setName: (name: string) => set({ name }),
  setBrand: (brand: string) => set({ brand }),
  setAvailable: (available: number) => set({ available }),
  setMinPrice: (minPrice: number) => set({ minPrice }),
  setMaxPrice: (maxPrice: number) => set({ maxPrice }),
  setSortBy: (sortBy: string) => set({ sortBy }),
}));
