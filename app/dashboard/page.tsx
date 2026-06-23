import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { H1, H3, P } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { MoodLogger } from '@/components/mood/MoodLogger';
import { DashboardRecentJournals } from '@/components/journal/DashboardRecentJournals';

export default function DashboardHomePage() {
  return (
    <PageContainer>
      {/* Greeting */}
      <div className="mb-12">
        <H1 className="mb-2">Good evening.</H1>
        <P className="text-text-muted">Take a moment to check in.</P>
      </div>

      {/* Daily Reflection Prompt (Primary Action) */}
      <section className="mb-16">
        <MoodLogger />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Nova Entry Point (Secondary Action) */}
          <Card className="bg-primary/5 border-none shadow-none relative overflow-hidden group hover:bg-primary/10 transition-colors cursor-pointer">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-colors" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <H3>Reflect with Nova</H3>
                </div>
                <P className="text-text-muted max-w-md">I noticed you logged &apos;Anxious&apos; earlier today. Would it help to map out what&apos;s on your plate right now?</P>
              </div>
              <Button variant="outline" className="w-full md:w-auto bg-surface">
                Start Conversation
              </Button>
            </div>
          </Card>

          {/* Recent Journal Entries (Editorial List) */}
          <DashboardRecentJournals />

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* Suggested Reading */}
          <section>
            <H3 className="mb-6">Suggested Reading</H3>
              <Link href="/library/feeling-overwhelmed" className="block group">
                <P className="font-medium group-hover:text-primary transition-colors">Feeling Completely Overwhelmed</P>
                <P className="text-sm text-text-muted mt-1">What to do when your brain freezes.</P>
              </Link>
              <div className="h-px bg-black/5 my-4" />
              <Link href="/library/sleep-and-stress" className="block group">
                <P className="font-medium group-hover:text-primary transition-colors">Sleep and Stress</P>
                <P className="text-sm text-text-muted mt-1">Breaking the vicious cycle.</P>
              </Link>
          </section>

        </div>

      </div>
    </PageContainer>
  );
}
