"use client";

import { useQuery } from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "@/constants/query-keys";

export function useComments(
  postId: string
) {
  return useQuery({
    queryKey:
      queryKeys.comments.post(postId),

    queryFn: () =>
      commentsService.getComments(postId),

    enabled: !!postId,
  });
}