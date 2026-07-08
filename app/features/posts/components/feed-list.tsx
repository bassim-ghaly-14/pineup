"use client";

import { useEffect, useRef } from "react";
import { Stack, Box, CircularProgress } from "@mui/material";

import { PostCard } from "./post-card";
import { Post } from "../types/post.types";

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

        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const initPosts = (posts ?? []).filter(Boolean);
  console.log("POST IDS:", initPosts.map(p => p?._id));
  console.log("RAW POSTS:", initPosts);
  console.log("FIRST POST:", initPosts?.[0]);
  const safePosts = Array.isArray(posts) ? posts.flatMap((p : any) => p.posts ?? [p]) : [];

  return (
    <Stack spacing={2}>
      {safePosts.map((post) => (
        <PostCard
          key={post?._id ?? `${post?.createdAt}-${post?.user?._id}`}
          post={post}
        />
      ))}

      {/* Infinite scroll trigger */}
      <Box ref={loaderRef} sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        {isFetchingNextPage && <CircularProgress size={22} />}
      </Box>
    </Stack>
  );
}