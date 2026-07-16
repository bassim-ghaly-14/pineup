"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { postsService } from "../services/posts.service";
import { updatePostInCache } from "../utils/update-post-cache";
import { queryKeys } from "src/constants/query-keys";
import type { Post } from "../types/post.types";

export function useBookmarkPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.bookmark,

    onSuccess: async (
      response,
      postId
    ) => {
      const bookmarked =
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

      if (!bookmarked) {
        queryClient.setQueryData<Post[]>(
          queryKeys.users.bookmarks(),
          (old) =>
            old?.filter(
              (post) =>
                post._id !== postId
            ) ?? []
        );
      }

      if (bookmarked) {
        await queryClient.invalidateQueries({
          queryKey:
            queryKeys.users.bookmarks(),
        });
      }
    },
  });
}