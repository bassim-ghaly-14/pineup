"use client";

import {
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { FeedList } from "@/features/posts/components/feed-list";
import { useBookmarks } from "@/features/users/hooks/use-bookmarks";

export default function BookmarksPage() {
  const {
    data = [],
    isLoading,
  } = useBookmarks();

  if (isLoading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        py={6}
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (!data.length) {
    return (
      <Typography
        align="center"
        color="text.secondary"
        sx={{ py: 6 }}
      >
        No bookmarks yet.
      </Typography>
    );
  }

  return (
    <FeedList
      posts={data}
    />
  );
}