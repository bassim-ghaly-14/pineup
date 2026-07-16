"use client";

import {
  CircularProgress,
  Paper,
  Skeleton,
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
export function SuggestionsLoader() {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Stack
          key={index}
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
        >
          <Skeleton
            variant="circular"
            width={48}
            height={48}
          />

          <Stack sx={{flex:1}} spacing={0.8}>
            <Skeleton
              variant="text"
              width="65%"
            />

            <Skeleton
              variant="text"
              width="45%"
            />
          </Stack>

          <Skeleton
            variant="rounded"
            width={72}
            height={32}
            sx={{ borderRadius: 2 }}
          />
        </Stack>
      ))}
    </Stack>
  );
}