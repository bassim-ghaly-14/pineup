"use client";

import {
  Stack,
  TextField,
  Button,
} from "@mui/material";

import { useState } from "react";

import { useChangePassword } from "@/features/auth/hooks/use-change-password";

export default function SettingsPage() {
  const mutation =
    useChangePassword();

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  return (
    <Stack spacing={2}>
      <TextField
        label="Current Password"
        value={
          currentPassword
        }
        onChange={(e) =>
          setCurrentPassword(
            e.target.value
          )
        }
      />

      <TextField
        label="New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(
            e.target.value
          )
        }
      />

      <Button
        variant="contained"
        onClick={() =>
          mutation.mutate({
            currentPassword,
            newPassword,
          })
        }
      >
        Change Password
      </Button>
    </Stack>
  );
}