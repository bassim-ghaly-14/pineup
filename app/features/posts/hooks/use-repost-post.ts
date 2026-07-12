"use client";

import axios from "axios";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { postsService } from "../services/posts.service";
import { addPostToCache, updatePostInCache } from "../utils/update-post-cache";
import { queryKeys } from "@/constants/query-keys";

export function useRepostPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.share,

    onSuccess: async (response) => {
      const post = response?.post;

      if (!post) return;

      addPostToCache(queryClient, post);
      if (post.sharedPost?._id) {
  updatePostInCache(
    queryClient,
    post.sharedPost._id,
    (old) => ({
      ...old,
      sharesCount: (old.sharesCount ?? 0) + 1,
    })
  );
}

await queryClient.invalidateQueries({
  queryKey: queryKeys.posts.feed(),
});

await queryClient.invalidateQueries({
  queryKey: queryKeys.posts.explore(),
});

      toast.success("Post shared successfully.");
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
          ?.toLowerCase()
          ?.trim();

        if (message?.includes("already shared")) {
          toast.info(
            "You've already shared this post."
          );
          return;
        }
      }

      toast.error(
        "Failed to share the post. Please try again."
      );
    },
  });
}