"use client";

import { useCallback } from "react";

import { useAuth } from "./use-auth";
import { useAuthPromptContext } from "./use-auth-prompt";

export function useRequireAuthAction() {
  const { isAuthenticated } = useAuth();
  const { openPrompt } = useAuthPromptContext();

  const requireAuth = useCallback(
    (action: () => void) => {
      if (!isAuthenticated) {
        openPrompt();
        return;
      }

      action();
    },
    [isAuthenticated, openPrompt]
  );

  return {
    requireAuth,
    isAuthenticated,
  };
}