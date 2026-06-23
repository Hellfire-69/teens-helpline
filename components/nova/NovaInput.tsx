"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

interface NovaInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const NovaInput: React.FC<NovaInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full">
      <div className="bg-surface border border-black/10 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all flex items-end p-2 pl-4">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Reflect here..."
          className="w-full bg-transparent resize-none outline-none border-none text-text-primary placeholder:text-text-muted/40 py-3 max-h-[120px]"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="p-3 bg-primary text-white rounded-xl mb-1 ml-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
