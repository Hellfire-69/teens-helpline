import React from 'react';
import { P, H3 } from '@/components/ui/Typography';

export const MoodHistoryEmptyState: React.FC = () => {
  return (
    <div className="py-12 px-6 border-l-2 border-black/5">
      <H3 className="mb-2">Your reflections live here.</H3>
      <P className="text-text-muted max-w-md">
        Take a moment to check in from the dashboard. Over time, this space will become a private record of your emotional journey.
      </P>
    </div>
  );
};
