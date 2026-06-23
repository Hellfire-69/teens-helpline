import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { H1, H3, P } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

const articles = [
  { slug: 'anxiety', title: 'Understanding Anxiety', description: 'Notice where you feel it in your body.' },
  { slug: 'exam-stress', title: 'Navigating Exam Stress', description: 'Breaking down the cycle of overwhelm.' },
  { slug: 'academic-burnout', title: 'Dealing with Academic Burnout', description: 'Recognizing the signs and taking a genuine pause.' },
  { slug: 'feeling-overwhelmed', title: 'When You Feel Completely Overwhelmed', description: 'What to do when your brain freezes.' },
  { slug: 'talking-to-parents', title: 'Navigating Difficult Conversations with Parents', description: 'Using "I" statements and managing expectations.' },
  { slug: 'sleep-and-stress', title: 'The Relationship Between Sleep and Stress', description: 'Breaking the vicious cycle and establishing a buffer zone.' },
];

export default function LibraryIndexPage() {
  return (
    <PageContainer>
      <div className="mb-12">
        <H1 className="mb-2">Library</H1>
        <P className="text-text-muted">Explore gentle guidance and psychoeducation.</P>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/library/${article.slug}`}>
            <Card className="h-full hover:bg-black/5 transition-colors cursor-pointer border-none shadow-none bg-surface">
              <H3 className="mb-2 text-primary">{article.title}</H3>
              <P className="text-text-muted text-sm">{article.description}</P>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
