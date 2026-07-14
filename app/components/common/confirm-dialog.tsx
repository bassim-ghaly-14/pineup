"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { AppDialog } from "@/components/common/app-dialog";
type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onClose,
  onConfirm,
}: Props) {
  return <>
<AppDialog
  open={open}
  onClose={onClose}
  slotProps={{
    paper: {
      sx: {
        minWidth: {
          xs: "90%",
          sm: 420,
        },
      },
    },
  }}
>
      <DialogTitle>
        <Typography
          component="span"
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">
          {description}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          gap: 1,
        }}
      >
        <Button
          variant="text"
          onClick={onClose}
        >
          {cancelText}
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </AppDialog>
  </>
}