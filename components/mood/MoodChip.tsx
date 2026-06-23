import React from 'react';
import { cn } from '@/lib/utils';

export type MoodType = 'Calm' | 'Happy' | 'Neutral' | 'Anxious' | 'Sad' | 'Overwhelmed';

interface MoodChipProps {
  mood: MoodType;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const moodStyles: Record<MoodType, { base: string, selected: string }> = {
  Calm: {
    base: 'bg-mood-calm/10 text-primary hover:bg-mood-calm/20',
    selected: 'bg-mood-calm text-white shadow-md ring-2 ring-primary/20 ring-offset-2',
  },
  Happy: {
    base: 'bg-mood-happy/10 text-accent hover:bg-mood-happy/20',
    selected: 'bg-mood-happy text-white shadow-md ring-2 ring-accent/20 ring-offset-2',
  },
  Neutral: {
    base: 'bg-mood-neutral/10 text-text-muted hover:bg-mood-neutral/20',
    selected: 'bg-mood-neutral text-white shadow-md ring-2 ring-text-muted/20 ring-offset-2',
  },
  Anxious: {
    base: 'bg-mood-anxious/10 text-amber-700 hover:bg-mood-anxious/20',
    selected: 'bg-mood-anxious text-white shadow-md ring-2 ring-amber-700/20 ring-offset-2',
  },
  Sad: {
    base: 'bg-mood-sad/10 text-blue-800 hover:bg-mood-sad/20',
    selected: 'bg-mood-sad text-white shadow-md ring-2 ring-blue-800/20 ring-offset-2',
  },
  Overwhelmed: {
    base: 'bg-mood-overwhelmed/10 text-purple-800 hover:bg-mood-overwhelmed/20',
    selected: 'bg-mood-overwhelmed text-white shadow-md ring-2 ring-purple-800/20 ring-offset-2',
  },
};

export const MOODS: MoodType[] = ['Calm', 'Happy', 'Neutral', 'Anxious', 'Sad', 'Overwhelmed'];

export const MoodChip: React.FC<MoodChipProps> = ({ 
  mood, 
  selected = false, 
  onClick, 
  className,
  disabled = false
}) => {
  const styles = moodStyles[mood];
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        selected ? styles.selected : styles.base,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {mood}
    </button>
  );
};
