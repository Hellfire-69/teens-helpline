import React from 'react';
import { H2, P } from '@/components/ui/Typography';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, description, action, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-8", className)} {...props}>
      <div className="space-y-1">
        <H2>{title}</H2>
        {description && <P className="text-text-muted text-base">{description}</P>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
