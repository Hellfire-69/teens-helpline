import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

export type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];

export const journalService = {
  async getEntries(spaceId: string): Promise<JournalEntry[]> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('space_id', spaceId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }

    return data || [];
  },

  async getEntry(spaceId: string, id: string): Promise<JournalEntry | null> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('space_id', spaceId)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('Error fetching journal entry:', error);
      throw error;
    }

    return data;
  },

  async createEntry(spaceId: string, title: string, content: string): Promise<JournalEntry> {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({ space_id: spaceId, title, content })
      .select()
      .single();

    if (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }

    return data;
  },

  async updateEntry(spaceId: string, id: string, title: string, content: string): Promise<JournalEntry> {
    const { data, error } = await supabase
      .from('journal_entries')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('space_id', spaceId)
      .select()
      .single();

    if (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }

    return data;
  },

  async deleteEntry(spaceId: string, id: string): Promise<void> {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)
      .eq('space_id', spaceId);

    if (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }
};
