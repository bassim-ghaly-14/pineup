"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { usersService } from "../services/users.service";
import { queryKeys } from "@/constants/query-keys";

type Variables = {
  userId: string;
};
export function useUnfollowUser() {
  const queryClient =
    useQueryClient();

  return useMutation<
    unknown,
    unknown,
    Variables
  >({
    mutationFn: ({
      userId,
    }) =>
      usersService.unfollow(userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.users.all,
      });
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.users.suggestions(),
      });
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.users.profile(
            variables.userId
          ),
      });
    },
  });
}