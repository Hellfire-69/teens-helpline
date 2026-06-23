"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { PenTool, LineChart, LayoutDashboard, Check, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { NovaGlyph } from '@/components/nova/NovaGlyph';
import Footer from '@/components/Footer';

export default function MarketingPage() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, shouldReduceMotion ? 0 : -50]);
  const mockupScale = useTransform(heroScroll, [0, 1], [1, shouldReduceMotion ? 1 : 1.05]);

  const fadeUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-base)] overflow-hidden selection:bg-[var(--teal-100)] selection:text-[var(--teal-900)]">
      
      {/* 1. IMMERSIVE PRODUCT HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-[800px] mx-auto z-10 pt-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--teal-50)] border border-[var(--teal-100)] text-[var(--teal-700)] text-xs font-semibold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3 h-3" />
            <span>A private space for your mind</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-[80px] tracking-tight text-[var(--text-primary)] leading-[1.05] mb-8"
          >
            The thoughts you don&apos;t know what to do with.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[var(--text-body)] font-body mb-12 max-w-[500px] mx-auto leading-relaxed"
          >
            A calm, secure environment to untangle your feelings. Your device is the only key. No tracking. No accounts.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link href="/dashboard" tabIndex={-1} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-[16px] h-14 px-10 rounded-full bg-[var(--teal-500)] hover:bg-[var(--teal-600)] text-white shadow-xl shadow-[var(--teal-500)]/20 transition-all hover:scale-[1.02]">
                Open your space
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[var(--text-muted)] font-medium tracking-wide"
          >
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--teal-500)]" /> Private by design</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--teal-500)]" /> No sign-up required</span>
          </motion.div>
        </motion.div>

        {/* HERO DASHBOARD MOCKUP */}
        <motion.div 
          style={{ scale: mockupScale }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 w-full max-w-[1100px] mx-auto relative z-20 perspective-1000"
        >
          <div className="relative rounded-[32px] p-2 bg-[var(--bg-surface)] border border-[var(--bg-elevated)] shadow-[0_40px_80px_-20px_rgba(15,118,110,0.15)] overflow-hidden">
            <div className="relative bg-[var(--bg-base)] rounded-[24px] overflow-hidden border border-[var(--bg-elevated)] aspect-[16/10] flex shadow-inner">
              
              {/* Sidebar */}
              <div className="w-[240px] bg-[var(--bg-surface)] border-r border-[var(--bg-elevated)] p-6 hidden md:flex flex-col gap-8 shrink-0">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[var(--bg-elevated)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--bg-elevated)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--bg-elevated)]" />
                </div>
                <div className="space-y-4">
                  <div className="h-10 w-full bg-[var(--teal-50)] text-[var(--teal-700)] rounded-[12px] flex items-center px-4 text-sm font-medium">Home</div>
                  <div className="h-10 w-full hover:bg-[var(--bg-elevated)] rounded-[12px] flex items-center px-4 text-sm font-medium text-[var(--text-muted)] transition-colors">Journal</div>
                  <div className="h-10 w-full hover:bg-[var(--bg-elevated)] rounded-[12px] flex items-center px-4 text-sm font-medium text-[var(--text-muted)] transition-colors">Analytics</div>
                </div>
                <div className="mt-auto h-24 bg-[var(--teal-900)] rounded-[16px] p-4 flex flex-col justify-end">
                   <div className="w-6 h-6 rounded-md bg-white/20 mb-2" />
                   <div className="h-3 w-2/3 bg-white/40 rounded" />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-10 bg-[var(--bg-base)] relative overflow-hidden flex flex-col gap-8">
                <div className="flex justify-between items-end mb-4">
                   <div>
                     <div className="text-[14px] text-[var(--text-muted)] font-medium mb-1">Thursday, Oct 24</div>
                     <div className="font-heading text-3xl text-[var(--text-primary)]">Good morning.</div>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-[var(--bg-elevated)] flex items-center justify-center">
                     <span className="text-xl">😎</span>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 h-full">
                   {/* Mood Card */}
                   <div className="bg-white rounded-[24px] p-6 border border-[var(--bg-elevated)] shadow-sm flex flex-col">
                     <div className="flex items-center gap-2 mb-6">
                       <LineChart className="w-4 h-4 text-[var(--teal-500)]" />
                       <span className="text-sm font-medium text-[var(--text-primary)]">Recent Mood</span>
                     </div>
                     <div className="flex items-end justify-between flex-1 gap-2 pt-8">
                        {[40, 70, 50, 90, 60].map((h, i) => (
                           <div key={i} className={`w-full rounded-t-[6px] ${i === 3 ? 'bg-[var(--teal-500)]' : 'bg-[var(--teal-50)]'}`} style={{ height: `${h}%` }} />
                        ))}
                     </div>
                   </div>

                   {/* Journal Card */}
                   <div className="bg-white rounded-[24px] p-6 border border-[var(--bg-elevated)] shadow-sm flex flex-col relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--sand-100)] rounded-bl-[100px] -z-10 opacity-50" />
                     <div className="flex items-center gap-2 mb-4">
                       <PenTool className="w-4 h-4 text-[var(--text-primary)]" />
                       <span className="text-sm font-medium text-[var(--text-primary)]">Quick Entry</span>
                     </div>
                     <div className="text-[14px] text-[var(--text-body)] leading-relaxed font-serif pt-2 opacity-80">
                       Started the day feeling completely overwhelmed by the physics assignment. I didn&apos;t think I could finish it...<span className="inline-block w-0.5 h-4 bg-[var(--teal-500)] ml-1 animate-pulse translate-y-0.5" />
                     </div>
                   </div>
                </div>
                
                {/* Floating Nova Notification */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] bg-[var(--bg-surface)]/80 backdrop-blur-xl rounded-[20px] p-4 shadow-xl border border-[var(--bg-elevated)] flex items-center gap-4">
                   <NovaGlyph size={40} state="listening" />
                   <div>
                     <div className="text-sm font-medium text-[var(--text-primary)]">Nova is listening</div>
                     <div className="text-xs text-[var(--text-muted)]">Just tap to start reflecting</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. PRODUCT WALKTHROUGH */}
      <section id="how-it-works" className="py-40 bg-white border-y border-[var(--bg-elevated)] overflow-hidden">
        <PageContainer>
          <div className="text-center max-w-[600px] mx-auto mb-32">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--text-primary)] mb-6 tracking-tight">
              A quiet ritual to untangle your mind.
            </h2>
            <p className="text-lg text-[var(--text-body)]">
              No endless feeds. No addictive mechanics. Just purposeful tools designed to help you process what you&apos;re feeling.
            </p>
          </div>

          <div className="space-y-40">
            {/* Feature 1: Mood */}
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <motion.div {...fadeUp} className="flex-1 w-full relative">
                {/* High-fidelity Mood UI Mockup */}
                <div className="bg-[var(--bg-surface)] p-8 rounded-[32px] border border-[var(--bg-elevated)] shadow-2xl relative z-10 transform-gpu rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
                  <div className="text-center mb-8">
                    <div className="text-sm text-[var(--text-muted)] font-medium mb-2 uppercase tracking-widest">Check in</div>
                    <div className="text-2xl font-heading text-[var(--text-primary)]">How are you feeling right now?</div>
                  </div>
                  <div className="flex justify-between gap-2 md:gap-4 mb-6">
                    {['😫', '😔', '😐', '🙂', '😄'].map((emoji, i) => (
                      <div key={i} className={`flex-1 aspect-square rounded-[16px] flex items-center justify-center text-3xl transition-all duration-300 ${i === 3 ? 'bg-[var(--teal-50)] border-2 border-[var(--teal-500)] shadow-lg shadow-[var(--teal-500)]/10 scale-105' : 'bg-white border border-[var(--bg-elevated)] opacity-70 hover:opacity-100 hover:scale-105'}`}>
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div className="h-14 w-full bg-white border border-[var(--bg-elevated)] rounded-[16px] flex items-center px-5 text-[var(--text-placeholder)] text-sm mb-4">
                    Add a note (optional)...
                  </div>
                  <div className="h-14 w-full bg-[var(--teal-500)] rounded-[16px] flex items-center justify-center text-white font-medium shadow-md">
                    Save entry
                  </div>
                </div>
                {/* Decorative background blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--teal-50)] rounded-full blur-[80px] -z-10" />
              </motion.div>
              
              <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex-1 space-y-6 lg:pl-10">
                <div className="w-12 h-12 rounded-[16px] bg-[var(--teal-50)] flex items-center justify-center mb-8 border border-[var(--teal-100)]">
                  <LineChart className="w-6 h-6 text-[var(--teal-600)]" />
                </div>
                <h3 className="font-heading text-4xl text-[var(--text-primary)] leading-tight">Check In.</h3>
                <p className="text-lg text-[var(--text-body)] leading-relaxed font-body">
                  Take three seconds to log your mood. You don&apos;t have to explain it or try to fix it right away. Over time, invisible patterns start to make sense.
                </p>
              </motion.div>
            </div>

            {/* Feature 2: Journal */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
              <motion.div {...fadeUp} className="flex-1 w-full relative">
                {/* High-fidelity Journal UI Mockup */}
                <div className="bg-white p-8 rounded-[32px] border border-[var(--bg-elevated)] shadow-2xl relative z-10 flex flex-col h-[400px] transform-gpu rotate-[1deg] hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--bg-elevated)]">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--sand-100)] flex items-center justify-center">
                           <PenTool className="w-5 h-5 text-[var(--text-primary)]" />
                        </div>
                        <div>
                           <div className="font-medium text-[var(--text-primary)]">New Entry</div>
                           <div className="text-xs text-[var(--text-muted)]">Just now • Local Only</div>
                        </div>
                     </div>
                     <Shield className="w-5 h-5 text-[var(--teal-500)]" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-heading text-2xl text-[var(--text-primary)] mb-4 outline-none">Why does everything feel so loud?</h4>
                     <p className="text-[16px] text-[var(--text-body)] leading-[1.8] font-serif outline-none">
                        I&apos;m not even sure why I&apos;m so stressed right now. It just feels like everything is piling up at once and I don&apos;t know where to start. If I could just<span className="inline-block w-[2px] h-[1em] bg-[var(--teal-500)] ml-1 animate-pulse translate-y-1" />
                     </p>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--sand-100)] rounded-full blur-[80px] -z-10 opacity-50" />
              </motion.div>
              
              <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex-1 space-y-6 lg:pr-10">
                <div className="w-12 h-12 rounded-[16px] bg-[var(--sand-100)] flex items-center justify-center mb-8 border border-[var(--sand-200)]">
                  <PenTool className="w-6 h-6 text-[var(--text-primary)]" />
                </div>
                <h3 className="font-heading text-4xl text-[var(--text-primary)] leading-tight">Get it out of your head.</h3>
                <p className="text-lg text-[var(--text-body)] leading-relaxed font-body">
                  Write down whatever is bothering you. It never leaves your device, it never syncs to a cloud server, and absolutely no one else can read it.
                </p>
              </motion.div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 3. THE NOVA EXPERIENCE (DARK THEME SPOTLIGHT) */}
      <section className="py-40 bg-[#0a0a0a] relative overflow-hidden text-[#F8F5F0]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(20,184,166,0.1)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
            
            {/* Nova Text Content */}
            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <NovaGlyph size={32} state="resting" />
                <span className="text-xs font-semibold tracking-widest text-[var(--teal-400)] uppercase">Ambient AI Guide</span>
              </div>
              
              <h2 className="font-heading text-4xl md:text-5xl mb-8 leading-tight tracking-tight text-white">
                Meet Nova. An intelligent sounding board.
              </h2>
              
              <div className="space-y-6 text-lg text-white/60 font-body leading-relaxed">
                <p>
                  Sometimes you just need to talk through a problem, but talking to a real person feels like too much pressure right now.
                </p>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-400)]" />
                    <span className="text-white/80 text-[15px]">Trained to listen, not to diagnose.</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-400)]" />
                    <span className="text-white/80 text-[15px]">Private, localized processing.</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-400)]" />
                    <span className="text-white/80 text-[15px]">Always keeps real crisis resources one tap away.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nova Chat UI Mockup */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="lg:col-span-7 relative">
              <div className="relative rounded-[32px] bg-[#111] border border-white/10 shadow-2xl p-8 flex flex-col gap-6 h-[500px] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-2">
                   <div className="flex items-center gap-3">
                      <NovaGlyph size={28} state="listening" />
                      <span className="text-sm font-medium text-white/90">Nova</span>
                   </div>
                </div>

                {/* User Message */}
                <div className="self-end bg-white/10 text-white/90 px-6 py-4 rounded-[24px] rounded-tr-[8px] max-w-[80%] text-[15px] leading-relaxed shadow-sm">
                  I feel like I&apos;m failing everything lately. It&apos;s just too much.
                </div>
                
                {/* Nova Message */}
                <div className="self-start flex gap-4 max-w-[85%] mt-2">
                  <div className="mt-2 shrink-0">
                     <NovaGlyph size={32} state="responding" />
                  </div>
                  <div className="bg-[#1a1a1a] text-white/80 px-6 py-5 rounded-[24px] rounded-tl-[8px] text-[15px] leading-relaxed border border-white/5 shadow-xl">
                    That&apos;s a really heavy feeling to carry around. When you say &quot;everything,&quot; what&apos;s the very first thing that comes to mind?
                  </div>
                </div>

                {/* Typing indicator area */}
                <div className="absolute bottom-6 left-8 right-8 h-14 rounded-full bg-white/5 border border-white/10 flex items-center px-6">
                   <span className="text-white/30 text-sm">Type your response...</span>
                </div>
              </div>
            </motion.div>

          </div>
        </PageContainer>
      </section>

      {/* 4. DASHBOARD ECOSYSTEM SPOTLIGHT */}
      <section className="py-40 bg-[var(--bg-base)] relative">
        <PageContainer>
          <div className="text-center max-w-[700px] mx-auto mb-20">
             <div className="w-12 h-12 rounded-[16px] bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
                <LayoutDashboard className="w-6 h-6 text-[var(--text-primary)]" />
             </div>
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--text-primary)] mb-6 tracking-tight">
              A complete picture of your mind.
            </h2>
            <p className="text-lg text-[var(--text-body)]">
              Your entries, your moods, and your conversations—organized automatically into beautifully clear insights.
            </p>
          </div>

          <motion.div {...fadeUp} className="max-w-[1000px] mx-auto">
            {/* Bento Grid Ecosystem */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
               {/* Stats Card (Span 1) */}
               <div className="bg-white rounded-[32px] p-8 border border-[var(--bg-elevated)] shadow-sm flex flex-col justify-between">
                  <div>
                     <div className="text-sm font-medium text-[var(--text-muted)] mb-1">Current Streak</div>
                     <div className="font-heading text-5xl text-[var(--teal-600)]">12<span className="text-2xl text-[var(--text-muted)]"> days</span></div>
                  </div>
                  <div className="flex gap-1">
                     {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className={`h-2 flex-1 rounded-full ${i < 5 ? 'bg-[var(--teal-500)]' : 'bg-[var(--bg-elevated)]'}`} />
                     ))}
                  </div>
               </div>

               {/* Timeline Mockup (Span 2) */}
               <div className="md:col-span-2 bg-[var(--bg-surface)] rounded-[32px] p-8 border border-[var(--bg-elevated)] shadow-sm overflow-hidden relative">
                 <div className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest mb-6">Recent Activity</div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-[16px] shadow-sm border border-[var(--bg-elevated)]">
                       <div className="text-3xl">😐</div>
                       <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">Felt neutral</div>
                          <div className="text-xs text-[var(--text-muted)]">Today, 10:45 AM</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-[16px] shadow-sm border border-[var(--bg-elevated)]">
                       <div className="w-10 h-10 rounded-full bg-[var(--sand-100)] flex items-center justify-center">
                          <PenTool className="w-4 h-4 text-[var(--text-primary)]" />
                       </div>
                       <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">Journal Entry</div>
                          <div className="text-xs text-[var(--text-muted)]">Yesterday</div>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Nova Insight (Span 3) */}
               <div className="md:col-span-3 bg-[var(--teal-900)] rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--teal-500)] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/4" />
                  <div className="relative z-10 max-w-[500px]">
                     <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-[var(--teal-300)]" />
                        <span className="text-sm font-medium text-[var(--teal-100)] uppercase tracking-wider">Weekly Insight</span>
                     </div>
                     <h3 className="font-heading text-2xl leading-tight mb-2">You usually log &quot;stressed&quot; moods on Tuesdays.</h3>
                     <p className="text-[var(--teal-100)] opacity-80 text-sm">Nova noticed a pattern in your check-ins over the last month.</p>
                  </div>
                  <Button className="shrink-0 bg-white text-[var(--teal-900)] hover:bg-[var(--teal-50)] rounded-full px-8 py-6 text-[15px] font-medium shadow-xl relative z-10">
                     View full insights
                  </Button>
               </div>
            </div>
          </motion.div>
        </PageContainer>
      </section>

      {/* 5. PRIVACY & SAFETY */}
      <section className="py-32 bg-white border-y border-[var(--bg-elevated)]">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="w-16 h-16 bg-[var(--bg-base)] rounded-[20px] flex items-center justify-center mb-8 border border-[var(--bg-elevated)] shadow-sm">
                <Shield className="w-8 h-8 text-[var(--text-primary)]" />
              </div>
              <h2 className="font-heading text-4xl text-[var(--text-primary)] mb-6">
                Your data is yours.<br/>Period.
              </h2>
              <div className="space-y-4 text-lg text-[var(--text-body)] font-body leading-relaxed">
                <p>
                  We don&apos;t want your email. We don&apos;t want your real name. There are no passwords.
                </p>
                <p>
                  Your device is your only key to a completely private space. Nothing is sent to our servers unless you explicitly ask Nova a question.
                </p>
              </div>
            </motion.div>
            
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-[var(--bg-surface)] p-10 rounded-[32px] border border-[var(--bg-elevated)] text-center">
               <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-4">Need human help right now?</h3>
               <p className="text-[var(--text-muted)] mb-8">This app is a reflection tool, not a crisis service. If you are in danger, please reach out to real people.</p>
               <a href="tel:112" className="block w-full py-4 rounded-full bg-[var(--text-primary)] text-white font-medium mb-3 hover:bg-black transition-colors">
                 Call 112 (Emergency)
               </a>
               <Link href="/crisis-support" className="text-[var(--teal-600)] text-sm font-medium hover:underline flex items-center justify-center gap-1">
                 View local helplines <ArrowRight className="w-4 h-4" />
               </Link>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-40 bg-[var(--bg-base)] relative overflow-hidden flex items-center justify-center">
        <PageContainer narrow>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10"
          >
            <h2 className="font-heading text-5xl md:text-7xl text-[var(--text-primary)] mb-8 tracking-tight">
              Ready to take a breath?
            </h2>
            <p className="text-xl text-[var(--text-muted)] mb-12 font-body">
              Your space is ready when you are.
            </p>
            <Link href="/dashboard" tabIndex={-1}>
              <Button size="lg" className="text-[16px] h-16 px-12 rounded-full bg-[var(--teal-500)] text-white shadow-xl shadow-[var(--teal-500)]/20 hover:scale-105 hover:bg-[var(--teal-600)] transition-all duration-300 font-medium">
                Open your space
              </Button>
            </Link>
          </motion.div>
        </PageContainer>
      </section>

      <Footer />
    </div>
  );
}
