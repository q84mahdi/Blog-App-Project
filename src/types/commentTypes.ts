import { User } from "./authTypes";
import { PaginatedResponse } from "./globalTypes";
import { Post } from "./postTypes";

/* ---------- Comment ---------- */

export type CommentStatus = 0 | 1 | 2;

export interface CreateCommentRequest {
  parentId?: string;
  postId: string;
  text: string;
}

export interface ChangeStatusCommentRequest {
  status: CommentStatus;
}

export type GetAllCommentsResponse = PaginatedResponse<Comment> & {
  commentsCount: number;
};

export interface AnswerComment {
  content: { text: string };
  user: Pick<User, "_id" | "name" | "avatar" | "avatarUrl">;
  post: string;
  status: CommentStatus;
  openToComment: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  content: { text: string };
  _id: string;
  user: Pick<User, "_id" | "name" | "avatar" | "avatarUrl">;
  post: Pick<Post, "_id" | "title" | "slug" | "coverImageUrl">;
  status: CommentStatus;
  openToComment: boolean;
  answers: AnswerComment[];
  createdAt: string;
  updatedAt: string;
}
