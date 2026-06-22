import { create } from 'zustand';

interface IdentityState {
  spaceId: string | null;
  setSpaceId: (id: string | null) => void;
}

export const useIdentityStore = create<IdentityState>((set) => ({
  spaceId: null,
  setSpaceId: (id) => set({ spaceId: id }),
}));
