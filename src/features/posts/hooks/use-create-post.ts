"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { postsService } from "../services/posts.service";
import { addPostToCache } from "../utils/update-post-cache";

import { queryKeys } from "src/constants/query-keys";

export function useCreatePost() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      postsService.create,


    onSuccess: (response) => {

      const post =
        response?.post;


      if (!post) {
        return;
      }


      const auth =
        queryClient.getQueryData<any>(
          queryKeys.auth.profile()
        );


      const normalizedPost = {
        ...post,

        user:
          auth?.user ?? post.user,

        likesCount:
          0,

        commentsCount:
          0,

        sharesCount:
          0,

        isShare:
          false,

        sharedPost:
          null,
      };


      addPostToCache(
        queryClient,
        normalizedPost
      );


      toast.success(
        "Post published successfully."
      );
    },


    onError: () => {
      toast.error(
        "Failed to publish post."
      );
    },

  });
}