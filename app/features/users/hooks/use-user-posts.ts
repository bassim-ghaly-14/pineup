"use client";

import { useQuery } from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { queryKeys } from "@/constants/query-keys";

export function useUserPosts(
  userId: string
) {
  return useQuery({
    queryKey: [
      ...queryKeys.users.profile(userId),
      "posts",
    ],

    queryFn: () =>
      usersService.getUserPosts(userId),

    enabled: !!userId,
  });
}