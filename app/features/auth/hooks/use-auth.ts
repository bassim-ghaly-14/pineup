"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { authService } from "../services/auth.service";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { queryKeys } from "@/constants/query-keys";

type ApiError = {
  message?: string;
  errors?: string;
};

export function useAuth() {
  const token =
    typeof window === "undefined"
      ? null
      : localStorage.getItem(STORAGE_KEYS.TOKEN);

  const query = useQuery({
    queryKey: queryKeys.auth.profile(),
    enabled: !!token,
    queryFn: ({ signal }) =>
      authService.getProfile(signal),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  useEffect(() => {
    if (!query.isError) return;

    const error =
      query.error as AxiosError<ApiError>;

    const status =
      error?.response?.status;

    if (status === 401) {
      localStorage.removeItem(
        STORAGE_KEYS.TOKEN
      );
    }
  }, [query.isError, query.error]);

  return {
    ...query,
    isAuthenticated: !!token,
  };
}