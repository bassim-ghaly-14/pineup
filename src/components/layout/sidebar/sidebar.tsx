"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent } from "react";
import { useRequireAuthAction } from "src/features/auth/hooks/use-require-auth-action";
import { Stack, Typography, Box } from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import { GlassCard } from "src/components/common/glass-card";

const items = [
  {
    label: "Feed",
    href: "/feed",
    icon: HomeRoundedIcon,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: PersonRoundedIcon,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    icon: BookmarkRoundedIcon,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: NotificationsRoundedIcon,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsRoundedIcon,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const protectedRoutes = new Set([
    "/profile",
    "/bookmarks",
    "/notifications",
    "/settings",
  ]);
  const { requireAuth } = useRequireAuthAction();

  return (
    <GlassCard
      sx={{
        p: 2,
        position: "sticky",
        top: 92,
      }}>
      <Typography
        variant="overline"
        sx={{
          color: "text.secondary",
          px: 2,
          mb: 2,
          display: "block",
          letterSpacing: 1.2,
        }}>
        Navigation
      </Typography>

      <Stack spacing={1}>
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Box
              key={item.href}
              component={Link}
              href={item.href}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                if (!protectedRoutes.has(item.href)) {
                  return;
                }

                e.preventDefault();

                requireAuth(() => {
                  window.location.href = item.href;
                });
              }}
              sx={(theme) => {
                const isDark = theme.palette.mode === "dark";

                const hoverBg = isDark
                  ? "rgba(255,255,255,.05)"
                  : "rgba(0,0,0,.04)";

                const activeBg = isDark
                  ? "rgba(212,166,58,.12)"
                  : "rgba(212,166,58,.10)";

                const activeBorder = "1px solid rgba(212,166,58,.25)";

                return {
                  display: "flex",
                  alignItems: "center",
                  gap: 2,

                  px: 2,
                  py: 1.5,

                  borderRadius: 3,
                  textDecoration: "none",

                  color: active ? "primary.main" : "text.primary",

                  bgcolor: active ? activeBg : "transparent",

                  border: active ? activeBorder : "1px solid transparent",

                  transition: "all .25s ease",

                  "&:hover": {
                    bgcolor: hoverBg,
                    transform: "translateX(4px)",
                  },
                };
              }}>
              <Icon fontSize="small" />

              <Typography
                sx={{
                  fontWeight: active ? 700 : 500,
                }}>
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </GlassCard>
  );
}
