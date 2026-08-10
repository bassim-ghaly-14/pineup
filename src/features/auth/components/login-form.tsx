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
  useTheme,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useLogin } from "../hooks/use-login";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/login.schema";
import type { LoginFormValues } from "../schemas/login.schema";

export function LoginForm() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  const mutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

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
          borderRadius: 3,
          background: dark
            ? "linear-gradient(135deg, rgba(212,166,58,.12), rgba(212,166,58,.03))"
            : "linear-gradient(135deg,#FFF8E8,#FFFFFF)",
          border: dark
            ? "1px solid rgba(212,166,58,.18)"
            : "1px solid rgba(212,166,58,.25)",
          boxShadow: dark
            ? "0 10px 30px rgba(212,166,58,.08)"
            : "0 12px 30px rgba(15,23,42,.08)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              dark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent)"
                : "linear-gradient(90deg, transparent, rgba(0,0,0,.03), transparent)",
            pointerEvents: "none",
          },
        }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 0.5,
          }}>
          Welcome to PineUp
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: dark ? "text.secondary" : "#4B5563",
            lineHeight: 1.7,
          }}>
          Connect with creators, professionals and premium communities.
        </Typography>
      </Box>

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
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: dark ? undefined : "#FFFFFF",
                boxShadow: dark ? "none" : "0 2px 10px rgba(15,23,42,.04)",

                "& fieldset": {
                  borderColor: dark ? undefined : "#D7DCE3",
                },

                "&:hover fieldset": {
                  borderColor: "#D4A63A",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#D4A63A",
                  borderWidth: 2,
                },
              },

              "& .MuiInputLabel-root": {
                color: dark ? undefined : "#4B5563",
              },

              "& .MuiInputBase-input::placeholder": {
                color: "#9CA3AF",
                opacity: 1,
              },
            }}
          />
        )}
      />

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
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: dark ? undefined : "#FFFFFF",
                boxShadow: dark ? "none" : "0 2px 10px rgba(15,23,42,.04)",

                "& fieldset": {
                  borderColor: dark ? undefined : "#D7DCE3",
                },

                "&:hover fieldset": {
                  borderColor: "#D4A63A",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#D4A63A",
                  borderWidth: 2,
                },
              },

              "& .MuiInputLabel-root": {
                color: dark ? undefined : "#4B5563",
              },

              "& .MuiInputBase-input::placeholder": {
                color: "#9CA3AF",
                opacity: 1,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      sx={{
                        color: dark ? "text.secondary" : "#6B7280",
                      }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
        sx={{
          mt: 1,
          height: 48,
          fontWeight: 700,
          borderRadius: 3,
          boxShadow: "0 10px 24px rgba(212,166,58,.25)",
          "&:hover": {
            boxShadow: "0 12px 28px rgba(212,166,58,.35)",
          },
        }}>
        {mutation.isPending ? "Signing In..." : "Sign In"}
      </Button>
    </Stack>
  );
}
