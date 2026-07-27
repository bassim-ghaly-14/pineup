"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "src/features/auth/hooks/use-auth";
import { notificationsService } from "../services/notifications.service";
import { queryKeys } from "src/constants/query-keys";

export function useNotifications() {
  const { data } = useAuth();

  return useQuery({
    queryKey: queryKeys.notifications.list(),
    queryFn: notificationsService.getAll,
    enabled: !!data?.user,
    refetchInterval: data?.user ? 30000 : false,
  });
}