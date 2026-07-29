"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";

import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;

  icon?: ReactNode;

  badge?: ReactNode;

  action?: ReactNode;
};

export function EmptyState({ title, description, icon, badge, action }: Props) {
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
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
          textAlign: "center",
        }}>
        <Box
          sx={{
            width: 84,
            height: 84,

            borderRadius: "50%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            bgcolor: "action.hover",

            border: "1px solid",
            borderColor: "divider",

            color: "primary.main",
          }}>
          {icon ?? (
            <InboxRoundedIcon
              sx={{
                fontSize: 40,
              }}
            />
          )}
        </Box>

        <Stack spacing={1}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}>
            {title}
          </Typography>

          {description && (
            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 460,
              }}>
              {description}
            </Typography>
          )}
        </Stack>

        {badge}

        {action}
      </Stack>
    </Paper>
  );
}
