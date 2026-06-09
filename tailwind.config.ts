import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'col-span-1',
    'sm:col-span-2',
    'lg:col-span-4',
    'lg:col-span-2',
  ],
  theme: {
    extend: {
      // ── Brand Colors (from PROJECT.md Design System) ──────────────────────
      colors: {
        // Core palette
        "sunshine":  "#FFF176", // Hero backgrounds, highlights
        "coral":     "#FF6B6B", // CTAs, important buttons
        "mint":      "#A8EDCA", // Cards, calm sections
        "sky":       "#BFE3FF", // Info sections, chatbot bubbles
        "peach":     "#FFD6A5", // Mood selector, warm areas
        "offwhite":  "#FFFDF7", // Page background
        "plum":      "#3D1A78", // Headings, strong text
        "mutedgray": "#6B7280", // Body text, subtitles

        // Extended shades for flexibility
        "coral-light":  "#FF9494",
        "coral-dark":   "#E84848",
        "plum-light":   "#6B3FA0",
        "plum-dark":    "#270F50",
        "mint-dark":    "#6DD4A6",
        "sky-dark":     "#87CAEE",
      },

      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        heading: ["var(--font-fredoka)", "cursive"],
        body:    ["var(--font-dm-sans)", "sans-serif"],
      },

      // ── Border Radius — aggressive everywhere ────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ── Box Shadows — soft and warm ───────────────────────────────────────
      boxShadow: {
        warm:     "0 4px 24px 0 rgba(255, 107, 107, 0.15)",
        "warm-lg":"0 8px 40px 0 rgba(255, 107, 107, 0.20)",
        card:     "0 2px 16px 0 rgba(61, 26, 120, 0.08)",
        "card-lg":"0 8px 32px 0 rgba(61, 26, 120, 0.12)",
      },

      // ── Keyframe Animations ───────────────────────────────────────────────
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%":      { transform: "translate(15px, -10px) scale(1.02)" },
          "66%":      { transform: "translate(-10px, 8px) scale(0.98)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%":      { transform: "rotate(3deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.7" },
        },
        "breathe-in": {
          "0%":   { transform: "scale(1)" },
          "100%": { transform: "scale(1.4)" },
        },
        "breathe-out": {
          "0%":   { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        float:        "float 3s ease-in-out infinite",
        "drift-slow": "drift-slow 8s ease-in-out infinite",
        "fade-up":    "fade-up 0.6s ease-out forwards",
        wiggle:       "wiggle 0.5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
