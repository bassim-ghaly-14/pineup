"use client";
import { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { CommentsDialog } from "@/features/comments/components/comments-dialog";
import { Post } from "../types/post.types";
import { PostActions } from "./post-actions";
import { formatDate } from "@/utils/format-date";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  const [openComments, setOpenComments] = useState(false);
  console.log("POST SAMPLE:", post);
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        transition: ".2s",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Avatar src={post.user?.photo}>
            {post.user?.name?.[0]}
          </Avatar>

          <Box>
            <Typography sx={{ fontWeight: 700 }}>
              {post.user?.name}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {post.createdAt ? formatDate(post.createdAt) : "Just now"}
            </Typography>
          </Box>
        </Stack>

        <Typography sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
          {post.body}
        </Typography>

        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt="post image"
            loading="lazy"
            sx={{
              width: "100%",
              borderRadius: 1,
              mb: 2,
            }}
          />
        )}

        <PostActions
          postId={post._id}
          isLiked={(post.likes?.length ?? 0) > 0}
          isBookmarked={post.bookmarked ?? false}
          commentsCount={post.commentsCount ?? 0}
          onCommentsClick={() => setOpenComments(true)}
        />

        <CommentsDialog
          open={openComments}
          onClose={() => setOpenComments(false)}
          postId={post._id}
        />
      </CardContent>
    </Card>
  );
}