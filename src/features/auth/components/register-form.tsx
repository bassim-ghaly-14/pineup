"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { calculatePasswordStrength } from "../password-strength";
import { generateUsername } from "../generate-username";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "../hooks/use-register";
import { registerSchema } from "../schemas/register.schema";
import { RegisterFormValues } from "../schemas/register.schema";

export function RegisterForm() {
  const mutation = useRegister();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid, dirtyFields },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: undefined,
      password: "",
      rePassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const name = useWatch({ control, name: "name" });
  const password = useWatch({ control, name: "password" });

  const isUsernameDirty = !!dirtyFields.username;

  // derived username (memoized intention)
  const generatedUsername = useMemo(() => {
    if (isUsernameDirty) return null;
    return generateUsername(name ?? "");
  }, [name, isUsernameDirty]);

  useEffect(() => {
    if (!generatedUsername) return;

    setValue("username", generatedUsername, {
      shouldValidate: true,
      shouldDirty: false,
    });
  }, [generatedUsername, setValue]);

  const passwordStrength = useMemo(
    () => calculatePasswordStrength(password ?? ""),
    [password],
  );

  const togglePassword = useCallback(() => {
    setShowPassword((p) => !p);
  }, []);

  const toggleRePassword = useCallback(() => {
    setShowRePassword((p) => !p);
  }, []);

  const onSubmit = useCallback(
    (data: RegisterFormValues) => {
      mutation.mutate(data);
    },
    [mutation],
  );

  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Stack
      component="form"
      spacing={2.5}
      noValidate
      onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          p: 2.5,
          borderRadius: 1,
          background:
            dark
              ? "linear-gradient(135deg, rgba(212,166,58,.12), rgba(212,166,58,.03))"
              : "linear-gradient(135deg, rgba(212,166,58,.10), rgba(212,166,58,.02))",
          border: dark
            ? "1px solid rgba(212,166,58,.18)"
            : "1px solid rgba(212,166,58,.25)",
          boxShadow: dark
            ? "0 10px 30px rgba(212,166,58,.08)"
            : "0 12px 30px rgba(15,23,42,.06)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              dark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,.05), transparent)"
                : "linear-gradient(90deg, transparent, rgba(0,0,0,.02), transparent)",
            pointerEvents: "none",
          },
        }}>
        <Typography sx={{ fontWeight: 700, color: "primary.main", mb: 0.5 }}>
          Welcome to PineUp
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Connect with creators, professionals and premium communities.
        </Typography>
      </Box>

      {/* Name + Username */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Full Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Username"
              error={!!error}
              helperText={
                error?.message ||
                (!error && field.value ? "Username available" : "")
              }
              slotProps={{
                input: {
                  endAdornment:
                    !error && field.value ? (
                      <InputAdornment position="end">
                        <CheckCircleRoundedIcon
                          color="success"
                          fontSize="small"
                        />
                      </InputAdornment>
                    ) : undefined,
                },
              }}
            />
          )}
        />
      </Stack>

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label="Email Address"
            type="email"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      {/* DOB + Gender */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              type="date"
              label="Date of Birth"
              error={!!error}
              helperText={error?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Gender"
              value={field.value || ""}
              error={!!error}
              helperText={error?.message}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          )}
        />
      </Stack>

      {/* Passwords */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!error}
              helperText={error?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword}>
                        {showPassword ? (
                          <VisibilityOffRoundedIcon />
                        ) : (
                          <VisibilityRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Confirm Password"
              type={showRePassword ? "text" : "password"}
              error={!!error}
              helperText={error?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleRePassword}>
                        {showRePassword ? (
                          <VisibilityOffRoundedIcon />
                        ) : (
                          <VisibilityRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </Stack>

      {/* Strength */}
      {password && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            Password Strength
          </Typography>

          <LinearProgress
            variant="determinate"
            value={(passwordStrength / 5) * 100}
            sx={{
              mt: 1,
              height: 8,
              borderRadius: 8,
            }}
          />

          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: "block",
              color:
                passwordStrength === 5
                  ? "success.main"
                  : passwordStrength >= 3
                    ? "warning.main"
                    : "error.main",
            }}>
            {passwordStrength === 5
              ? "Strong password"
              : passwordStrength >= 3
                ? "Good password"
                : "Weak password"}
          </Typography>
        </Box>
      )}
      {!isValid && (
        <Typography
          variant="caption"
          sx={{
            color: "error.main",
            textAlign: "center",
          }}>
          Please complete all required fields to create your account.
        </Typography>
      )}
      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={mutation.isPending || !isValid}>
        {mutation.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </Stack>
  );
}
