"use client";

import React, { useEffect, useState } from "react";
import { useIdentityStore } from "@/stores/identity-store";
import { identityService } from "@/services/identity-service";

export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const { spaceId, setSpaceId } = useIdentityStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function initialize() {
      if (!spaceId) {
        const id = await identityService.initializeIdentity();
        setSpaceId(id);
      }
      setIsInitialized(true);
    }
    initialize();
  }, [spaceId, setSpaceId]);

  if (!isInitialized) {
    return null; // Or a subtle loading state
  }

  return <>{children}</>;
}
