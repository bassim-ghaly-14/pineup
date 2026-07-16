"use client";

import {
  Box,
  Button,
  Divider,
  Menu,
  Stack,
  Typography,
} from "@mui/material";

import { NotificationList } from "src/features/notifications/components/notifications-list";

import { useMarkAllRead } from "../hooks/use-mark-all-read";

type Props = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

export function NotificationsDropdown({
  anchorEl,
  onClose,
}: Props) {
  const open = Boolean(anchorEl);

  const { mutate: markAllRead } =
    useMarkAllRead();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            width: 380,
            maxHeight: 500,
            overflow: "hidden",
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(24px)",
          },
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack
          component="div"
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{fontWeight:700}}
            variant="h6"
          >
            Notifications
          </Typography>

          <Button
            size="small"
            onClick={() =>
              markAllRead()
            }
          >
            Mark all as read
          </Button>
        </Stack>
      </Box>

      <Divider />

      <Box
        sx={{
          maxHeight: 420,
          overflowY: "auto",
        }}
      >
        <NotificationList onClose={onClose} />
      </Box>
    </Menu>
  );
}