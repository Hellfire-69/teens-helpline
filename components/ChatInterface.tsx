"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone } from "lucide-react";
import Link from "next/link";
import Boo from "@/components/Boo";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "boo";
  content: string;
}

const OPENING_MESSAGE: Message = {
  id: "opening",
  role: "boo",
  content:
    "Hey 👋 I'm Boo. You can tell me anything. I won't judge, I won't tell anyone. What's going on?",
};

// ── Typing dots ───────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5" aria-label="Boo is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-plum/40 block"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({
  msg,
  showAvatar,
}: {
  msg: Message;
  showAvatar: boolean;
}) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Boo avatar */}
      {!isUser && (
        <div className={`flex-shrink-0 mb-0.5 ${showAvatar ? "opacity-100" : "opacity-0"}`}>
          <Boo expression="listening" size={32} animate={showAvatar} />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`
          max-w-[78%] sm:max-w-[65%] px-4 py-2.5 text-sm leading-relaxed font-body
          ${isUser
            ? "bg-plum text-white rounded-3xl rounded-br-md"
            : "bg-white border border-plum/10 text-plum/85 rounded-3xl rounded-bl-md shadow-card"
          }
          ${!msg.content ? "min-w-[60px] min-h-[36px]" : ""}
        `}
      >
        {msg.content || <TypingDots />}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ChatInterface() {
  const [messages, setMessages]   = useState<Message[]>([OPENING_MESSAGE]);
  const [input, setInput]         = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on every message update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
    },
    []
  );

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    if (inputRef.current) inputRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const booMsg: Message = {
        id: `boo-${Date.now()}`,
        role: "boo",
        content: data.response,
      };

      setMessages((prev) => [...prev, booMsg]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Boo had a hiccup. Try again? 👻"
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );



  return (
    <div
      className="flex flex-col bg-offwhite relative overflow-hidden"
      style={{ height: "calc(100dvh - 112px)" }}
    >
      {/* ── Soft floating background shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex justify-center items-center opacity-40">
        <motion.div 
          className="absolute rounded-[40%] w-[500px] h-[500px] bg-peach/20 blur-3xl -top-20 -left-20" 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
        />
        <motion.div 
          className="absolute rounded-[40%] w-[400px] h-[400px] bg-mint/20 blur-3xl bottom-10 right-0" 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }} 
        />
      </div>

      {/* ── Crisis bar ── */}
      <div className="bg-mint/50 border-b border-mint-dark/20 px-4 py-2 flex items-center justify-between gap-2 flex-shrink-0">
        <p className="font-body text-xs text-plum/55">
          Private chat. Nothing is saved. 🫧
        </p>
        <Link
          href="/real-help"
          id="chat-real-help-link"
          className="flex items-center gap-1 text-xs font-body font-semibold text-coral hover:underline flex-shrink-0"
        >
          <Phone size={11} /> Real help
        </Link>
      </div>

      {/* ── Messages — bottom-anchored ── */}
      <div
        className="flex-1 overflow-y-auto"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {/* min-h-full + flex-col + justify-end = messages anchor to bottom */}
        <div className="flex flex-col justify-end min-h-full gap-3 px-4 py-5 relative z-10">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isLastBoo =
                msg.role === "boo" &&
                (i === messages.length - 1 ||
                  messages[i + 1]?.role === "user");

              if (msg.id === "opening") {
                return (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 12, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center text-center my-6 gap-4 w-full"
                  >
                    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                      <Boo expression="listening" size={90} animate />
                    </motion.div>
                    <div className="bg-white border border-plum/10 rounded-[2rem] p-6 shadow-card-lg max-w-sm mx-auto text-plum font-body text-base md:text-lg leading-relaxed relative">
                      {msg.content}
                      {/* Little tail pointing to Boo */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t border-l border-plum/10 rotate-45 transform" />
                    </div>
                  </motion.div>
                );
              }

              return (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  showAvatar={isLastBoo}
                />
              );
            })}

            {/* Typing indicator — shown only while waiting for stream to start */}
            {isLoading && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-2"
              >
                <div className="flex-shrink-0 mb-0.5">
                  <Boo expression="listening" size={32} animate />
                </div>
                <div className="bg-white border border-plum/10 rounded-3xl rounded-bl-md px-4 py-2.5 shadow-card">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-body text-xs text-coral/80 bg-coral/10 rounded-2xl px-4 py-2"
            >
              {error}
            </motion.p>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input bar ── */}
      <div className="border-t border-plum/15 bg-white px-4 py-4 flex-shrink-0 relative z-20 shadow-[0_-10px_40px_rgba(61,26,120,0.05)]">
        <div className="flex items-end gap-3 max-w-2xl mx-auto">
          <textarea
            ref={inputRef}
            id="chat-input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Tell Boo what's going on..."
            rows={1}
            maxLength={1000}
            aria-label="Message input"
            disabled={isLoading}
            className="
              flex-1 resize-none bg-offwhite border-2 border-plum/15 rounded-2xl
              px-4 py-3 font-body text-[15px] text-plum
              placeholder:text-plum/35
              focus:outline-none focus:border-plum/40 focus:ring-4 focus:ring-plum/10
              disabled:opacity-50 transition-all duration-200
              min-h-[50px] max-h-[120px] overflow-y-auto shadow-inner
            "
          />
          <button
            id="chat-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="
              flex-shrink-0 w-11 h-11 rounded-2xl
              bg-coral hover:bg-coral-dark
              disabled:bg-plum/20 disabled:cursor-not-allowed
              flex items-center justify-center
              transition-all duration-200 hover:shadow-warm
            "
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
        <p className="text-center font-body text-[10px] text-plum/25 mt-1.5 max-w-2xl mx-auto">
          Enter to send · Shift+Enter for new line · Boo is not a real therapist
        </p>
      </div>
    </div>
  );
}
