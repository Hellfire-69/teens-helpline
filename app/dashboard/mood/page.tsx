import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { H1, P } from '@/components/ui/Typography';
import { MoodHistory } from '@/components/mood/MoodHistory';

export const metadata = {
  title: 'Mood History | Teens Helpline',
};

export default function MoodPage() {
  return (
    <PageContainer>
      <div className="mb-12">
        <H1 className="mb-2">Mood History</H1>
        <P className="text-text-muted">A private record of your emotional journey.</P>
      </div>

      <div className="max-w-3xl">
        <MoodHistory />
      </div>
    </PageContainer>
  );
}
