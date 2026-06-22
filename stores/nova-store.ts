import { create } from 'zustand';

interface NovaState {
  isActive: boolean;
  setIsActive: (status: boolean) => void;
}

export const useNovaStore = create<NovaState>((set) => ({
  isActive: false,
  setIsActive: (status) => set({ isActive: status }),
}));
