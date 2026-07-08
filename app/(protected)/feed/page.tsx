"use client";

import { Box } from "@mui/material";

import { CreatePost } from "@/features/posts/components/create-post";
import { FeedList } from "@/features/posts/components/feed-list";

import { useInfiniteFeed } from "@/features/posts/hooks/use-infinite-feed";

export default function FeedPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFeed();

  const posts =
    data?.pages?.flat() ?? [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CreatePost />

      <FeedList
        posts={posts}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Box>
  );
}