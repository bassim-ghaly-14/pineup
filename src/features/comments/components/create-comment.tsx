"use client";

import { useRef, useState } from "react";

import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";

import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

import { Comment } from "../types/comment.types";

import { useCreateComment } from "../hooks/use-create-comment";
import { useUpdateComment } from "../hooks/use-update-comment";

type Props = {
  postId: string;

  mode?: "create" | "edit";

  comment?: Comment;

  onSuccess?: () => void;
};

export function CreateComment({
  postId,
  mode = "create",
  comment,
  onSuccess,
}: Props) {
  const [content, setContent] =
    useState(
      comment?.content ?? ""
    );

  const [image, setImage] =
    useState<File | null>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const createMutation =
    useCreateComment();

  const updateMutation =
    useUpdateComment();

  const mutation =
    mode === "create"
      ? createMutation
      : updateMutation;


  const submit = () => {
    if (
      content.trim().length < 2 &&
      !image
    ) {
      return;
    }

    const formData =
      new FormData();


    if (content.trim()) {
      formData.append(
        "content",
        content.trim()
      );
    }


    if (image) {
      formData.append(
        "image",
        image
      );
    }


    if (mode === "create") {
      createMutation.mutate(
        {
          postId,
          formData,
        },
        {
          onSuccess: (res) => {
            reset();
          },
          onError: (err) => {
          },
        }
      );

      return;
    }


    if (!comment?._id) return;


    updateMutation.mutate(
      {
        postId,
        commentId:
          comment._id,
        formData,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };


  const reset = () => {
    setContent("");
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onSuccess?.();
  };


  return (
    <Stack spacing={2}>
      <TextField
        multiline
        minRows={2}
        placeholder={
          mode === "edit"
            ? "Edit comment..."
            : "Write a comment..."
        }
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        // sx={{
        //   "& .MuiOutlinedInput-root": {
        //     color: "white",
        //     backgroundColor:
        //       "rgba(255,255,255,.05)",
        //     borderRadius: 3,
        //     "& fieldset": {
        //       borderColor:
        //         "rgba(255,255,255,.18)",
        //     },
        //     "&:hover fieldset": {
        //       borderColor:
        //         "rgba(255,255,255,.35)",
        //     },
        //     "&.Mui-focused fieldset": {
        //       borderColor:
        //         "primary.main",
        //     },
        //   },
        //   "& .MuiInputBase-input::placeholder": {
        //     color:
        //       "text.secondary",
        //     opacity: 1,
        //   },
        // }}
      />

      {image && (
        <Box
          component="img"
          src={URL.createObjectURL(image)}
          alt="preview"
          sx={{
            width: "100%",
            maxHeight: 250,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      )}


      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (file) {
            setImage(file);
          }
        }}
      />


      <Stack
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <Button
          startIcon={
            <AddPhotoAlternateRoundedIcon />
          }
          onClick={() =>
            inputRef.current?.click()
          }
        >
          Photo
        </Button>


        <Button
          variant="contained"
          disabled={
            mutation.isPending ||
            (
              content.trim().length < 2 &&
              !image
            )
          }
          onClick={submit}
        >
          {mutation.isPending
            ? mode === "edit"
              ? "Saving..."
              : "Publishing..."
            : mode === "edit"
              ? "Save"
              : "Comment"}
        </Button>
      </Stack>
    </Stack>
  );
}