import type { Metadata } from "next";
import { Fredoka, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

// ── Fonts ────────────────────────────────────────────────────────────────────
const fredokaOne = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["400", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Teens Helpline — You're Not Alone",
  description:
    "A safe, judgment-free space for teenagers to understand their feelings, get coping tools, and find real help when they need it. Talk to Boo, our friendly guide — anytime.",
  keywords: [
    "teen mental health",
    "teenagers anxiety",
    "teen stress help",
    "youth helpline India",
    "talk to someone teen",
    "free teen support",
  ],
  authors: [{ name: "Teens Helpline" }],
  openGraph: {
    title: "Teens Helpline — You're Not Alone",
    description:
      "A warm, honest place for teens to understand their feelings and find support.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teens Helpline — You're Not Alone",
    description: "A safe, judgment-free space built just for you.",
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredokaOne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="font-body bg-offwhite text-plum antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1" id="main-content" tabIndex={-1}>
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
