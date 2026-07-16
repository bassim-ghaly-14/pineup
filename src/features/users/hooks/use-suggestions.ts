"use client";

import { useQuery } from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { queryKeys } from "src/constants/query-keys";
import { User } from "../types/user.types";

export function useSuggestions() {
  return useQuery<User[]>({
    queryKey: queryKeys.users.suggestions(),
    queryFn: usersService.getSuggestions,
  });
}