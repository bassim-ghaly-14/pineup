"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { postsService } from "../services/posts.service";

export function useCreatePost() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: postsService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.feed(),
      });

      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.all,
      });
    },
  });
}