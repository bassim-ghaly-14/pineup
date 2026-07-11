"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { postsService } from "../services/posts.service";
import { updatePostInCache } from "../utils/update-post-cache";

type Payload = {
  id: string;
  formData: FormData;
};

export function useUpdatePost() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: Payload) =>
      postsService.update(id,
        formData,
      ),

    onSuccess: (response) => {
      const post =
        response?.post;

      if (!post) {
        return;
      }

updatePostInCache(
  queryClient,
  post._id,
  (oldPost) => ({
    ...oldPost,
    ...post,

    user:
      typeof post.user === "object"
        ? {
            ...oldPost.user,
            ...post.user,
          }
        : oldPost.user,

    sharedPost:
      post.sharedPost ?? oldPost.sharedPost,
  }),
  typeof post.user === "object"
    ? post.user._id
    : undefined
);

      toast.success(
        "Post updated successfully."
      );
    },

    onError: () => {
      toast.error(
        "Failed to update post."
      );
    },
  });
}