import { create } from "zustand";

interface FiltersState {
  object: any | null;
  setObject: (newObject: any | null) => void;
}

export const useObject = create<FiltersState>((set) => ({
  object: null,
  setObject: (newObject: any | null) => set({ object: newObject }),
}));