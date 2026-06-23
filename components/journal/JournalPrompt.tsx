"use client";

import React, { useState, useEffect } from 'react';
import { useMoodStore } from '@/stores/mood-store';
import { useIdentityStore } from '@/stores/identity-store';
import { Sparkles, X } from 'lucide-react';

export const JournalPrompt: React.FC = () => {
  const { spaceId } = useIdentityStore();
  const { moods, fetchMoods } = useMoodStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (spaceId && moods.length === 0) {
      fetchMoods(spaceId);
    }
  }, [spaceId, moods.length, fetchMoods]);

  useEffect(() => {
    if (moods.length > 0) {
      const latestMood = moods[0];
      const moodDate = new Date(latestMood.date);
      const hoursSince = (new Date().getTime() - moodDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSince < 24) {
        setIsVisible(true);
      }
    }
  }, [moods]);

  if (!isVisible || moods.length === 0) return null;

  const latestMood = moods[0];

  const getPromptText = (mood: string) => {
    switch(mood) {
      case 'Anxious': return `You felt Anxious earlier. Want to untangle that here?`;
      case 'Sad': return `You felt Sad recently. This is a safe space to explore that.`;
      case 'Overwhelmed': return `You felt Overwhelmed. Try listing what's on your mind.`;
      case 'Happy': return `You felt Happy! What brought you joy today?`;
      case 'Calm': return `You felt Calm. What helped you find peace?`;
      case 'Neutral': return `Any particular thoughts standing out right now?`;
      default: return `A private space for your thoughts.`;
    }
  };

  return (
    <div className="bg-primary/5 rounded-2xl p-4 flex items-start gap-3 border border-primary/10 relative pr-10 animate-in fade-in slide-in-from-top-4">
      <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <p className="text-text-primary text-sm leading-relaxed">
        {getPromptText(latestMood.mood)}
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
