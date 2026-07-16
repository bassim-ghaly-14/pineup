"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  GroupsRounded,
  PersonAddAltRounded,
  ChevronRightRounded,
  SearchRounded,
  ArrowBackRounded,
} from "@mui/icons-material";

import { GlassCard } from "src/components/common/glass-card";
import { EmptyState } from "src/components/common/empty-state";
import { UserAvatar } from "src/components/common/user-avatar";
import { VerifiedBadge } from "src/components/common/verified-badge";

import { isVerified } from "src/utils/is-verified";

import type { FollowUser } from "src/features/auth/types/auth.types";
import { useRouter } from "next/navigation";
const MotionBox = motion(Box);
type Props = {
  title: string;
  users: FollowUser[];
};

export function FollowUsersPage({
  title,
  users,
}: Props) {
  const [search, setSearch] = useState("");
  const MotionBox = motion(Box);
  const router = useRouter();
  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
  }, [users, search]);

  const isFollowers = title === "Followers";

  return (
    <Stack spacing={3}>
      <GlassCard
  sx={{
    p: {
      xs: 2.5,
      sm: 3,
      md: 3.5,
    },
    position: "relative",
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
            opacity: 0.08,
            top: -60,
            right: -60,
          }}
        />

<Stack spacing={3}>
<IconButton
  onClick={() => router.back()}
  sx={(theme) => ({
    alignSelf: "flex-start",

    width: 42,
    height: 42,

    bgcolor: theme.palette.background.paper,

    border: "1px solid",

    borderColor: theme.palette.divider,

    transition: ".25s",

    "&:hover": {
      bgcolor: theme.palette.action.hover,
      transform: "translateX(-2px)",
    },
  })}
>
    <ArrowBackRounded />
  </IconButton>

  <Stack
    direction={{
      xs: "column",
      sm: "row",
    }}
    spacing={3}
    sx={{
      alignItems: {
        xs: "flex-start",
        sm: "center",
      },
    }}
  >
<Box
  sx={{
    width: {
      xs: 60,
      sm: 64,
    },
    height: {
      xs: 60,
      sm: 64,
    },
    borderRadius: 2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "primary.main",
    color: "primary.contrastText",
    boxShadow: (theme) => theme.shadows[2],
  }}
>
      {isFollowers ? (
        <GroupsRounded
  sx={{
    fontSize: {
      xs: 34,
      sm: 36,
    },
  }}
/>
      ) : (
        <PersonAddAltRounded
  sx={{
    fontSize: {
      xs: 34,
      sm: 36,
    },
  }}
/>
      )}
    </Box>

    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          letterSpacing: -0.5,
        }}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 0.5,
        }}
      >
        {isFollowers
          ? "People following this account."
          : "Accounts this user follows."}
      </Typography>

<Typography
  sx={{
    mt: 1.5,
    fontWeight: 700,
    color: "primary.main",
  }}
>
  {search.trim()
    ? `Showing ${filteredUsers.length} of ${users.length} people`
    : `${users.length} people`}
</Typography>
    </Box>
  </Stack>
</Stack>
      </GlassCard>

      <TextField
  fullWidth
  size="small"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder={`Search ${title.toLowerCase()}...`}
  sx={(theme) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: 999,
      height: 52,
      transition: ".25s",

      bgcolor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.04)"
          : "rgba(248,250,252,.9)",

      "& fieldset": {
        borderColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,.08)"
            : "rgba(0,0,0,.10)",
      },

      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },

      "&.Mui-focused": {
        bgcolor: theme.palette.background.paper,

        "& fieldset": {
          borderWidth: 2,
          borderColor: theme.palette.primary.main,
        },
      },
    },

    "& .MuiInputBase-input": {
      fontWeight: 500,
    },
  })}
        slotProps={{
          input: {
            startAdornment: (
  <InputAdornment position="start">
    <SearchRounded
      sx={{
        color: "text.secondary",
      }}
    />
  </InputAdornment>
),
          },
        }}
      />

      {!filteredUsers.length ? (
        <EmptyState
          title="No users found"
description={
  search.trim()
    ? `We couldn't find anyone matching "${search}".`
    : isFollowers
      ? "This account doesn't have any followers yet."
      : "This account isn't following anyone yet."
}
        />
      ) : (
        <GlassCard
  sx={{
    p: 0,
    overflow: "hidden",
    borderRadius: 4,
  }}
>
          <Stack
  divider={
    <Divider
      sx={{
        opacity: 0.6,
      }}
    />
  }
>
            {filteredUsers.map((user) => (
<MotionBox
  key={user._id}
  initial={{
    opacity: 0,
    y: 14,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: .22,
  }}
>
  <Box
    component={Link}
    href={`/profile/${user._id}`}
                key={user._id}
                sx={{
                  px: {
  xs: 2,
  sm: 3,
},

py: {
  xs: 1.5,
  sm: 2,
},
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  textDecoration: "none",
                  transition: ".25s",

                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <UserAvatar
  userId={user._id}
  src={user.photo}
  alt={user.name}
  sx={{
    width: {
      xs: 48,
      sm: 54,
    },

    height: {
      xs: 48,
      sm: 54,
    },

    flexShrink: 0,
  }}
/>

                <Box
  sx={{
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  }}
>
                  <Stack
  direction="row"
  spacing={0.5}
  sx={{
    alignItems: "center",
    minWidth: 0,
  }}
>
                    <Typography
  noWrap
  className="user-name"
  sx={{
    fontWeight: 800,
    fontSize: 16,
    transition: ".25s",
  }}
>
                      {user.name}
                    </Typography>

                    {isVerified(user._id) && (
                      <VerifiedBadge size={16} />
                    )}
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.3,
                    }}
                  >
                    View profile
                  </Typography>
                </Box>

                <ChevronRightRounded
                  className="profile-arrow"
                  sx={{
                    color: "text.secondary",
                    transition: ".25s",
                  }}
                />
              </Box>
              </MotionBox>
            ))}
          </Stack>
        </GlassCard>
      )}
    </Stack>
  );
}