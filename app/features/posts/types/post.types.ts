export interface PostUser {
  _id: string;
  name: string;
  username: string;
  photo?: string;
}

export interface Post {
  _id: string;
  id: string;
  body: string;
  privacy: "public" | "private" | "friends";
  user: PostUser;
  sharedPost: Post | null;
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