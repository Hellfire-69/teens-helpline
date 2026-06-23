import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IdentityState {
  spaceId: string | null;
  hasCompletedOnboarding: boolean;
  setSpaceId: (id: string | null) => void;
  completeOnboarding: () => void;
  initializeSpace: () => void;
  clearSpace: () => void;
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set, get) => ({
      spaceId: null,
      hasCompletedOnboarding: false,
      setSpaceId: (id) => set({ spaceId: id }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      initializeSpace: () => {
        if (!get().spaceId) {
          set({ spaceId: crypto.randomUUID() });
        }
      },
      clearSpace: () => set({ spaceId: null, hasCompletedOnboarding: false }),
    }),
    {
      name: 'teens-helpline-identity',
    }
  )
);
