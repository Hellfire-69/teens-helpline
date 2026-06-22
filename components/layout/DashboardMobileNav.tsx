"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Smile, 
  BookText, 
  Sparkles, 
  MoreHorizontal,
  BarChart2,
  Library,
  Settings,
  HeartHandshake
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const primaryNavItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Mood', href: '/dashboard/mood', icon: Smile },
  { name: 'Journal', href: '/dashboard/journal', icon: BookText },
  { name: 'Nova', href: '/dashboard/nova', icon: Sparkles },
];

const secondaryNavItems = [
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Library', href: '/dashboard/library', icon: Library },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardMobileNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Auto-close overflow menu on route change
  React.useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Overflow Menu Overlay */}
      {isMoreOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {/* Overflow Menu Sheet */}
      <div 
        className={cn(
          "fixed bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 right-0 bg-surface rounded-t-card border-t border-black/5 p-4 z-40 transition-transform duration-300 ease-in-out lg:hidden shadow-lg",
          isMoreOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="space-y-1 pb-4">
          {secondaryNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-4 rounded-card text-base font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-text-muted active:bg-black/5"
                )}
              >
                <item.icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
                {item.name}
              </Link>
            );
          })}
          <div className="h-px bg-black/5 my-2 mx-4" />
          <Link
            href="/crisis-support"
            className="flex items-center gap-3 px-4 py-4 rounded-card text-base font-medium text-text-muted active:bg-black/5"
          >
            <HeartHandshake className="h-5 w-5" strokeWidth={1.5} />
            Crisis Support
          </Link>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-surface border-t border-black/5 pb-[env(safe-area-inset-bottom)] h-[calc(64px+env(safe-area-inset-bottom))] lg:hidden">
        {primaryNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-text-muted"
              )}
            >
              <item.icon className="h-6 w-6" strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
            isMoreOpen ? "text-primary" : "text-text-muted"
          )}
        >
          <MoreHorizontal className="h-6 w-6" strokeWidth={isMoreOpen ? 2 : 1.5} />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>
    </>
  );
}
