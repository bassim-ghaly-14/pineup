"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "src/constants/query-keys";

type DeleteCommentPayload = {
  postId: string;
  commentId: string;
};

export function useDeleteComment() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: DeleteCommentPayload) =>
      commentsService.remove(
        postId,
        commentId
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