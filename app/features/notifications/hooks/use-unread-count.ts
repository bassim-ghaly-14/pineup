"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import { queryKeys } from "@/constants/query-keys";

export function useUnreadCount() {
  return useQuery({
    queryKey:
      queryKeys.notifications.unread(),
    queryFn:
      notificationsService.unreadCount,
    refetchInterval: 30000,
  });
}