"use client";

import {
  Box,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";

import { ROUTES } from "src/constants/routes";
import { GlassCard } from "src/components/common/glass-card";

type Props = {
  userId: string;
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
  userId,
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
    onClick: () =>
      router.push(
        ROUTES.PROFILE_FOLLOWERS(userId)
      ),
  },
  {
    label: "Following",
    value: following,
    onClick: () =>
      router.push(
        ROUTES.PROFILE_FOLLOWING(userId)
      ),
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
    gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
    gap: {
      xs: 1.25,
      sm: 2,
    },
    mb: 3,
  }}
>
      {items.map((item) => (
<GlassCard
  key={item.label}
  onClick={item.onClick}
  sx={(theme) => ({
    position: "relative",
    overflow: "hidden",

    p: {
      xs: 1.75,
      sm: 2.5,
    },

    borderRadius: 4,
    textAlign: "center",

    cursor: item.onClick ? "pointer" : "default",

    transition: "all .35s ease",

    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.08)"
        : "rgba(0,0,0,.08)",

    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))"
        : "linear-gradient(180deg, rgba(255,255,255,.92), rgba(248,250,252,.85))",

    backdropFilter: "blur(18px)",

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 10px 30px rgba(0,0,0,.18)"
        : "0 10px 28px rgba(15,23,42,.08)",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,

      background:
        theme.palette.mode === "dark"
          ? "radial-gradient(circle at top, rgba(255,255,255,.12), transparent 70%)"
          : "radial-gradient(circle at top, rgba(255,255,255,.9), transparent 70%)",

      opacity: 0,
      transition: ".35s",
    },

    "&:hover": item.onClick
      ? {
          transform: "translateY(-6px) scale(1.02)",

          borderColor: "primary.main",

          boxShadow:
            theme.palette.mode === "dark"
              ? "0 22px 45px rgba(0,0,0,.28)"
              : "0 22px 45px rgba(59,130,246,.18)",

          "&::before": {
            opacity: 1,
          },
        }
      : {},
  })}
>
<Typography
  sx={(theme) => ({
    fontSize: {
      xs: "1.55rem",
      sm: "2rem",
    },
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    mb: 0.75,
    color:
      theme.palette.mode === "dark"
        ? "common.white"
        : "grey.900",
  })}
>
  {item.value.toLocaleString()}
</Typography>

<Typography
  sx={(theme) => ({
    fontSize: {
      xs: ".72rem",
      sm: ".9rem",
    },
    fontWeight: 700,
    color:
      theme.palette.mode === "dark"
        ? "text.secondary"
        : "text.primary",
    opacity: 0.7,
    textTransform: "uppercase",
    letterSpacing: ".08em",
  })}
>
  {item.label}
</Typography>
        </GlassCard>
      ))}
    </Box>
  );
}