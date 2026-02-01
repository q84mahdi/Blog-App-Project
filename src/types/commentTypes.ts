import { PaginatedResponse } from "./globalTypes";

/* ---------- Comment ---------- */

export interface CreateCommentRequest {
  parentId?: number;
  postId: string;
  text: string;
}

export interface ChangeStatusCommentRequest {
  status: 0 | 1 | 2;
}

export type GetAllCommentsResponse = PaginatedResponse<Comment> & {
  commentsCount: number;
};

export interface AnswerComment {
  content: { text: string };
  user: {
    _id: string;
    name: string;
    avatarUrl: string | null;
  };
  post: string;
  status: 0 | 1 | 2;
  openToComment: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  content: { text: string };
  _id: string;
  user: {
    _id: string;
    name: string;
    avatarUrl: string | null;
  };
  post: {
    _id: string;
    title: string;
    slug: string;
    coverImageUrl: string | null;
  };
  status: 0 | 1 | 2;
  openToComment: boolean;
  answers: AnswerComment[];
  createdAt: string;
  updatedAt: string;
}
