"use client";

import { useState } from "react";

import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Box,
  Typography,
  TextField,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useLogin } from "../hooks/use-login";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/login.schema";
import type { LoginFormValues } from "../schemas/login.schema";

export function LoginForm() {
  const mutation = useLogin();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Stack spacing={2.5}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          p: 2.5,
          borderRadius: 1,
          background:
            "linear-gradient(135deg, rgba(212,166,58,0.12), rgba(212,166,58,0.03))",
          border:
            "1px solid rgba(212,166,58,0.18)",
          boxShadow:
            "0 10px 30px rgba(212,166,58,0.08)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,.05), transparent)",
            pointerEvents: "none",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 0.5,
          }}
        >
          Welcome to PineUp
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Connect with creators, professionals and premium communities.
        </Typography>
      </Box>

      {/* EMAIL */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email address"
            placeholder="you@example.com"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* PASSWORD */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <Button
        variant="contained"
        size="large"
        disabled={mutation.isPending}
        onClick={handleSubmit(onSubmit)}
      >
        {mutation.isPending ? "Signing In..." : "Sign In"}
      </Button>
    </Stack>
  );
}