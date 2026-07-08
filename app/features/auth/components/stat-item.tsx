"use client";

import {
  Box,
  Typography,
} from "@mui/material";

type Props = {
  value: string;
  label: string;
};

export function StatItem({
  value,
  label,
}: Props) {
  return (
    <Box>
      <Typography 
        sx={{
            variant:"h4",
            fontWeight:800,
            color:"primary.main"}}
      >
        {value}
      </Typography>

      <Typography
        color="text.secondary"
      >
        {label}
      </Typography>
    </Box>
  );
}