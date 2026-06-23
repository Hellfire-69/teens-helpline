import Link from "next/link";
import { NovaGlyph } from "@/components/nova/NovaGlyph";

const helplines = [
  {
    name: "iCall",
    number: "9152987821",
    tel: "9152987821",
    desc: "Mon–Sat, 8am–10pm",
  },
  {
    name: "Vandrevala",
    number: "1860-2662-345",
    tel: "18602662345",
    desc: "24/7",
  },
  {
    name: "Emergency",
    number: "112",
    tel: "112",
    desc: "Immediate Danger",
  }
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/real-help", label: "Real Help" },
  { href: "/privacy", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--teal-900)] text-[var(--text-inverse)] mt-auto" role="contentinfo">
      {/* Row 1 - Crisis numbers */}
      <div className="py-16 px-4 border-b border-[var(--teal-700)]">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-heading text-2xl text-center mb-8">
            Need to talk to someone real?
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            {helplines.map((line) => (
              <a
                key={line.name}
                href={`tel:${line.tel}`}
                aria-label={`Call ${line.name} at ${line.number}`}
                className="flex flex-col items-center gap-1 group"
              >
                <span className="text-[var(--teal-100)] text-[12px] font-body uppercase tracking-wider">
                  {line.name}
                </span>
                <span className="text-[var(--teal-300)] font-heading text-3xl group-hover:text-white transition-colors">
                  {line.number}
                </span>
                <span className="text-[var(--teal-100)] text-[14px] font-body opacity-70">
                  {line.desc}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 - Standard footer */}
      <div className="py-12 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <NovaGlyph size={20} state="resting" />
              <span className="font-body font-medium text-white">
                Teens Helpline
              </span>
            </Link>
            <p className="text-[var(--teal-100)] text-[14px] font-body opacity-70">
              A private space for teens.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4" role="list">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[var(--teal-100)] opacity-70 hover:opacity-100 hover:text-white text-[14px] font-body transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Attribution */}
          <div className="text-[var(--teal-100)] text-[12px] font-body opacity-70">
            Made for real teens.
          </div>

        </div>
      </div>
    </footer>
  );
}
