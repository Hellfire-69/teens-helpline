import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function PageContainer({ className, narrow, children, ...props }: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 py-8 md:py-12 pb-24 md:pb-12",
        narrow ? "max-w-[720px]" : "max-w-[1280px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
