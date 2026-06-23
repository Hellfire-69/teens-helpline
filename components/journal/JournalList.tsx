"use client";

import React, { useEffect } from 'react';
import { useJournalStore } from '@/stores/journal-store';
import { useIdentityStore } from '@/stores/identity-store';
import { JournalEntryCard } from './JournalEntryCard';
import { JournalEmptyState } from './JournalEmptyState';
import { BookText, Plus } from 'lucide-react';
import { H2 } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const JournalList: React.FC = () => {
  const { spaceId } = useIdentityStore();
  const { entries, isLoading, fetchEntries } = useJournalStore();

  useEffect(() => {
    if (spaceId) {
      fetchEntries(spaceId);
    }
  }, [spaceId, fetchEntries]);

  return (
    <section className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <H2 className="flex items-center gap-2">
          <BookText className="h-6 w-6 text-text-muted" />
          Your Journal
        </H2>
        <Link href="/dashboard/journal/new">
          <Button className="rounded-full flex items-center gap-2 px-6">
            <Plus className="w-4 h-4" /> Start Writing
          </Button>
        </Link>
      </div>
      
      {isLoading && entries.length === 0 ? (
        <div className="py-8 text-text-muted animate-pulse">Loading journal...</div>
      ) : entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <JournalEmptyState />
        </div>
      )}
    </section>
  );
};
