"use client";

import React, { useEffect, useState } from 'react';
import { useIdentityStore } from '@/stores/identity-store';
import { H2, P } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const steps = [
  {
    icon: <Sparkles className="w-12 h-12 text-primary mb-6" />,
    title: "A private room for your thoughts.",
    description: "Teens Helpline is a calm, quiet space designed to help you check in with yourself. No judgment, no tracking, no social feeds."
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary mb-6" />,
    title: "Completely anonymous.",
    description: "You don't need an account. We don't ask for your name. Everything you write is tied only to this specific browser and device."
  },
  {
    icon: <Heart className="w-12 h-12 text-primary mb-6" />,
    title: "Reflect with Nova.",
    description: "Along with logging your mood and journaling, you can think out loud with Nova—a safe, supportive digital companion."
  }
];

export const OnboardingFlow: React.FC = () => {
  const { hasCompletedOnboarding, completeOnboarding, initializeSpace } = useIdentityStore();
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeSpace();
  }, [initializeSpace]);

  if (!mounted || hasCompletedOnboarding) return null;

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto w-full">
        {current.icon}
        <H2 className="mb-4 text-3xl">{current.title}</H2>
        <P className="text-text-muted text-lg mb-12 max-w-md">
          {current.description}
        </P>
        
        <div className="flex gap-2 mb-12">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === step ? 'bg-primary' : 'bg-black/10'}`} 
            />
          ))}
        </div>

        <Button 
          onClick={nextStep} 
          className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2" 
          size="lg"
        >
          {step === steps.length - 1 ? "Enter your space" : "Continue"}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
