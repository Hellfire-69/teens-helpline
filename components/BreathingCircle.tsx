"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Breathing phases ──────────────────────────────────────────────────────────
type Phase = "idle" | "inhale" | "hold" | "exhale";

const phaseConfig: Record<Phase, { label: string; duration: number; scale: number; color: string; emoji: string }> = {
  idle:    { label: "Press start",   duration: 0, scale: 1,   color: "#BFE3FF", emoji: "🧘" },
  inhale:  { label: "Breathe in...", duration: 4, scale: 1.5, color: "#A8EDCA", emoji: "😮💨" },
  hold:    { label: "Hold...",       duration: 7, scale: 1.5, color: "#FFD6A5", emoji: "😌" },
  exhale:  { label: "Breathe out...",duration: 8, scale: 1,   color: "#BFE3FF", emoji: "😶" },
};

const phaseOrder: Phase[] = ["inhale", "hold", "exhale"];

export default function BreathingCircle() {
  const [phase, setPhase]       = useState<Phase>("idle");
  const [count, setCount]       = useState(0);
  const [cycles, setCycles]     = useState(0);
  const [running, setRunning]   = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);

  // Countdown tick
  useEffect(() => {
    if (!running || phase === "idle") return;
    if (count <= 0) return;

    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, phase, count]);

  // Advance phase when count hits 0
  useEffect(() => {
    if (!running || phase === "idle" || count > 0) return;

    const nextIdx = (phaseIdx + 1) % phaseOrder.length;
    const nextPhase = phaseOrder[nextIdx];

    if (nextIdx === 0) setCycles((c) => c + 1); // completed one full cycle
    setPhaseIdx(nextIdx);
    setPhase(nextPhase);
    setCount(phaseConfig[nextPhase].duration);
  }, [count, running, phase, phaseIdx]);

  const handleStart = useCallback(() => {
    setRunning(true);
    setPhaseIdx(0);
    setPhase("inhale");
    setCount(phaseConfig.inhale.duration);
    setCycles(0);
  }, []);

  const handleStop = useCallback(() => {
    setRunning(false);
    setPhase("idle");
    setCount(0);
    setPhaseIdx(0);
  }, []);

  const cfg = phaseConfig[phase];

  return (
    <div className="flex flex-col items-center gap-12 py-16 md:py-20">
      {/* Breathing circle */}
      <div className="relative flex items-center justify-center min-h-[420px]">
        {/* Outer glow ring */}
        <motion.div
          animate={{
            scale: cfg.scale * 1.3,
            backgroundColor: cfg.color,
            boxShadow: `0 0 ${phase === "inhale" || phase === "hold" ? "120px" : "40px"} ${cfg.color}80`,
          }}
          transition={{ duration: cfg.duration || 0.4, ease: phase === "exhale" ? "easeIn" : "easeOut" }}
          className="absolute w-[280px] h-[280px] rounded-full opacity-60"
        />

        {/* Main circle */}
        <motion.div
          role="button"
          tabIndex={0}
          onClick={!running ? handleStart : handleStop}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!running) handleStart();
              else handleStop();
            }
          }}
          animate={{ scale: cfg.scale, backgroundColor: cfg.color }}
          transition={{ duration: cfg.duration || 0.4, ease: phase === "exhale" ? "easeIn" : "easeOut" }}
          className="relative w-[280px] h-[280px] rounded-full flex flex-col items-center justify-center shadow-card-lg z-10 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-plum/20"
        >
          {/* Phase label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-6xl mb-2" aria-hidden="true">
                {cfg.emoji}
              </span>
              <span
                className={`text-plum text-center px-2 leading-tight ${phase === "idle" ? "text-2xl" : "text-xl"}`}
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {cfg.label}
              </span>
              {running && phase !== "idle" && (
                <span className="text-plum/60 font-body text-3xl font-light tabular-nums">
                  {count}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4-7-8 guide */}
      <div className="flex items-center gap-4 md:gap-6">
        {(["inhale", "hold", "exhale"] as Phase[]).map((p) => (
          <div
            key={p}
            className={`flex flex-col items-center gap-1 transition-opacity duration-300 ${phase === p ? "opacity-100" : "opacity-30"}`}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: phaseConfig[p].color }}
            />
            <span className="font-body text-xs text-plum/70 capitalize">{p}</span>
            <span className="font-body text-xs text-plum/50">{phaseConfig[p].duration}s</span>
          </div>
        ))}
      </div>

      {/* Cycle counter */}
      {cycles > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-body text-sm text-plum/50"
        >
          {cycles} {cycles === 1 ? "cycle" : "cycles"} done 🌿
        </motion.p>
      )}

      {/* Controls */}
      {!running ? (
        <button
          id="breathing-start-btn"
          onClick={handleStart}
          className="btn-coral text-base px-8"
        >
          Start breathing
        </button>
      ) : (
        <button
          id="breathing-stop-btn"
          onClick={handleStop}
          className="btn-outline text-base px-8"
        >
          Stop
        </button>
      )}

      <p className="font-body text-xs text-plum/40 text-center max-w-xs">
        The 4-7-8 technique. Inhale 4s · Hold 7s · Exhale 8s.
        Do at least 3 cycles to feel the difference.
      </p>
    </div>
  );
}
