"use client";

import {
  IconButton,
  IconButtonProps,
} from "@mui/material";

export function PremiumIconButton({
  children,
  sx,
  ...props
}: IconButtonProps) {
  const mergedSx = Array.isArray(sx)
    ? sx
    : sx
      ? [sx]
      : [];

  return (
    <IconButton
      {...props}
      sx={[
        (theme) => ({
          width: 46,
          height: 46,

          borderRadius: 3,

          color: "text.primary",

          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,.03)"
              : "rgba(0,0,0,.03)",

          border: "1px solid",
          borderColor: "divider",

          transition:
            "background-color .25s, color .25s, border-color .25s, transform .25s",

          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(212,166,58,.12)"
                : "rgba(212,166,58,.08)",

            borderColor: "primary.main",
            color: "primary.main",
            transform: "translateY(-2px)",
          },
        }),
        ...mergedSx,
      ]}
    >
      {children}
    </IconButton>
  );
}