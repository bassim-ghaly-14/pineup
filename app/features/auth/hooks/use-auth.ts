"use client";

import { useEffect, useState } from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  AxiosError,
} from "axios";

import {
  authService,
} from "../services/auth.service";

import {
  STORAGE_KEYS,
} from "@/constants/storage-keys";

import {
  queryKeys,
} from "@/constants/query-keys";

import type {
  ProfileResponse,
} from "../types/auth.types";


type ApiError = {
  message?: string;
  errors?: string;
};


export function useAuth() {

  const [
    token,
    setToken,
  ] = useState<string | null>(null);


  useEffect(() => {

    const syncToken = () => {
      setToken(
        localStorage.getItem(
          STORAGE_KEYS.TOKEN
        )
      );
    };


    syncToken();


    window.addEventListener(
      "auth-change",
      syncToken
    );


    return () => {
      window.removeEventListener(
        "auth-change",
        syncToken
      );
    };

  }, []);



  const query =
    useQuery<ProfileResponse>({
      queryKey:
        queryKeys.auth.profile(),

      enabled:
        !!token,

      queryFn: ({
        signal,
      }) =>
        authService.getProfile(
          signal
        ),

      staleTime:
        1000 * 60 * 5,

      gcTime:
        1000 * 60 * 30,

      retry:
        false,

      refetchOnWindowFocus:
        false,

      throwOnError:
        false,
    });



  useEffect(() => {

    if (!query.isError) {
      return;
    }


    const error =
      query.error as AxiosError<ApiError>;


    const status =
      error?.response?.status;


    if (status === 401) {

      localStorage.removeItem(
        STORAGE_KEYS.TOKEN
      );


      document.cookie =
        "pineup_token=; Path=/; Max-Age=0";


      setToken(null);


      window.dispatchEvent(
        new Event("auth-change")
      );
    }

  }, [
    query.isError,
    query.error,
  ]);



  return {
    ...query,

    token,

    isAuthenticated:
      !!token &&
      !!query.data,
  };
}