"use client";

import { useQuery } from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "@/constants/query-keys";

type Props = {
  postId: string;
  commentId: string;
  enabled?: boolean;
};

export function useReplies({
  postId,
  commentId,
  enabled = false,
}: Props) {
  return useQuery({
    queryKey:
      queryKeys.comments.replies(
        postId,
        commentId
      ),

    queryFn: () =>
      commentsService.replies(
        postId,
        commentId
      ),

    enabled:
      enabled &&
      !!postId &&
      !!commentId,
  });
}