"use client";

import { IconButton, Stack, Tooltip } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import { useLikePost } from "../hooks/use-like-post";
import { useBookmarkPost } from "../hooks/use-bookmark-post";
import { useSharePost } from "../hooks/use-share-post";

type Props = {
  postId: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  commentsCount?: number;
  onCommentsClick?: () => void;
};

export function PostActions({
  postId,
  isLiked = false,
  isBookmarked = false,
  commentsCount = 0,
  onCommentsClick,
}: Props) {
  const likePost = useLikePost();
  const bookmarkPost = useBookmarkPost();
  const sharePost = useSharePost();

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Like">
        <IconButton
          disabled={likePost.isPending}
          onClick={() => likePost.mutate(postId)}
          color={isLiked ? "error" : "default"}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Tooltip title="Comments">
          <IconButton onClick={onCommentsClick}>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        </Tooltip>

        <span
          style={{
            fontSize: 12,
            color: "#777",
          }}
        >
          {commentsCount}
        </span>
      </Stack>

      <Tooltip title="Bookmark">
        <IconButton
          disabled={bookmarkPost.isPending}
          onClick={() => bookmarkPost.mutate(postId)}
          color={isBookmarked ? "primary" : "default"}
        >
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Share">
        <IconButton
          disabled={sharePost.isPending}
          onClick={() => sharePost.mutate(postId)}
          >
            <ShareIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}