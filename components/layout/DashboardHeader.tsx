"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const pathname = usePathname();

  // Mapping paths to titles for the mobile header
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Home';
    if (pathname.startsWith('/dashboard/mood')) return 'Mood';
    if (pathname.startsWith('/dashboard/journal')) return 'Journal';
    if (pathname.startsWith('/dashboard/nova')) return 'Nova';
    if (pathname.startsWith('/dashboard/analytics')) return 'Analytics';
    if (pathname.startsWith('/dashboard/library')) return 'Library';
    if (pathname.startsWith('/dashboard/settings')) return 'Settings';
    return 'Teens Helpline';
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-background/80 backdrop-blur-md px-6 border-b border-black/5 lg:hidden">
      <div className="font-heading font-semibold text-xl text-text-heading">
        {getPageTitle()}
      </div>
      <Link 
        href="/dashboard/nova" 
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        aria-label="Talk to Nova"
      >
        <Sparkles className="h-5 w-5" />
      </Link>
    </header>
  );
}
