import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardMobileNav } from './DashboardMobileNav';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col min-w-0 pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>

      <DashboardMobileNav />
    </div>
  );
}
