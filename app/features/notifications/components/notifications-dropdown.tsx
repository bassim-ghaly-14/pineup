"use client";

import {
  Paper,
  Box,
  Button,
  Stack,
} from "@mui/material";

import { NotificationList } from "@/features/notifications/components/notifications-list";
import { useMarkAllRead } from "../hooks/use-mark-all-read";

export function NotificationsDropdown() {
  const {mutate: markAllRead,} = useMarkAllRead();
  return (
    <Paper
      sx={{
        width: 350,
        maxHeight: 450,
        overflow: "auto",
      }}
    >
    <Box p={2}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        mb={2}
      >
        <Button
          size="small"
          onClick={() =>
            markAllRead()
          }
        >
          Mark all as read
        </Button>
      </Stack>

      <NotificationList />
    </Box>
    </Paper>
  );
}