"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/",                  label: "Home" },
  { href: "/whats-this-feeling", label: "What's This Feeling?" },
  { href: "/help-yourself",      label: "Help Yourself" },
  { href: "/talk-to-boo",        label: "Talk to Boo 👻" },
  { href: "/real-help",          label: "Real Help" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Skip to content — keyboard accessibility */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      {/* Crisis banner — always on top */}
      <div className="bg-coral text-white text-center py-1.5 px-4 text-sm font-body font-medium">
        Need help now? Call iCall:{" "}
        <a
          href="tel:9152987821"
          className="font-bold underline underline-offset-2 hover:no-underline"
        >
          9152987821
        </a>
        {" "}· Vandrevala:{" "}
        <a
          href="tel:1-800-950-NAMI"
          className="font-bold underline underline-offset-2 hover:no-underline"
        >
          1-800-950-NAMI
        </a>
      </div>

      {/* Main nav bar */}
      <nav
        className="bg-offwhite/90 backdrop-blur-md border-b border-plum/10"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-wrap flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Teens Helpline — Home"
          >
            <span className="text-2xl group-hover:animate-wiggle inline-block transition-transform">
              🫧
            </span>
            <span
              className="font-heading text-xl text-plum leading-none"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Teens Helpline
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      relative px-3 py-2 rounded-full text-sm font-body font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-plum text-white"
                          : "text-plum hover:bg-plum/10"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-plum/30 ring-offset-1" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-full hover:bg-plum/10 text-plum transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          id="mobile-menu"
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
          aria-hidden={!menuOpen}
        >
          <ul
            className="flex flex-col gap-1 px-4 pb-4 pt-2 border-t border-plum/10"
            role="list"
          >
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      block px-4 py-3 rounded-2xl text-sm font-body font-medium
                      transition-colors duration-150
                      ${
                        isActive
                          ? "bg-plum text-white"
                          : "text-plum hover:bg-plum/10"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
