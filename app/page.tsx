"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MousePointer2, MessageCircle, Heart, Check } from "lucide-react";
import Boo from "@/components/Boo";
import MoodSelector from "@/components/MoodSelector";
import TiltCard from "@/components/TiltCard";

// ── Quick-entry cards ─────────────────────────────────────────────────────────
const quickCards = [
  {
    id: "anxious-card",
    emoji: "😰",
    heading: "Feeling anxious?",
    body: "Your brain's alarm system is stuck on. Let's figure out why — and turn the volume down a little.",
    cta: "See what's happening",
    href: "/whats-this-feeling",
    bg: "bg-peach",
    accent: "bg-coral",
  },
  {
    id: "conflict-card",
    emoji: "😤",
    heading: "Fighting with everyone?",
    body: "Parents, friends, yourself. When everything feels like a battle, it's usually not really about the battle.",
    cta: "Talk it through",
    href: "/talk-to-boo",
    bg: "bg-mint",
    accent: "bg-plum",
  },
  {
    id: "focus-card",
    emoji: "😵‍💫",
    heading: "Can't focus on anything?",
    body: "Brain just... gone? That's a real thing. Here's something you can do right now, in 5 minutes.",
    cta: "Try this now",
    href: "/help-yourself",
    bg: "bg-sky",
    accent: "bg-plum",
  },
];

