"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";

import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useCreatePost } from "../hooks/use-create-post";
import { UserAvatar } from "@/components/common/user-avatar";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CreatePostDialog({
  open,
  onClose,
}: Props) {
  const createPost = useCreatePost();

  const [body, setBody] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  useEffect(() => {
    if (!open) return;

    setBody("");
    setImage(null);
  }, [open]);

  const preview = useMemo(() => {
    if (!image) return "";

    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
  };

  const handleSubmit = () => {
    if (!body.trim() && !image) return;

    const formData = new FormData();

    formData.append(
      "body",
      body.trim()
    );

    if (image) {
      formData.append(
        "image",
        image
      );
    }

    createPost.mutate(formData, {
      onSuccess() {
        setBody("");
        setImage(null);
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Create Post
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            multiline
            minRows={5}
            placeholder="What's happening?"
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
          />

          {preview && (
            <Box
              sx={{
                position: "relative",
              }}
            >
              <UserAvatar
                variant="rounded"
                src={preview}
                sx={{
                  width: "100%",
                  height: 260,
                  borderRadius: 3,
                }}
              />

              <IconButton
                onClick={() =>
                  setImage(null)
                }
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor:
                    "background.paper",
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
          )}

          <Button
            component="label"
            variant="outlined"
            startIcon={
              <PhotoRoundedIcon />
            }
          >
            Choose image

            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImage}
            />
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={
            createPost.isPending ||
            (!body.trim() && !image)
          }
          onClick={handleSubmit}
        >
          {createPost.isPending
            ? "Publishing..."
            : "Publish"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}