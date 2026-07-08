"use client";

import {
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  title: string;
};

export function EmptyState({
  title,
}: Props) {
  return (
    <Stack sx={{alignItems:"center", py:8}}
    >
      <Typography
        color="text.secondary"
      >
        {title}
      </Typography>
    </Stack>
  );
}