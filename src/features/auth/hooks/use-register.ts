"use client";

import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authService } from "../services/auth.service";

import { ROUTES } from "src/constants/routes";

import { getApiErrorMessage } from "src/utils/api-error";

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
    getApiErrorMessage(
      error
    )
  );
},
  });
}