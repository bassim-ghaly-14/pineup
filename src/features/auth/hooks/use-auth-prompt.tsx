"use client";

import { createContext, useCallback, useContext, useState } from "react";

import type { ReactNode } from "react";

import { AuthPromptDialog } from "../components/auth-prompt-dialog";

type AuthPromptContextValue = {
  openPrompt: () => void;
  closePrompt: () => void;
};

const AuthPromptContext = createContext<AuthPromptContextValue | null>(null);

export function AuthPromptProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openPrompt = useCallback(() => {
    setOpen(true);
  }, []);

  const closePrompt = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AuthPromptContext.Provider
      value={{
        openPrompt,
        closePrompt,
      }}>
      {children}

      <AuthPromptDialog open={open} onClose={closePrompt} />
    </AuthPromptContext.Provider>
  );
}

export function useAuthPromptContext() {
  const ctx = useContext(AuthPromptContext);

  if (!ctx) {
    throw new Error(
      "useAuthPromptContext must be used within an AuthPromptProvider",
    );
  }

  return ctx;
}
