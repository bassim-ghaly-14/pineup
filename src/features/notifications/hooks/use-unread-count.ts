"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import { queryKeys } from "src/constants/query-keys";
import { STORAGE_KEYS } from "src/constants/storage-keys";

export function useUnreadCount() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.TOKEN)
      : null;

  return useQuery({
    queryKey: queryKeys.notifications.unread(),
    queryFn: notificationsService.unreadCount,
    enabled: !!token,
    refetchInterval: 30000,
  });
}