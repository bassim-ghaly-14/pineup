"use client";

import {
  Box,
  Typography,
} from "@mui/material";

type Props = {
  title: string;
  text: string;
};

export function FeatureCard({
  title,
  text,
}: Props) {
  return (
    <Box
      sx={{
        p: 2.5,

        border:
          "1px solid rgba(255,255,255,0.06)",

        borderRadius: 4,

        background:
          "rgba(255,255,255,0.03)",

        backdropFilter:
          "blur(12px)",
      }}
    >
      <Typography 
        sx={{
            fontWeight:700,
            mb:0.5}}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
      >
        {text}
      </Typography>
    </Box>
  );
}