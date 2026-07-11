"use client";

import {
  Box,
  Typography,
} from "@mui/material";

type Props = {
  name: string;
  username: string;
  bio?: string;
};

export function ProfileInfo({
  name,
  username,
  bio,
}: Props) {
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{color: "#fff", fontWeight:800}}
      >
        {name}
      </Typography>


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