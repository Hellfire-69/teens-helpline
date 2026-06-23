"use client";

import React, { useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useMoodStore } from '@/stores/mood-store';
import { useJournalStore } from '@/stores/journal-store';
import { useIdentityStore } from '@/stores/identity-store';
import { MoodDistribution } from '@/components/analytics/MoodDistribution';
import { ReflectionActivity } from '@/components/analytics/ReflectionActivity';
import { MoodTimeline } from '@/components/analytics/MoodTimeline';
import { H1, P } from '@/components/ui/Typography';
import { Sparkles } from 'lucide-react';

export default function AnalyticsPage() {
  const { spaceId } = useIdentityStore();
  const { moods, isLoading: moodsLoading, fetchMoods } = useMoodStore();
  const { entries, isLoading: journalsLoading, fetchEntries } = useJournalStore();

  useEffect(() => {
    if (spaceId) {
      if (moods.length === 0) fetchMoods(spaceId);
      if (entries.length === 0) fetchEntries(spaceId);
    }
  }, [spaceId, fetchMoods, fetchEntries, moods.length, entries.length]);

  const isLoading = moodsLoading || journalsLoading;

  return (
    <PageContainer>
      <div className="mb-10">
        <H1 className="mb-2">Your Patterns</H1>
        <P className="text-text-muted">Observation without judgment.</P>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <MoodTimeline moods={moods} />
            <MoodDistribution moods={moods} />
          </div>
          <div className="lg:col-span-4 space-y-8">
            <ReflectionActivity entries={entries} />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
