"use client";

import {
  Box,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { GlassCard } from "@/components/common/glass-card";

type Props = {
  followers: number;
  following: number;
  bookmarks?: number;
  isOwner?: boolean;
};
type StatItem = {
  label: string;
  value: number;
  onClick?: () => void;
};
export function ProfileStats({
  followers,
  following,
  bookmarks = 0,
  isOwner = false,
}: Props) {
  const router = useRouter();

  const items: StatItem[] = [
    {
      label: "Followers",
      value: followers,
    },
    {
      label: "Following",
      value: following,
    },
  ];

  if (isOwner) {
    items.push({
      label: "Bookmarks",
      value: bookmarks,
      onClick: () =>
        router.push(ROUTES.BOOKMARKS),
    });
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: `repeat(${items.length}, 1fr)`,
        },
        gap: 2,
        mb: 3,
      }}
    >
      {items.map((item) => (
        <GlassCard
          key={item.label}
          onClick={item.onClick}
          sx={{
            p: 2,
            textAlign: "center",
            cursor: item.onClick
              ? "pointer"
              : "default",
            transition: "all .2s ease",

            "&:hover": item.onClick
              ? {
                  transform:
                    "translateY(-3px)",
                }
              : {},
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
        </GlassCard>
      ))}
    </Box>
  );
}