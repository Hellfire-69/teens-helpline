"use client";

import React, { useEffect } from 'react';
import { useJournalStore } from '@/stores/journal-store';
import { useIdentityStore } from '@/stores/identity-store';
import { BookText, ArrowRight, Plus } from 'lucide-react';
import { H2, H3, P } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const DashboardRecentJournals: React.FC = () => {
  const { spaceId } = useIdentityStore();
  const { entries, isLoading, fetchEntries } = useJournalStore();

  useEffect(() => {
    if (spaceId) {
      fetchEntries(spaceId);
    }
  }, [spaceId, fetchEntries]);

  const recentEntries = entries.slice(0, 3);

  return (
    <section className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <H2 className="flex items-center gap-2">
          <BookText className="h-6 w-6 text-text-muted" />
          Recent Entries
        </H2>
        <Link href="/dashboard/journal/new">
          <Button className="rounded-full flex items-center gap-2 px-6">
            <Plus className="w-4 h-4" /> Start Writing
          </Button>
        </Link>
      </div>

      {isLoading && recentEntries.length === 0 ? (
        <div className="py-4 text-text-muted animate-pulse">Loading recent entries...</div>
      ) : recentEntries.length > 0 ? (
        <>
          <div className="space-y-6">
            {recentEntries.map((entry) => {
              const date = new Date(entry.created_at);
              const formattedDate = new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
              }).format(date);
              
              const displayTitle = entry.title?.trim() || formattedDate;
              const snippet = entry.content?.substring(0, 100) || '';

              return (
                <Link href={`/dashboard/journal/${entry.id}`} key={entry.id} className="block group relative pl-4 border-l-2 border-black/5 hover:border-primary/30 transition-colors pb-6 last:pb-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <H3 className="text-xl group-hover:text-primary transition-colors cursor-pointer line-clamp-1">{displayTitle}</H3>
                    <span className="text-sm text-text-muted">{formattedDate}</span>
                  </div>
                  <P className="text-text-muted max-w-2xl line-clamp-2">
                    {snippet}{snippet.length >= 100 ? '...' : ''}
                  </P>
                </Link>
              );
            })}
          </div>
          <Link href="/dashboard/journal" className="inline-flex items-center gap-2 mt-8 text-primary font-medium hover:opacity-80 transition-opacity">
            View all entries <ArrowRight className="h-4 w-4" />
          </Link>
        </>
      ) : (
        <div className="py-8 px-6 border-l-2 border-black/5 text-text-muted">
          No reflections yet. Start a new one whenever you&apos;re ready.
        </div>
      )}
    </section>
  );
};
