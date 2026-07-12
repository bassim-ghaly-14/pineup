"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { ROUTES } from "@/constants/routes";
import { UserAvatar } from "@/components/common/user-avatar";
import { User } from "../types/user.types";
import { useFollowUser } from "../hooks/use-follow-user";

type Props = {
  user: User;
  compact?: boolean;
};

export function SuggestedUserCard({
  user,
  compact = false,
}: Props) {

  const {
    mutate: follow,
    isPending,
  } = useFollowUser();

  return (

    <Box
      component={Link}
      href={ROUTES.PROFILE_BY_ID(user._id)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: compact ? 1:3,
        textDecoration: "none",
        color: "inherit",
        transition: ".2s",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >

      <UserAvatar
        src={user.photo}
        userId={user._id}
      />

      <Box sx={{ flex: 1, minWidth: 0, }}>

        <Typography sx={{fontWeight:700, maxWidth: "100%",}} noWrap>
          {user.name}
        </Typography>

        <Typography
  variant={compact ? "caption" : "body2"}
  color="text.secondary"
  noWrap
>
          @{user.username}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {user.followersCount} followers
        </Typography>

      </Box>

<Button
  size={compact ? "small" : "medium"}
  variant="contained"
  sx={{flexShrink: 0,}}
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          follow({
            userId: user._id,
          });
        }}
      >
        Follow
      </Button>

    </Box>

  );
}