"use client";

import {
  Box,
  CircularProgress,
} from "@mui/material";

export function Loader() {
  return (
    <Box sx={{
      py:8,
      display:"flex",
      justifyContent:"center",}}
    >
      <CircularProgress />
    </Box>
  );
}