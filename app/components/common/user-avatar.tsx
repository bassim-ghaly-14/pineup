"use client";

import {
  Avatar,
  AvatarProps,
} from "@mui/material";

export function UserAvatar(
  props: AvatarProps
) {
  const mergedSx = Array.isArray(props.sx)
    ? props.sx
    : props.sx
      ? [props.sx]
      : [];

  return (
    <Avatar
      {...props}
      sx={[
        {
          width: 42,
          height: 42,

          border: "2px solid",
          borderColor: "primary.main",

          transition:
            "border-color .25s, transform .25s",

          "&:hover": {
            transform: "scale(1.03)",
          },
        },
        ...mergedSx,
      ]}
    />
  );
}