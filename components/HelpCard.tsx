"use client";

import { motion } from "framer-motion";
import { Phone, Clock } from "lucide-react";

interface HelpCardProps {
  id: string;
  name: string;
  number: string;
  tel: string;
  hours: string;
  description: string;
  bg: string;
  accent: string;
  index?: number;
}

export default function HelpCard({
  id, name, number, tel, hours, description, bg, accent, index = 0,
}: HelpCardProps) {
  return (
    <motion.a
      href={`tel:${tel}`}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Call ${name} at ${number}`}
      className={`
        ${bg} rounded-3xl p-6 md:p-8
        border-2 border-white/40
        flex flex-col gap-4
        cursor-pointer transition-shadow duration-200
        hover:shadow-card-lg block gpu
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-plum/25
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-body text-xs font-semibold text-plum/50 uppercase tracking-widest">
            {name}
          </span>
          <span
            className="text-3xl md:text-4xl text-plum leading-none"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {number}
          </span>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.15, 1, 1.15, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          className={`${accent} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}
        >
          <Phone size={22} className="text-white" />
        </motion.div>
      </div>

      {/* Hours */}
      <div className="flex items-center gap-1.5 text-plum/55 text-xs font-body">
        <Clock size={12} />
        <span>{hours}</span>
      </div>

      {/* Description */}
      <p className="font-body text-plum/70 text-sm leading-relaxed">{description}</p>

      {/* Tap hint */}
      <div className={`${accent} text-white rounded-full px-4 py-2 text-sm font-body font-semibold self-start flex items-center gap-2`}>
        <Phone size={14} />
        Tap to call
      </div>
    </motion.a>
  );
}
