import { Notification } from "@/features/notifications/types/notifications-types";

export function getNotificationTitle(
  notification: Notification
) {
  const actor =
    notification.actor?.name ?? "Someone";

  switch (notification.type) {
    case "like_post":
      return `${actor} liked your post`;

    case "comment_post":
      return `${actor} commented on your post`;

    case "reply_comment":
      return `${actor} replied to your comment`;

    case "follow":
      return `${actor} started following you`;

    case "share_post":
      return `${actor} shared your post`;

    default:
      return `${actor} interacted with you`;
  }
}

export function getNotificationBody(
  notification: Notification
) {
  return (
    notification.entity?.body ??
    "Tap to view"
  );
}
