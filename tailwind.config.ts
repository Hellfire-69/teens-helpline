import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        "text-primary": "var(--text-primary)",
        "text-heading": "var(--text-heading)",
        "text-muted": "var(--text-muted)",
        mood: {
          calm: "var(--mood-calm)",
          happy: "var(--mood-happy)",
          neutral: "var(--mood-neutral)",
          anxious: "var(--mood-anxious)",
          sad: "var(--mood-sad)",
          overwhelmed: "var(--mood-overwhelmed)",
        },
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
