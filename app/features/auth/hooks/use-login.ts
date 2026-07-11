"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { AxiosError } from "axios";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authService } from "../services/auth.service";

import { STORAGE_KEYS } from "@/constants/storage-keys";
import { ROUTES } from "@/constants/routes";
import { queryKeys } from "@/constants/query-keys";
import {
  saveAccount,
} from "../utils/account-storage";

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
    "Invalid email or password."
  );
}

export function useLogin() {
  const router = useRouter();

  const queryClient =
    useQueryClient();

  return useMutation({
    mutationKey: ["login"],

    mutationFn: authService.login,

onSuccess: (data) => {

saveAccount({
  token: data.token,
  user: data.user,
});

localStorage.setItem(
  STORAGE_KEYS.TOKEN,
  data.token
);

localStorage.setItem(
  STORAGE_KEYS.USER,
  JSON.stringify(data.user)
);

  document.cookie =
    `pineup_token=${data.token}; Path=/; Max-Age=2592000; SameSite=Lax;`;


  window.dispatchEvent(
    new Event("auth-change")
  );


  queryClient.clear();


  queryClient.setQueryData(
    queryKeys.auth.profile(),
    {
      user: data.user,
    }
  );


  toast.success(
    `Welcome back, ${data.user.name}!`
  );


  router.replace(
    ROUTES.FEED
  );
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