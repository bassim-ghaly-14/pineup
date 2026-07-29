"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVert";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { toast } from "sonner";

import { ROUTES } from "src/constants/routes";
import { useAuth } from "src/features/auth/hooks/use-auth";
import { ConfirmDialog } from "src/components/common/confirm-dialog";
import { CommentsDialog } from "src/features/comments/components/comments-dialog";

import { useDeletePost } from "../hooks/use-delete-post";
import { EditPostDialog } from "./edit-post-dialog";
import { PostActions } from "./post-actions";
import { formatDate, formatRelativeDate } from "src/utils/format-date";
import { Post } from "../types/post.types";
import { UserAvatar } from "src/components/common/user-avatar";
import { isVerified } from "src/utils/is-verified";
import { VerifiedBadge } from "src/components/common/verified-badge";
import { GlassCard } from "src/components/common/glass-card";
import { LinkifyText } from "src/components/common/linkify-text";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { CircularProgress } from "@mui/material";
import { useDownloadImage } from "@/features/social/hooks/use-download-image";

type Props = {
  post: Post;
  hideCommentsDialog?: boolean;
  showFullDate?: boolean;
};

export function PostCard({
  post,
  hideCommentsDialog = false,
  showFullDate = false,
}: Props) {
  const router = useRouter();

  const { data: me } = useAuth();

  const deletePost = useDeletePost();
  const { downloadImage, isDownloading } = useDownloadImage();

  const isOwner = me?.user?._id === post.user?._id;
  const isLiked = !!me?.user?._id && post.likes?.includes(me.user._id);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openComments, setOpenComments] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const openProfile = () => {
    if (!post.user?._id) return;

    router.push(ROUTES.PROFILE_BY_ID(post.user._id));
  };
  const openPost = () => {
    router.push(ROUTES.POST(post._id));
  };
  const postUrl =
    typeof window !== "undefined"
      ? window.location.origin + ROUTES.POST(post._id)
      : "";

  const copyPostLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);

      toast.success("Post link copied");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareOutside = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "PineUp",
          text:
            post.body ?? post.sharedPost?.body ?? "Check this post on PineUp",
          url: postUrl,
        });

        return;
      }

      await copyPostLink();
    } catch {
      // User cancelled sharing
    }
  };

  return (
    <GlassCard
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        transition: "all .25s ease",

        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-2px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 18px 40px rgba(0,0,0,.35)"
              : "0 18px 40px rgba(0,0,0,.08)",
        },
      }}>
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            mb: 2.5,
          }}>
          <UserAvatar
            src={post.user?.photo}
            userId={post.user?._id}
            sx={{
              width: 54,
              height: 54,
              cursor: "pointer",
              transition: ".2s",
              "&:hover": {
                transform: "scale(1.06)",
              },
            }}>
            {post.user?.name?.[0]}
          </UserAvatar>

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 0.5,
                alignItems: "center",
              }}>
              <Typography
                onClick={(e) => {
                  e.stopPropagation();
                  openProfile();
                }}
                sx={{
                  fontWeight: 700,
                  cursor: "pointer",

                  "&:hover": {
                    color: "primary.main",
                  },
                }}>
                {post.user?.name}
              </Typography>

              {isVerified(post.user?._id) && <VerifiedBadge size={18} />}
            </Box>

            <Typography variant="body2" color="text.secondary">
              @{post.user?.username}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontWeight: 500,
              }}>
              {showFullDate
                ? formatDate(post.createdAt)
                : formatRelativeDate(post.createdAt)}
            </Typography>
          </Box>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            }}>
            <MoreVertRoundedIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}>
            {isOwner && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();

                  setAnchorEl(null);
                  setOpenEdit(true);
                }}>
                <EditRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                Edit Post
              </MenuItem>
            )}

            <MenuItem
              onClick={async (e) => {
                e.stopPropagation();

                setAnchorEl(null);
                await copyPostLink();
              }}>
              <ContentCopyRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
              Copy Link
            </MenuItem>
            {post.image && (
              <MenuItem
                disabled={isDownloading}
                onClick={async (e) => {
                  e.stopPropagation();

                  setAnchorEl(null);

                  await downloadImage({
                    imageUrl: post.image!,
                    fileName: `post-${post._id}`,
                  });
                }}>
                {isDownloading ? (
                  <CircularProgress size={18} sx={{ mr: 1.5 }} />
                ) : (
                  <DownloadRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                )}
                Download Image
              </MenuItem>
            )}
            <MenuItem
              onClick={async (e) => {
                e.stopPropagation();

                setAnchorEl(null);
                await shareOutside();
              }}>
              <IosShareRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
              Share Outside
            </MenuItem>

            {isOwner && (
              <>
                <Divider />

                <MenuItem
                  sx={{
                    color: "error.main",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();

                    setAnchorEl(null);
                    setOpenDelete(true);
                  }}>
                  <DeleteOutlineRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Delete Post
                </MenuItem>
              </>
            )}
          </Menu>
        </Stack>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            openPost();
          }}
          sx={{
            cursor: "pointer",
          }}>
          {post.body && (
            <Typography
              sx={{
                mb: 2.5,
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
                fontSize: 15,
              }}>
              <LinkifyText text={post.body} />
            </Typography>
          )}

          {post.image && (
            <Box
              component="img"
              src={post.image}
              alt="post"
              loading="lazy"
              sx={{
                width: "100%",
                maxHeight: 650,
                objectFit: "contain",
                display: "block",
                borderRadius: 3,
                mb: 2.5,
                bgcolor: "background.default",
              }}
            />
          )}
          {post.isShare && post.sharedPost && (
            <Box
              sx={{
                mt: 2,
                mb: 2.5,
                p: 2.5,
                borderRadius: 4,

                border: "1px solid",
                borderColor: "divider",

                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",

                position: "relative",

                transition: "all .25s ease",

                "&:hover": {
                  borderColor: "primary.main",
                },
              }}>
              {/* Shared label */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  mb: 2,
                }}>
                <IosShareRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: "primary.main",
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                  }}>
                  Shared post
                </Typography>
              </Stack>

              {/* Original author */}
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: "center",
                  mb: 2,
                }}>
                <UserAvatar
                  src={post.sharedPost.user?.photo}
                  userId={post.sharedPost.user?._id}
                  sx={{
                    width: 42,
                    height: 42,
                  }}>
                  {post.sharedPost.user?.name?.[0]}
                </UserAvatar>

                <Box>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{
                      alignItems: "center",
                    }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                      }}>
                      {post.sharedPost.user?.name}
                    </Typography>

                    {isVerified(post.sharedPost.user?._id) && (
                      <VerifiedBadge size={16} />
                    )}
                  </Stack>

                  <Typography variant="caption" color="text.secondary">
                    @{post.sharedPost.user?.username}
                  </Typography>
                </Box>
              </Stack>

              {/* Original content */}
              {post.sharedPost.body && (
                <Typography
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                    fontSize: 14.5,
                  }}>
                  <LinkifyText text={post.sharedPost.body} />
                </Typography>
              )}

              {post.sharedPost.image && (
                <Box
                  component="img"
                  src={post.sharedPost.image}
                  alt="shared post"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    mt: 2,
                    borderRadius: 3,
                    maxHeight: 520,
                    objectFit: "contain",
                    display: "block",
                    bgcolor: "background.default",
                  }}
                />
              )}
            </Box>
          )}
        </Box>
        <PostActions
          postId={post._id}
          isLiked={isLiked}
          likesCount={post.likesCount ?? post.likes?.length ?? 0}
          sharesCount={post.sharesCount ?? 0}
          isBookmarked={post.bookmarked ?? false}
          commentsCount={post.commentsCount ?? 0}
          onCommentsClick={() => setOpenComments(true)}
        />

        {!hideCommentsDialog && (
          <CommentsDialog
            open={openComments}
            onClose={() => setOpenComments(false)}
            postId={post._id}
          />
        )}

        <EditPostDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          postId={post._id}
          initialBody={post.body ?? ""}
          initialImage={post.image}
        />
      </CardContent>

      <ConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Delete post?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          deletePost.mutate(post._id, {
            onSuccess: () => {
              setOpenDelete(false);
            },
          });
        }}
      />
    </GlassCard>
  );
}
