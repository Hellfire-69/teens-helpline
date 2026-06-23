import React from 'react';
import { JournalEditor } from '@/components/journal/JournalEditor';
import { PageContainer } from '@/components/layout/PageContainer';

export const metadata = {
  title: 'Reflection | Teens Helpline',
};

export default function JournalEntryPage({ params }: { params: { 'entry-id': string } }) {
  return (
    <PageContainer>
      <JournalEditor entryId={params['entry-id']} />
    </PageContainer>
  );
}
