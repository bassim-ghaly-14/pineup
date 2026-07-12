"use client";

import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { useCreatePost } from "../hooks/use-create-post";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserAvatar } from "@/components/common/user-avatar";
import { isVerified } from "@/utils/is-verified";
import { VerifiedBadge } from "@/components/common/verified-badge";
import { GlassCard } from "@/components/common/glass-card";


export function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const mutation =
    useCreatePost();

  const {data} = useAuth();
  const user = data?.user;

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

    const formData = new FormData();

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
    <GlassCard
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        transition: ".25s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.08)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "flex-start" }}
          >
            <UserAvatar
              src={user?.photo}
              sx={{
                width: 50,
                height: 50,
              }}
            >
              {user?.name?.[0]}
            </UserAvatar>

            <Box sx={{ flex: 1 }}>
<Stack
  direction="row"
  spacing={0.5}
  sx={{ mb: .5, alignItems:"center" }}
>
  <Typography
    sx={{ fontWeight: 700 }}
  >
    {user?.name}
  </Typography>

  {isVerified(user?._id) && (
    <VerifiedBadge size={18} />
  )}
</Stack>

              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Share something with your network..."
                value={body}
                onChange={(e) =>
                  setBody(
                    e.target.value
                  )
                }
                variant="standard"
                sx={{
                  "& .MuiInput-root:before, & .MuiInput-root:after, & .MuiInput-underline:before, & .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                }}
              />
            </Box>
          </Stack>

          {preview && (
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 3,
              }}
            >
              <Box
                component="img"
                src={preview}
                alt="preview"
                sx={{
                  width: "100%",
                  maxHeight: 420,
                  objectFit: "cover",
                }}
              />

              <Button
                onClick={() => {
                  setImage(null);

                  if (inputRef.current) {
                    inputRef.current.value =
                      "";
                  }
                }}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor:
                    "rgba(0,0,0,.55)",
                  color: "#fff",

                  "&:hover": {
                    bgcolor:
                      "rgba(0,0,0,.75)",
                  },
                }}
              >
                <CloseRoundedIcon />
              </Button>
            </Box>
          )}

          <input
            hidden
            ref={inputRef}
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

          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={
                <AddPhotoAlternateRoundedIcon />
              }
              onClick={() =>
                inputRef.current?.click()
              }
              sx={{
                borderRadius: 99,
                px: 2.5,
              }}
            >
              Add Photo
            </Button>

            <Button
              variant="contained"
              endIcon={<SendRoundedIcon />}
              disabled={
                mutation.isPending ||
                (!body.trim() && !image)
              }
              onClick={submit}
              sx={{
                borderRadius: 99,
                px: 3.5,
              }}
            >
              {mutation.isPending
                ? "Publishing..."
                : "Publish"}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}