"use client";
import {
  Box,
} from "@mui/material";
import { CreatePost } from "src/features/posts/components/create-post";
import { FollowingFeed } from "src/features/posts/components/following-feed";
import { FeedTabs } from "src/features/posts/components/feed-tabs";
import { ExploreFeed } from "src/features/posts/components/explore-feed";
import { PalestineBanner } from "src/features/campaign/components/palestine-banner";
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
<PalestineBanner />
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