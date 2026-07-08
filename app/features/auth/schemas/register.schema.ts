import { z } from "zod";

export const MIN_AGE = 13;

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const USERNAME_REGEX =
  /^[a-zA-Z0-9_]+$/;

export const MAX_DATE = new Date()
  .toISOString()
  .split("T")[0];

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required.")
      .trim()
      .min(2, "Full name must be at least 2 characters.")
      .max(50, "Full name is too long."),

    username: z
      .string()
      .min(1, "Username is required.")
      .trim()
      .toLowerCase()
      .min(4, "Username must be at least 4 characters.")
      .max(20, "Username can't exceed 20 characters.")
      .regex(
        USERNAME_REGEX,
        "Only letters, numbers and underscore are allowed."
      ),

    email: z
      .string()
      .min(1, "Email is required.")
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address.")
      .max(100),

    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required."),

    gender: z.enum(["male", "female"] as const),

    password: z
      .string()
      .min(1, "Password is required.")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      ),

    rePassword: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .superRefine((data, ctx) => {
    const { password, rePassword, dateOfBirth } = data;

    if (password !== rePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["rePassword"],
        message: "Passwords do not match.",
      });
    }

    const birth = new Date(dateOfBirth);

    if (Number.isNaN(birth.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: "Invalid date of birth.",
      });

      return;
    }

    const today = new Date();

    let age =
      today.getFullYear() - birth.getFullYear();

    const month =
      today.getMonth() - birth.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (age < MIN_AGE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: `You must be at least ${MIN_AGE} years old.`,
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export type Gender = RegisterSchema["gender"];