"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { postsService } from "../services/posts.service";

export function useDeletePost() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: postsService.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.all,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.feed(),
      });
    },
  });
}