import { create } from 'zustand';
import { moodService, MoodEntry } from '@/services/mood-service';

interface MoodState {
  moods: MoodEntry[];
  isLoading: boolean;
  error: string | null;
  fetchMoods: (spaceId: string) => Promise<void>;
  refreshMoods: (spaceId: string) => Promise<void>;
  addMood: (spaceId: string, date: string, mood: string, note?: string) => Promise<void>;
  deleteMood: (id: string) => Promise<void>;
}

export const useMoodStore = create<MoodState>((set, get) => ({
  moods: [],
  isLoading: false,
  error: null,

  fetchMoods: async (spaceId: string) => {
    set({ isLoading: true, error: null });
    try {
      const moods = await moodService.getMoods(spaceId);
      set({ moods, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch moods';
      set({ error: message, isLoading: false });
    }
  },

  refreshMoods: async (spaceId: string) => {
    try {
      const moods = await moodService.getMoods(spaceId);
      set({ moods });
    } catch (error: unknown) {
      console.error('Failed to refresh moods:', error);
    }
  },

  addMood: async (spaceId: string, date: string, mood: string, note?: string) => {
    try {
      const newEntry = await moodService.createMood(spaceId, date, mood, note);
      // Optimistic-like update by prepending the new entry to the current list
      set((state) => ({ moods: [newEntry, ...state.moods] }));
    } catch (error: unknown) {
      console.error('Failed to add mood:', error);
      throw error;
    }
  },

  deleteMood: async (id: string) => {
    try {
      await moodService.deleteMood(id);
      set((state) => ({ moods: state.moods.filter(m => m.id !== id) }));
    } catch (error: unknown) {
      console.error('Failed to delete mood:', error);
      throw error;
    }
  }
}));
