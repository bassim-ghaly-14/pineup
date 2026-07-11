"use client";

import { Stack, Typography } from "@mui/material";

import { ProfilePhotoCard } from "@/features/auth/components/profile-photo-card";
import { ChangePasswordCard } from "@/features/auth/components/change-password-card";

export default function SettingsPage() {
  return (
    <Stack spacing={3}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
        }}
      >
        Settings
      </Typography>

      <ProfilePhotoCard />

      <ChangePasswordCard />
    </Stack>
  );
}