export interface User {
  _id: string;
  name: string;
  username:string;
  email?: string;
  photo?: string;
  cover?:string;
  bio?: string;
  followers:string[];
  following:string[];
  followersCount: number;
  followingCount: number;
  bookmarksCount?:number;
  isFollowing?: boolean;
}