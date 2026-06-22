import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function H1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-4xl md:text-5xl font-heading font-semibold tracking-tight text-text-heading", className)} {...props}>
      {children}
    </h1>
  );
}

export function H2({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-heading font-semibold tracking-tight text-text-heading", className)} {...props}>
      {children}
    </h2>
  );
}

export function H3({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl md:text-2xl font-heading font-semibold tracking-tight text-text-heading", className)} {...props}>
      {children}
    </h3>
  );
}

export function P({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-base md:text-lg text-text-primary leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}
