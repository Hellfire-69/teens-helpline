"use client";

import React, { useState, useRef } from 'react';
import { H2 } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MoodChip, MOODS, MoodType } from './MoodChip';
import { useMoodStore } from '@/stores/mood-store';
import { useIdentityStore } from '@/stores/identity-store';

export const MoodLogger: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { spaceId } = useIdentityStore();
  const { addMood } = useMoodStore();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    // Focus the input to encourage note writing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const getPlaceholder = () => {
    if (!selectedMood) return "I've been feeling...";
    switch (selectedMood) {
      case 'Anxious': return 'Why are you feeling Anxious?';
      case 'Sad': return "What's making you feel Sad?";
      case 'Happy': return "What's bringing you joy today?";
      case 'Calm': return 'What helped you feel Calm?';
      case 'Overwhelmed': return "What's on your plate right now?";
      case 'Neutral': return 'Any particular thoughts on your mind?';
      default: return 'Want to add a note?';
    }
  };

  const handleSubmit = async () => {
    if (!spaceId || !selectedMood || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const date = new Date().toISOString();
      await addMood(spaceId, date, selectedMood, note.trim());
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedMood(null);
        setNote('');
      }, 4000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl py-8 animate-in fade-in duration-500">
        <H2 className="mb-2 text-text-muted">Thanks for checking in.</H2>
        <p className="text-text-muted/70">Your reflection has been saved.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
      <H2 className="mb-6">How are things feeling right now?</H2>
      <div className="relative">
        <Input 
          ref={inputRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={getPlaceholder()}
          className="h-16 pl-6 pr-32 rounded-full text-lg shadow-sm border-black/10 focus-visible:ring-primary/50 transition-all duration-300"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && selectedMood) {
              handleSubmit();
            }
          }}
        />
        <Button 
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="absolute right-2 top-2 bottom-2 rounded-full px-6 transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Reflect'}
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {MOODS.map(mood => (
          <MoodChip 
            key={mood}
            mood={mood}
            selected={selectedMood === mood}
            onClick={() => handleMoodSelect(mood)}
            disabled={isSubmitting}
          />
        ))}
      </div>
    </div>
  );
};
