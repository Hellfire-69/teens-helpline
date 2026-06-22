import React from 'react';
import { H3, P } from '@/components/ui/Typography';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, message, action, className, ...props }: EmptyStateProps) {
  return (
    <div 
      className={cn("flex flex-col items-center justify-center py-20 text-center", className)} 
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface shadow-sm border border-black/5 mb-6 text-primary">
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <H3 className="mb-2">{title}</H3>
      <P className="text-text-muted mb-8 max-w-sm">{message}</P>
      {action && <div>{action}</div>}
    </div>
  );
}
