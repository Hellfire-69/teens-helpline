import ChatInterface from "@/components/ChatInterface";
import { Phone } from "lucide-react";

export const metadata = {
  title: "Talk to Boo — Teens Helpline",
  description: "Chat with Boo, a friendly ghost who listens without judgment. Tell Boo anything — no data saved, no one watching.",
};

export default function TalkToBooPage() {
  return (
    <>
      {/* Slim header bar */}
      <div className="bg-plum px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-base">
            👻
          </div>
          <div>
            <p className="font-heading text-white text-base leading-none" style={{ fontFamily: "var(--font-fredoka)" }}>
              Boo
            </p>
            <p className="font-body text-white/50 text-xs">Always here · Never judges</p>
          </div>
        </div>

        <a
          href="tel:9152987821"
          id="chat-icall-link"
          className="flex items-center gap-1.5 bg-coral/20 hover:bg-coral/30 text-coral text-xs font-body font-semibold rounded-full px-3 py-1.5 transition-colors"
          aria-label="Call iCall helpline at 9152987821"
        >
          <Phone size={12} />
          iCall: 9152987821
        </a>
      </div>

      {/* Chat UI */}
      <ChatInterface />
    </>
  );
}
