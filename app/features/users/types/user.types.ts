import { FollowUser } from "@/features/auth/types/auth.types";

export interface User {
  _id: string;
  name: string;
  username:string;
  email?: string;
  photo?: string;
  cover?:string;
  bio?: string;
  followers:FollowUser[];
  following:FollowUser[];
  followersCount: number;
  followingCount: number;
  bookmarksCount?:number;
  isFollowing?: boolean;
}