"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import { queryKeys } from "src/constants/query-keys";

export function useNotifications() {
  return useQuery({
    queryKey:
      queryKeys.notifications.list(),
    queryFn:
      notificationsService.getAll,
    refetchInterval: 30000,
  });
}