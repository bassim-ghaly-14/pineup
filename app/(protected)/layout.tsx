"use client";

import { useAuthGuard } from "src/features/auth/hooks/use-auth-guard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useAuthGuard();

  return children;
}