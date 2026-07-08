"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "@/constants/query-keys";

type UpdateCommentPayload = {
  postId: string;
  commentId: string;
  formData: FormData;
};

export function useUpdateComment() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      formData,
    }: UpdateCommentPayload) =>
      commentsService.update(
        postId,
        commentId,
        formData
      ),

    onSuccess: async (
      _,
      variables
    ) => {
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