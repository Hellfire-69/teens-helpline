import React from 'react';

export function CrisisStrip() {
  return (
    <div className="w-full bg-[var(--signal-crisis)] text-white h-9 flex items-center justify-center px-4 z-[100] relative">
      <p className="text-sm font-medium tracking-wide">
        Need help now? iCall: <a href="tel:9152987821" className="underline hover:text-white/80 transition-colors">9152987821</a>
      </p>
    </div>
  );
}
