import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'teens-helpline-settings',
    }
  )
);
