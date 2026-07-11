"use client";

import {
  Box,
  Card,
  Tooltip,
  Typography,
} from "@mui/material";

type Props = {
  followers: number;
  following: number;
  bookmarks?: number;
  userId?: string;
};

export function ProfileStats({
  followers,
  following,
  bookmarks = 0,
}: Props) {
  const items = [
    {
      label: "Followers",
      value: followers,
      disabled: true,
    },
    {
      label: "Following",
      value: following,
      disabled: true,
    },
    {
      label: "Bookmarks",
      value: bookmarks,
      disabled: false,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(3,1fr)",
        },
        gap: 2,
        mb: 3,
      }}
    >
      {items.map((item) => (
        <Tooltip
          key={item.label}
          title={
            item.disabled
              ? "Coming soon"
              : ""
          }
        >
          <Card
            sx={{
              p: 2,
              textAlign: "center",

              cursor: item.disabled
                ? "not-allowed"
                : "pointer",

              opacity: item.disabled
                ? 0.6
                : 1,

              transition: "all .2s ease",

              "&:hover": {
                transform: item.disabled
                  ? "none"
                  : "translateY(-3px)",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
              }}
            >
              {item.value}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {item.label}
            </Typography>
          </Card>
        </Tooltip>
      ))}
    </Box>
  );
}