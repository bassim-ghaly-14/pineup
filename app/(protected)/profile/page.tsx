"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/use-auth";

export default function ProfileRedirectPage() {
  const router = useRouter();
  const { data } = useAuth();

  useEffect(() => {
    const id = data?.user?._id;
    if (id) {
      router.replace(`/profile/${id}`);
    }
  }, [data, router]);

  return null;
}