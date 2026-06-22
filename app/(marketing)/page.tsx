import React from 'react';
import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F5F0] p-8 text-center">
      <h1 className="mb-4 font-heading text-4xl font-bold text-[#1A1A1A]">Teens Helpline</h1>
      <p className="mb-8 text-lg text-[#6A6A6A] max-w-md">
        A private digital space to reflect and grow. Completely anonymous.
      </p>
      <Link 
        href="/dashboard" 
        className="rounded-full bg-[#1F5F5F] px-8 py-4 text-white hover:bg-[#1F5F5F]/90 font-medium transition-colors"
      >
        Enter Space
      </Link>
    </div>
  );
}
