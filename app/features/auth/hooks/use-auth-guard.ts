"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "./use-auth";


export function useAuthGuard() {

  const router = useRouter();


  const {
    data: user,
    isLoading,
    token,
  } = useAuth();



  useEffect(() => {

    if (!token) return;

    if (isLoading) return;


    if (!user) {
      router.replace("/login");
    }


  }, [
    token,
    user,
    isLoading,
    router,
  ]);



  return {
    user,
    isLoading,
  };

}