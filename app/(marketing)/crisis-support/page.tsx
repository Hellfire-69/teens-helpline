import React from 'react';
import { H1, H2, P } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { HeartHandshake, Phone, ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';

export default function CrisisSupportPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </header>
      
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8">
          <HeartHandshake className="w-8 h-8" />
        </div>
        
        <H1 className="mb-4">You are not alone.</H1>
        <P className="text-xl text-text-muted mb-12 max-w-2xl">
          If you&apos;re feeling overwhelmed, thinking about suicide, or experiencing a mental health crisis, please reach out to people who can support you right now.
        </P>

        <div className="space-y-6 mb-16">
          <div className="bg-surface border border-red-500/20 rounded-2xl p-8 shadow-sm">
            <H2 className="mb-2 text-red-600 flex items-center gap-2">
              <Phone className="w-6 h-6" /> National Suicide Prevention Lifeline (US)
            </H2>
            <P className="text-text-primary mb-6">Available 24/7, free, and confidential.</P>
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto" size="lg">
              Call or Text 988
            </Button>
          </div>

          <div className="bg-surface border border-black/5 rounded-2xl p-8 shadow-sm">
            <H2 className="mb-2 flex items-center gap-2">
              <Phone className="w-6 h-6 text-text-muted" /> Crisis Text Line
            </H2>
            <P className="text-text-primary mb-6">Text from anywhere in the US or Canada.</P>
            <Button variant="outline" className="w-full sm:w-auto" size="lg">
              Text HOME to 741741
            </Button>
          </div>

          <div className="bg-surface border border-black/5 rounded-2xl p-8 shadow-sm">
            <H2 className="mb-2 flex items-center gap-2">
              <Globe className="w-6 h-6 text-text-muted" /> International Resources
            </H2>
            <P className="text-text-primary mb-6">Find a helpline in your specific country.</P>
            <Link href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto" size="lg">
                Visit FindAHelpline.com
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="border-t border-black/5 pt-8">
          <H2 className="mb-4">What happens when I call?</H2>
          <P className="text-text-muted mb-4">
            You will be connected to a trained crisis worker who will listen to you without judgment. They will work with you to understand what you&apos;re experiencing and help you find ways to feel safe.
          </P>
        </div>
      </main>
    </div>
  );
}
