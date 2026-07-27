"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "src/features/auth/hooks/use-auth";
import { usersService } from "../services/users.service";
import { queryKeys } from "src/constants/query-keys";

export function useBookmarks() {
  const { data } = useAuth();

  return useQuery({
    queryKey: queryKeys.users.bookmarks(),
    queryFn: usersService.getBookmarks,
    enabled: !!data?.user,
  });
}