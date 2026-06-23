import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

export type MoodEntry = Database['public']['Tables']['mood_entries']['Row'];

export const moodService = {
  async getMoods(spaceId: string): Promise<MoodEntry[]> {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('space_id', spaceId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching moods:', error);
      throw error;
    }

    return data || [];
  },

  async createMood(spaceId: string, date: string, mood: string, note?: string): Promise<MoodEntry> {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert({ space_id: spaceId, date, mood, note: note || null })
      .select()
      .single();

    if (error) {
      console.error('Error creating mood:', error);
      throw error;
    }

    return data;
  },

  async deleteMood(id: string): Promise<void> {
    const { error } = await supabase
      .from('mood_entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting mood:', error);
      throw error;
    }
  }
};
