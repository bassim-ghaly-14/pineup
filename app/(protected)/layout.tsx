"use client";

import { useAuthGuard } from "@/features/auth/hooks/use-auth-guard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useAuthGuard();

  return children;
}