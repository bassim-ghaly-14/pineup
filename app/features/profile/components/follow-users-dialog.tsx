"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  alpha,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import {
  CloseRounded,
  SearchRounded,
  PeopleRounded,
} from "@mui/icons-material";

import { GlassCard } from "@/components/common/glass-card";
import { UserAvatar } from "@/components/common/user-avatar";
import { AppState } from "@/components/common/app-state";
import type { FollowUser } from "@/features/auth/types/auth.types";
import { useFollowUser } from "@/features/users/hooks/use-follow-user";
import { useUnfollowUser } from "@/features/users/hooks/use-unfollow-user";

type Props = {
  open: boolean;
  title: string;
  users: FollowUser[];
  following: FollowUser[];
  currentUserId: string;
  onClose: () => void;
};

const MotionBox = motion(Box);

export function FollowUsersDialog({
  open,
  title,
  users,
  following,
  currentUserId,
  onClose,
}: Props) {

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {

    const value = search.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );

  }, [users, search]);
const follow = useFollowUser();
const unfollow = useUnfollowUser();
const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
useEffect(() => {
  if (!open) return;

  const map: Record<string, boolean> = {};

  following.forEach((user) => {
    map[user._id] = true;
  });

  setFollowingMap(map);
}, [open, following]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: (theme) => ({
          borderRadius: 5,
          overflow: "hidden",
          backdropFilter: "blur(24px)",
          bgcolor: alpha(
            theme.palette.background.paper,
            0.88
          ),
          border: `1px solid ${alpha(
            theme.palette.divider,
            .12
          )}`,
        }),
      }}
    >

      {/* Sticky Premium Header */}

      <DialogTitle
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          px: 3,
          pt: 3,
          pb: 2,
          backdropFilter: "blur(24px)",
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: .08,
            top: -70,
            right: -70,
          }}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >

            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 4,
                flexShrink: 0,
              }}
            >
              <PeopleRounded
                sx={{
                  fontSize: 32,
                }}
              />
            </Box>

            <Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  letterSpacing: -.5,
                }}
              >
                {title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: .5,
                }}
              >
                {filteredUsers.length} of {users.length}
              </Typography>

            </Box>

          </Stack>

          <IconButton
            onClick={onClose}
          >
            <CloseRounded />
          </IconButton>

        </Stack>

        <TextField
          fullWidth
          size="small"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder={`Search ${title.toLowerCase()}...`}
          sx={{
            mt: 3,

            "& .MuiOutlinedInput-root": {
              borderRadius: 999,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
        />

      </DialogTitle>

      <DialogContent
        sx={{
          p: 2,
          maxHeight: "72vh",
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: 8,
          },

          "&::-webkit-scrollbar-thumb": {
            borderRadius: 999,
            backgroundColor: "rgba(120,120,120,.35)",
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >

        {
          !filteredUsers.length ? (

            <AppState
              title="No users found"
              description="Try another search keyword."
            />

          ) : (

            <AnimatePresence mode="popLayout">

              <Stack spacing={1.5}>

{filteredUsers.map((user, index) => {
const isMe =
  currentUserId === user._id;

const isFollowing =
  followingMap[user._id] ?? false;
return (
  <MotionBox
    key={user._id}
    layout
    initial={{
      opacity: 0,
      y: 20,
      scale: .97,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      y: -20,
    }}
    transition={{
      duration: .25,
      delay: index * .03,
    }}
  >
    <GlassCard
      component={Link}
      href={`/profile/${user._id}`}
      onClick={onClose}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        textDecoration: "none",
        overflow: "hidden",
        transition: ".25s",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 6,
        },
      }}
    >

      <UserAvatar
        userId={user._id}
        src={user.photo}
        alt={user.name}
        sx={{
          width: 58,
          height: 58,
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >

        <Typography
          noWrap
          sx={{
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          {user.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{
            mt: .4,
          }}
        >
          {user.followersCount.toLocaleString()} Followers
          {" • "}
          {user.followingCount.toLocaleString()} Following
        </Typography>

      </Box>
{!isMe && (
<Box
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
>
  <Button
    variant={
      isFollowing
        ? "outlined"
        : "contained"
    }
    size="small"
    disabled={
  loadingUserId === user._id ||
  follow.isPending ||
  unfollow.isPending
}
    onClick={() => {

      setLoadingUserId(user._id);

      if (isFollowing) {
setFollowingMap((prev) => ({

  ...prev,

  [user._id]: false,

}));
unfollow.mutate(
  { userId: user._id },
  {
onSuccess: () => {
  setLoadingUserId(null);
},
onError: () => {
  setFollowingMap((prev) => ({
    ...prev,
    [user._id]: true,
  }));

  setLoadingUserId(null);
},
  }
);

        return;
      }
setFollowingMap((prev) => ({

  ...prev,

  [user._id]: true,

}));
follow.mutate(
  { userId: user._id },
  {
onSuccess: () => {
  setLoadingUserId(null);
},
onError: () => {
  setFollowingMap((prev) => ({
    ...prev,
    [user._id]: false,
  }));

  setLoadingUserId(null);
},
  }
);

    }}
    sx={{
      minWidth: 110,
      height: 38,
      borderRadius: 999,
      fontWeight: 700,
      textTransform: "none",
      boxShadow: isFollowing
        ? "none"
        : 3,
      transition: ".25s",

      "&:hover": {
        transform: "translateY(-1px)",
      },
    }}
  >
    {loadingUserId === user._id
      ? "..."
      : isFollowing
      ? "Following"
      : "Follow"}
  </Button>
</Box>
)}
    </GlassCard>
  </MotionBox>
);
})}

              </Stack>

            </AnimatePresence>

          )
        }

      </DialogContent>

    </Dialog>
  );
}