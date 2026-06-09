"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

import BreathingCircle from "@/components/BreathingCircle";

// ── Tab definitions ───────────────────────────────────────────────────────────
const tabs = [
  { id: "breathe", label: "🌬️ Breathe" },
  { id: "move",    label: "🤸 Move"    },
  { id: "write",   label: "✏️ Write"   },
  { id: "think",   label: "💭 Think"   },
] as const;

type TabId = typeof tabs[number]["id"];

// ── Move cards ────────────────────────────────────────────────────────────────
const moveCards = [
  {
    id: "shake",
    emoji: "🤲",
    title: "Shake it out",
    desc: "Stand up. Shake your hands, arms, and shoulders hard for 30 seconds. Let it be weird. Your body is holding tension — this gets it out.",
    duration: "30 seconds",
    bg: "bg-peach",
  },
  {
    id: "stretch",
    emoji: "🙆",
    title: "Stretch up",
    desc: "Reach both arms overhead as high as you can. Hold for 10 seconds, breathe slowly, then let them drop. Do this 3 times.",
    duration: "1 minute",
    bg: "bg-mint",
  },
  {
    id: "walk",
    emoji: "🚶",
    title: "Take a walk",
    desc: "Even 5 minutes outside — or just around the house — genuinely helps. Put headphones in if you want. No destination needed.",
    duration: "5+ minutes",
    bg: "bg-sky",
  },
];

// ── Write prompts — 9 total, show 3 rotated by day ───────────────────────────
const allPrompts = [
  "Right now I feel... and that makes sense because...",
  "Three things that are actually okay right now:",
  "If my best friend felt this way, I'd tell them...",
  "The thing I'm most worried about is... and the worst that could actually happen is...",
  "One thing I did recently that I'm quietly proud of:",
  "If I could tell my future self one thing right now:",
  "What I really need right now, and why it's hard to ask for it:",
  "Something small that made me feel a tiny bit better today:",
  "I feel most like myself when...",
];

function getDailyPrompts(): string[] {
  const day = new Date().getDay(); // 0-6
  const start = (day * 3) % allPrompts.length;
  return [
    allPrompts[start % allPrompts.length],
    allPrompts[(start + 1) % allPrompts.length],
    allPrompts[(start + 2) % allPrompts.length],
  ];
}

// ── Think reframe cards ───────────────────────────────────────────────────────
const allReframes = [
  {
    id: "reframe-1",
    from: "Everyone can see I'm struggling.",
    to:   "Other people are mostly thinking about themselves. You're less visible than you think.",
  },
  {
    id: "reframe-2",
    from: "I ruined everything.",
    to:   "You made a mistake. That's different from ruining everything. Mistakes are fixable.",
  },
  {
    id: "reframe-3",
    from: "Nothing will ever get better.",
    to:   "This is how it feels right now. Feelings aren't facts. They change — always.",
  },
  {
    id: "reframe-4",
    from: "I'm the only one who feels this way.",
    to:   "Millions of people have felt exactly what you're feeling. You are not alone.",
  },
  {
    id: "reframe-5",
    from: "I have to figure everything out right now.",
    to:   "You only have to figure out the next step. The rest can wait until tomorrow.",
  },
  {
    id: "reframe-6",
    from: "They probably hate me.",
    to:   "Unless they told you, you are just guessing. Don't read their mind for them.",
  },
  {
    id: "reframe-7",
    from: "I should be over this by now.",
    to:   "Healing takes exactly as long as it takes. There is no timeline you have to meet.",
  },
  {
    id: "reframe-8",
    from: "I am completely worthless.",
    to:   "Your worth is not tied to your productivity, grades, or how someone treated you.",
  },
  {
    id: "reframe-9",
    from: "It's all my fault.",
    to:   "There are always many factors involved. It is almost never 100% one person's fault.",
  },
  {
    id: "reframe-10",
    from: "I should have known better.",
    to:   "You made the best choice you could with the information you had at the time.",
  },
  {
    id: "reframe-11",
    from: "I'm falling behind everyone else.",
    to:   "Everyone is on a different path and timeline. You are exactly where you need to be.",
  },
  {
    id: "reframe-12",
    from: "I'll never figure this out.",
    to:   "You haven't figured it out *yet*. It takes time and practice to learn new things.",
  },
  {
    id: "reframe-13",
    from: "They didn't text back, they must be mad at me.",
    to:   "People get busy, tired, or distracted. Their silence is usually about them, not you.",
  },
  {
    id: "reframe-14",
    from: "I'm a burden to my friends.",
    to:   "Your friends care about you. Letting them support you is how connection is built.",
  },
  {
    id: "reframe-15",
    from: "I feel anxious, so something terrible is going to happen.",
    to:   "Anxiety is a feeling, not a prediction of the future. It's just a false alarm going off.",
  },
  {
    id: "reframe-16",
    from: "I can't handle this.",
    to:   "You've survived 100% of your bad days so far. You have the strength to get through this one too.",
  }
];

// ── CopyButton helper ─────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy prompt"}
      className={`p-2.5 rounded-xl border transition-all flex-shrink-0 ${copied ? "bg-mint/20 border-mint text-mint-dark" : "bg-white border-plum/20 text-plum/60 hover:text-plum hover:border-plum/40 shadow-sm"}`}
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}

