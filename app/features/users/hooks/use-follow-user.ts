"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { usersService } from "../services/users.service";

import { queryKeys } from "@/constants/query-keys";

export function useFollowUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      usersService.follow,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.users.all,
      });
    },
  });
}