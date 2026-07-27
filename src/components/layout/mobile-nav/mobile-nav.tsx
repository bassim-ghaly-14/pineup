"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { CreatePostDialog } from "src/features/posts/components/create-post-dialog";
import { useAuth } from "src/features/auth/hooks/use-auth";
import { useRequireAuthAction } from "src/features/auth/hooks/use-require-auth-action";

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useAuth();
  const { requireAuth } = useRequireAuthAction();

  const [createOpen, setCreateOpen] = useState(false);

  const profileHref = data?.user?._id
    ? `/profile/${data.user._id}`
    : "/profile";

  const protectedRoutes = new Set(["/search", "/notifications"]);

  const items = [
    {
      label: "Feed",
      href: "/feed",
      icon: HomeRoundedIcon,
    },
    {
      label: "Search",
      href: "/search",
      icon: SearchRoundedIcon,
    },
    {
      label: "Create",
      href: "/create",
      icon: AddRoundedIcon,
      primary: true,
    },
    {
      label: "Alerts",
      href: "/notifications",
      icon: NotificationsRoundedIcon,
    },
    {
      label: "Profile",
      href: profileHref,
      icon: PersonRoundedIcon,
    },
  ];

  return (
    <Box
      sx={{
        display: {
          xs: "flex",
          lg: "none",
        },
        position: "fixed",
        bottom: 18,
        mb: "env(safe-area-inset-bottom)",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 24px)",
        maxWidth: 430,
        zIndex: 1200,
        height: 74,
      }}>
      <Stack
        sx={(theme) => ({
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          py: 1,
          px: 1,
          borderRadius: "999px",
          background:
            theme.palette.mode === "dark"
              ? "rgba(26,31,39,.82)"
              : "rgba(255,255,255,.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 12px 40px rgba(0,0,0,.25)",
        })}>
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Box
              key={item.label}
              component={item.primary ? "button" : Link}
              {...(!item.primary && {
                href: item.href,
              })}
              onClick={(e: MouseEvent<HTMLElement>) => {
                if (item.primary) {
                  e.preventDefault();

                  requireAuth(() => {
                    setCreateOpen(true);
                  });

                  return;
                }

                const isProtected =
                  protectedRoutes.has(item.href) ||
                  item.href.startsWith("/profile");

                if (!isProtected) {
                  return;
                }

                e.preventDefault();

                requireAuth(() => {
                  router.push(item.href);
                });
              }}
              sx={{
                textDecoration: "none",
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                color: active ? "primary.main" : "text.secondary",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 60,
                transition: "color .25s, transform .25s",
                "&:hover": {
                  color: "primary.main",
                  transform: "translateY(-2px)",
                },
              }}>
              <Box
                sx={(theme) => ({
                  width: item.primary ? 52 : 38,
                  height: item.primary ? 52 : 38,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: item.primary
                    ? "linear-gradient(135deg,#D4A63A,#E7C46A)"
                    : active
                      ? theme.palette.mode === "dark"
                        ? "rgba(212,166,58,.12)"
                        : "rgba(212,166,58,.08)"
                      : "transparent",
                  color: item.primary ? "#14171D" : "inherit",
                  transition:
                    "background-color .25s, color .25s, transform .25s",
                })}>
                <Icon fontSize="small" />
              </Box>

              {!item.primary && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    fontSize: 10,
                    fontWeight: active ? 600 : 500,
                  }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          );
        })}
      </Stack>

      <CreatePostDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </Box>
  );
}
