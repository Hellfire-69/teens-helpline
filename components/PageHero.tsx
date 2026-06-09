import { ReactNode } from "react";
import Boo, { BooExpression } from "@/components/Boo";

interface PageHeroProps {
  /** Boo's expression — determines which SVG face is shown */
  booExpression?: BooExpression;
  /** Bold headline text */
  heading: string;
  /** Smaller subtitle text beneath the heading */
  subheading?: string;
  /** Background color class — defaults to sunshine yellow */
  bgColor?: string;
  /** Boo size in px — defaults to 140 */
  booSize?: number;
  /** Optional extra content (e.g. CTA buttons) */
  children?: ReactNode;
}

/**
 * PageHero — Reusable hero section used across all 5 pages.
 * Contains: background blobs, animated Boo mascot, heading, subheading, children slot.
 */
export default function PageHero({
  booExpression = "happy",
  heading,
  subheading,
  bgColor = "bg-sunshine",
  booSize = 140,
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${bgColor} py-16 md:py-24 px-4`}
      aria-label="Page hero"
    >
      {/* Drifting background blobs */}
      <div
        className="bg-blob w-64 h-64 bg-coral/20 -top-16 -left-16"
        aria-hidden="true"
      />
      <div
        className="bg-blob w-48 h-48 bg-mint/30 bottom-0 right-0"
        aria-hidden="true"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="bg-blob w-32 h-32 bg-sky/40 top-1/2 right-1/4"
        aria-hidden="true"
        style={{ animationDelay: "4s" }}
      />

      {/* Content */}
      <div className="section-wrap relative z-10 flex flex-col items-center text-center gap-4">
        {/* Boo mascot — real SVG component */}
        <Boo expression={booExpression} size={booSize} animate={true} />

        <h1
          className="font-heading text-4xl md:text-5xl lg:text-6xl text-plum text-balance"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {heading}
        </h1>

        {subheading && (
          <p className="font-body text-lg md:text-xl text-plum/70 max-w-xl text-balance">
            {subheading}
          </p>
        )}

        {children && (
          <div className="mt-2 flex flex-wrap gap-3 justify-center">
            {children}
          </div>
        )}
      </div>

      {/* Wavy bottom divider */}
      <div className="divider-wave absolute bottom-0 left-0 w-full" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-14"
        >
          <path
            d="M0 30 C240 60 480 0 720 30 C960 60 1200 0 1440 30 L1440 60 L0 60 Z"
            fill="#FFFDF7"
          />
        </svg>
      </div>
    </section>
  );
}
