"use client";

import { IdentityProvider } from "@/components/providers/IdentityProvider";
import React from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <IdentityProvider>
      {children}
    </IdentityProvider>
  );
}
