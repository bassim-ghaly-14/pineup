"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { AppDialog } from "@/components/common/app-dialog";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCamera";

import { useUpdatePost } from "../hooks/use-update-post";

type Props = {
  open: boolean;
  postId: string;
  initialBody: string;
  initialImage?: string;
  onClose: () => void;
};

export function EditPostDialog({
  open,
  postId,
  initialBody,
  initialImage,
  onClose,
}: Props) {
  const updatePost = useUpdatePost();

  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (!open) return;

    setBody(initialBody);
    setImage(null);
    setRemoveImage(false);
  }, [open, initialBody]);

  const preview = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }

    if (!removeImage) {
      return initialImage;
    }

    return "";
  }, [image, initialImage, removeImage]);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(
          URL.createObjectURL(image)
        );
      }
    };
  }, [image]);

  const handleSave = () => {
    const formData = new FormData();

    formData.append("body", body.trim());

    if (image) {
      formData.append("image", image);
    }

    if (removeImage) {
      formData.append("removeImage", "true");
    }

    updatePost.mutate(
      {
        id: postId,
        formData,
      },
      {
        onSuccess: onClose,
      }
    );
  };
const hasChanges =
  body.trim() !== initialBody.trim() ||
  image !== null ||
  removeImage;
  return (
<AppDialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
>
      <DialogTitle>
        Edit Post
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          minRows={5}
          sx={{ mt: 1 }}
          value={body}
          onChange={(e) =>
            setBody(e.target.value)
          }
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
        >
<Button
  component="label"
  variant="outlined"
  startIcon={<PhotoCameraRoundedIcon />}
>
  {preview ? "Change Image" : "Add Image"}

  <input
    hidden
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setImage(file);
      setRemoveImage(false);
    }}
  />
</Button>

          {(preview || image) && (
            <Button
              color="error"
              variant="outlined"
              startIcon={
                <DeleteOutlineRoundedIcon />
              }
              onClick={() => {
                setImage(null);
                setRemoveImage(true);
              }}
            >
              Remove Image
            </Button>
          )}
        </Stack>

        {preview && (
          <Box
            component="img"
            src={preview}
            alt="preview"
            sx={{
              width: "100%",
              mt: 3,
              borderRadius: 3,
              maxHeight: 350,
              objectFit: "cover",
            }}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
  variant="contained"
  disabled={
    updatePost.isPending ||
    !hasChanges
  }
  onClick={handleSave}
>
  {updatePost.isPending
    ? "Saving..."
    : "Save"}
</Button>
      </DialogActions>
    </AppDialog>
  );
}