"use client";

import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { VerifiedBadge } from "src/components/common/verified-badge";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
type Props = {
  name: string;
  username: string;
  bio?: string;
  createdAt: string;
  isVerified?: boolean;
};

export function ProfileInfo({
  name,
  username,
  bio,
  createdAt,
  isVerified,
}: Props) {
const joinedDate = new Intl.DateTimeFormat(
  "en",
  {
    month: "long",
    year: "numeric",
  }
).format(new Date(createdAt));
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          mb: 0.5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: isDark ? "#fff" : "text.primary",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {name}
        </Typography>

        {isVerified && (
          <VerifiedBadge />
        )}
      </Box>


      <Typography
        sx={{
          mb: 1,
          color: isDark ? "rgba(255,255,255,.75)" : "text.secondary",
        }}
      >
        @{username}
      </Typography>


      {bio && (
        <Typography>
          {bio}
        </Typography>
      )}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: bio ? 2 : 1,
    color: "text.secondary",
  }}
>
  <CalendarMonthRoundedIcon
    sx={{ fontSize: 18 }}
  />

  <Typography
    variant="body2"
    color="inherit"
  >
    Joined {joinedDate}
  </Typography>
</Box>
    </Box>
  );
}