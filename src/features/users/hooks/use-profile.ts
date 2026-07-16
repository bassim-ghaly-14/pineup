"use client";

import { useQuery } from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { queryKeys } from "src/constants/query-keys";

export function useProfile(id: string) {
  return useQuery({
    queryKey: queryKeys.users.profile(id),

    queryFn: () =>
      usersService.getProfile(id),

    enabled: !!id,
  });
}