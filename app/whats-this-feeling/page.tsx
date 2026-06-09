"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import Boo from "@/components/Boo";
import ProblemCard, { type Problem } from "@/components/ProblemCard";
import TiltCard from "@/components/TiltCard";

// ── Problem data ──────────────────────────────────────────────────────────────
const problems: Problem[] = [
  {
    id: "anxiety",
    emoji: "😰",
    title: "Anxiety",
    tagline: "Heart racing. Mind stuck on every worst-case scenario.",
    bg: "bg-peach",
    border: "border-coral/30",
    accent: "bg-coral",
    feel: "Heart racing. Chest tight. Brain stuck on \"what if.\" Hard to breathe, sleep, or just sit still. Sometimes it shows up as random stomach aches or headaches too.",
    why: "Your brain thinks something is dangerous — even when it isn't. It's trying to protect you. It just got a bit too loud and a bit too often.",
    tryNow: "Breathe in for 4 counts, hold for 4, breathe out for 4. Do it 3 times. Your body will start to slow down — it's wired to respond to this.",
  },
  {
    id: "anger",
    emoji: "😤",
    title: "Anger",
    tagline: "Everything feels unfair. You might say things you don't mean.",
    bg: "bg-coral/15",
    border: "border-coral/40",
    accent: "bg-coral-dark",
    feel: "Hot. Tight jaw. Everything feels unfair and no one gets it. You might snap at people or feel like you could explode — and then feel terrible about it after.",
    why: "Anger usually covers a deeper feeling — hurt, fear, or feeling out of control. It's a signal, not a flaw. Something underneath it wants your attention.",
    tryNow: "Shake your hands out hard for 10 seconds. Seriously — it sounds weird but it works. Anger is energy. Give it somewhere to go before you respond.",
  },
  {
    id: "academic-stress",
    emoji: "📚",
    title: "Academic Stress",
    tagline: "The to-do list never ends. Starting feels impossible.",
    bg: "bg-sky",
    border: "border-sky-dark",
    accent: "bg-plum",
    feel: "The to-do list never ends. You can't start because failing feels worse than not trying. Or you study hard and still feel like it's never enough.",
    why: "You care — that's actually a good sign. Your brain just went into overdrive about it. Pressure from school, family, or yourself can make everything feel urgent at once.",
    tryNow: "Write down the ONE thing that matters most right now. Just one. Then spend 10 minutes on only that. Starting small beats not starting at all.",
  },
  {
    id: "peer-pressure",
    emoji: "👥",
    title: "Peer Pressure",
    tagline: "Everyone else seems fine with it. You don't want to be the one who says no.",
    bg: "bg-mint",
    border: "border-mint-dark",
    accent: "bg-plum",
    feel: "Everyone seems fine with it. You don't want to be the one who says no — or look boring, scared, or uncool. It can feel like the group's opinion is the only one that matters.",
    why: "Belonging feels like survival when you're a teen. Your brain literally craves it — that's not weakness, that's biology. But your gut knows the difference between fitting in and losing yourself.",
    tryNow: "Think of one person whose opinion matters more to you than the group's. What would they think? You don't have to explain yourself to the group — \"nah, I'm good\" is a full sentence.",
  },
  {
    id: "family",
    emoji: "🏠",
    title: "Family Problems",
    tagline: "Home doesn't feel calm. You're walking on eggshells.",
    bg: "bg-sunshine",
    border: "border-yellow-300",
    accent: "bg-plum",
    feel: "Home doesn't feel safe or calm. Maybe there's a lot of conflict, or you feel invisible, or you're carrying things no teen should have to carry. Walking on eggshells is exhausting.",
    why: "Families are complicated. Whatever is happening at home — their problems are not yours to fix, even when it feels like they are. You didn't cause it and you can't control it.",
    tryNow: "Find one space that's just yours today — a room, a playlist, a walk outside. Give yourself 20 minutes that belong only to you. You're allowed to need that.",
  },
  {
    id: "identity",
    emoji: "🪞",
    title: "Identity & Self-Worth",
    tagline: "Not sure who you are — or if people would like the real you.",
    bg: "bg-plum/10",
    border: "border-plum/25",
    accent: "bg-plum",
    feel: "Not sure who you are or if people would like the real you. You compare yourself a lot. Some days you feel okay and other days you wonder if there's something wrong with you.",
    why: "Identity is literally being built right now — your brain is doing that work. Not knowing who you are is part of the process, not a problem. It means you're paying attention.",
    tryNow: "Write 3 things you like about yourself that have nothing to do with looks or grades. They can be small. Just be honest. Keep the list somewhere you can find it.",
  },
  {
    id: "social-media",
    emoji: "📱",
    title: "Social Media Burnout",
    tagline: "Everyone looks happier than you. You scroll even when it makes you feel worse.",
    bg: "bg-peach/70",
    border: "border-coral/20",
    accent: "bg-coral",
    feel: "Everyone looks happier, prettier, more interesting than you. You keep scrolling even though it makes you feel worse — and then feel bad for feeling bad about it.",
    why: "Those apps are designed to keep you comparing. That feeling you get isn't a personal failure — it's literally the product working as intended. It's not you.",
    tryNow: "Put your phone face-down for 30 minutes. Not forever — just 30. Notice how you actually feel at the end. That gap tells you a lot.",
  },
  {
    id: "loneliness",
    emoji: "🫥",
    title: "Loneliness",
    tagline: "Surrounded by people and still feel like no one actually sees you.",
    bg: "bg-sky/60",
    border: "border-sky-dark/40",
    accent: "bg-plum",
    feel: "Surrounded by people and still feel completely alone. Like you're performing a version of yourself nobody actually knows. Like no one really sees you.",
    why: "Real connection is rare. Feeling lonely doesn't mean you're broken or unlikeable — it means you want something real, and you haven't found it yet. That's honest, not pathetic.",
    tryNow: "Send one message to one person you feel okay around. Just \"hey\" is fine. You don't have to explain why. Sometimes a tiny step is all it takes to start.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function WhatsThisFeelingPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-peach py-16 md:py-24 px-4 min-h-[500px] flex flex-col justify-center" aria-label="Page hero">
        <motion.div 
          className="absolute rounded-full blur-3xl w-80 h-80 bg-coral/20 -top-16 -right-16" 
          aria-hidden="true" 
          animate={{ x: [0, -30, 20, 0], y: [0, 40, -10, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="hidden md:block absolute rounded-full blur-3xl w-64 h-64 bg-mint/30 bottom-0 left-0" 
          aria-hidden="true" 
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="section-wrap relative z-10 flex flex-col items-center text-center gap-6">
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Boo expression="worried" size={200} animate />
          </motion.div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-plum text-balance tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            What&apos;s this feeling?
          </h1>
          <p className="font-body text-xl text-plum/65 max-w-md text-balance mt-2">
            Sometimes the hardest part is just naming it.
            Pick whatever sounds closest to what you&apos;re going through.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
            <path d="M0 30 C240 60 480 0 720 30 C960 60 1200 0 1440 30 L1440 60 L0 60 Z" fill="#FFFDF7" />
          </svg>
        </div>
      </section>

      {/* Problem grid */}
      <section className="py-14 md:py-20 px-4 bg-offwhite" aria-label="Feelings grid">
        <div className="section-wrap">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout 
              className={`grid gap-4 md:gap-5 transition-all duration-300 ${
                expandedId ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {problems.map((p, i) => (
                <TiltCard key={p.id}>
                  <ProblemCard 
                    problem={p} 
                    index={i} 
                    isExpanded={expandedId === p.id}
                    isCompact={expandedId !== null && expandedId !== p.id}
                    onClick={() => setExpandedId(expandedId === p.id ? null : p.id)} 
                  />
                </TiltCard>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom reassurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 text-center"
          >
            <p className="font-body text-plum/50 text-sm max-w-md mx-auto mb-4">
              Don&apos;t see what you&apos;re feeling? Boo&apos;s here to listen to anything.
            </p>
            <Link href="/talk-to-boo" id="feelings-talk-to-boo-btn" className="btn-coral">
              👻 Talk to Boo
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  );
}
