import React from 'react';
import { JournalEntry } from '@/services/journal-service';
import { H3, P } from '@/components/ui/Typography';
import { BookText } from 'lucide-react';

export const ReflectionActivity: React.FC<{ entries: JournalEntry[] }> = ({ entries }) => {
  return (
    <div className="border border-black/5 rounded-2xl bg-surface p-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4">
        <BookText className="w-6 h-6 text-primary/60" />
      </div>
      <H3 className="mb-2">Reflection Activity</H3>
      {entries.length === 0 ? (
        <P className="text-text-muted text-sm">No journal entries yet.</P>
      ) : (
        <>
          <div className="text-4xl font-light text-text-primary mb-2">{entries.length}</div>
          <P className="text-text-muted text-sm">Total entries written</P>
        </>
      )}
    </div>
  );
};
