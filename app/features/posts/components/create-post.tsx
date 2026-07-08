"use client";

import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";

import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useCreatePost } from "../hooks/use-create-post";

export function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const mutation =
    useCreatePost();

  const preview =
    image
      ? URL.createObjectURL(image)
      : null;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const submit = () => {
    if (!body.trim() && !image) return;

    const formData =
      new FormData();

    if (body.trim()) {
      formData.append(
        "body",
        body.trim()
      );
    }

    if (image) {
      formData.append(
        "image",
        image
      );
    }
    console.log(
  localStorage.getItem("pineup-token")
);
    mutation.mutate(formData, {
      onSuccess: () => {
        setBody("");
        setImage(null);

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
    });
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <TextField
            multiline
            minRows={3}
            placeholder="What's happening?"
            value={body}
            onChange={(e) =>
              setBody(
                e.target.value
              )
            }
          />

          {preview && (
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={preview}
                alt="preview"
                sx={{
                  width: "100%",
                  maxHeight: 350,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />

              <Button
                size="small"
                onClick={() => {
                  setImage(null);

                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  p: 0,
                }}
              >
                <CloseRoundedIcon />
              </Button>
            </Box>
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
            sx={{
              direction: "row",
              justifyContent: "space-between",
            }}
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
              onClick={submit}
              disabled={
                mutation.isPending ||
                (!body.trim() && !image)
              }
            >
              {mutation.isPending
                ? "Publishing..."
                : "Publish"}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}