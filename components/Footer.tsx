import Link from "next/link";
import { Phone, Heart } from "lucide-react";

const helplines = [
  {
    name: "iCall",
    number: "9152987821",
    tel: "9152987821",
    desc: "Mon–Sat, 8am–10pm",
    color: "bg-coral/10 text-coral-dark border-coral/20",
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    tel: "18602662345",
    desc: "24 hours, 7 days",
    color: "bg-mint/40 text-plum border-mint",
  },
];

const footerLinks = [
  { href: "/",                   label: "Home" },
  { href: "/whats-this-feeling", label: "What's This Feeling?" },
  { href: "/help-yourself",      label: "Help Yourself" },
  { href: "/talk-to-boo",        label: "Talk to Boo" },
  { href: "/real-help",          label: "Real Help" },
];

export default function Footer() {
  return (
    <footer className="bg-plum text-white mt-auto" role="contentinfo">
      {/* Crisis numbers — prominent, always visible */}
      <div className="bg-plum-dark py-8 px-4">
        <div className="section-wrap">
          <div className="flex items-center gap-2 mb-5 justify-center">
            <Phone size={18} className="text-coral" />
            <p className="font-heading text-lg text-white/90" style={{ fontFamily: "var(--font-fredoka)" }}>
              Need to talk to someone real?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {helplines.map((line) => (
              <a
                key={line.name}
                href={`tel:${line.tel}`}
                aria-label={`Call ${line.name} at ${line.number}`}
                className="flex flex-col items-center gap-1 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-colors duration-200 text-center border border-white/10"
              >
                <span className="text-white/60 text-xs font-body font-medium uppercase tracking-wider">
                  {line.name}
                </span>
                <span className="text-white font-heading text-2xl tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {line.number}
                </span>
                <span className="text-white/50 text-xs font-body">
                  {line.desc}
                </span>
              </a>
            ))}
          </div>

          <p className="text-center text-white/40 text-xs mt-4 font-body">
            If it&apos;s an emergency, call <strong className="text-white/70">112</strong>
          </p>
        </div>
      </div>

      {/* Footer links + brand */}
      <div className="py-8 px-4 border-t border-white/10">
        <div className="section-wrap flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🫧</span>
              <span
                className="font-heading text-lg text-white/90"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Teens Helpline
              </span>
            </div>
            <p className="text-white/40 text-xs font-body text-center md:text-left max-w-xs">
              A safe space for teens. No judgment. No data collected. Just help.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2" role="list">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white text-sm font-body transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom line */}
        <div className="section-wrap mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs font-body flex items-center gap-1">
            Made with <Heart size={11} className="text-coral fill-coral" /> for real teens
          </p>
          <p className="text-white/30 text-xs font-body">
            Always remember — you matter. 🫧
          </p>
        </div>
      </div>
    </footer>
  );
}
