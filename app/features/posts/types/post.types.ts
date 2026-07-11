export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


export interface PostUser {
  _id: string;
  name: string;
  username: string;
  photo?: string;
}


export interface SharedPost {
  _id: string;
  id: string;
  body: string;
  privacy: "public" | "private" | "friends";
  user: PostUser;
  image?: string;
  createdAt: string;
  likes?: string[];
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  isShare?: boolean;
}


export interface Post {
  _id: string;
  id: string;

  body: string;

  privacy:
    | "public"
    | "private"
    | "friends";

  user: PostUser;

  sharedPost:
    | SharedPost
    | null;

  image?: string;

  createdAt: string;

  updatedAt?: string;

  likes: string[];

  likesCount?: number;

  commentsCount?: number;

  sharesCount?: number;

  isShare?: boolean;

  bookmarked?: boolean;
}


export interface CreatePostDto {
  body: string;
  image?: File;
}


export interface UpdatePostDto {
  body: string;
}


export interface LikePostResponse {
  liked: boolean;
  likesCount: number;
  post: Post;
}


export interface BookmarkPostResponse {
  bookmarked: boolean;
  bookmarksCount: number;
}


export interface SharePostResponse {
  post: Post;
}