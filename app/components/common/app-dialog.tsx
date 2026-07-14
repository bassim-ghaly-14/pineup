"use client";

import {
  Dialog,
  DialogProps,
} from "@mui/material";

type Props = DialogProps;

export function AppDialog({
  children,
  ...props
}: Props) {
  return (
    <Dialog
      {...props}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1,

            bgcolor: "background.paper",

            border: "1px solid",
            borderColor: "divider",

            overflow: "hidden",
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
}