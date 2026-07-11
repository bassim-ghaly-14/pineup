"use client";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "@/components/common/loader";
import { useNotifications } from "../hooks/use-notifications";
import { useMarkRead } from "../hooks/use-mark-read";

import {
  getNotificationBody,
  getNotificationTitle,
} from "@/utils/notification.mapper";

import { formatDate } from "@/utils/format-date";
import { Notification } from "../types/notifications-types";
import { ROUTES } from "@/constants/routes";
import { UserAvatar } from "@/components/common/user-avatar";

export function NotificationList() {
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

      switch (item.type) {

        case "follow":
          router.push(
            ROUTES.PROFILE_BY_ID(
              item.actor._id
            )
          );
          return;

        default:

          if (
            item.entity?.unavailable
          ) {
            toast.info(
              "This post is no longer available."
            );

            return;
          }

          if (
            item.entityType === "post" &&
            item.entityId
          ) {
            router.push(
              ROUTES.POST(
                item.entityId
              )
            );
          }

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
          const title =
            getNotificationTitle(item);
          const body =
            getNotificationBody(item);
          const isUnavailable =
            item.entity?.unavailable === true;

          return (
            <Box
              key={item._id}
            >
              <ListItemButton
                disabled={isUnavailable}
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

                    router.push(
                      ROUTES.PROFILE_BY_ID(
                        item.actor._id
                      )
                    );
                  }}
                />

                <ListItemText
                  primary={title}
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
                        {formatDate(
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
                        ? "Post unavilable"
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