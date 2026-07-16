"use client";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "@/components/common/loader";
import { useNotifications } from "../hooks/use-notifications";
import { useMarkRead } from "../hooks/use-mark-read";
import { VerifiedBadge } from "@/components/common/verified-badge";
import { isVerified } from "@/utils/is-verified";
import {
  getNotificationBody,
  getNotificationAction,
} from "@/utils/notification.mapper";

import { formatRelativeDate } from "@/utils/format-date";
import { Notification } from "../types/notifications-types";
import { ROUTES } from "@/constants/routes";
import { UserAvatar } from "@/components/common/user-avatar";

type Props = {
  onClose?: () => void;
};

export function NotificationList({
  onClose,
}: Props) {
  const {
    data = [],
    isPending,
  } = useNotifications();

  const {
    mutate: markRead,
  } = useMarkRead();

  const router = useRouter();

  if (isPending) {
    return <Loader />;
  }

  if (!data.length) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">
          No notifications yet
        </Typography>
      </Box>
    );
  }

const handleNavigation = (
  item: Notification
) => {
  if (!item.isRead) {
    markRead(item._id);
  }

  onClose?.();


  if (item.entity?.unavailable) {
    toast.info(
      "This content is no longer available."
    );
    return;
  }


  switch (item.type) {

    case "follow_user":
      router.push(
        ROUTES.PROFILE_BY_ID(
          item.actor._id
        )
      );
      return;

case "comment_post":
case "reply_comment": {
  const postId =
    typeof item.entity?.post === "string"
      ? item.entity.post
      : item.entity?.post?._id;

  if (!postId) {
    return;
  }

  const postUrl = ROUTES.POST(postId);

  const commentId =
    item.entity?.topComment?._id ??
    item.entity?._id;

  if (commentId) {
    router.push(`${postUrl}?comment=${commentId}`);
  } else {
    router.push(postUrl);
  }

  return;
}

    case "like_post":
    case "share_post":

      if (!item.entityId) {
        return;
      }

      router.push(
        ROUTES.POST(
          item.entityId
        )
      );

      return;


    default:
      return;
  }
};

  return (
    <List
      disablePadding
      sx={{
        bgcolor: "transparent",
      }}
    >
      {data.map(
        (
          item: Notification,
          index: number
        ) => {
          const body =
            getNotificationBody(item);
          const isUnavailable =
            item.entity?.unavailable === true;
const action =
  getNotificationAction(item);
          return (
            <Box
              key={item._id}
            >
              <ListItemButton
                // disabled={isUnavailable}
                onClick={() =>
                  handleNavigation(item)
                }
                sx={{
                  alignItems:
                    "flex-start",
                  py: 2,
                  px: 2.5,
                  gap: 2,
                  transition:
                    "all .2s ease",
                  opacity: isUnavailable
                  ? .55
                  : 1,
                  bgcolor:
                    item.isRead
                      ? "transparent"
                      : "action.hover",

                  "&:hover": {
                    bgcolor:
                      "action.selected",
                  },
                }}
              >
                <UserAvatar
                  src={
                    item.actor.photo
                  }
                  userId={
                    item.actor._id
                  }
                  sx={{
                    width: 44,
                    height: 44,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose?.();

                    router.push(
                      ROUTES.PROFILE_BY_ID(
                        item.actor._id
                      )
                    );
                  }}
                />

                <ListItemText
                  primary={
  <Stack
    direction="row"
    spacing={0.5}
    sx={{ alignItems: "center", flexWrap:"wrap" }}
  >
<Typography sx={{fontWeight:700}}
  component="span"
>
  {item.actor?.name ?? "Someone"}
</Typography>

{isVerified(item.actor?._id) && (
  <VerifiedBadge size={16} />
)}

<Typography sx={{fontWeight:400}}
  component="span"
  color="text.primary"
>
  {" "}
  {action}
</Typography>
  </Stack>
}
                  secondary={
                    <Box
                      sx={{
                        mt: 0.5,
                      }}
                    >
                      {body && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {body}
                        </Typography>
                      )}

                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{
                          mt: 1,
                          display:
                            "block",
                        }}
                      >
                        {formatRelativeDate(
  item.createdAt
)}
                      </Typography>

                      <Typography
                        variant="caption"
                        color={
                          isUnavailable
                          ? "text.disabled"
                          : "primary.main"
                        }
                        sx={{
                          display:
                            "block",
                          mt: 0.5,
                          fontWeight: 600,
                        }}
                      >
                      {isUnavailable
                        ? "Post unavailable"
                        : "Tap to view →"
                      }
                      </Typography>
                    </Box>
                  }
                  slotProps={{
                    primary: {
                      component:
                        "div",
                      sx: {
                        fontWeight:
                          item.isRead
                            ? 500
                            : 700,
                      },
                    },
                    secondary: {
                      component:
                        "div",
                    },
                  }}
                />
              </ListItemButton>

              {index !==
                data.length - 1 && (
                <Divider />
              )}
            </Box>
          );
        }
      )}
    </List>
  );
}