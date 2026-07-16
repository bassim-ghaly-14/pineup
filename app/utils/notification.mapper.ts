import { Notification } from "@/features/notifications/types/notifications-types";

export function getNotificationAction(
  notification: Notification
) {
const isReply =
  !!notification.entity?.parentComment ||
  !!notification.entity?.isReply;

  if (notification.entity?.unavailable) {
    return "This content is no longer available";
  }

  switch (notification.type) {
    case "like_post":
      return "liked your post";

    case "comment_post":
      return isReply
        ? "replied to your comment"
        : "commented on your post";

    case "reply_comment":
      return "replied to your comment";

    case "follow_user":
      return "started following you";

    case "share_post":
      return "reposted your post";

    default:
      return "interacted with you";
  }
}

export function getNotificationBody(
  notification: Notification
) {
  if (notification.entity?.unavailable) {
    return null;
  }

  return notification.entity?.body ?? "";
}