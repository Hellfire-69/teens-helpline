import { create } from 'zustand';

interface MoodState {
  currentMood: string | null;
  setCurrentMood: (mood: string) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: null,
  setCurrentMood: (mood) => set({ currentMood: mood }),
}));
