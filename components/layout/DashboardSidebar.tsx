"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Smile, 
  BookText, 
  Sparkles, 
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

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Mood', href: '/dashboard/mood', icon: Smile },
  { name: 'Journal', href: '/dashboard/journal', icon: BookText },
  { name: 'Nova', href: '/dashboard/nova', icon: Sparkles },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Library', href: '/dashboard/library', icon: Library },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[280px] flex-col border-r border-black/5 bg-surface h-screen sticky top-0">
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary">
          <Sparkles className="h-6 w-6" />
          <span className="font-heading font-semibold text-xl tracking-tight text-text-heading">Teens Helpline</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-card text-base font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-text-muted hover:bg-black/5 hover:text-text-primary"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-text-muted")} strokeWidth={isActive ? 2 : 1.5} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <Link 
          href="/crisis-support" 
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors px-4 py-2"
        >
          <HeartHandshake className="h-4 w-4" />
          Crisis Support
        </Link>
      </div>
    </aside>
  );
}
