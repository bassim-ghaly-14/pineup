"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { User } from "../types/user.types";
import { UserAvatar } from "@/components/common/user-avatar";

type Props = {
  user: User;

  onFollow?: () => void;
};

export function UserCard({
  user,
  onFollow,
}: Props) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
        >
          <UserAvatar
            src={user.photo}
          />

          <div>
            <Typography>
              {user.name}
            </Typography>

            <Typography
              variant="body2"
            >
              {
                user.followersCount
              }{" "}
              followers
            </Typography>
          </div>

          <Button
            onClick={
              onFollow
            }
          >
            Follow
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}