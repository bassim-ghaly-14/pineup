"use client";

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { Comment } from "../types/comment.types";

import { formatDate } from "@/utils/format-date";
import { UserAvatar } from "@/components/common/user-avatar";

type Props = {
  reply: Comment;
};

export function ReplyCard({
  reply,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
        >

        <UserAvatar
          userId={
            reply.commentCreator._id
          }
          src={
            reply.commentCreator.photo
          }
        >
          {
            reply.commentCreator.name?.[0]
          }
        </UserAvatar>

          <Box>

            <Typography sx={{ fontWeight: 700 }}>
              {
                reply.commentCreator.name
              }
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {
                formatDate(
                  reply.createdAt
                )
              }
            </Typography>


            <Typography
              sx={{
                mt: 1,
                whiteSpace: "pre-wrap",
              }}
            >
              {
                reply.content
              }
            </Typography>


            {
              reply.image && (
                <Box
                  component="img"
                  src={reply.image}
                  alt="reply"
                  sx={{
                    mt: 1,
                    width: "100%",
                    maxHeight: 250,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              )
            }

          </Box>

        </Stack>
      </CardContent>
    </Card>
  );
}