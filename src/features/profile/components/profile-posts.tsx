"use client";

import { Stack } from "@mui/material";

import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

import { EmptyState } from "src/components/common/empty-state";
import { PostCard } from "src/features/posts/components/post-card";
import { Post } from "src/features/posts/types/post.types";

type Props = {
  posts: Post[];
};

export function ProfilePosts({ posts }: Props) {
  if (!posts?.length) {
    return (
      <EmptyState
        {...({
          icon: (
            <ArticleRoundedIcon
              sx={{
                fontSize: 72,
              }}
            />
          ),
          title: "No posts yet",
          description: "This user hasn't shared any posts yet.",
        } as any)}
      />
    );
  }

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Stack>
  );
}
