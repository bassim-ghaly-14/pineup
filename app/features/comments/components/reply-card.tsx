"use client";

import {
  Box,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { Comment } from "../types/comment.types";

import { formatDate } from "@/utils/format-date";
import { UserAvatar } from "@/components/common/user-avatar";
import { VerifiedBadge } from "@/components/common/verified-badge";
import { isVerified } from "@/utils/is-verified";
import { GlassCard } from "@/components/common/glass-card";

type Props = {
  reply: Comment;
};

export function ReplyCard({
  reply,
}: Props) {
  return (
    <GlassCard
      elevation={0}
      sx={(theme) => ({
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",

  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))"
      : "linear-gradient(180deg,#ffffff,#fcfcfc)",

  transition: "all .25s ease",

  "&:hover": {
    borderColor: "primary.main",

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 28px rgba(0,0,0,.28)"
        : "0 12px 28px rgba(0,0,0,.06)",
  },
})}
    >
      <CardContent
  sx={{
    p: 2.5,
    "&:last-child": {
      pb: 2.5,
    },
  }}
>
        <Stack
  direction="row"
  spacing={2}
  sx={{
    alignItems: "flex-start",
  }}
>

        <UserAvatar
        sx={{
  width: 44,
  height: 44,

  border: "2px solid",
  borderColor: "primary.main",

  boxShadow:
    "0 0 0 4px rgba(212,166,58,.08)",
}}
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

          <Box
  sx={{
    flex: 1,
    minWidth: 0,
  }}
>

<Stack
  direction="row"
  spacing={0.5}
  sx={{ alignItems: "center" }}
>
  <Typography
    sx={{
      fontWeight: 800,
      fontSize: 14.5,
    }}
  >
    {reply.commentCreator.name}
  </Typography>

  {isVerified(reply.commentCreator._id) && (
    <VerifiedBadge size={16} />
  )}
</Stack>

            <Typography
  variant="caption"
  sx={{
    color: "text.disabled",
    fontWeight: 500,
  }}
>
              {
                formatDate(
                  reply.createdAt
                )
              }
            </Typography>


            <Typography
              sx={{
  mt: 1.25,
  whiteSpace: "pre-wrap",
  lineHeight: 1.75,
  fontSize: 14.5,
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
  mt: 1.75,

  width: "100%",

  maxHeight: 260,

  objectFit: "cover",

  borderRadius: 3,

  border: "1px solid",

  borderColor: "divider",
}}
                />
              )
            }

          </Box>

        </Stack>
      </CardContent>
    </GlassCard>
  );
}