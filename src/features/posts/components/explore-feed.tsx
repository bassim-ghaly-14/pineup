"use client";

import { Box, CircularProgress, Button } from "@mui/material";

import { FeedList } from "./feed-list";
import { useInfiniteFeed } from "../hooks/use-infinite-feed";
import { useUserIndexer } from "src/features/social/hooks/use-user-indexer";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { EmptyState } from "@/components/common/empty-state";

export function ExploreFeed() {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFeed();

  const { isAuthenticated, token } = useAuth();

  useUserIndexer({
    posts: data?.posts ?? [],
    source: "explore",
  });

  if (token && !isAuthenticated) {
    return (
      <Box
        sx={{
          py: 6,
          display: "flex",
          justifyContent: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return (
      <EmptyState
        title="Welcome to PineUp"
        description="Create an account to discover posts and connect with people."
      />
    );
  }

  if (isPending) {
    return (
      <Box
        sx={{
          py: 6,
          display: "flex",
          justifyContent: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <FeedList posts={data?.posts ?? []} />

      {hasNextPage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}>
          <Button
            variant="outlined"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
