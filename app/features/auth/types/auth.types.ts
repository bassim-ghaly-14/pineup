export type Gender = "male" | "female";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  password: string;
  rePassword: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileDto {
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: Gender;
}

export interface UploadPhotoResponse {
  photo: string;
}
export interface FollowUser {
  _id: string;
  id: string;
  name: string;
  photo?: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
}
export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo?: string;
  cover?: string;
  dateOfBirth: string;
  gender?: Gender;
  bookmarks: string[];
  followers: FollowUser[];
  following: FollowUser[];
  followersCount?: number;
  followingCount?: number;
  bookmarksCount?: number;
  createdAt: string;
  id:string;
}

export interface AuthResponse {
  message?: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
export interface ProfileResponse {
  user: User;
}