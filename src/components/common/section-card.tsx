"use client";

import {
  Stack,
  Typography,
} from "@mui/material";

import { GlassCard } from "./glass-card";

type Props = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  children,
}: Props) {
  return (
    <GlassCard
      sx={{ p: 3 }}
    >
      <Stack spacing={3}>
        <Typography sx={{variant:"h6",fontWeight:700,}}
        >
          {title}
        </Typography>

        {children}
      </Stack>
    </GlassCard>
  );
}