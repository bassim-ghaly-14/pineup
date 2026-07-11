"use client";

import { use } from "react";
import { useState } from "react";

import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { PageContainer } from "@/components/common/page-container";
import { AppState } from "@/components/common/app-state";

import { PostCard } from "@/features/posts/components/post-card";
import { usePost } from "@/features/posts/hooks/use-post";

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
            py: 8,
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

      <Stack spacing={3}>

        <PostCard
          post={post}
          hideCommentsDialog
        />


        <Divider />


        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "text.primary",
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



        <Divider />



        {
          commentsLoading ? (

            <Box
              sx={{
                display:"flex",
                justifyContent:"center",
                py:4,
              }}
            >
              <CircularProgress />
            </Box>

          ) : comments.length ? (

            <Stack spacing={2}>
              {
                comments.map((comment: Comment)=>(
                  <CommentCard
                    key={comment._id}
                    postId={id}
                    comment={comment}
                    onEdit={(comment)=>
                      setEditingComment(comment)
                    }
                  />
                ))
              }
            </Stack>

          ) : (

            <Typography
              align="center"
              color="text.secondary"
              sx={{
                py:4,
              }}
            >
              No comments yet.
            </Typography>

          )
        }


      </Stack>

    </PageContainer>
  );
}