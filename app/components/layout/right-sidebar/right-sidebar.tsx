"use client";

import {
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import { GlassCard } from "@/components/common/glass-card";
import { UserAvatar } from "@/components/common/user-avatar";

const suggestions = [
  { name: "Alex Morgan", username: "@alex" },
  { name: "Sophia", username: "@sophia" },
  { name: "David Kim", username: "@david" },
];

export function RightSidebar() {
  return (
    <Stack spacing={3}>
      {/* Trending */}
      <GlassCard sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          Trending
        </Typography>

        <Stack spacing={1.5}>
          <Typography color="text.secondary">#Technology</Typography>
          <Typography color="text.secondary">#Design</Typography>
          <Typography color="text.secondary">#ArtificialIntelligence</Typography>
        </Stack>
      </GlassCard>

      {/* Who to follow */}
      <GlassCard sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          Who to follow
        </Typography>

        <Stack spacing={2} divider={<Divider />}>
          {suggestions.map((user) => (
            <Box
              key={user.username}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <UserAvatar />

              <Stack spacing={0}>
                <Typography sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {user.username}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </GlassCard>
    </Stack>
  );
}