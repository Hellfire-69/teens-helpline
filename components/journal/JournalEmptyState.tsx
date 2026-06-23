import React from 'react';
import { P, H3 } from '@/components/ui/Typography';
import { BookText } from 'lucide-react';

export const JournalEmptyState: React.FC = () => {
  return (
    <div className="py-16 px-8 border border-black/5 rounded-2xl bg-surface shadow-sm text-center max-w-lg mx-auto">
      <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookText className="w-8 h-8 text-primary/60" />
      </div>
      <H3 className="mb-3">A private room for your thoughts</H3>
      <P className="text-text-muted">
        Your journal is completely private and anonymous. Start your first reflection whenever you&apos;re ready.
      </P>
    </div>
  );
};
