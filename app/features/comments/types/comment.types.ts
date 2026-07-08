import { User } from "@/features/users/types/user.types";

export interface Comment {

  _id: string;

  content: string;

  image?: string;

  commentCreator: User;

  post: string;

  parentComment: string | null;

  likes: string[];

  createdAt: string;

  repliesCount: number;

}

export interface CreateCommentDto {

  postId: string;

  content: string;

  image?: string;

}

export interface UpdateCommentDto {
  content: string;
  image?: string;
}