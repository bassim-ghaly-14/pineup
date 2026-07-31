"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { STORAGE_KEYS } from "src/constants/storage-keys";

import { PalestineBanner } from "src/features/campaign/components/palestine-banner";
import { useAuth } from "src/features/auth/hooks/use-auth";
import { useRequireAuthAction } from "src/features/auth/hooks/use-require-auth-action";
import { CreatePost } from "src/features/posts/components/create-post";
import { ExploreFeed } from "src/features/posts/components/explore-feed";
import { FeedTabs } from "src/features/posts/components/feed-tabs";
import { FollowingFeed } from "src/features/posts/components/following-feed";

export default function FeedPage() {
  const { token } = useAuth();
  const { requireAuth } = useRequireAuthAction();

  const [tab, setTab] = useState<"following" | "explore">("explore");

  useEffect(() => {
    if (token) {
      setTab("following");
    }
  }, [token]);

  useEffect(() => {
    if (!token && tab === "following") {
      setTab("explore");
    }
  }, [token, tab]);

  const handleTabChange = (value: "following" | "explore") => {
    if (value === "following") {
      requireAuth(() => {
        setTab("following");
      });

      return;
    }

    setTab("explore");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
      <CreatePost />

      <PalestineBanner />

      <FeedTabs value={tab} onChange={handleTabChange} />

      {tab === "following" ? <FollowingFeed /> : <ExploreFeed />}
    </Box>
  );
}
