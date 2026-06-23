"use client";

import React, { useEffect, useRef } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useNovaStore } from '@/stores/nova-store';
import { useIdentityStore } from '@/stores/identity-store';
import { useMoodStore } from '@/stores/mood-store';
import { useJournalStore } from '@/stores/journal-store';
import { NovaMessage } from '@/components/nova/NovaMessage';
import { NovaInput } from '@/components/nova/NovaInput';
import { CrisisOverlay } from '@/components/nova/CrisisOverlay';
import { H1, P } from '@/components/ui/Typography';
import { Sparkles } from 'lucide-react';

export default function NovaPage() {
  const { spaceId } = useIdentityStore();
  const { 
    messages, 
    isLoading, 
    isTyping, 
    isCrisis, 
    initializeSession, 
    sendMessage 
  } = useNovaStore();
  
  const { moods, fetchMoods } = useMoodStore();
  const { entries: journalEntries, fetchEntries: fetchJournals } = useJournalStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spaceId) {
      initializeSession(spaceId);
      if (moods.length === 0) fetchMoods(spaceId);
      if (journalEntries.length === 0) fetchJournals(spaceId);
    }
  }, [spaceId, initializeSession, fetchMoods, fetchJournals, moods.length, journalEntries.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!spaceId) return;

    let moodContext;
    if (moods.length > 0) {
      const latestMood = moods[0];
      const hoursSince = (new Date().getTime() - new Date(latestMood.date).getTime()) / (1000 * 60 * 60);
      if (hoursSince < 24) moodContext = latestMood.mood;
    }

    let journalContext;
    if (journalEntries.length > 0) {
      const latestJournal = journalEntries[0];
      const hoursSince = (new Date().getTime() - new Date(latestJournal.created_at).getTime()) / (1000 * 60 * 60);
      if (hoursSince < 24 && latestJournal.content) {
        journalContext = latestJournal.content.substring(0, 300);
      }
    }

    sendMessage(spaceId, text, moodContext, journalContext);
  };

  return (
    <PageContainer className="h-[100dvh] flex flex-col pt-6 pb-0 overflow-hidden">
      {isCrisis && <CrisisOverlay />}
      
      <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
        <div className="max-w-3xl mx-auto w-full px-4 pt-12 pb-24">
          {isLoading ? (
            <div className="flex items-center justify-center h-full pt-32">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center pt-32 animate-in fade-in duration-700">
              <H1 className="mb-4 text-text-heading/80 font-normal">A quiet space to think.</H1>
              <P className="text-text-muted text-lg">What&apos;s on your mind today?</P>
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((m) => (
                <NovaMessage key={m.id} role={m.role as 'user' | 'model'} content={m.content} />
              ))}
              {isTyping && (
                <div className="flex justify-start w-full mb-8">
                  <div className="max-w-2xl flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                    <div className="text-lg leading-relaxed text-text-muted">
                      Nova is reflecting...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-t from-background via-background to-transparent pt-6 pb-6 px-4">
        <NovaInput onSend={handleSend} disabled={isLoading || isTyping || isCrisis} />
      </div>
    </PageContainer>
  );
}
