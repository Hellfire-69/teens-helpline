import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { JournalList } from '@/components/journal/JournalList';

export const metadata = {
  title: 'Journal | Teens Helpline',
};

export default function JournalPage() {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto">
        <JournalList />
      </div>
    </PageContainer>
  );
}
