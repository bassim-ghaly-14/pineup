"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useReplies } from "../hooks/use-replies";
import { ReplyCard } from "./reply-card";
import { CreateReply } from "./create-reply";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
// import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import { ConfirmDialog } from "@/components/common/confirm-dialog";

import { Comment } from "../types/comment.types";

import { useLikeComment } from "../hooks/use-like-comment";
import { useDeleteComment } from "../hooks/use-delete-comment";

import { formatDate } from "@/utils/format-date";
import { UserAvatar } from "@/components/common/user-avatar";

type Props = {
  postId: string;
  comment: Comment;
  onEdit: (comment: Comment) => void;
};

export function CommentCard({
  postId,
  comment,
  onEdit,
}: Props) {
  const likeComment =
    useLikeComment();

  const deleteComment =
    useDeleteComment();


  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [showReplies, setShowReplies] =
    useState(false);
  const [showReplyBox, setshowReplyBox] = 
    useState(false);


  const { data: currentUser } =
    useAuth();


  const user =
    currentUser?.user;


  const isLiked =
    comment.likes.includes(
      user?._id ?? ""
    );


  const isOwner =
    user?._id ===
    comment.commentCreator._id;

  const {
  data: replies,
  isLoading: repliesLoading,
} = useReplies({
  postId,
  commentId: comment._id,
  enabled: showReplies,
});


  return (
    <>
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
            sx={{ alignItems: "flex-start" }}
          >

            <UserAvatar
              src={comment.commentCreator.photo}
              userId={comment.commentCreator._id}
            >
              {comment.commentCreator.name?.[0]}
            </UserAvatar>

            <Box sx={{ flex: 1 }}>

              <Stack
                direction="row"
                sx={{ justifyContent: "space-between" }}
              >

                <Box>

                  <Typography sx={{ fontWeight: 700 }}>
                    {comment.commentCreator.name}
                  </Typography>


                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {
                      formatDate(
                        comment.createdAt
                      )
                    }
                  </Typography>

                </Box>


                {isOwner && (
                  <IconButton
                    size="small"
                    onClick={(e) =>
                      setAnchorEl(
                        e.currentTarget
                      )
                    }
                  >
                    <MoreHorizRoundedIcon fontSize="small" />
                  </IconButton>
                )}

              </Stack>


              <Typography
                sx={{
                  mt: 1,
                  whiteSpace: "pre-wrap",
                }}
              >
                {comment.content}
              </Typography>


              {comment.image && (
                <Box
                  component="img"
                  src={comment.image}
                  alt="comment"
                  loading="lazy"
                  sx={{
                    mt: 1.5,
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              )}


              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 1.5,
                }}
              >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >

                  <IconButton
                    size="small"
                    color={
                      isLiked
                        ? "error"
                        : "default"
                    }
                    onClick={() =>
                      likeComment.mutate({
                        postId,
                        commentId:
                          comment._id,
                      })
                    }
                  >

                    {isLiked ? (
                      <FavoriteRoundedIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderRoundedIcon fontSize="small" />
                    )}

                  </IconButton>


                  <Typography variant="caption">
                    {
                      comment.likes.length
                    }
                  </Typography>

                </Box>

                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ alignItems: "center" }}
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      setshowReplyBox((prev) => !prev)
                    }
                  >
                    <ReplyRoundedIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    variant="caption"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setShowReplies((prev) => !prev)
                    }
                  >
                    {showReplies
                      ? "Hide Replies"
                      : `Replies (${comment.repliesCount})`}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  sx={{
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    setshowReplyBox(
                      (prev) => !prev
                    )
                  }
                >

                  <ReplyRoundedIcon fontSize="small" />

                  <Typography
                    variant="caption"
                    sx={{ ml: 0.5 }}
                  >
                    Reply
                  </Typography>

                </Stack>

              </Stack>

            </Box>

          </Stack>

        </CardContent>
      </Card>

{showReplyBox && (
  <CreateReply
    postId={postId}
    commentId={comment._id}
    onSuccess={() => {
      setshowReplyBox(false);
      setShowReplies(true);
    }}
  />
)}

{showReplies && (
  <Box
    sx={{
      ml: 6,
      mt: 1,
    }}
  >
    {repliesLoading ? (
      <Typography
        variant="caption"
        color="text.secondary"
      >
        Loading replies...
      </Typography>
    ) : replies?.length ? (
      <Stack spacing={1}>
        {replies.map((reply) => (
          <ReplyCard
            key={reply._id}
            reply={reply}
          />
        ))}
      </Stack>
    ) : (
      <Typography
        variant="caption"
        color="text.secondary"
      >
        No replies yet.
      </Typography>
    )}
  </Box>
)}

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() =>
          setAnchorEl(null)
        }
      >

        {isOwner && (
          <>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onEdit(comment);
              }}
            >
              Edit Comment
            </MenuItem>


            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setConfirmOpen(true);
              }}
            >
              Delete Comment
            </MenuItem>
          </>
        )}

      </Menu>



      <ConfirmDialog
        open={confirmOpen}
        title="Delete Comment?"
        description="This comment will be permanently deleted."
        confirmText="Delete"
        onClose={() =>
          setConfirmOpen(false)
        }
        onConfirm={() => {
          deleteComment.mutate(
            {
              postId,
              commentId:
                comment._id,
            },
            {
              onSuccess: () =>
                setConfirmOpen(false),
            }
          );
        }}
      />

    </>
  );
}