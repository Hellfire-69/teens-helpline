import React from 'react';
import { MoodEntry } from '@/services/mood-service';
import { P } from '@/components/ui/Typography';
import { MoodChip, MoodType } from './MoodChip';

interface MoodEntryCardProps {
  entry: MoodEntry;
}

export const MoodEntryCard: React.FC<MoodEntryCardProps> = ({ entry }) => {
  const date = new Date(entry.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);

  return (
    <div className="group relative pl-4 border-l-2 border-black/5 hover:border-primary/30 transition-colors pb-8 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
        <time dateTime={entry.date} className="text-sm font-medium text-text-muted">
          {formattedDate}
        </time>
        <MoodChip 
          mood={entry.mood as MoodType} 
          className="pointer-events-none scale-90 origin-left sm:origin-center px-4 py-1.5" 
        />
      </div>
      {entry.note ? (
        <P className="text-text-primary/90 max-w-2xl leading-relaxed">
          {entry.note}
        </P>
      ) : (
        <P className="text-text-muted/50 italic text-sm">
          No additional reflection added.
        </P>
      )}
    </div>
  );
};
