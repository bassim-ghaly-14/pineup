"use client";

import { Box, CircularProgress, Button } from "@mui/material";

import { FeedList } from "./feed-list";
import { useInfiniteFeed } from "../hooks/use-infinite-feed";
import { useUserIndexer } from "@/features/social/hooks/use-user-indexer";

export function ExploreFeed() {
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFeed();
useUserIndexer({
  posts: data?.posts ?? [],
  source: "explore",
});
  if (isPending) {
    return (
      <Box
        sx={{
          py: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

return (
  <Box>
    <FeedList
      posts={data?.posts ?? []}
    />

    {hasNextPage && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "Loading..."
            : "Load More"}
        </Button>
      </Box>
    )}
  </Box>
);
}