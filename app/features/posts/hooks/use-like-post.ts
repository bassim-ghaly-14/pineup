"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { postsService } from "../services/posts.service";
import { updatePostInCache } from "../utils/update-post-cache";

export function useLikePost() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      postsService.like,

    onSuccess: (response) => {
      const post =
        response?.post;

      if (!post) {
        return;
      }

      updatePostInCache(
        queryClient,
        post._id,
        () => post,
        post.user?._id
      );
    },
  });
}