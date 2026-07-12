"use client";

import {
  Box,
  Typography,
} from "@mui/material";
import { VerifiedBadge } from "@/components/common/verified-badge";
type Props = {
  name: string;
  username: string;
  bio?: string;
  isVerified?: boolean;
};

export function ProfileInfo({
  name,
  username,
  bio,
  isVerified,
}: Props) {
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          mb: 0.5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {name}
        </Typography>

        {isVerified && (
          <VerifiedBadge />
        )}
      </Box>


      <Typography
        sx={{
          mb: 1,
          color: "rgba(255,255,255,.75)",
        }}
      >
        @{username}
      </Typography>


      {bio && (
        <Typography>
          {bio}
        </Typography>
      )}
    </Box>
  );
}