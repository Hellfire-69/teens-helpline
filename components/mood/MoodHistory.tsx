"use client";

import React, { useEffect } from 'react';
import { useMoodStore } from '@/stores/mood-store';
import { useIdentityStore } from '@/stores/identity-store';
import { MoodEntryCard } from './MoodEntryCard';
import { MoodHistoryEmptyState } from './MoodHistoryEmptyState';
import { BookText } from 'lucide-react';
import { H2 } from '@/components/ui/Typography';

export const MoodHistory: React.FC = () => {
  const { spaceId } = useIdentityStore();
  const { moods, isLoading, fetchMoods } = useMoodStore();

  useEffect(() => {
    if (spaceId) {
      fetchMoods(spaceId);
    }
  }, [spaceId, fetchMoods]);

  return (
    <section className="animate-in fade-in duration-500">
      <H2 className="mb-8 flex items-center gap-2">
        <BookText className="h-6 w-6 text-text-muted" />
        Past Reflections
      </H2>
      
      {isLoading && moods.length === 0 ? (
        <div className="py-8 text-text-muted animate-pulse">Loading reflections...</div>
      ) : moods.length > 0 ? (
        <div className="space-y-2">
          {moods.map((entry) => (
            <MoodEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <MoodHistoryEmptyState />
      )}
    </section>
  );
};
