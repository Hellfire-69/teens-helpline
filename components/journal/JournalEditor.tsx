"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useJournalStore } from '@/stores/journal-store';
import { useIdentityStore } from '@/stores/identity-store';
import { useRouter } from 'next/navigation';
import { JournalPrompt } from './JournalPrompt';

interface JournalEditorProps {
  entryId?: string;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({ entryId }) => {
  const router = useRouter();
  const { spaceId } = useIdentityStore();
  const { currentEntry, fetchEntry, saveEntry, saveStatus, clearCurrentEntry } = useJournalStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [localId, setLocalId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (entryId && entryId !== 'new' && spaceId) {
      fetchEntry(spaceId, entryId);
      setLocalId(entryId);
    } else {
      clearCurrentEntry();
      setTitle('');
      setContent('');
      setLocalId(null);
      setIsInitializing(false);
    }
  }, [entryId, spaceId, fetchEntry, clearCurrentEntry]);

  useEffect(() => {
    if (currentEntry && currentEntry.id === localId) {
      setTitle(currentEntry.title);
      setContent(currentEntry.content);
      setIsInitializing(false);
    }
  }, [currentEntry, localId]);

  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  
  const triggerSave = useCallback(async (currentTitle: string, currentContent: string) => {
    if (!spaceId) return;
    
    if (!localId && currentContent.trim().length <= 3) {
      return; 
    }

    const savedId = await saveEntry(spaceId, localId, currentTitle, currentContent);
    if (savedId && !localId) {
      setLocalId(savedId);
      window.history.replaceState(null, '', `/dashboard/journal/${savedId}`);
    }
  }, [spaceId, localId, saveEntry]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    scheduleSave(val, content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    scheduleSave(title, val);
  };

  const scheduleSave = (newTitle: string, newContent: string) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      triggerSave(newTitle, newContent);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  if (isInitializing) {
    return <div className="animate-pulse p-8 text-text-muted">Loading reflection...</div>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh] pb-24">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 flex items-center justify-between">
        <button 
          onClick={() => router.push('/dashboard/journal')}
          className="text-text-muted hover:text-text-primary transition-colors text-sm font-medium"
        >
          ← Back
        </button>
        <div className="text-sm">
          {saveStatus === 'saving' && <span className="text-text-muted/50 animate-pulse">Saving...</span>}
          {saveStatus === 'saved' && <span className="text-primary/70">Saved</span>}
          {saveStatus === 'error' && <span className="text-amber-700">Failed to save. Check connection.</span>}
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl mx-auto mt-8 flex flex-col gap-6">
        {!localId && <JournalPrompt />}

        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={handleTitleChange}
          className="w-full bg-transparent text-3xl font-heading font-semibold text-text-heading placeholder:text-text-muted/30 outline-none focus:ring-0 border-none px-0"
        />
        
        <textarea
          placeholder="Start reflecting..."
          value={content}
          onChange={handleContentChange}
          autoFocus={!localId}
          className="flex-1 w-full bg-transparent text-lg text-text-primary placeholder:text-text-muted/50 outline-none focus:ring-0 border-none resize-none px-0 leading-relaxed min-h-[50vh]"
        />
      </div>
    </div>
  );
};
