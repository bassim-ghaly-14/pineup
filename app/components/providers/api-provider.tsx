"use client";

import { useEffect } from "react";
import { setupInterceptors } from "@/services/api/interceptors";

export function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return <>{children}</>;
}