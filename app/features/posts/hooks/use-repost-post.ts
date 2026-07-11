"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { postsService } from "../services/posts.service";
import { addPostToCache } from "../utils/update-post-cache";
import { queryKeys } from "@/constants/query-keys";

export function useRepostPost() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      postsService.share,

    onSuccess: async(response) => {
      const post =
        response?.post;
      if (!post)return;

      addPostToCache(
        queryClient,
        post
      );
      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.feed(),
      });
      }
  });
}