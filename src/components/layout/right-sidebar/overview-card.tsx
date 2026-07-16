"use client";

import {
  ArticleRounded,
  BookmarkRounded,
  GroupAddRounded,
  NotificationsRounded,
} from "@mui/icons-material";

import {
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { GlassCard } from "src/components/common/glass-card";

import { useFeed } from "src/features/posts/hooks/use-feed";
import { useNotifications } from "src/features/notifications/hooks/use-notifications";
import { useBookmarks } from "src/features/users/hooks/use-bookmarks";
import { useSuggestions } from "src/features/users/hooks/use-suggestions";

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1.75,
        borderRadius: 3,
        bgcolor: "background.default",
        transition: "0.2s",
        cursor: "default",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            bgcolor: "primary.50",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
      </Box>

      <Box
        sx={{
          minWidth: 34,
          px: 1.25,
          py: 0.5,
          borderRadius: 99,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          textAlign: "center",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        {value}
      </Box>
    </Box>
  );
}

export function OverviewCard() {
  const bookmarks = useBookmarks();
  const notifications = useNotifications();
  const suggestions = useSuggestions();
  const feed = useFeed();

  const loading =
    bookmarks.isLoading ||
    notifications.isLoading ||
    suggestions.isLoading ||
    feed.isLoading;

  return (
    <GlassCard sx={{ p: 3 }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 20,
          mb: 3,
          letterSpacing: -0.3,
        }}
      >
        Overview
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 3,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      ) : (
        <Stack spacing={1.5}>
          <StatRow
            icon={<NotificationsRounded fontSize="small" />}
            label="Notifications"
            value={notifications.data?.length ?? 0}
          />

          <StatRow
            icon={<BookmarkRounded fontSize="small" />}
            label="Bookmarks"
            value={bookmarks.data?.length ?? 0}
          />

          <StatRow
            icon={<GroupAddRounded fontSize="small" />}
            label="Suggestions"
            value={suggestions.data?.length ?? 0}
          />

          <StatRow
            icon={<ArticleRounded fontSize="small" />}
            label="Posts"
            value={feed.data?.length ?? 0}
          />
        </Stack>
      )}
    </GlassCard>
  );
}