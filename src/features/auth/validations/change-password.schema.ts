import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required."),

    newPassword: z
      .string()
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number and special character."
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine(
    (data) =>
      data.newPassword ===
      data.confirmPassword,
    {
      path: [
        "confirmPassword",
      ],
      message:
        "Passwords don't match.",
    }
  );

export type ChangePasswordForm =
  z.infer<
    typeof changePasswordSchema
  >;