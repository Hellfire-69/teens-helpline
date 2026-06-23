"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type NovaState = 'resting' | 'listening' | 'responding' | 'heavy' | 'crisis';

interface NovaGlyphProps {
  size?: number;
  state?: NovaState;
  className?: string;
}

export function NovaGlyph({ 
  size = 48, 
  state = 'resting',
  className = '' 
}: NovaGlyphProps) {
  const shouldReduceMotion = useReducedMotion();

  // Color mapping based on state for the mesh layers
  const colors = {
    resting: ['#14b8a6', '#0f766e', '#042f2e'], // teal-500, teal-600, teal-900
    listening: ['#2dd4bf', '#14b8a6', '#0f766e'], // teal-400, teal-500, teal-600
    responding: ['#5eead4', '#2dd4bf', '#14b8a6'], // teal-300, teal-400, teal-500
    heavy: ['#0f766e', '#115e59', '#042f2e'], // teal-600, teal-700, teal-900
    crisis: ['#fcd34d', '#fbbf24', '#f59e0b'], // sand colors for crisis
  };

  const currentColors = colors[state] || colors.resting;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerVariants: any = {
    resting: { scale: 1, rotate: 0, transition: { duration: 10, repeat: Infinity, ease: "linear" } },
    listening: { scale: 1.05, rotate: 0, transition: { duration: 1 } },
    responding: { scale: [1, 1.1, 1], rotate: 360, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
    heavy: { scale: 0.95, rotate: 0, transition: { duration: 2 } },
    crisis: { scale: 1.1, rotate: [0, 5, -5, 0], transition: { duration: 0.5, repeat: Infinity } }
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-[24px] ${className}`} 
      style={{ 
        width: size, 
        height: size, 
        background: '#0a0a0a',
        boxShadow: state === 'listening' || state === 'responding' 
          ? `0 0 ${size * 0.5}px ${currentColors[1]}40` 
          : 'none',
        transition: 'box-shadow 0.5s ease-out'
      }}
    >
      <motion.div
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial="resting"
        animate={state}
        className="absolute inset-0 w-full h-full"
      >
        {/* Layer 1: Base blob */}
        <motion.div 
          className="absolute rounded-full mix-blend-screen opacity-80"
          style={{
            width: '120%', height: '120%', top: '-10%', left: '-10%',
            background: `radial-gradient(circle at 50% 50%, ${currentColors[0]} 0%, transparent 60%)`,
            filter: `blur(${size * 0.2}px)`
          }}
          animate={shouldReduceMotion ? {} : {
            x: ['-5%', '5%', '-5%'],
            y: ['5%', '-5%', '5%'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Layer 2: Secondary core */}
        <motion.div 
          className="absolute rounded-full mix-blend-screen opacity-90"
          style={{
            width: '100%', height: '100%', top: '0%', left: '0%',
            background: `radial-gradient(circle at 30% 70%, ${currentColors[1]} 0%, transparent 70%)`,
            filter: `blur(${size * 0.15}px)`
          }}
          animate={shouldReduceMotion ? {} : {
            x: ['5%', '-5%', '5%'],
            y: ['-5%', '5%', '-5%'],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Layer 3: Highlight highlight */}
        <motion.div 
          className="absolute rounded-full mix-blend-plus-lighter opacity-100"
          style={{
            width: '80%', height: '80%', top: '10%', left: '10%',
            background: `radial-gradient(circle at 70% 30%, ${currentColors[2]} 0%, transparent 50%)`,
            filter: `blur(${size * 0.1}px)`
          }}
          animate={shouldReduceMotion ? {} : {
            scale: state === 'responding' ? [1, 1.3, 1] : [1, 1.1, 1]
          }}
          transition={{ duration: state === 'responding' ? 1 : 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>
      
      {/* Subtle glass overlay for crisp edges */}
      <div className="absolute inset-0 rounded-[24px] border border-white/10" style={{ backdropFilter: `blur(${size * 0.05}px)` }} />
    </div>
  );
}
