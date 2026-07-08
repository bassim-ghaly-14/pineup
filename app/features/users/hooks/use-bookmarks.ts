"use client";

import { useQuery } from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { queryKeys } from "@/constants/query-keys";

export function useBookmarks() {
  return useQuery({
    queryKey:
      queryKeys.users.bookmarks(),

    queryFn:
      usersService.getBookmarks,

    select: (data) =>
      Array.isArray(data)
        ? data.filter(Boolean)
        : [],
  });
}