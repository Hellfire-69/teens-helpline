import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { H1, H2, H3, P } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, BookText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
        <div className="max-w-3xl">
          <H2 className="mb-6">How are things feeling right now?</H2>
          <div className="relative">
            <Input 
              placeholder="I've been feeling..." 
              className="h-16 pl-6 pr-32 rounded-full text-lg shadow-sm border-black/10 focus-visible:ring-primary/50"
            />
            <Button className="absolute right-2 top-2 bottom-2 rounded-full px-6">
              Reflect
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2.5 rounded-full bg-mood-calm/20 text-primary font-medium text-sm hover:bg-mood-calm/30 transition-colors">Calm</button>
            <button className="px-5 py-2.5 rounded-full bg-mood-happy/20 text-accent font-medium text-sm hover:bg-mood-happy/30 transition-colors">Happy</button>
            <button className="px-5 py-2.5 rounded-full bg-mood-neutral/20 text-text-muted font-medium text-sm hover:bg-mood-neutral/30 transition-colors">Neutral</button>
            <button className="px-5 py-2.5 rounded-full bg-mood-anxious/20 text-mood-anxious font-medium text-sm hover:bg-mood-anxious/30 transition-colors text-amber-700">Anxious</button>
            <button className="px-5 py-2.5 rounded-full bg-mood-sad/20 text-mood-sad font-medium text-sm hover:bg-mood-sad/30 transition-colors text-blue-800">Sad</button>
            <button className="px-5 py-2.5 rounded-full bg-mood-overwhelmed/20 text-mood-overwhelmed font-medium text-sm hover:bg-mood-overwhelmed/30 transition-colors text-purple-800">Overwhelmed</button>
          </div>
        </div>
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
          <section>
            <H2 className="mb-6 flex items-center gap-2">
              <BookText className="h-6 w-6 text-text-muted" />
              Recent Entries
            </H2>
            <div className="space-y-6">
              {[
                { title: 'Thoughts after the math exam', snippet: 'I felt really overwhelmed when I saw the first question, but I tried to breathe through it...', date: 'Today', mood: 'Overwhelmed', moodColor: 'bg-purple-100 text-purple-800' },
                { title: 'Quiet afternoon', snippet: 'Just sat in the park for a bit. It was nice to disconnect from my phone and just watch the trees.', date: 'Yesterday', mood: 'Calm', moodColor: 'bg-mood-calm/20 text-primary' },
              ].map((entry, i) => (
                <div key={i} className="group relative pl-4 border-l-2 border-black/5 hover:border-primary/30 transition-colors pb-6 last:pb-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <H3 className="text-xl group-hover:text-primary transition-colors cursor-pointer">{entry.title}</H3>
                    <span className="text-sm text-text-muted">{entry.date}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${entry.moodColor}`}>{entry.mood}</span>
                  </div>
                  <P className="text-text-muted max-w-2xl line-clamp-2">{entry.snippet}</P>
                </div>
              ))}
            </div>
            <Link href="/dashboard/journal" className="inline-flex items-center gap-2 mt-8 text-primary font-medium hover:opacity-80 transition-opacity">
              View all entries <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* Suggested Reading */}
          <section>
            <H3 className="mb-6">Suggested Reading</H3>
            <div className="space-y-4">
              <Link href="/library/exam-stress" className="block group">
                <P className="font-medium group-hover:text-primary transition-colors">Dealing with Academic Burnout</P>
                <P className="text-sm text-text-muted mt-1">Pace yourself and take regular breaks.</P>
              </Link>
              <div className="h-px bg-black/5" />
              <Link href="/library/anxiety" className="block group">
                <P className="font-medium group-hover:text-primary transition-colors">Understanding Anxiety</P>
                <P className="text-sm text-text-muted mt-1">Notice where you feel it in your body.</P>
              </Link>
            </div>
          </section>

        </div>

      </div>
    </PageContainer>
  );
}
