"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { usersService } from "../services/users.service";

import { queryKeys } from "@/constants/query-keys";

import type {
  ProfileResponse,
} from "@/features/auth/types/auth.types";

type Variables = {
  userId: string;
};

export function useUnfollowUser() {

  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
    }: Variables) =>
      usersService.unfollow(userId),

    onMutate: async ({
      userId,
    }) => {

      await queryClient.cancelQueries({
        queryKey:
          queryKeys.auth.profile(),
      });

      const previous =
        queryClient.getQueryData<ProfileResponse>(
          queryKeys.auth.profile()
        );

      if (previous) {

        queryClient.setQueryData(
          queryKeys.auth.profile(),
          {
            ...previous,

            user: {
              ...previous.user,

              following:
                previous.user.following.filter(
                  (user) => user._id !== userId
                ),
            },
          }
        );
      }

      return {
        previous,
      };
    },

    onError: (
      _,
      __,
      context
    ) => {

      if (
        context?.previous
      ) {

        queryClient.setQueryData(
          queryKeys.auth.profile(),
          context.previous
        );

      }

    },

    onSettled: (
      _,
      __,
      variables
    ) => {

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.auth.profile(),
      });
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.users.profile(
            variables.userId
          ),
      });
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.users.suggestions(),
      });
      queryClient.invalidateQueries({
          queryKey: queryKeys.users.all,
        });
    },

  });

}