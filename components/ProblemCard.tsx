"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface Problem {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  bg: string;
  border: string;
  accent: string;
  feel: string;
  why: string;
  tryNow: string;
}

interface ProblemCardProps {
  problem: Problem;
  index: number;
  onClick: () => void;
  isExpanded?: boolean;
  isCompact?: boolean;
}

export default function ProblemCard({
  problem,
  index,
  onClick,
  isExpanded = false,
  isCompact = false,
}: ProblemCardProps) {
  const tagText =
    index === 0 ? "Very common" : index === 3 ? "You're not alone" : null;

  return (
    <div
      onClick={onClick}
      id={`problem-${problem.id}`}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`
        relative overflow-hidden rounded-3xl text-left w-full
        flex flex-col cursor-pointer select-none
        border border-plum/10 ${problem.bg}
        transition-all duration-300 ease-in-out gpu
        ${isExpanded ? "shadow-card-lg" : "hover:shadow-card-lg hover:-translate-y-1"}
        ${isCompact ? "opacity-60 scale-95" : "opacity-100 scale-100"}
      `}
    >
      {/* Colored top border */}
      <div
        className={`absolute top-0 left-0 w-full h-2 ${problem.accent} z-10 transition-transform duration-300 origin-left ${isExpanded ? "scale-x-100" : "scale-x-0"}`}
      />

      <div className="p-5 md:p-6 flex flex-col gap-3 w-full">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span
              className={`leading-none select-none transition-all duration-300 ${
                isExpanded ? "text-6xl" : "text-4xl"
              }`}
              aria-hidden="true"
            >
              {problem.emoji}
            </span>

            {tagText && !isExpanded && !isCompact && (
              <span
                className={`text-[10px] font-bold uppercase tracking-wider text-white ${problem.accent} px-2 py-1 rounded-full whitespace-nowrap`}
              >
                ✦ {tagText}
              </span>
            )}
          </div>

          {/* Chevron */}
          <div className="mt-1 text-plum/40 flex-shrink-0">
            {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-plum leading-tight transition-all duration-300 ${
            isExpanded ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
          }`}
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {problem.title}
        </h3>

        {/* Default content — visible when not compact and not expanded */}
        {!isCompact && !isExpanded && (
          <div className="flex flex-col gap-2">
            <p className="font-body text-plum/60 text-sm leading-relaxed">
              {problem.tagline}
            </p>
            <span
              className={`self-start text-xs font-body font-semibold text-white ${problem.accent} rounded-full px-3 py-1`}
            >
              Tap to learn more →
            </span>
          </div>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-5 mt-2">
                {/* What it feels like */}
                <div>
                  <p className="text-xs font-body font-semibold text-coral uppercase tracking-widest mb-1.5">
                    What it feels like
                  </p>
                  <p className="font-body text-plum/75 text-[15px] leading-relaxed">
                    {problem.feel}
                  </p>
                </div>

                {/* Why it happens */}
                <div>
                  <p className="text-xs font-body font-semibold text-plum uppercase tracking-widest mb-1.5">
                    Why it happens
                  </p>
                  <p className="font-body text-plum/75 text-[15px] leading-relaxed">
                    {problem.why}
                  </p>
                </div>

                {/* Try right now */}
                <div className="bg-white/50 border border-plum/10 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-body font-semibold text-plum uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span className="text-coral">✦</span> One thing to try
                    right now
                  </p>
                  <p className="font-body text-plum/80 text-[15px] leading-relaxed font-medium">
                    {problem.tryNow}
                  </p>
                </div>

                {/* CTAs — stop propagation so clicking them doesn't collapse the card */}
                <div
                  className="flex flex-col sm:flex-row gap-3 pt-2 mt-2 border-t border-plum/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    href="/talk-to-boo"
                    id={`card-talk-${problem.id}`}
                    className="btn-coral text-sm text-center"
                  >
                    👻 Talk to Boo about this
                  </Link>
                  <Link
                    href="/help-yourself"
                    id={`card-help-${problem.id}`}
                    className="btn-outline text-sm text-center"
                  >
                    Try coping tools →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}