// ── Tab content components ────────────────────────────────────────────────────
function BreatheTab() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-body text-plum/60 text-sm text-center max-w-sm">
        The 4-7-8 technique activates your body&apos;s natural calm response.
        You&apos;ll feel it within 3 cycles.
      </p>
      <BreathingCircle />
    </div>
  );
}

function MoveTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {moveCards.map((card) => (
        <div
          key={card.id}
          id={`move-${card.id}`}
          className={`${card.bg} rounded-3xl p-8 flex flex-col gap-4 shadow-sm min-h-[260px]`}
        >
          <span className="text-6xl mb-2" aria-hidden="true">{card.emoji}</span>
          <div>
            <h3 className="text-2xl text-plum mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
              {card.title}
            </h3>
            <span className="inline-block text-sm font-body font-medium text-plum/60 bg-white/50 rounded-full px-3 py-1">
              {card.duration}
            </span>
          </div>
          <p className="font-body text-plum/80 text-base leading-relaxed flex-1 mt-1">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}

function WriteTab() {
  const prompts = getDailyPrompts();

  return (
    <div className="flex flex-col gap-5">
      <p className="font-body text-plum/60 text-base text-center mb-2">
        Today&apos;s prompts. Copy one into your notes app and just start writing — no rules.
      </p>
      {prompts.map((prompt, i) => (
        <div
          key={i}
          id={`write-prompt-${i + 1}`}
          className={`border border-plum/10 rounded-3xl p-6 md:p-8 flex items-start justify-between gap-6 shadow-sm ${i === 0 ? "bg-peach/20" : i === 1 ? "bg-mint/20" : "bg-sky/20"}`}
        >
          <p className="font-body text-plum/90 text-lg md:text-xl leading-relaxed italic flex-1">
            &ldquo;{prompt}&rdquo;
          </p>
          <CopyButton text={prompt} />
        </div>
      ))}
      <p className="font-body text-plum/40 text-sm text-center mt-2">
        Prompts rotate daily 🌀
      </p>
    </div>
  );
}

function ThinkTab() {
  const [currentReframes, setCurrentReframes] = useState(allReframes.slice(0, 3));

  const handleShuffle = useCallback(() => {
    setCurrentReframes(prev => {
      // Get reframes that are NOT currently displayed
      const available = allReframes.filter(r => !prev.find(p => p.id === r.id));
      const shuffled = [...available].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    });
  }, []);

  // Auto-shuffle every 20 seconds
  useEffect(() => {
    const interval = setInterval(handleShuffle, 20000);
    return () => clearInterval(interval);
  }, [handleShuffle]);

  return (
    <div className="flex flex-col gap-6">
      <p className="font-body text-plum/60 text-base text-center max-w-sm mx-auto mb-2">
        Sometimes our brain gets stuck on one thought.
        Try gently swapping it for something more honest.
      </p>
      
      <AnimatePresence mode="popLayout">
        {currentReframes.map((r) => (
          <motion.div 
            key={r.id} 
            id={r.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-plum/10 rounded-3xl overflow-hidden shadow-sm"
          >
            {/* "When you think" side */}
            <div className="bg-coral/10 px-6 md:px-8 pt-6 pb-5">
              <p className="text-sm font-body font-bold text-coral uppercase tracking-widest mb-2">
                When you think...
              </p>
              <p className="font-body text-plum/80 text-lg italic">&ldquo;{r.from}&rdquo;</p>
            </div>

            {/* Arrow divider */}
            <div className="bg-white px-8 py-0 flex items-center justify-center -my-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-offwhite border border-plum/10 flex items-center justify-center shadow-sm">
                <span className="text-plum/40 text-xl leading-none" aria-hidden="true">↓</span>
              </div>
            </div>

            {/* "Try thinking" side */}
            <div className="bg-mint/10 px-6 md:px-8 pt-7 pb-6">
              <p className="text-sm font-body font-bold text-mint-dark uppercase tracking-widest mb-2">
                Try thinking instead...
              </p>
              <p className="font-body text-plum text-lg leading-relaxed">{r.to}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex justify-center mt-2">
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-plum/15 text-plum/70 font-body text-sm font-semibold hover:bg-plum/5 hover:text-plum transition-all shadow-sm bg-white"
        >
          Show me different ones 🔀
        </button>
      </div>
    </div>
  );
}

const tabContent: Record<TabId, React.ReactNode> = {
  breathe: <BreatheTab />,
  move:    <MoveTab />,
  write:   <WriteTab />,
  think:   <ThinkTab />,
};

// ── Main export ───────────────────────────────────────────────────────────────
export default function CopingTab() {
  const [active, setActive] = useState<TabId>("breathe");

  return (
    <div className="w-full">
      {/* Top area with tabs */}
      <div className="flex items-center justify-center mb-10">
        {/* Tab bar */}
        <div
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
          aria-label="Coping tools"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={active === tab.id ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } } : {}}
              className={`
                flex-shrink-0 px-6 py-3 rounded-full text-base font-body font-semibold
                transition-colors duration-200 whitespace-nowrap
                ${active === tab.id
                  ? "bg-plum text-white shadow-card"
                  : "bg-white border border-plum/15 text-plum/60 hover:text-plum hover:border-plum/40"
                }
              `}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {tabContent[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
