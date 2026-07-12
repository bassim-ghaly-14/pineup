import { User } from "@/features/users/types/user.types";
import { PostUser } from "@/features/posts/types/post.types";


export type IndexableUser =
  Partial<User> & PostUser;


export interface IndexedUser {
  _id: string;

  name: string;

  username: string;

  photo?: string;

  cover?: string;

  bio?: string;

  isFollowing?: boolean;

  followersCount?: number;

  followingCount?: number;

  lastSeen: number;

  score: number;

  source:
    | "feed"
    | "profile"
    | "suggestions"
    | "bookmark"
    | "explore";
}