import { create } from 'zustand';
import { novaService, NovaConversation, NovaMessage } from '@/services/nova-service';

interface NovaState {
  conversation: NovaConversation | null;
  messages: NovaMessage[];
  isLoading: boolean;
  isTyping: boolean;
  isCrisis: boolean;
  error: string | null;
  
  initializeSession: (spaceId: string) => Promise<void>;
  sendMessage: (spaceId: string, content: string, moodContext?: string, journalContext?: string) => Promise<void>;
  resetCrisis: () => void;
}

export const useNovaStore = create<NovaState>((set, get) => ({
  conversation: null,
  messages: [],
  isLoading: true,
  isTyping: false,
  isCrisis: false,
  error: null,

  initializeSession: async (spaceId: string) => {
    set({ isLoading: true, error: null });
    try {
      let conv = await novaService.getActiveConversation(spaceId);
      if (!conv) {
        conv = await novaService.createConversation(spaceId);
      }
      const messages = await novaService.getMessages(conv.id);
      set({ conversation: conv, messages, isLoading: false });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to initialize session';
      set({ error: msg, isLoading: false });
    }
  },

  sendMessage: async (spaceId: string, content: string, moodContext?: string, journalContext?: string) => {
    const { conversation, messages } = get();
    if (!conversation) return;

    try {
      set({ isTyping: true, error: null });

      const crisisKeywords = ['suicide', 'kill myself', 'hurt myself', 'end it all', 'want to die'];
      const isRegexCrisis = crisisKeywords.some(kw => content.toLowerCase().includes(kw));
      
      if (isRegexCrisis) {
        set({ isCrisis: true, isTyping: false });
        return;
      }

      const userMessage = await novaService.createMessage(conversation.id, 'user', content);
      set({ messages: [...messages, userMessage] });

      const history = messages.slice(-8).map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const res = await fetch('/api/nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history,
          moodContext,
          journalContext
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'API Error');
      }

      const data = await res.json();
      const text = data.text;

      await new Promise(resolve => setTimeout(resolve, 800));

      if (text.includes('[SYSTEM_FLAG_CRISIS]')) {
        set({ isCrisis: true, isTyping: false });
        return;
      }

      const modelMessage = await novaService.createMessage(conversation.id, 'model', text);
      set({ messages: [...get().messages, modelMessage], isTyping: false });
    } catch (error: unknown) {
      console.error("Nova sendMessage error:", error);
      const msg = error instanceof Error ? error.message : 'Failed to send message';
      set({ error: msg, isTyping: false });
    }
  },

  resetCrisis: () => set({ isCrisis: false })
}));
