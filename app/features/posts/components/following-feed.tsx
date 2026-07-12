"use client";

import { FeedList } from "./feed-list";
import { useFeed } from "../hooks/use-feed";
import { useUserIndexer } from "@/features/social/hooks/use-user-indexer";

export function FollowingFeed() {
  const {
    data: posts = [],
  } = useFeed();
  useUserIndexer({
    posts,
    source: "feed",
  });

  return (
    <FeedList
      posts={posts}
    />
  );
}