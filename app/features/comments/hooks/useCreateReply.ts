"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "@/constants/query-keys";


type CreateReplyPayload = {
  postId: string;
  commentId: string;
  formData: FormData;
};


export function useCreateReply() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn: ({
      postId,
      commentId,
      formData,
    }: CreateReplyPayload) =>
      commentsService.createReply(
        postId,
        commentId,
        formData
      ),


    onSuccess: async (_, variables) => {

      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.comments.replies(
            variables.postId,
            variables.commentId
          ),
      });


      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.comments.post(
            variables.postId
          ),
      });

    },

  });

}