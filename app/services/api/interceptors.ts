import { api } from "./axios";
import { STORAGE_KEYS } from "@/constants/storage-keys";

export function setupInterceptors() {
  api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
}