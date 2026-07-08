"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "./use-auth";

export function useAuthGuard() {
  const router = useRouter();

  const {
    isAuthenticated,
    data: user,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && !user) {
      router.replace("/login");
    }
  }, [
    user,
    isLoading,
    router,
    isAuthenticated,
  ]);

  return {
    user,
    isLoading,
  };
}