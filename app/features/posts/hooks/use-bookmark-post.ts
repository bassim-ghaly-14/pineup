"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { postsService } from "../services/posts.service";

import { queryKeys } from "@/constants/query-keys";

export function useBookmarkPost() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      postsService.bookmark,

    onSuccess: (
      _,
      postId
    ) => {

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.feed(),
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.single(
            postId
          ),
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.users.bookmarks(),
      });

    },
  });
}