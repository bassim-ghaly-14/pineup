"use client";

import { useEffect, useRef } from "react";
import { Stack, Box, CircularProgress } from "@mui/material";

import { PostCard } from "./post-card";
import type { Post } from "../types/post.types";

type Props = {
  posts: Post[];

  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export function FeedList({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    if (!fetchNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (
          target.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  return (
    <Stack spacing={2}>
      {posts.map((post, index) => (
        <PostCard
          key={post._id ?? `${post.id}-${index}`}
          post={post}
        />
      ))}

      <Box
        ref={loaderRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
        }}
      >
        {isFetchingNextPage && (
          <CircularProgress size={22} />
        )}
      </Box>
    </Stack>
  );
}