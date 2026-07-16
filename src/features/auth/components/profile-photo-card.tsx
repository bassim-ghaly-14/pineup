"use client";

import { useRef, useState } from "react";

import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";

import { toast } from "sonner";

import { GlassCard } from "src/components/common/glass-card";
import { UserAvatar } from "src/components/common/user-avatar";

import { useAuth } from "../hooks/use-auth";
import { useUploadPhoto } from "../hooks/use-upload-photo";
import { isVerified } from "src/utils/is-verified";
import { VerifiedBadge } from "src/components/common/verified-badge";

export function ProfilePhotoCard() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const { data } = useAuth();

  const upload =
    useUploadPhoto();

  const [preview, setPreview] =
    useState<string>();

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const handleFile = (
    file?: File
  ) => {
    if (!file) return;

    const previewUrl =
      URL.createObjectURL(file);

    setPreview(previewUrl);

    const formData = new FormData();

    formData.append(
      "photo",
      file
    );

    upload.mutate(formData, {
      onSuccess: () => {
        toast.success(
          "Profile photo updated."
        );
      },

      onError: () => {
        setPreview(undefined);

        toast.error(
          "Failed to upload photo."
        );
      },
    });
  };

  return (
    <GlassCard sx={{ p: 4 }}>

      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >

<Box
  sx={{
    position: "relative",
    width: 140,
    height: 140,
  }}
>
  <Box
    onClick={handleChoose}
    sx={{
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      overflow: "hidden",
      cursor: "pointer",
      position: "relative",

      "&:hover .overlay": {
        opacity: 1,
      },
    }}
  >
    <UserAvatar
      src={preview ?? data?.user?.photo}
      sx={{
        width: "100%",
        height: "100%",
        border: "4px solid",
        borderColor: "primary.main",
        filter: upload.isPending
          ? "blur(2px)"
          : "none",
      }}
    />

    <Box
      className="overlay"
      sx={{
        position: "absolute",
        inset: 0,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        bgcolor: "rgba(0,0,0,.55)",
        color: "#fff",

        opacity: 0,
        transition: ".25s",
      }}
    >
      <CloudUploadRoundedIcon />

      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          fontWeight: 700,
        }}
      >
        Change Photo
      </Typography>
    </Box>

    {upload.isPending && (
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          bgcolor: "rgba(0,0,0,.45)",
          backdropFilter: "blur(3px)",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    )}
  </Box>

  <IconButton
    onClick={handleChoose}
    disabled={upload.isPending}
    sx={{
      position: "absolute",
      right: -4,
      bottom: -4,
      zIndex: 5,

      width: 42,
      height: 42,

      bgcolor: "primary.main",
      color: "#fff",

      border: "3px solid",
      borderColor: "background.paper",

      "&:hover": {
        bgcolor: "primary.dark",
      },
    }}
  >
    <PhotoCameraRoundedIcon />
  </IconButton>
</Box>

        <Stack
          spacing={.5}
          sx={{
            alignItems: "center",
          }}
        >

<Stack
  direction="row"
  spacing={0.5}
  sx={{ alignItems: "center", justifyContent:"center" }}
  
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 800,
      color: "text.primary",
      letterSpacing: "-0.2px",
    }}
  >
    {data?.user?.name}
  </Typography>

  {isVerified(data?.user?._id) && (
    <VerifiedBadge size={18} />
  )}
</Stack>

          <Typography
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            @{data?.user?.username}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            Click your avatar to change your profile photo
          </Typography>

        </Stack>

        <input
          hidden
          ref={inputRef}
          type="file"
          accept="image/*"
          onClick={(e) => {
            (
              e.target as HTMLInputElement
            ).value = "";
          }}
          onChange={(e) =>
            handleFile(
              e.target.files?.[0]
            )
          }
        />

      </Stack>

    </GlassCard>
  );
}