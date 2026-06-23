import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

export type NovaConversation = Database['public']['Tables']['nova_conversations']['Row'];
export type NovaMessage = Database['public']['Tables']['nova_messages']['Row'];

export const novaService = {
  async getActiveConversation(spaceId: string): Promise<NovaConversation | null> {
    const { data, error } = await supabase
      .from('nova_conversations')
      .select('*')
      .eq('space_id', spaceId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    const lastUpdate = new Date(data.updated_at).getTime();
    const now = new Date().getTime();
    if (now - lastUpdate > 2 * 60 * 60 * 1000) {
      return null;
    }

    return data;
  },

  async createConversation(spaceId: string): Promise<NovaConversation> {
    const { data, error } = await supabase
      .from('nova_conversations')
      .insert({ space_id: spaceId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMessages(conversationId: string): Promise<NovaMessage[]> {
    const { data, error } = await supabase
      .from('nova_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createMessage(conversationId: string, role: string, content: string): Promise<NovaMessage> {
    const { data, error } = await supabase
      .from('nova_messages')
      .insert({ conversation_id: conversationId, role, content })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('nova_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return data;
  }
};
