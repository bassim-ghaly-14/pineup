"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import { ROUTES } from "src/constants/routes";
import { UserAvatar } from "src/components/common/user-avatar";
import { User } from "../types/user.types";
import { useFollowUser } from "../hooks/use-follow-user";
import { isVerified } from "src/utils/is-verified";
import { VerifiedBadge } from "src/components/common/verified-badge";

type Props = {
  user: User;
  compact?: boolean;
};

export function SuggestedUserCard({
  user,
  compact = false,
}: Props) {
const isFollowing = user.isFollowing;
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
    maxWidth: "100%",
    alignItems:"center",
  }}
>

  <Typography
    sx={{
      fontWeight:700,
      maxWidth:"100%",
    }}
    noWrap
  >
    {user.name}
  </Typography>


  {isVerified(user._id) && (
    <Box sx={{
      display:"flex",
      flexShrink: 0,
      "& svg": {
        fontSize: 16,},
    }}>
    <VerifiedBadge />
    </Box>
  )}

</Stack>

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
  noWrap
  sx={{
    display: "block",
  }}
>
  {user.followersCount.toLocaleString()} followers
</Typography>

      </Box>

<Button
 size={compact ? "small" : "medium"}
 variant={
   isFollowing
    ? "outlined"
    : "contained"
 }
 sx={{
   flexShrink:0,
   minWidth:74,
   px: 1.5,
 }}
 onClick={(e)=>{
   e.preventDefault();
   e.stopPropagation();

   follow({
     userId:user._id,
   });
 }}
>
 {isFollowing ? "Following" : "Follow"}
</Button>

    </Box>

  );
}