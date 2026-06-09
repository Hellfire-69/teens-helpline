"use client";

import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
export type BooExpression =
  | "happy"       // Home — waving, excited, welcoming
  | "listening"   // Talk to Boo — leaning in, warm eyes
  | "worried"     // What's This Feeling — slightly worried but reassuring
  | "calm"        // Help Yourself — peaceful, breathing pose
  | "supportive"; // Real Help — holding a tiny phone, warm smile

interface BooProps {
  expression?: BooExpression;
  /** Size in pixels */
  size?: number;
  /** Enable floating animation */
  animate?: boolean;
  className?: string;
}

// ── SVG face definitions per expression ──────────────────────────────────────
function HappyFace() {
  return (
    <>
      {/* Big round eyes */}
      <ellipse cx="37" cy="72" rx="7" ry="8" fill="#3D1A78" />
      <ellipse cx="63" cy="72" rx="7" ry="8" fill="#3D1A78" />
      {/* Eye shine */}
      <ellipse cx="40" cy="69" rx="2.5" ry="2.5" fill="white" />
      <ellipse cx="66" cy="69" rx="2.5" ry="2.5" fill="white" />
      {/* Wide smile */}
      <path d="M 37 87 Q 50 98 63 87" stroke="#3D1A78" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Waving arm */}
      <path d="M 80 82 Q 90 74 94 64" stroke="#3D1A78" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="94" cy="62" r="5" fill="#3D1A78" />
    </>
  );
}

function ListeningFace() {
  return (
    <>
      {/* Soft attentive eyes */}
      <ellipse cx="37" cy="72" rx="6" ry="7" fill="#3D1A78" />
      <ellipse cx="63" cy="72" rx="6" ry="7" fill="#3D1A78" />
      <ellipse cx="40" cy="69.5" rx="2" ry="2" fill="white" />
      <ellipse cx="66" cy="69.5" rx="2" ry="2" fill="white" />
      {/* Gentle warm smile */}
      <path d="M 39 87 Q 50 94 61 87" stroke="#3D1A78" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Little sparkle dots above */}
      <circle cx="68" cy="38" r="2.5" fill="#FF6B6B" opacity="0.6" />
      <circle cx="75" cy="32" r="1.8" fill="#FFD6A5" opacity="0.7" />
      <circle cx="62" cy="30" r="1.5" fill="#A8EDCA" opacity="0.7" />
    </>
  );
}

function WorriedFace() {
  return (
    <>
      {/* Eyes with worried brows */}
      <ellipse cx="37" cy="73" rx="6" ry="6.5" fill="#3D1A78" />
      <ellipse cx="63" cy="73" rx="6" ry="6.5" fill="#3D1A78" />
      {/* Furrowed brows */}
      <path d="M 30 64 Q 37 61 44 64" stroke="#3D1A78" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 56 64 Q 63 61 70 64" stroke="#3D1A78" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Uncertain mouth */}
      <path d="M 40 90 Q 50 85 60 90" stroke="#3D1A78" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Reassuring pointing hand */}
      <path d="M 74 88 Q 84 82 89 74" stroke="#3D1A78" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="90" cy="72" r="4" fill="#3D1A78" />
    </>
  );
}

function CalmFace() {
  return (
    <>
      {/* Half-closed peaceful eyes */}
      <path d="M 30 72 Q 37 66 44 72" stroke="#3D1A78" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 56 72 Q 63 66 70 72" stroke="#3D1A78" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Soft peaceful smile */}
      <path d="M 40 87 Q 50 93 60 87" stroke="#3D1A78" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Arms out — breathing pose */}
      <path d="M 20 84 Q 10 78 8 68" stroke="#3D1A78" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 80 84 Q 90 78 92 68" stroke="#3D1A78" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Little sparkle */}
      <path d="M 50 30 L 50 36 M 47 33 L 53 33" stroke="#A8EDCA" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function SupportiveFace() {
  return (
    <>
      {/* Warm gentle eyes */}
      <ellipse cx="37" cy="72" rx="6" ry="7" fill="#3D1A78" />
      <ellipse cx="63" cy="72" rx="6" ry="7" fill="#3D1A78" />
      <ellipse cx="40" cy="69.5" rx="2" ry="2" fill="white" />
      <ellipse cx="66" cy="69.5" rx="2" ry="2" fill="white" />
      {/* Wide supportive smile */}
      <path d="M 38 87 Q 50 96 62 87" stroke="#3D1A78" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Arm holding phone */}
      <path d="M 72 87 Q 82 82 86 76" stroke="#3D1A78" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Phone */}
      <rect x="84" y="67" width="10" height="17" rx="2.5" fill="#3D1A78" />
      <rect x="86" y="69.5" width="6" height="10" rx="1" fill="#BFE3FF" />
      <circle cx="89" cy="82" r="1.2" fill="white" />
    </>
  );
}

const FaceMap: Record<BooExpression, () => JSX.Element> = {
  happy:      HappyFace,
  listening:  ListeningFace,
  worried:    WorriedFace,
  calm:       CalmFace,
  supportive: SupportiveFace,
};

// ── Boo Component ─────────────────────────────────────────────────────────────
export default function Boo({
  expression = "happy",
  size = 120,
  animate = true,
  className = "",
}: BooProps) {
  const Face = FaceMap[expression];

  // Blush opacity per expression
  const blushOpacity: Record<BooExpression, number> = {
    happy:      0.5,
    listening:  0.4,
    worried:    0.2,
    calm:       0.35,
    supportive: 0.45,
  };

  const svgEl = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Boo the ghost — ${expression}`}
      role="img"
      className={className}
      style={{ overflow: "visible" }}
    >
      {/* ── Ghost body ── */}
      <path
        d="
          M 15 58
          C 15 28 85 28 85 58
          L 85 100
          C 85 100 78 91 70 100
          C 62 109 58 100 50 100
          C 42 100 38 109 30 100
          C 22 91 15 100 15 100
          Z
        "
        fill="white"
        stroke="#3D1A78"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Soft depth shadow inside */}
      <ellipse cx="50" cy="56" rx="26" ry="9" fill="#3D1A78" opacity="0.04" />

      {/* ── Blush cheeks ── */}
      <ellipse cx="28" cy="82" rx="7" ry="4" fill="#FF6B6B" opacity={blushOpacity[expression]} />
      <ellipse cx="72" cy="82" rx="7" ry="4" fill="#FF6B6B" opacity={blushOpacity[expression]} />

      {/* ── Expression face ── */}
      <Face />
    </svg>
  );

  if (!animate) return svgEl;

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-flex" }}
      className="gpu"
    >
      {svgEl}
    </motion.div>
  );
}
