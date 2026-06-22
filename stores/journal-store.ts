import { create } from 'zustand';

interface JournalState {
  isWriting: boolean;
  setIsWriting: (status: boolean) => void;
}

export const useJournalStore = create<JournalState>((set) => ({
  isWriting: false,
  setIsWriting: (status) => set({ isWriting: status }),
}));
