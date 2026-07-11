import { User } from "@/features/users/types/user.types";

export interface UserProfileResponse {
  isFollowing: boolean;
  user: User;
}