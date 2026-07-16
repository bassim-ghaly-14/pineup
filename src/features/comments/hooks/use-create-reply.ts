"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentsService } from "../services/comments.service";

import { queryKeys } from "src/constants/query-keys";


type Payload = {
  postId:string;
  commentId:string;
  formData:FormData;
};


export function useCreateReply(){

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:({
      postId,
      commentId,
      formData,
    }:Payload)=>
      commentsService.createReply(
        postId,
        commentId,
        formData
      ),


    onSuccess:(
      _,
      variables
    )=>{

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.comments.replies(
            variables.postId,
            variables.commentId
          ),
      });


      queryClient.invalidateQueries({
        queryKey:
          queryKeys.comments.post(
            variables.postId
          ),
      });

    }

  });

}