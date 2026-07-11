"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Button,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

import { AppLogo } from "@/components/common/app-logo";
import { SearchInput } from "@/components/common/search-input";
import { UserAvatar } from "@/components/common/user-avatar";
import { PremiumIconButton } from "@/components/common/icon-button";

import { UserMenu } from "@/components/layout/user-menu/user-menu";

import { NotificationBell } from "@/features/notifications/components/notification-bell";
import { NotificationsDropdown } from "@/features/notifications/components/notifications-dropdown";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { CreatePostDialog } from "@/features/posts/components/create-post-dialog";
import { useAppTheme } from "@/components/providers/theme-provider";

export function Navbar() {
  const { data } = useAuth();

  const { mode, toggleTheme } =
    useAppTheme();

  const [anchorEl, setAnchorEl] =
    useState<HTMLElement | null>(null);

  const [
    notificationAnchorEl,
    setNotificationAnchorEl,
  ] = useState<HTMLElement | null>(
    null
  );
  const [createOpen, setCreateOpen] =
    useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(15,17,21,.75)"
              : "rgba(255,255,255,.75)",

          backdropFilter: "blur(24px)",

          borderBottom: "1px solid",

          borderColor: "divider",
        })}
      >
        <Toolbar
          sx={{
            height: 72,
            maxWidth: 1440,
            width: "100%",
            mx: "auto",
            gap: 3,
          }}
        >
          <Box
            component={Link}
            href="/feed"
            sx={{
              color: "inherit",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <AppLogo clickable={false} />
          </Box>

          <Box
            sx={{
              flex: 1,
              maxWidth: 560,
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <SearchInput
              placeholder="Search people, posts..."
              fullWidth
            />
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              ml: "auto",
              alignItems: "center",
            }}
          >
<Button
  variant="contained"
  startIcon={<AddRoundedIcon />}
  onClick={() => setCreateOpen(true)}
  sx={{
    display: {
      xs: "none",
      md: "inline-flex",
    },
  }}
>
  Create
</Button>

            <PremiumIconButton
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {mode === "dark" ? (
                <LightModeRoundedIcon />
              ) : (
                <DarkModeRoundedIcon />
              )}
            </PremiumIconButton>

            <PremiumIconButton
              onClick={(e) =>
                setNotificationAnchorEl(
                  e.currentTarget
                )
              }
            >
              <NotificationBell />
            </PremiumIconButton>

            <Box
              onClick={(e) =>
                setAnchorEl(
                  e.currentTarget
                )
              }
              sx={{
                cursor: "pointer",
              }}
            >
              <UserAvatar
                src={data?.user?.photo}
                alt={data?.user?.name}
              />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <UserMenu
        anchorEl={anchorEl}
        onClose={() =>
          setAnchorEl(null)
        }
      />

      <NotificationsDropdown
        anchorEl={
          notificationAnchorEl
        }
        onClose={() =>
          setNotificationAnchorEl(
            null
          )
        }
      />
<CreatePostDialog
  open={createOpen}
  onClose={() => setCreateOpen(false)}
/>
    </>
  );
}