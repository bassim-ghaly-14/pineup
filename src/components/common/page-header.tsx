"use client";

import {
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  title: string;
  subtitle?: string;
};

export function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <Stack spacing={1}>
      <Typography sx={{variant:"h4",fontWeight:800}}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          color="text.secondary"
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}