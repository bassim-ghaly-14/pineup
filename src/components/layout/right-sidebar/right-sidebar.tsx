"use client";

import { Stack, Typography, Divider, Box, Button } from "@mui/material";

import Link from "next/link";

import { GlassCard } from "src/components/common/glass-card";
import { useUserIndexer } from "src/features/social/hooks/use-user-indexer";
import { useSuggestions } from "src/features/users/hooks/use-suggestions";
import { SuggestedUserCard } from "src/features/users/components/suggested-user-card";
import { ROUTES } from "src/constants/routes";
import { OverviewCard } from "./overview-card";
import { SuggestionsLoader } from "src/components/common/loader";

export function RightSidebar() {
  const { data = [], isLoading } = useSuggestions();

  useUserIndexer({
    users: data,
    source: "suggestions",
  });

  return (
    <Stack spacing={3}>
      <OverviewCard />

      <GlassCard sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}>
          <Typography
            sx={{
              fontWeight: 700,
            }}>
            Grow Your Network
          </Typography>

          <Button component={Link} href={ROUTES.SUGGESTIONS} size="small">
            View all
          </Button>
        </Box>

        {isLoading ? (
          <SuggestionsLoader />
        ) : data.length > 0 ? (
          <Stack spacing={2} divider={<Divider />}>
            {data.slice(0, 5).map((user) => (
              <SuggestedUserCard key={user._id} user={user} compact />
            ))}
          </Stack>
        ) : (
          <Typography
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              fontSize: 14,
            }}>
            Discover new connections and build your network after joining
            PineUp.
          </Typography>
        )}
      </GlassCard>
    </Stack>
  );
}
