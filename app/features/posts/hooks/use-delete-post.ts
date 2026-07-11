"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { postsService } from "../services/posts.service";
import { removePostFromCache } from "../utils/update-post-cache";


export function useDeletePost() {
  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: async (id: string) => {
      await postsService.remove(id);

      return id;
    },


    onSuccess: (postId) => {

      removePostFromCache(
        queryClient,
        postId
      );

      toast.success(
        "Post deleted successfully."
      );
    },


    onError: (error) => {

      console.error(
        "Delete post error:",
        error
      );


      toast.error(
        "Failed to delete post."
      );
    },

  });
}