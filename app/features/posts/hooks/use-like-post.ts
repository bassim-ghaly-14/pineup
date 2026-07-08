"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/posts.service";
import { queryKeys } from "@/constants/query-keys";

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.like,

    onSuccess: (_, postId) => {
      // update feed only
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.feed(),
      });

      // optional: single post cache
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.single(postId),
      });
    },
  });
}