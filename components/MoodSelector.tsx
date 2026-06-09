"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// ── Mood data ─────────────────────────────────────────────────────────────────
const moods = [
  {
    id: "numb",
    emoji: "😶",
    label: "Numb",
    caption: "Feeling nothing at all",
    bg: "bg-sky",
    border: "border-sky-dark",
    route: "/talk-to-boo",
  },
  {
    id: "angry",
    emoji: "😤",
    label: "Angry",
    caption: "Everything is frustrating",
    bg: "bg-coral/20",
    border: "border-coral",
    route: "/whats-this-feeling",
  },
  {
    id: "anxious",
    emoji: "😰",
    label: "Anxious",
    caption: "Mind won't stop racing",
    bg: "bg-peach",
    border: "border-coral/40",
    route: "/whats-this-feeling",
  },
  {
    id: "sad",
    emoji: "😔",
    label: "Sad",
    caption: "Just feeling really low",
    bg: "bg-plum/10",
    border: "border-plum/30",
    route: "/talk-to-boo",
  },
  {
    id: "overwhelmed",
    emoji: "😵‍💫",
    label: "Overwhelmed",
    caption: "Too much, all at once",
    bg: "bg-mint",
    border: "border-mint-dark",
    route: "/help-yourself",
  },
  {
    id: "bleh",
    emoji: "😐",
    label: "Just... bleh",
    caption: "Can't even explain it",
    bg: "bg-sunshine",
    border: "border-yellow-300",
    route: "/talk-to-boo",
  },
] as const;

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 22 } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function MoodSelector() {
  const router = useRouter();

  return (
    <div className="w-full relative">
      {/* ── Subtle sparkle background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-0 flex justify-center items-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <p
          className="text-center text-plum/60 font-body text-sm font-medium mb-4 tracking-wide uppercase"
        >
          How are you feeling right now?
        </p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              id={`mood-${mood.id}`}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(mood.route)}
              className={`
                ${mood.bg} border-2 ${mood.border}
                rounded-3xl p-4 md:p-5
                flex flex-col items-center gap-2
                cursor-pointer transition-shadow duration-200
                hover:shadow-card-lg
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-plum/30
              `}
              aria-label={`I'm feeling ${mood.label} — ${mood.caption}`}
            >
              <span className="text-4xl md:text-5xl leading-none select-none" role="img" aria-hidden="true">
                {mood.emoji}
              </span>
              <span
                className="font-heading text-plum text-base md:text-lg leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {mood.label}
              </span>
              <span className="font-body text-plum/50 text-xs text-center leading-snug">
                {mood.caption}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
