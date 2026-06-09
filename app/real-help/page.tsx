"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Boo from "@/components/Boo";
import HelpCard from "@/components/HelpCard";

// ── Data ──────────────────────────────────────────────────────────────────────
const helplines = [
  {
    id: "icall-card",
    name: "iCall",
    number: "9152987821",
    tel: "9152987821",
    hours: "Monday–Saturday, 8am–10pm",
    description:
      "Trained counsellors who listen without judgment. You can call, message, or email. Free for students and young people.",
    bg: "bg-sky",
    accent: "bg-plum",
  },
  {
    id: "vandrevala-card",
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    tel: "18602662345",
    hours: "24 hours, 7 days a week",
    description:
      "Round-the-clock mental health helpline. Free, confidential, and available any time — including right now.",
    bg: "bg-peach",
    accent: "bg-coral",
  },
];

const steps = [
  {
    id: 1,
    emoji: "🎯",
    title: "Pick one person",
    desc: "Think of one adult you feel even a little okay around. A parent, a teacher, an aunt or uncle, a school counsellor. Just one.",
  },
  {
    id: 2,
    emoji: "📍",
    title: "Find a calm moment",
    desc: "Not in the middle of an argument. Not when everyone's rushed. A quiet time — after dinner, on a walk — is easier.",
  },
  {
    id: 3,
    emoji: "💬",
    title: "Use the script",
    desc: "You don't have to explain everything. Just starting the conversation is enough. Scroll down for exact words you can use.",
  },
  {
    id: 4,
    emoji: "🌿",
    title: "Let them help",
    desc: "You don't have to figure out what happens next. That's their job. Your job was just to say it out loud. You did the hard part.",
  },
];

const scripts = [
  {
    id: "script-overwhelmed",
    label: "If you're overwhelmed",
    quote:
      "\"I've been feeling really overwhelmed lately and I think I need to talk to someone. I don't really know how to explain it yet, but I wanted you to know.\"",
    bg: "bg-sky",
  },
  {
    id: "script-anxiety",
    label: "If anxiety is getting bad",
    quote:
      "\"I've been having a really hard time with anxiety. It's been affecting school and just... everything. Can we talk about it?\"",
    bg: "bg-peach",
  },
  {
    id: "script-sad",
    label: "If you've been feeling really sad",
    quote:
      "\"I've been feeling really low for a while now. I don't want to make a big deal of it, but I think I might need some help.\"",
    bg: "bg-mint",
  },
  {
    id: "script-not-safe",
    label: "If you don't feel safe",
    quote:
      "\"I need to tell you something important and I need you to listen before you react. I don't feel safe and I need help.\"",
    bg: "bg-coral/20",
  },
];

