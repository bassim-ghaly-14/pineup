"use client";

import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useUnreadCount } from "../hooks/use-unread-count";

export function NotificationBell() {
  const {
    data = 0,
  } = useUnreadCount();

  return (
    <Badge
      badgeContent={data}
      invisible={!data}
      color="primary"
    >
      <NotificationsIcon />
    </Badge>
  );
}