"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { postsService } from "../services/posts.service";
import { updatePostInCache } from "../utils/update-post-cache";

export function useBookmarkPost() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      postsService.bookmark,

    onSuccess: (
      response,
      postId
    ) => {

      const bookmarked =
        response?.bookmarked ??
        response?.bookmarked;

      if (
        typeof bookmarked !== "boolean"
      ) {
        return;
      }


      updatePostInCache(
        queryClient,
        postId,
        (post) => ({
          ...post,
          bookmarked,
        })
      );
    },
  });
}