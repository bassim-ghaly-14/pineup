"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "src/features/auth/hooks/use-auth";
import { queryKeys } from "src/constants/query-keys";
import { usersService } from "../services/users.service";

export function useSuggestions() {
  const { data } = useAuth();
  return useQuery({
    queryKey: queryKeys.users.suggestions(),
    queryFn: usersService.getSuggestions,
    enabled: !!data?.user,
  });
}