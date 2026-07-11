"use client";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

export function ErrorState({
  message,
}: {
  message: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        borderRadius: 5,
        border: "1px solid",
        borderColor: "error.main",
      }}
    >
      <Stack
        spacing={2}
        sx={{ alignItems: "center" }}
      >
        <ErrorOutlineRoundedIcon
          color="error"
          sx={{ fontSize: 64 }}
        />

        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Something went wrong
        </Typography>

        <Typography
          color="text.secondary"
          align="center"
        >
          {message}
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            location.reload()
          }
        >
          Try Again
        </Button>
      </Stack>
    </Paper>
  );
}