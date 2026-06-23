import React from 'react';
import { MoodEntry } from '@/services/mood-service';
import { H3 } from '@/components/ui/Typography';

export const MoodTimeline: React.FC<{ moods: MoodEntry[] }> = ({ moods }) => {
  if (moods.length === 0) {
    return null;
  }

  const recentMoods = moods.slice(0, 10);

  return (
    <div className="border border-black/5 rounded-2xl bg-surface p-6">
      <H3 className="mb-6">Recent Rhythms</H3>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {recentMoods.map((m) => {
          const date = new Date(m.date);
          const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
          return (
            <div key={m.id} className="flex flex-col items-center shrink-0 w-16">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-xs font-medium text-primary uppercase tracking-wider overflow-hidden px-1">
                {m.mood.substring(0, 3)}
              </div>
              <span className="text-xs text-text-muted">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
