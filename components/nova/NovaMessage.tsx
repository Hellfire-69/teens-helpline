import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface NovaMessageProps {
  role: 'user' | 'model';
  content: string;
}

export const NovaMessage: React.FC<NovaMessageProps> = ({ role, content }) => {
  const isNova = role === 'model';
  
  return (
    <div className={cn(
      "w-full flex mb-8",
      isNova ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-2xl w-full flex gap-4",
        !isNova && "flex-row-reverse"
      )}>
        {isNova && (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        )}
        <div className={cn(
          "text-lg leading-relaxed whitespace-pre-wrap",
          isNova ? "text-text-primary font-medium" : "text-text-muted pr-12"
        )}>
          {content}
        </div>
      </div>
    </div>
  );
};
