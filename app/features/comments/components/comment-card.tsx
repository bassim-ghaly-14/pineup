"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useReplies } from "../hooks/use-replies";
import { ReplyCard } from "./reply-card";
import { CreateReply } from "./create-reply";
import {
  Box,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Comment } from "../types/comment.types";
import { useLikeComment } from "../hooks/use-like-comment";
import { useDeleteComment } from "../hooks/use-delete-comment";
import { formatDate } from "@/utils/format-date";
import { UserAvatar } from "@/components/common/user-avatar";
import { isVerified } from "@/utils/is-verified";
import { VerifiedBadge } from "@/components/common/verified-badge";
import { GlassCard } from "@/components/common/glass-card";
import { LinkifyText } from "@/components/common/linkify-text";

type Props = {
  postId: string;
  comment: Comment;
  highlighted?: boolean;
  onEdit: (comment: Comment) => void;
};

const SCROLL_OFFSET = 120;
export function CommentCard({
  postId,
  comment,
  highlighted = false,
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
  const [showReplyBox, setShowReplyBox] = 
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
const cardRef =
  useRef<HTMLDivElement>(null);
const [
  animateHighlight,
  setAnimateHighlight,
] = useState(false);
useEffect(() => {
  if (!highlighted || !cardRef.current) {
    return;
  }
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (!cardRef.current) return;
const y =
  window.scrollY +
  cardRef.current.getBoundingClientRect().top -
  SCROLL_OFFSET;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 150);
  });
  setAnimateHighlight(true);
  const timer = setTimeout(() => {
    setAnimateHighlight(false);
  }, 2000);
  return () => clearTimeout(timer);
}, [highlighted, SCROLL_OFFSET]);

  return (
    <>
      <GlassCard
        ref={cardRef}
        elevation={0}
sx={(theme) => ({
  outline: animateHighlight
  ? "2px solid"
  : "none",
outlineColor: "primary.main",
boxShadow: animateHighlight
  ? `0 0 0 6px ${theme.palette.primary.main}22`
  : undefined,
  transition:
  "transform .25s ease, box-shadow .35s ease, outline-color .35s ease",
  borderRadius: 4,
  border: "1px solid",
  borderColor: "divider",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))"
      : "linear-gradient(180deg,#fff,#fcfcfc)",
...( !animateHighlight && {
  "&:hover": {
    borderColor: "primary.main",
    transform: "translateY(-2px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 16px 36px rgba(0,0,0,.35)"
        : "0 16px 36px rgba(0,0,0,.08)",
  },
}),
})}
      >
        <CardContent
          sx={{
            p: 3,
            "&:last-child": {
              pb: 3,
            },
          }}
        >
          <Stack
  direction="row"
  spacing={{
    xs: 1.25,
    sm: 2,
  }}
  sx={{
    alignItems: "flex-start",
    minWidth: 0,
  }}
>
            <UserAvatar
              src={comment.commentCreator.photo}
              userId={comment.commentCreator._id}
              sx={{
                width: 50,
                height: 50,
                border: "2px solid",
                borderColor: "primary.main",
                boxShadow:
                  "0 0 0 4px rgba(212,166,58,.10)",
              }}
            >
              {comment.commentCreator.name?.[0]}
            </UserAvatar>
            <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden", }}>
              <Stack
  direction="row"
  sx={{
    justifyContent: "space-between",
    alignItems: "flex-start",
    minWidth: 0,
    gap: 1,
  }}
>
                <Box>
<Stack
  direction="row"
  spacing={0.5}
  sx={{ alignItems: "center" }}
>
  <Typography
    sx={{
      fontWeight: 800,
      fontSize: 15,
    }}
  >
    {comment.commentCreator.name}
  </Typography>

  {isVerified(comment.commentCreator._id) && (
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
    mt: 1.4,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    lineHeight: 1.8,
    fontSize: 15,
  }}
>
                <LinkifyText text={comment.content} />
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
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider"
                  }}
                />
              )}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 2,
                  pt: 1.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  rowGap: 1,
                }}
              >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                  <IconButton
                    sx={{
                          borderRadius: 999,
                          transition: ".25s",
                          "&:hover": {
                            bgcolor: "action.hover",
                            transform: "scale(1.08)",
                          },
                        }}
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
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      ml: .25,
                    }}
                  >
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
                      setShowReplyBox((prev) => !prev)
                    }
                  >
                    <ReplyRoundedIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{
                      cursor: "pointer",
                      fontWeight: 700,
                      "&:hover": {color: "primary.main",},
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
                      transition: ".25s",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  onClick={() =>
                    setShowReplyBox(
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
      </GlassCard>

{showReplyBox && (
  <CreateReply
    postId={postId}
    commentId={comment._id}
    onSuccess={() => {
      setShowReplyBox(false);
      setShowReplies(true);
    }}
  />
)}

{showReplies && (
  <Box
    sx={{
      ml: 7,
      mt: 2,
      pl: 2,
      borderLeft: "2px solid",
      borderColor: "divider"
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
              <EditRoundedIcon
                  fontSize="small"
                  sx={{ mr: 1.5 }}
              />
              Edit Comment
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setConfirmOpen(true);
              }}
              sx={{
                    color: "error.main",
              }}
            >
              <DeleteOutlineRoundedIcon
                    fontSize="small"
                    sx={{ mr: 1.5 }}
              />
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