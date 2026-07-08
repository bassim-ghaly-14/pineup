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

export interface AuthUser {
  _id: string;

  name: string;
  username: string;
  email: string;

  gender: Gender;
  dateOfBirth: string;

  photo?: string;
  coverPhoto?: string;

  bio?: string;

  followersCount: number;
  followingCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message?: string;
  token: string;
  user: AuthUser;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}