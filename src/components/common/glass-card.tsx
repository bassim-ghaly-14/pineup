"use client";

import { Card, CardProps } from "@mui/material";

export function GlassCard(props: CardProps) {
  return (
    <Card
      {...props}
      elevation={0}
      sx={[
        (theme) => ({
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          background:
            theme.palette.mode === "dark"
              ? "rgba(26,31,39,.88)"
              : "rgba(255,255,255,.75)",

          border: "1px solid",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,.06)"
              : "rgba(0,0,0,.06)",

          transition: "all .25s ease",

          "&:hover": {
            borderColor: "primary.main",
          },
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}