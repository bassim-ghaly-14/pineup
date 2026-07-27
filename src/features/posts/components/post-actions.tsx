"use client";

import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useRequireAuthAction } from "src/features/auth/hooks/use-require-auth-action";
import { useLikePost } from "../hooks/use-like-post";
import { useBookmarkPost } from "../hooks/use-bookmark-post";
import { useRepostPost } from "../hooks/use-repost-post";

type Props = {
  postId: string;
  isLiked?: boolean;
  likesCount?: number;
  isBookmarked?: boolean;
  commentsCount?: number;
  sharesCount?: number;
  onCommentsClick?: () => void;
};

export function PostActions({
  postId,
  isLiked = false,
  likesCount = 0,
  isBookmarked = false,
  commentsCount = 0,
  sharesCount = 0,
  onCommentsClick,
}: Props) {
  const likePost = useLikePost();
  const bookmarkPost = useBookmarkPost();
  const repostPost = useRepostPost();
  const { requireAuth } = useRequireAuthAction();

  const iconStyle = {
    borderRadius: 3,
    transition: ".25s",
    "&:hover": {
      bgcolor: "action.hover",
      transform: "scale(1.08)",
    },
  };

  const countStyle = {
    minWidth: 18,
    fontWeight: 600,
    color: "text.secondary",
    textAlign: "center",
  };

  return (
    <Stack
      onClick={(e) => e.stopPropagation()}
      direction="row"
      sx={{
        mt: 1,
        pt: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Tooltip title="Like">
            <IconButton
              sx={iconStyle}
              disabled={likePost.isPending}
              onClick={() =>
                requireAuth(() => {
                  likePost.mutate(postId);
                })
              }
              color={isLiked ? "error" : "default"}>
              {isLiked ? (
                <FavoriteRoundedIcon />
              ) : (
                <FavoriteBorderRoundedIcon />
              )}
            </IconButton>
          </Tooltip>

          <Typography variant="body2" sx={countStyle}>
            {likesCount}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Tooltip title="Comments">
            <IconButton sx={iconStyle} onClick={onCommentsClick}>
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="body2" sx={countStyle}>
            {commentsCount}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Tooltip title="Save">
          <IconButton
            sx={iconStyle}
            disabled={bookmarkPost.isPending}
            onClick={() =>
              requireAuth(() => {
                bookmarkPost.mutate(postId);
              })
            }
            color={isBookmarked ? "primary" : "default"}>
            {isBookmarked ? (
              <BookmarkRoundedIcon />
            ) : (
              <BookmarkBorderRoundedIcon />
            )}
          </IconButton>
        </Tooltip>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Tooltip title="Repost">
            <IconButton
              sx={iconStyle}
              disabled={repostPost.isPending}
              onClick={() =>
                requireAuth(() => {
                  repostPost.mutate(postId);
                })
              }>
              <RepeatRoundedIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="body2" sx={countStyle}>
            {sharesCount}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
