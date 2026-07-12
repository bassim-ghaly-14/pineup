"use client";
import {
  Box,
} from "@mui/material";
import { CreatePost } from "@/features/posts/components/create-post";
import { FollowingFeed } from "@/features/posts/components/following-feed";
import { FeedTabs } from "@/features/posts/components/feed-tabs";
import { ExploreFeed } from "@/features/posts/components/explore-feed";
import { useState } from "react";

export default function FeedPage() {
  const [tab, setTab] = useState<"following" | "explore">
  ("following");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CreatePost />
<FeedTabs
  value={tab}
  onChange={setTab}
/>
{tab === "following" ? (
  <FollowingFeed />
) : (
  <ExploreFeed />
)}
    </Box>
  );
}