"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "@/constants/query-keys";
import { updatePostInCache } from "@/features/posts/utils/update-post-cache";

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

onSuccess: (response, variables) => {
  updatePostInCache(
    queryClient,
    variables.postId,
    (oldPost) => ({
      ...oldPost,
      commentsCount: (oldPost.commentsCount ?? 0) + 1,
      topComment: response.comment,
    })
  );

  queryClient.invalidateQueries({
    queryKey: queryKeys.comments.post(
      variables.postId
    ),
  });
},
  });
}