"use client";

import {
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export function Loader() {
  return (
    <Paper
      elevation={0}
      sx={{
        py: 8,
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        spacing={3}
        sx={{ alignItems: "center" }}
      >
        <CircularProgress
          size={54}
        />

        <Typography
          color="text.secondary"
        >
          Loading...
        </Typography>
      </Stack>
    </Paper>
  );
}