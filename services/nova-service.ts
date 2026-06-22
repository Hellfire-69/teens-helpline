import { supabase } from '@/lib/supabase/client';

export const novaService = {
  async getConversations(spaceId: string) {
    // Stub
    return [];
  },
  async sendMessage(spaceId: string, conversationId: string, content: string) {
    // Stub
    return null;
  }
};
