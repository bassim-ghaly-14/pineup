"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Button,
  Paper,
  Typography,
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
import { useRouter } from "next/navigation";
import { useUserSearch } from "@/features/social/hooks/use-user-search";
import { ROUTES } from "@/constants/routes";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { isVerified } from "@/utils/is-verified";
import { VerifiedBadge } from "@/components/common/verified-badge";

export function Navbar() {
  const pathname = usePathname();
  const { data } = useAuth();
  const router = useRouter();
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

    const [search, setSearch] =
    useState("");
    const searchResults =
    useUserSearch(search);
    const [searchOpen, setSearchOpen] = useState(false);
    useEffect(() => {
  setSearchOpen(false);
}, [pathname]);
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
<ClickAwayListener
  onClickAway={() => {
    setSearchOpen(false);
  }}
>
          <Box
  sx={{
    flex: 1,
    maxWidth: 560,
    position: "relative",
    display: {
      xs: "none",
      md: "block",
    },
  }}
>
            <SearchInput
  placeholder="Search people, posts..."
  fullWidth
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  onFocus={() => setSearchOpen(true)}
/>
{searchOpen && search &&
  searchResults.length > 0 && (
    <Paper
      sx={{
        position: "absolute",
        top: 56,
        left: 0,
        right: 0,
        zIndex: 20,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {searchResults
        .slice(0, 6)
        .map((user) => (
          <Box
            key={user._id}
            onClick={() =>{
              setSearchOpen(false);
              setSearch("");
              router.push(
                ROUTES.PROFILE_BY_ID(
                  user._id
                )
              )
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              cursor: "pointer",

              "&:hover": {
                bgcolor:
                  "action.hover",
              },
            }}
          >
            <UserAvatar
              src={user.photo}
              alt={user.name}
            />

            <Box>
              <Stack
  direction="row"
  spacing={0.5}
  sx={{alignItems:"center"}}
>
  <Typography
    sx={{
      fontWeight: 600,
    }}
  >
    {user.name}
  </Typography>

  {isVerified(user._id) && (
    <VerifiedBadge size={15} />
  )}
</Stack>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                @{user.username}
              </Typography>
            </Box>
          </Box>
        ))}
    </Paper>
)}
          </Box>
</ClickAwayListener>
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