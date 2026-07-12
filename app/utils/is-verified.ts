import { VERIFIED_USERS } from "@/constants/verified-users";

export function isVerified(userId?: string) {
  if (!userId) return false;

  return VERIFIED_USERS.includes(userId);
}