import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        inverse: "var(--bg-inverse)",
        
        primary: {
          DEFAULT: "var(--teal-500)",
          900: "var(--teal-900)",
          700: "var(--teal-700)",
          500: "var(--teal-500)",
          300: "var(--teal-300)",
          100: "var(--teal-100)",
          50: "var(--teal-50)",
        },
        sage: {
          500: "var(--sage-500)",
          300: "var(--sage-300)",
          100: "var(--sage-100)",
          50: "var(--sage-50)",
        },
        sand: {
          500: "var(--sand-500)",
          300: "var(--sand-300)",
          100: "var(--sand-100)",
          50: "var(--sand-50)",
        },
        signal: {
          crisis: "var(--signal-crisis)",
          warning: "var(--signal-warning)",
          success: "var(--signal-success)",
        },
        "text-primary": "var(--text-primary)",
        "text-heading": "var(--text-primary)",
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
        "text-inverse": "var(--text-inverse)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
export default config;
