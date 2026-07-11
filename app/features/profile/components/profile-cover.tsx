"use client";

import { Box } from "@mui/material";

type Props = {
  cover?: string;
  avatar?: string;
  name: string;
};

export function ProfileCover({
  cover,
  avatar,
  name,
}: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        mb: 8,
      }}
    >
      <Box
        sx={{
          height: {
            xs: 160,
            md: 220,
          },

          borderRadius: 4,

          background: cover
            ? `url(${cover}) center/cover`
            : "linear-gradient(135deg,#D4A63A,#E7C46A)",

          overflow: "hidden",
        }}
      />

      <Box
        component="img"
        src={avatar}
        alt={name}
        sx={{
          position: "absolute",

          width: {
            xs: 110,
            md: 140,
          },

          height: {
            xs: 110,
            md: 140,
          },

          borderRadius: "50%",

          objectFit: "cover",

          bottom: -30,

          left: {
            xs: 24,
            md: 40,
          },

          border: "6px solid",

          borderColor: "background.paper",

          backgroundColor:
            "background.paper",
        }}
      />
    </Box>
  );
}