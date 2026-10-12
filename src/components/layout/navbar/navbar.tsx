"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { AppLogo } from "src/components/common/app-logo";
import { SearchInput } from "src/components/common/search-input";
import { UserAvatar } from "src/components/common/user-avatar";
import { PremiumIconButton } from "src/components/common/icon-button";
import { UserMenu } from "src/components/layout/user-menu/user-menu";
import { NotificationBell } from "src/features/notifications/components/notification-bell";
import { NotificationsDropdown } from "src/features/notifications/components/notifications-dropdown";
import { useAuth } from "src/features/auth/hooks/use-auth";
import { useRequireAuthAction } from "src/features/auth/hooks/use-require-auth-action";
import { CreatePostDialog } from "src/features/posts/components/create-post-dialog";
import { useAppTheme } from "src/components/providers/theme-provider";
import { useUserSearch } from "src/features/social/hooks/use-user-search";
import { ROUTES } from "src/constants/routes";
import { isVerified } from "src/utils/is-verified";
import { VerifiedBadge } from "src/components/common/verified-badge";

export function Navbar() {
  const pathname = usePathname();
  const { data } = useAuth();
  const { requireAuth, isAuthenticated } = useRequireAuthAction();
  const router = useRouter();
  const { mode, toggleTheme } = useAppTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<HTMLElement | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const [search, setSearch] = useState("");
  const searchResults = useUserSearch(search);
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
        })}>
        <Toolbar
          sx={{
            height: { xs: 60, sm: 68, md: 72 },
            minHeight: {
              xs: "60px !important",
              sm: "68px !important",
              md: "72px !important",
            },
            maxWidth: 1440,
            width: "100%",
            mx: "auto",
            px: { xs: 1.5, sm: 2, md: 3 },
            gap: { xs: 1, sm: 2, md: 3 },
          }}>
          <Box
            component={Link}
            href="/feed"
            sx={{
              color: "inherit",
              textDecoration: "none",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              minWidth: 0,
              "& img": {
                maxWidth: { xs: 100, sm: "none" },
                height: "auto",
              },
            }}>
            <AppLogo clickable={false} />
          </Box>

          <ClickAwayListener
            onClickAway={() => {
              setSearchOpen(false);
            }}>
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                maxWidth: 560,
                position: "relative",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}>
              <SearchInput
                placeholder="Search people, posts..."
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />

              {searchOpen && search && searchResults.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: 56,
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    borderRadius: 3,
                    overflow: "hidden",
                  }}>
                  {searchResults.slice(0, 6).map((user) => (
                    <Box
                      key={user._id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearch("");
                        router.push(ROUTES.PROFILE_BY_ID(user._id));
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 1.5,
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}>
                      <UserAvatar src={user.photo} alt={user.name} />

                      <Box sx={{ minWidth: 0 }}>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ alignItems: "center" }}>
                          <Typography sx={{ fontWeight: 600 }}>
                            {user.name}
                          </Typography>

                          {isVerified(user._id) && <VerifiedBadge size={15} />}
                        </Stack>

                        <Typography variant="caption" color="text.secondary">
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
            spacing={{ xs: 0.5, sm: 1 }}
            sx={{
              ml: "auto",
              alignItems: "center",
              flexShrink: 0,
            }}>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => requireAuth(() => setCreateOpen(true))}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                },
              }}>
              Create
            </Button>

            <PremiumIconButton
              onClick={toggleTheme}
              aria-label="Toggle theme"
              sx={{
                width: { xs: 34, sm: 40 },
                height: { xs: 34, sm: 40 },
                minWidth: 0,
                flexShrink: 0,
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: 19, sm: 22 },
                },
              }}>
              {mode === "dark" ? (
                <LightModeRoundedIcon />
              ) : (
                <DarkModeRoundedIcon />
              )}
            </PremiumIconButton>

            {isAuthenticated ? (
              <>
                <PremiumIconButton
                  onClick={(e) => setNotificationAnchorEl(e.currentTarget)}>
                  <NotificationBell />
                </PremiumIconButton>

                <UserAvatar
                  src={data?.user?.photo}
                  alt={data?.user?.name}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href={ROUTES.LOGIN}
                  color="inherit"
                  sx={{
                    minWidth: 0,
                    px: { xs: 1, sm: 1.5 },
                    py: { xs: 0.75, sm: 1 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}>
                  Sign In
                </Button>

                <Button
                  component={Link}
                  href={ROUTES.REGISTER}
                  variant="contained"
                  sx={{
                    minWidth: 0,
                    px: { xs: 1.25, sm: 2 },
                    py: { xs: 0.75, sm: 1 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}>
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <UserMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />

      <NotificationsDropdown
        anchorEl={notificationAnchorEl}
        onClose={() => setNotificationAnchorEl(null)}
      />

      <CreatePostDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
}
