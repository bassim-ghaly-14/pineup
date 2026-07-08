"use client";

import { useQuery } from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { queryKeys } from "@/constants/query-keys";

export function useSuggestions() {
  return useQuery({
    queryKey:
      queryKeys.users.suggestions(),

    queryFn:
      usersService.getSuggestions,
  });
}