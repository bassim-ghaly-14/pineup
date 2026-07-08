"use client";

import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { User } from "../types/user.types";

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
          <Avatar
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