"use client";

import { Typography } from "@mui/material";

import { useAuth } from "@/features/auth/hooks/use-auth";

export default function ProfilePage() {
  const {
    data,
  } = useAuth();

  return (
    <Typography>
      {data?.name}
    </Typography>
  );
}