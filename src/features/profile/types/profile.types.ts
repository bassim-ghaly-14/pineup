import { User } from "src/features/users/types/user.types";

export interface UserProfileResponse {
  isFollowing: boolean;
  user: User;
}