import { create } from "zustand";

interface filtersState {
  amount: number;
  setAmount: (amount: number) => void;
}

export const useCart = create<filtersState>((set, get) => ({
  amount: 0,
  setAmount: (amount: number) => set({ amount }),
}));
