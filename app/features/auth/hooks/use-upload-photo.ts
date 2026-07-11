"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { authService } from "../services/auth.service";
import { queryKeys } from "@/constants/query-keys";

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      authService.uploadPhoto(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.profile(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.all,
      });
    },
  });
}