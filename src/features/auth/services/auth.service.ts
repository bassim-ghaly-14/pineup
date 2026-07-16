import { api } from "src/services/api/axios";

import { API_ENDPOINTS } from "src/services/api/endpoints";

import type {
  AuthResponse,
  ProfileResponse,
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
} from "../types/auth.types";

type ApiResponse<T> = {
  message?: string;
  data?: T;
};

function unwrap<T>(response: ApiResponse<T> | T): T {
  if (response && typeof response === "object" && "data" in response) {
    return (response as ApiResponse<T>).data as T;
  }

  return response as T;
}

export const authService = {
  async login(
    payload: LoginDto
  ): Promise<AuthResponse> {
    const { data } = await api.post<
      ApiResponse<AuthResponse>
    >(
      API_ENDPOINTS.AUTH.SIGNIN,
      payload
    );

    return unwrap(data);
  },

  async register(
    payload: RegisterDto
  ): Promise<void> {
    await api.post(
      API_ENDPOINTS.AUTH.SIGNUP,
      payload
    );
  },

  async getProfile(
    signal?: AbortSignal
  ): Promise<ProfileResponse> {
    const { data } = await api.get<
      ApiResponse<ProfileResponse>
    >(
      API_ENDPOINTS.AUTH.PROFILE,
      {
        signal,
      }
    );

    return unwrap(data);
  },

  async changePassword(
    payload: ChangePasswordDto
  ): Promise<AuthResponse> {
try {
    const { data } = await api.patch(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      {
        password: payload.currentPassword,
        newPassword: payload.newPassword,
      }
    );
    return unwrap(data);
  } catch (error:any) {
  throw error;
}
  },

  async uploadPhoto(
    formData: FormData,
    onUploadProgress?: (
      progress: number
    ) => void
  ): Promise<ProfileResponse> {
    const { data } = await api.put<
      ApiResponse<ProfileResponse>
    >(
      API_ENDPOINTS.AUTH.UPLOAD_PHOTO,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },

        onUploadProgress(event) {
          if (
            !event.total ||
            !onUploadProgress
          ) {
            return;
          }

          const progress = Math.round(
            (event.loaded * 100) /
              event.total
          );

          onUploadProgress(progress);
        },
      }
    );

    return unwrap(data);
  },
};