"use client";

import { IdentityProvider } from "@/components/providers/IdentityProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import React from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <IdentityProvider>
        {children}
      </IdentityProvider>
    </ThemeProvider>
  );
}
