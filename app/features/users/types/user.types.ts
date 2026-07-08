export interface User {
  _id: string;

  name: string;

  email?: string;

  photo?: string;

  bio?: string;

  followersCount: number;

  followingCount: number;

  isFollowing?: boolean;
}