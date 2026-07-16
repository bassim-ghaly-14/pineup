"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { notificationsService } from "../services/notifications.service";

import { queryKeys } from "src/constants/query-keys";

export function useMarkRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsService.markRead,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.notifications.list(),
      });

      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.notifications.unread(),
      });
    },
  });
}