import React from 'react';
import { JournalEntry } from '@/services/journal-service';
import { P, H3 } from '@/components/ui/Typography';
import Link from 'next/link';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry }) => {
  const date = new Date(entry.created_at);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);

  const displayTitle = entry.title?.trim() || formattedDate;
  const snippet = entry.content?.substring(0, 150) || '';

  return (
    <Link href={`/dashboard/journal/${entry.id}`} className="block group">
      <div className="relative pl-4 border-l-2 border-black/5 hover:border-primary/30 transition-colors pb-8 last:pb-0">
        <div className="flex items-baseline gap-3 mb-2">
          <H3 className="text-xl group-hover:text-primary transition-colors line-clamp-1">
            {displayTitle}
          </H3>
          <span className="text-sm text-text-muted whitespace-nowrap">{formattedTime}</span>
        </div>
        <P className="text-text-muted max-w-2xl line-clamp-2">
          {snippet}{snippet.length >= 150 ? '...' : ''}
        </P>
      </div>
    </Link>
  );
};
