import React from 'react';
import { MoodEntry } from '@/services/mood-service';
import { H3, P } from '@/components/ui/Typography';

export const MoodDistribution: React.FC<{ moods: MoodEntry[] }> = ({ moods }) => {
  if (moods.length === 0) {
    return (
      <div className="py-8 text-center border border-black/5 rounded-2xl bg-surface">
        <P className="text-text-muted">No mood data yet.</P>
      </div>
    );
  }

  const counts: Record<string, number> = {};
  moods.forEach(m => {
    counts[m.mood] = (counts[m.mood] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(counts));

  return (
    <div className="border border-black/5 rounded-2xl bg-surface p-6">
      <H3 className="mb-6">Emotional Landscape</H3>
      <div className="space-y-4">
        {Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([mood, count]) => {
          const width = `${(count / maxCount) * 100}%`;
          return (
            <div key={mood}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize font-medium text-text-primary">{mood}</span>
                <span className="text-text-muted">{count} logs</span>
              </div>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/40 rounded-full transition-all duration-1000"
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
