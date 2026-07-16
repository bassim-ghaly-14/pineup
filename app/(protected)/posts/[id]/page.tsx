"use client";

import { use, useState } from "react";

import {
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { PageContainer } from "@/components/common/page-container";
import { AppState } from "@/components/common/app-state";
import { PostCard } from "@/features/posts/components/post-card";
import { usePost } from "@/features/posts/hooks/use-post";
import { useSearchParams } from "next/navigation";
import { CreateComment } from "@/features/comments/components/create-comment";
import { CommentCard } from "@/features/comments/components/comment-card";
import { useComments } from "@/features/comments/hooks/use-comments";
import { Comment } from "@/features/comments/types/comment.types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function PostPage({
  params,
}: Props) {

const { id } = use(params);
const searchParams = useSearchParams();
const commentId = searchParams.get("comment");
  const {
    data: post,
    isLoading,
    isError,
  } = usePost(id);
  const {
    data: comments = [],
    isLoading: commentsLoading,
  } = useComments(id);
  const [
    editingComment,
    setEditingComment,
  ] = useState<Comment | null>(null);

  if (isLoading) {
    return (
      <PageContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 10,
          }}
        >
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (isError || !post) {
    return (
      <PageContainer>
        <AppState
          type="404"
          title="Post Not Found"
          description="This post does not exist or may have been removed."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
        }}
      >

        <PostCard
          post={post}
          hideCommentsDialog
          showFullDate
        />

        <Box
          sx={{
            mt: 1,

            p: {
              xs: 2,
              md: 3,
            },

            borderRadius: 3,

            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,.025)"
                : "rgba(255,255,255,.7)",

            border: "1px solid",

            borderColor:
              "divider",

            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 18px 50px rgba(0,0,0,.25)"
                : "0 18px 50px rgba(0,0,0,.06)",

            backdropFilter:
              "blur(18px)",
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,

              mb: 2.5,

              display: "flex",

              alignItems: "center",

              gap: 1,

              color:
                "text.primary",

              "&:before": {
                content: '""',

                width: 5,

                height: 24,

                borderRadius: 5,

                bgcolor:
                  "primary.main",
              },
            }}
          >
            Comments
          </Typography>

          {
            editingComment ? (
              <CreateComment
                postId={id}
                mode="edit"
                comment={editingComment}
                onSuccess={() =>
                  setEditingComment(null)
                }
              />
            ) : (
              <CreateComment
                postId={id}
              />
            )
          }

          <Box
            sx={{
              my: 3,

              height: 1,

              bgcolor:
                "divider",
            }}
          />

          {
            commentsLoading ? (

              <Box
                sx={{
                  display:"flex",
                  justifyContent:"center",
                  py:5,
                }}
              >
                <CircularProgress />
              </Box>

            ) : comments.length ? (

              <Stack
                spacing={2}
              >
                {
                  comments.map(
                    (
                      comment: Comment
                    ) => (
                      <CommentCard
                        key={
                          comment._id
                        }
                        postId={id}
                        comment={
                          comment
                        }
                        highlighted={comment._id === commentId}
                        onEdit={
                          (comment) =>
                            setEditingComment(
                              comment
                            )
                        }
                      />
                    )
                  )
                }
              </Stack>

            ) : (

              <Box
                sx={{
                  py:5,

                  textAlign:"center",

                  borderRadius:4,

                  bgcolor:
                    "action.hover",
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  No comments yet.
                </Typography>

                <Typography
                  variant="caption"
                  color="text.disabled"
                >
                  Be the first one to share your thoughts.
                </Typography>

              </Box>

            )
          }

        </Box>
      </Stack>
    </PageContainer>
  );
}