import { api } from "./axios";
import { STORAGE_KEYS } from "src/constants/storage-keys";

export function setupInterceptors() {
  api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(
        STORAGE_KEYS.TOKEN
      );

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
}