// ── FadeUp helper ─────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" }) {
  const initialX = direction === "left" ? -40 : direction === "right" ? 40 : 0;
  const initialY = direction === "up" ? 24 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={direction !== "up" ? "h-full" : ""}
    >
      {children}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RealHelpPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-sky py-16 md:py-24 px-4 min-h-[500px] flex flex-col justify-center" aria-label="Real help hero">
        <motion.div 
          className="absolute rounded-full blur-3xl w-80 h-80 bg-mint/40 -top-16 -left-16" 
          aria-hidden="true" 
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="hidden md:block absolute rounded-full blur-3xl w-64 h-64 bg-peach/40 bottom-0 right-10" 
          aria-hidden="true" 
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="section-wrap relative z-10 flex flex-col items-center text-center gap-6">
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Boo expression="supportive" size={200} animate />
          </motion.div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-plum text-balance tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Real help is out there
          </h1>
          <p className="font-body text-xl text-plum/65 max-w-md text-balance mt-2">
            Reaching out to a real person takes courage.
            Here&apos;s everything you need to make that easier.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
            <path d="M0 30 C240 60 480 0 720 30 C960 60 1200 0 1440 30 L1440 60 L0 60 Z" fill="#FFFDF7" />
          </svg>
        </div>
      </section>

      {/* ── Is this an emergency? ─────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-offwhite" aria-label="Emergency check">
        <div className="section-wrap max-w-2xl">
          <FadeUp>
            <h2
              className="text-2xl md:text-3xl text-plum text-center mb-6"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Is this an emergency?
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* YES */}
            <FadeUp delay={0.05} direction="left">
              <div id="emergency-yes" className="bg-coral/15 border-2 border-coral/30 rounded-3xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={20} className="text-coral flex-shrink-0" />
                  <span className="font-heading text-lg text-plum" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Yes — I&apos;m not safe right now
                  </span>
                </div>
                <p className="font-body text-plum/65 text-sm leading-relaxed">
                  If you or someone else is in immediate danger, call emergency services first.
                </p>
                <a
                  href="tel:112"
                  className="bg-coral text-white font-body font-semibold rounded-full px-5 py-2.5 text-sm text-center hover:bg-coral-dark transition-colors"
                  aria-label="Call emergency services at 112"
                >
                  Call 112 — Emergency
                </a>
                <a
                  href="tel:9152987821"
                  className="border-2 border-coral text-coral font-body font-semibold rounded-full px-5 py-2.5 text-sm text-center hover:bg-coral/10 transition-colors"
                >
                  Or call iCall: 9152987821
                </a>
              </div>
            </FadeUp>

            {/* NO */}
            <FadeUp delay={0.15} direction="right">
              <div id="emergency-no" className="bg-mint/40 border-2 border-mint-dark/30 rounded-3xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-plum/60 flex-shrink-0" />
                  <span className="font-heading text-lg text-plum" style={{ fontFamily: "var(--font-fredoka)" }}>
                    No — but I need support
                  </span>
                </div>
                <p className="font-body text-plum/65 text-sm leading-relaxed">
                  You&apos;re in the right place. Keep reading — the helplines and steps below are for exactly this.
                </p>
                <Link
                  href="#helplines"
                  className="bg-plum text-white font-body font-semibold rounded-full px-5 py-2.5 text-sm text-center hover:bg-plum-dark transition-colors"
                >
                  See helplines ↓
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Helplines ────────────────────────────────────────────────────── */}
      <section id="helplines" className="py-14 md:py-20 px-4 bg-offwhite" aria-label="Helplines">
        <div className="section-wrap max-w-2xl">
          <FadeUp>
            <h2
              className="text-2xl md:text-3xl text-plum text-center mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Helplines you can call right now
            </h2>
            <p className="font-body text-plum/50 text-sm text-center mb-8">
              Both are free. Both are confidential. Tap to call.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helplines.map((h, i) => (
              <HelpCard key={h.id} {...h} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How to tell a trusted adult ───────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-sunshine" aria-label="How to tell a trusted adult">
        <div className="section-wrap max-w-2xl">
          <FadeUp>
            <h2
              className="text-2xl md:text-3xl text-plum text-center mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              How to tell a trusted adult
            </h2>
            <p className="font-body text-plum/55 text-sm text-center mb-10 max-w-sm mx-auto">
              You don&apos;t need to have it all figured out. You just need to start.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <FadeUp key={step.id} delay={i * 0.2}>
                <div
                  id={`step-${step.id}`}
                  className="bg-white rounded-3xl p-5 flex items-start gap-4 shadow-card"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-sunshine rounded-2xl flex items-center justify-center text-xl">
                    {step.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-body text-xs font-semibold text-plum/40 uppercase tracking-widest">
                        Step {step.id}
                      </span>
                    </div>
                    <h3 className="text-lg text-plum mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
                      {step.title}
                    </h3>
                    <p className="font-body text-plum/65 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Script cards ─────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-offwhite" aria-label="What to say scripts">
        <div className="section-wrap max-w-2xl">
          <FadeUp>
            <h2
              className="text-2xl md:text-3xl text-plum text-center mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Not sure what to say?
            </h2>
            <p className="font-body text-plum/55 text-sm text-center mb-8 max-w-sm mx-auto">
              You could literally read one of these out loud. That&apos;s completely okay.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-4">
            {scripts.map((s, i) => (
              <FadeUp key={s.id} delay={i * 0.07}>
                <div id={s.id} className={`${s.bg} rounded-3xl p-5 md:p-6`}>
                  <p className="font-body text-xs font-semibold text-plum/50 uppercase tracking-widest mb-3">
                    {s.label}
                  </p>
                  <p className="font-body text-plum/80 text-base leading-relaxed italic">
                    {s.quote}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <p className="font-body text-plum/40 text-xs text-center mt-8">
              You don&apos;t have to explain everything at once. Starting the conversation is enough.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-plum" aria-label="Final support message">
        <div className="section-wrap flex flex-col items-center text-center gap-4">
          <FadeUp>
            <p
              className="text-2xl text-white"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Still not ready to call?
            </p>
            <p className="font-body text-white/60 text-sm mt-1 mb-4 max-w-xs mx-auto">
              Boo is here right now. No phone needed. Just type.
            </p>
            <Link href="/talk-to-boo" id="real-help-talk-btn" className="btn-coral">
              👻 Talk to Boo first
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-8 px-4 bg-offwhite">
        <p className="font-body text-center text-plum/40 text-xs max-w-md mx-auto">
          And if it ever feels like too much — talking to someone real is always the bravest move. 🫧
        </p>
      </section>
    </>
  );
}
