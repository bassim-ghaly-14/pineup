"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { User } from "../types/user.types";
import { queryKeys } from "src/constants/query-keys";

import type {
  ProfileResponse,
} from "src/features/auth/types/auth.types";

type Variables = {
  userId: string;
};

export function useFollowUser() {

  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
    }: Variables) =>
      usersService.follow(userId),

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

              following: [
                ...previous.user.following,
                {
                  _id: userId,
                },
              ],
            },
          }
        );
      }
const previousSuggestions =
  queryClient.getQueryData<User[]>(
    queryKeys.users.suggestions()
  );


queryClient.setQueryData<User[]>(
  queryKeys.users.suggestions(),
  (old) => {
    if (!old) return old;

    return old.map((user) =>
      user._id === userId
        ? {
            ...user,
            isFollowing: true,
          }
        : user
    );
  }
);
      return {
        previous,
        previousSuggestions,
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
if(context?.previousSuggestions){
  queryClient.setQueryData(
    queryKeys.users.suggestions(),
    context.previousSuggestions
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

setTimeout(() => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.users.suggestions(),
  });
}, 900);

      queryClient.invalidateQueries({
          queryKey: queryKeys.users.all,
        });
    },

  });

}