"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NovaGlyph } from "@/components/nova/NovaGlyph";
import { CrisisStrip } from "./layout/CrisisStrip";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/real-help", label: "Real Help" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      <CrisisStrip />
      
      {/* Main nav bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled || menuOpen ? "bg-[var(--bg-base)] border-b border-[var(--bg-elevated)]" : "bg-transparent border-b border-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Teens Helpline — Home"
          >
            <NovaGlyph size={24} state="resting" />
            <span className="font-body font-medium text-[var(--text-primary)]">
              Teens Helpline
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      text-[14px] font-body font-medium transition-colors duration-200
                      ${isActive ? "text-[var(--teal-700)]" : "text-[var(--text-muted)] hover:text-[var(--teal-500)]"}
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-full text-[14px] font-body font-medium bg-[var(--teal-500)] text-white hover:bg-[var(--teal-300)] transition-colors duration-200 shadow-sm"
            >
              Open my space
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-full hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Full-screen mobile overlay menu */}
        <div
          id="mobile-menu"
          className={`
            md:hidden absolute top-[100%] left-0 w-full h-[calc(100vh-100px)] bg-[var(--bg-base)]
            transition-all duration-300 ease-in-out border-t border-[var(--bg-elevated)]
            ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
          `}
          aria-hidden={!menuOpen}
        >
          <div className="flex flex-col h-full px-6 py-8">
            <ul className="flex flex-col gap-6" role="list">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`
                        block text-2xl font-heading
                        transition-colors duration-150
                        ${isActive ? "text-[var(--teal-700)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="mt-auto pb-12">
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center px-6 py-4 rounded-full text-[16px] font-body font-medium bg-[var(--teal-500)] text-white"
              >
                Open my space
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
