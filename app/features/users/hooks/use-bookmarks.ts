"use client";

import { useQuery } from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { queryKeys } from "@/constants/query-keys";
import { STORAGE_KEYS } from "@/constants/storage-keys";

export function useBookmarks() {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.TOKEN)
      : null;


  return useQuery({
    queryKey: queryKeys.users.bookmarks(),
    queryFn: usersService.getBookmarks,
    enabled: !!token,
  });
}