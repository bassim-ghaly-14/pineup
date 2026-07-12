"use client";

import { Box } from "@mui/material";
import DefaultCover from "@/assets/pineup-cover.png"
type Props = {
  cover?: string;
  avatar?: string;
  name: string;
};
const DEFAULT_COVER = DefaultCover.src;
export function ProfileCover({
  cover,
  avatar,
  name,
}: Props) {
  const coverImage = cover?.trim() || DEFAULT_COVER;
  return (
    <Box
      sx={{
        position: "relative",
        mb: 8,
      }}
    >
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
        }}
      />

      <Box
        component="img"
        src={avatar}
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
          bottom: -30,
          left: {
            xs: 24,
            md: 40,
          },
          border: "6px solid",
          borderColor: "background.paper",
          backgroundColor:
            "background.paper",
        }}
      />
    </Box>
  );
}