"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordForm,
} from "../validations/change-password.schema";

import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { toast } from "sonner";

import { GlassCard } from "@/components/common/glass-card";

import { useChangePassword } from "../hooks/use-change-password";

export function ChangePasswordCard() {
  const mutation =
    useChangePassword();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isValid,
    },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(
      changePasswordSchema
    ),

    mode: "onChange",

    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

const [
  showCurrent,
  setShowCurrent,
] = useState(false);

const [
  showNew,
  setShowNew,
] = useState(false);

const [
  showConfirm,
  setShowConfirm,
] = useState(false);

const onSubmit = (
  values: ChangePasswordForm
) => {
  mutation.mutate(
    {
      currentPassword:
        values.currentPassword,

      newPassword:
        values.newPassword,
    },
    {
      onSuccess: () => {
        toast.success(
          "Password updated."
        );

        reset();
      },

      onError: () => {
        toast.error(
          "Failed to update password."
        );
      },
    }
  );
};

const password =
  watch("newPassword");

const passwordStrength =
  (() => {
    let score = 0;

    if (password.length >= 8)
      score++;

    if (/[A-Z]/.test(password))
      score++;

    if (/[a-z]/.test(password))
      score++;

    if (/\d/.test(password))
      score++;

    if (
      /[#?!@$%^&*-]/.test(
        password
      )
    )
      score++;

    return score;
  })();

const strength = (() => {
  if (passwordStrength <= 2) {
    return {
      label: "Weak",
      color: "error",
      value: 25,
    };
  }

  if (passwordStrength <= 4) {
    return {
      label: "Medium",
      color: "warning",
      value: 65,
    };
  }

  return {
    label: "Strong",
    color: "success",
    value: 100,
  };
})();

  return (
    <GlassCard sx={{ p: 4 }}>

      <Stack spacing={3}>

        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Security
        </Typography>

<Controller
  control={control}
  name="currentPassword"
  render={({ field }) => (
    <TextField
      {...field}
      fullWidth
      label="Current Password"
      type={
        showCurrent
          ? "text"
          : "password"
      }
      error={!!errors.currentPassword}
      helperText={
        errors.currentPassword?.message
      }
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockRoundedIcon />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
              >
                {showCurrent ? (
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
  control={control}
  name="newPassword"
  render={({ field }) => (
    <TextField
      {...field}
      fullWidth
      label="New Password"
      type={
        showNew
          ? "text"
          : "password"
      }
      error={!!errors.newPassword}
      helperText={
        errors.newPassword?.message
      }
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockRoundedIcon />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }
              >
                {showNew ? (
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
{password && (
  <Stack spacing={1}>

    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
      >
        Password Strength
      </Typography>

      <Chip
        label={strength.label}
        color={
          strength.color as
            | "error"
            | "warning"
            | "success"
        }
        size="small"
      />
    </Stack>

    <LinearProgress
      variant="determinate"
      value={strength.value}
      color={
        strength.color as
          | "error"
          | "warning"
          | "success"
      }
      sx={{
        height: 8,
        borderRadius: 20,
      }}
    />

  </Stack>
)}
<Controller
  control={control}
  name="confirmPassword"
  render={({ field }) => (
    <TextField
      {...field}
      fullWidth
      label="Confirm Password"
      type={
        showConfirm
          ? "text"
          : "password"
      }
      error={!!errors.confirmPassword}
      helperText={
        errors.confirmPassword?.message
      }
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockRoundedIcon />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              >
                {showConfirm ? (
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

        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={
            mutation.isPending || !isValid
          }
        >
          Update Password
        </Button>

      </Stack>

    </GlassCard>
  );
}