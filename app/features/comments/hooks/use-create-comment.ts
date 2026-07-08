"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "@/constants/query-keys";

type CreateCommentPayload = {
  postId: string;
  formData: FormData;
};

export function useCreateComment() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      formData,
    }: CreateCommentPayload) =>
      commentsService.create(
        postId,
        formData
      ),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.comments.post(
            variables.postId
          ),
      });

      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.posts.feed(),
      });
    },
  });
}