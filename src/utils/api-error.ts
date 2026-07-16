import { AxiosError } from "axios";

type ApiError = {
  message?: string;
  errors?: string | string[];
};

export function getApiErrorMessage(
  error: unknown
) {
  const axiosError =
    error as AxiosError<ApiError>;
  const raw =
    axiosError.response?.data?.message ??
    axiosError.response?.data?.errors;

  const message = Array.isArray(raw)
    ? raw[0]
    : raw ?? "";

  if (!message) {
    return "Something went wrong. Please try again.";
  }

  // Password pattern
  if (
    /password/i.test(message) &&
    /pattern/i.test(message)
  ) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  // Invalid email
  if (
    /email/i.test(message) &&
    /valid/i.test(message)
  ) {
    return "Please enter a valid email address.";
  }

  return message;
}