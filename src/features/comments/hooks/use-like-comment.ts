"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "src/constants/query-keys";

type LikeCommentPayload = {
  postId: string;
  commentId: string;
};

export function useLikeComment() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: LikeCommentPayload) =>
      commentsService.like(
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