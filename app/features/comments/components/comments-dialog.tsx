"use client";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useComments } from "../hooks/use-comments";

import { CommentCard } from "./comment-card";
import { CreateComment } from "./create-comment";
import { Comment } from "../types/comment.types";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  postId: string;
};

export function CommentsDialog({
  open,
  onClose,
  postId,
}: Props) {
  const { data, isLoading } =
    useComments(postId);
  const [editingComment, setEditingComment] =
  useState<Comment | null>(null);
useEffect(() => {
  if (!open) return;

  const original = document.body.style.overflow;

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = original;
  };
}, [open]);
  return (
<Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
  scroll="paper"
  slotProps={{
    paper: {
      sx: {
        m: {
          xs: 1,
          sm: 2,
        },
        width: {
          xs: "calc(100% - 16px)",
          sm: "100%",
        },
        maxHeight: {
          xs: "calc(100% - 32px)",
          sm: "calc(100% - 64px)",
        },
        borderRadius: {
          xs: 3,
          sm: 4,
        },
      },
    },
  }}
>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Comments

        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

<DialogContent
  dividers
  sx={{
    overflowX: "hidden",

    px: {
      xs: 1.5,
      sm: 3,
    },

    pb: {
      xs: 12,
      sm: 3,
    },
  }}
>
        {isLoading ? (
          <Stack sx={{ alignItems: "center", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Stack>
        ) : data?.length ? (
          <Stack spacing={2}>
            {data.map((comment: Comment) => (
              <CommentCard
                key={comment._id}
                postId={postId}
                comment={comment}
                onEdit={(comment) => {
                  setEditingComment(comment);
                }}
              />
            ))}
          </Stack>
        ) : (
          <Typography
            align="center"
            color="text.secondary"
            sx={{ py: 4 }}
          >
            No comments yet.
          </Typography>
        )}

        <Box
          sx={{
            mt: 3,
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {editingComment ? (
          <CreateComment
            postId={postId}
            mode="edit"
            comment={editingComment}
            onSuccess={() =>
              setEditingComment(null)
            }
          />
        ) : (
          <CreateComment
            postId={postId}
          />
        )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}