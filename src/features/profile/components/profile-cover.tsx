"use client";

import { Box } from "@mui/material";
import { ImagePreview } from "src/components/common/image-preview";

type Props = {
  cover?: string;
  avatar?: string;
  name: string;
};

const DEFAULT_COVER =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1786813312/pineup-cover_qtbdyx.png";
const DEFAULT_AVATAR =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1786813308/default-avatar_zebtda.png";

export function ProfileCover({ cover, avatar, name }: Props) {
  const coverImage = cover?.trim() || DEFAULT_COVER;

  const avatarImage =
    avatar?.trim() && !avatar.includes("default-profile.png")
      ? avatar
      : DEFAULT_AVATAR;

  return (
    <Box
      sx={{
        position: "relative",
        mb: 8,
      }}>
      <ImagePreview src={coverImage} alt={`${name} cover`}>
        <Box
          sx={{
            height: {
              xs: 160,
              md: 220,
            },

            borderRadius: 4,

            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

            overflow: "hidden",

            cursor: "zoom-in",
          }}
        />
      </ImagePreview>

      <ImagePreview src={avatarImage} alt={name}>
        <Box
          component="img"
          src={avatarImage}
          alt={name}
          sx={{
            position: "absolute",

            width: {
              xs: 110,
              md: 140,
            },

            height: {
              xs: 110,
              md: 140,
            },

            borderRadius: "50%",

            objectFit: "cover",

            bottom: -25,

            left: {
              xs: 24,
              md: 40,
            },

            border: "6px solid",

            borderColor: "background.paper",

            backgroundColor: "background.paper",

            cursor: "zoom-in",
          }}
        />
      </ImagePreview>
    </Box>
  );
}