// ── Fade-up scroll animation ──────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-sunshine pt-16 md:pt-24 pb-16 md:pb-24 px-4"
        aria-label="Welcome hero"
      >
        {/* Drifting background blobs */}
        <motion.div 
          className="absolute rounded-full blur-3xl w-72 h-72 bg-coral/20 -top-20 -left-20" 
          aria-hidden="true" 
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="hidden md:block absolute rounded-full blur-3xl w-64 h-64 bg-mint/30 bottom-0 right-0" 
          aria-hidden="true" 
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="hidden md:block absolute rounded-full blur-3xl w-48 h-48 bg-peach/40 top-10 right-1/3" 
          aria-hidden="true" 
          animate={{ x: [0, 30, -40, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />

        <div className="section-wrap relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left — text + mood selector */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-plum/10 rounded-full px-4 py-1.5 text-sm font-body text-plum/70"
              >
                <span>👻</span>
                <span>No sign-up. No data. Just you.</span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl md:text-7xl lg:text-8xl text-plum leading-[1.05] text-balance tracking-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <span className="whitespace-nowrap">
                  Hey.{" "}
                  <span className="text-coral">Rough day?</span>
                </span>
                <br />
                We get it.
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-lg md:text-xl text-plum/65 max-w-md text-balance"
              >
                This place is for you — not your parents, not your teachers.
                Tell us how you&apos;re feeling and we&apos;ll figure it out together.
              </motion.p>

              {/* Mood selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-w-lg"
              >
                <MoodSelector />
              </motion.div>
            </div>

            {/* Right — Boo */}
            <motion.div
              className="hidden lg:flex w-full lg:w-1/2 flex-col items-center justify-center gap-6 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {/* Radial gradient behind Boo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/40 blur-3xl rounded-full" />
              
              {/* Floating Emojis */}
              <motion.div className="absolute -top-4 -left-6 text-3xl" animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>💭</motion.div>
              <motion.div className="absolute top-10 -right-8 text-2xl" animate={{ y: [10, -10, 10], rotate: [10, -10, 10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>✨</motion.div>
              <motion.div className="absolute bottom-16 -left-10 text-4xl" animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>🫂</motion.div>
              <motion.div className="absolute bottom-8 -right-4 text-3xl" animate={{ y: [8, -8, 8], rotate: [5, -5, 5] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>😮💨</motion.div>

              <motion.div
                className="relative z-10"
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Boo expression="happy" size={220} animate={true} />
              </motion.div>
              <motion.p
                className="font-body text-plum/50 text-sm text-center max-w-[160px] relative z-10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Hi! I&apos;m Boo 👋<br />Pick a mood above!
              </motion.p>
            </motion.div>

          </div>
        </div>

        {/* Wavy divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
            <path d="M0 30 C240 60 480 0 720 30 C960 60 1200 0 1440 30 L1440 60 L0 60 Z" fill="#FFFDF7" />
          </svg>
        </div>
      </section>

      {/* ── STATS SECTION ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 px-4 bg-offwhite" aria-label="Key statistics">
        <div className="section-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeUp delay={0.1}>
              <div className="bg-mint/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
                <span className="text-4xl md:text-5xl text-plum mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>1 in 3 teens</span>
                <span className="font-body text-plum/70 text-lg">feel this way</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="bg-sky/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
                <span className="text-4xl md:text-5xl text-plum mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>You&apos;re not alone</span>
                <span className="font-body text-plum/70 text-lg">millions do too</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="bg-peach/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
                <span className="text-4xl md:text-5xl text-plum mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>100% free</span>
                <span className="font-body text-plum/70 text-lg">always</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── HONEST LINE ──────────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-offwhite" aria-label="You are not alone">
        <FadeUp>
          <p
            className="text-center font-heading text-2xl md:text-3xl text-plum/70 max-w-xl mx-auto text-balance"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            You don&apos;t have to figure this out alone.{" "}
            <span className="text-coral">No one does.</span>
          </p>
        </FadeUp>
      </section>

      {/* ── QUICK ENTRY CARDS ────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-offwhite" aria-label="Quick entry cards">
        <div className="section-wrap">
          <FadeUp>
            <h2
              className="text-center text-3xl md:text-4xl text-plum mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Sound familiar?
            </h2>
            <p className="text-center font-body text-plum/55 mb-10 max-w-sm mx-auto">
              Tap whatever feels closest to what you&apos;re going through.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {quickCards.map((card, i) => (
              <FadeUp key={card.id} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <Link
                    href={card.href}
                    id={card.id}
                    className={`
                      group block ${card.bg} border-l-8 border-l-[var(--plum)] shadow-card-lg rounded-3xl p-8 md:p-10 h-full min-h-[320px] flex flex-col
                      transition-transform duration-250
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-plum/25
                    `}
                    style={{ borderLeftColor: card.accent === "bg-coral" ? "var(--coral)" : "var(--plum)" }}
                    aria-label={card.heading}
                  >
                    <span className="text-6xl block mb-6 group-hover:animate-wiggle" aria-hidden="true">
                      {card.emoji}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl text-plum mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {card.heading}
                    </h3>
                    <p className="font-body text-plum/70 text-base leading-relaxed mb-8 flex-1">
                      {card.body}
                    </p>
                    <span
                      className={`
                        inline-flex items-center gap-1.5 text-sm font-body font-semibold
                        text-white ${card.accent} rounded-full px-4 py-1.5
                        group-hover:shadow-warm transition-shadow duration-200
                      `}
                    >
                      {card.cta} →
                    </span>
                  </Link>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-offwhite" aria-label="How it works">
        <div className="section-wrap">
          <FadeUp>
            <h2
              className="text-center text-3xl md:text-4xl text-plum mb-12"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              How it works
            </h2>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeUp delay={0.1}>
              <div className="bg-mint/40 rounded-[2rem] p-8 flex flex-col h-full shadow-sm relative overflow-hidden">
                <span className="absolute -top-4 -right-4 text-9xl font-bold text-mint opacity-50 select-none pointer-events-none" style={{ fontFamily: "var(--font-fredoka)" }}>1</span>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <MousePointer2 className="text-plum" size={28} />
                </div>
                <h3 className="text-2xl text-plum mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>Pick how you&apos;re feeling</h3>
                <p className="font-body text-plum/70 text-base leading-relaxed">No need to know exactly what&apos;s wrong. Just click the mood or card that matches your vibe right now.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="bg-peach/40 rounded-[2rem] p-8 flex flex-col h-full shadow-sm relative overflow-hidden">
                <span className="absolute -top-4 -right-4 text-9xl font-bold text-peach opacity-50 select-none pointer-events-none" style={{ fontFamily: "var(--font-fredoka)" }}>2</span>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <MessageCircle className="text-plum" size={28} />
                </div>
                <h3 className="text-2xl text-plum mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>Explore or talk to Boo</h3>
                <p className="font-body text-plum/70 text-base leading-relaxed">Try some quick coping tools to calm down, or vent it all out to Boo. There&apos;s no wrong way to use this.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="bg-sky/40 rounded-[2rem] p-8 flex flex-col h-full shadow-sm relative overflow-hidden">
                <span className="absolute -top-4 -right-4 text-9xl font-bold text-sky opacity-50 select-none pointer-events-none" style={{ fontFamily: "var(--font-fredoka)" }}>3</span>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Heart className="text-plum" size={28} />
                </div>
                <h3 className="text-2xl text-plum mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>Feel a little less alone</h3>
                <p className="font-body text-plum/70 text-base leading-relaxed">You don&apos;t have to carry it all by yourself. We&apos;re here whenever things get heavy, day or night.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TALK TO BOO CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4 bg-plum" aria-label="Talk to Boo call to action">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-coral via-plum to-plum opacity-90" />
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-coral/30 rounded-full blur-[100px]"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky/20 rounded-full blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="section-wrap relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          <FadeUp>
            <Boo expression="listening" size={200} animate={true} />
          </FadeUp>

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <FadeUp delay={0.1}>
              <h2
                className="text-4xl md:text-6xl text-white"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Just need to talk?
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-body text-white/80 text-xl max-w-lg text-balance mb-2">
                Boo is here. No judgment, no advice you didn&apos;t ask for.
                Just someone to listen.
              </p>
              <ul className="flex flex-col gap-3 mb-6">
                <li className="flex items-center gap-3 text-white/90 font-body text-lg">
                  <span className="w-6 h-6 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0"><Check size={14} className="text-mint" /></span>
                  Completely anonymous
                </li>
                <li className="flex items-center gap-3 text-white/90 font-body text-lg">
                  <span className="w-6 h-6 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0"><Check size={14} className="text-mint" /></span>
                  No sign-up required
                </li>
                <li className="flex items-center gap-3 text-white/90 font-body text-lg">
                  <span className="w-6 h-6 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0"><Check size={14} className="text-mint" /></span>
                  Available 24/7
                </li>
              </ul>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                href="/talk-to-boo"
                id="hero-talk-to-boo-btn"
                className="btn-coral text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
              >
                👻 Talk to Boo
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CLOSING REASSURANCE ──────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-offwhite" aria-label="Closing message">
        <FadeUp>
          <p className="text-center font-body text-plum/45 text-sm max-w-md mx-auto text-balance">
            And if it ever feels like too much —{" "}
            <Link href="/real-help" className="text-coral font-semibold hover:underline">
              talking to someone real
            </Link>{" "}
            is always the bravest move. 🫧
          </p>
        </FadeUp>
      </section>
    </>
  );
}
