"use client";

import {
  Stack,
} from "@mui/material";

import { PostCard } from "@/features/posts/components/post-card";
import { Post } from "@/features/posts/types/post.types";

type Props = {
  posts: Post[];
};


export function ProfilePosts({
  posts,
}: Props) {

  if (!posts?.length) {
    return null;
  }


  return (
    <Stack spacing={2}>
      {
        posts.map((post)=>(
          <PostCard
            key={post._id}
            post={post}
          />
        ))
      }
    </Stack>
  );
}