import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const articles: Record<string, React.ComponentType> = {
  'anxiety': dynamic(() => import('@/content/library/anxiety.mdx')),
  'exam-stress': dynamic(() => import('@/content/library/exam-stress.mdx')),
  'academic-burnout': dynamic(() => import('@/content/library/academic-burnout.mdx')),
  'feeling-overwhelmed': dynamic(() => import('@/content/library/feeling-overwhelmed.mdx')),
  'talking-to-parents': dynamic(() => import('@/content/library/talking-to-parents.mdx')),
  'sleep-and-stress': dynamic(() => import('@/content/library/sleep-and-stress.mdx')),
};

export default function LibrarySlugPage({ params }: { params: { slug: string } }) {
  const Article = articles[params.slug];

  if (!Article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="p-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Article />
      </main>
    </div>
  );
}
