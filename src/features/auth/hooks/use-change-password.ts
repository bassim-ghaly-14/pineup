"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { authService } from "../services/auth.service";
import { queryKeys } from "src/constants/query-keys";
import { STORAGE_KEYS } from "src/constants/storage-keys";

export function useChangePassword() {
  const queryClient =
    useQueryClient();
  return useMutation({
    mutationFn:
      authService.changePassword,
    onSuccess: (response) => {
      localStorage.setItem(
        STORAGE_KEYS.TOKEN,
        response.token
      );
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.auth.profile(),
      });
    },
  });
}