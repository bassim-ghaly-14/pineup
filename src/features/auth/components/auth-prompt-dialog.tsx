"use client";

import { useRouter } from "next/navigation";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { ROUTES } from "src/constants/routes";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AuthPromptDialog({ open, onClose }: Props) {
  const router = useRouter();

  const goTo = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Sign in required</DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">
          Create an account or sign in to continue.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button variant="outlined" onClick={() => goTo(ROUTES.REGISTER)}>
          Sign Up
        </Button>

        <Button variant="contained" onClick={() => goTo(ROUTES.LOGIN)}>
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
}
