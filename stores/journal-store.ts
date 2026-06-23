import { create } from 'zustand';
import { journalService, JournalEntry } from '@/services/journal-service';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface JournalState {
  entries: JournalEntry[];
  currentEntry: JournalEntry | null;
  isLoading: boolean;
  saveStatus: SaveStatus;
  error: string | null;
  
  fetchEntries: (spaceId: string) => Promise<void>;
  fetchEntry: (spaceId: string, id: string) => Promise<void>;
  clearCurrentEntry: () => void;
  
  saveEntry: (spaceId: string, id: string | null, title: string, content: string) => Promise<string | null>;
  deleteEntry: (spaceId: string, id: string) => Promise<void>;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  currentEntry: null,
  isLoading: false,
  saveStatus: 'idle',
  error: null,

  fetchEntries: async (spaceId: string) => {
    set({ isLoading: true, error: null });
    try {
      const entries = await journalService.getEntries(spaceId);
      set({ entries, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch journals';
      set({ error: message, isLoading: false });
    }
  },

  fetchEntry: async (spaceId: string, id: string) => {
    set({ isLoading: true, error: null, currentEntry: null });
    try {
      const entry = await journalService.getEntry(spaceId, id);
      set({ currentEntry: entry, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch journal';
      set({ error: message, isLoading: false });
    }
  },

  clearCurrentEntry: () => set({ currentEntry: null, saveStatus: 'idle', error: null }),

  saveEntry: async (spaceId: string, id: string | null, title: string, content: string) => {
    set({ saveStatus: 'saving', error: null });
    try {
      let savedEntry: JournalEntry;
      if (id) {
        savedEntry = await journalService.updateEntry(spaceId, id, title, content);
      } else {
        savedEntry = await journalService.createEntry(spaceId, title, content);
      }
      
      set((state) => {
        const newEntries = id 
          ? state.entries.map(e => e.id === id ? savedEntry : e)
          : [savedEntry, ...state.entries];
          
        return {
          currentEntry: savedEntry,
          entries: newEntries,
          saveStatus: 'saved'
        };
      });

      setTimeout(() => {
        if (get().saveStatus === 'saved') {
          set({ saveStatus: 'idle' });
        }
      }, 3000);

      return savedEntry.id;
    } catch (error: unknown) {
      console.error('Failed to save journal:', error);
      const message = error instanceof Error ? error.message : 'Failed to save journal';
      set({ saveStatus: 'error', error: message });
      return null;
    }
  },

  deleteEntry: async (spaceId: string, id: string) => {
    try {
      await journalService.deleteEntry(spaceId, id);
      set((state) => ({ 
        entries: state.entries.filter(e => e.id !== id),
        currentEntry: state.currentEntry?.id === id ? null : state.currentEntry
      }));
    } catch (error: unknown) {
      console.error('Failed to delete journal:', error);
      throw error;
    }
  }
}));
