"use client";

import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authService } from "../services/auth.service";

import { ROUTES } from "@/constants/routes";

type ApiError = {
  message?: string;
  errors?: string;
};

function getErrorMessage(
  error: AxiosError<ApiError>
) {
  return (
    error.response?.data?.message ??
    error.response?.data?.errors ??
    "Registration failed. Please try again."
  );
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,

    onSuccess: () => {
      toast.success(
        "Your account has been created successfully."
      );

      router.replace(ROUTES.LOGIN);
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error as AxiosError<ApiError>
        )
      );
    },
  });
}