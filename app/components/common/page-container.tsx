"use client";

import { Box } from "@mui/material";

export function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {children}
    </Box>
  );
}