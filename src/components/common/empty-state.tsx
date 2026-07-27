"use client";

import { Paper, Stack, Typography } from "@mui/material";

import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

type Props = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <InboxRoundedIcon
          sx={{
            fontSize: 60,
            color: "primary.main",
          }}
        />

        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "text.primary" }}>
          {title}
        </Typography>

        {description && (
          <Typography
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 420 }}>
            {description}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
