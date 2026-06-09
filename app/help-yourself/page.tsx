"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Boo from "@/components/Boo";
import CopingTab from "@/components/CopingTab";

export default function HelpYourselfPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-mint py-20 md:py-32 px-4 min-h-[400px] lg:min-h-[500px] flex flex-col justify-center"
        aria-label="Help yourself hero"
      >
        {/* Background Blobs */}
        <motion.div 
          className="absolute rounded-full blur-3xl w-72 h-72 bg-coral/20 -top-20 -left-20" 
          aria-hidden="true" 
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute rounded-full blur-3xl w-80 h-80 bg-sky/30 -top-16 -right-16" 
          aria-hidden="true" 
          animate={{ x: [0, -30, 20, 0], y: [0, 40, -10, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="hidden md:block absolute rounded-full blur-3xl w-64 h-64 bg-peach/40 bottom-0 left-10" 
          aria-hidden="true" 
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="section-wrap relative z-10 flex flex-col items-center text-center gap-6">
          <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Boo expression="calm" size={200} animate />
          </motion.div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-plum text-balance tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Help yourself
          </h1>
          <p className="font-body text-xl text-plum/65 max-w-md text-balance mt-2">
            You don&apos;t need to fix everything right now.
            Pick one thing and try it for just a few minutes.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
            <path d="M0 30 C240 60 480 0 720 30 C960 60 1200 0 1440 30 L1440 60 L0 60 Z" fill="#FFFDF7" />
          </svg>
        </div>
      </section>

      {/* ── Coping toolkit ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4 bg-offwhite" aria-label="Coping toolkit">
        <div className="section-wrap max-w-4xl">
          <CopingTab />
        </div>
      </section>

      {/* ── "Still feeling stuck?" CTA ───────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 bg-sunshine" aria-label="Still feeling stuck">
        <div className="section-wrap flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl md:text-3xl text-plum mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Still feeling stuck?
            </h2>
            <p className="font-body text-plum/60 text-base max-w-sm mx-auto mb-5">
              That&apos;s okay. Sometimes you just need to say it out loud to someone.
              Boo&apos;s right here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/talk-to-boo" id="help-talk-to-boo-btn" className="btn-coral">
                👻 Talk to Boo
              </Link>
              <Link href="/real-help" id="help-real-help-btn" className="btn-outline">
                Find real help →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Closing reassurance ──────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-offwhite">
        <p className="font-body text-center text-plum/40 text-sm max-w-md mx-auto text-balance">
          And if it ever feels like too much —{" "}
          <Link href="/real-help" className="text-coral font-semibold hover:underline">
            talking to someone real
          </Link>{" "}
          is always the bravest move. 🫧
        </p>
      </section>
    </>
  );
}
