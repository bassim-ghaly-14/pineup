"use client";

import { Button, Stack } from "@mui/material";
import { useFollowUser } from "src/features/users/hooks/use-follow-user";
import { useUnfollowUser } from "src/features/users/hooks/use-unfollow-user";
import { ROUTES } from "src/constants/routes";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  isFollowing: boolean;
  isOwner?: boolean;
};
export function ProfileActions({
  userId,
  isFollowing,
  isOwner = false,
}: Props) {
  const router = useRouter();
  const follow = useFollowUser();
  const unfollow = useUnfollowUser();
  const handleFollow = () => {
    if (isFollowing) {
      unfollow.mutate({userId});
      return;
    }
      follow.mutate({userId});
  };
  if (isOwner) {
    return (
      <Button
        variant="contained"
        onClick={()=> router.push(ROUTES.SETTINGS)}
      >
        Edit Profile
      </Button>
    );
  }


  return (
    <Stack direction="row">

      <Button
        variant={
          isFollowing
            ? "outlined"
            : "contained"
        }
        onClick={handleFollow}
        disabled={
          follow.isPending ||
          unfollow.isPending
        }
      >
        {
          isFollowing
            ? "Following"
            : "Follow"
        }
      </Button>

    </Stack>
  );
}