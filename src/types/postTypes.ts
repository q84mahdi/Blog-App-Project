import { User } from "./authTypes";
import { Category } from "./categoryTypes";
import { Comment } from "./commentTypes";

/* ---------- Post ---------- */

export type PostType = "free" | "premium";

export interface CreatePostResponse {
  message: string;
  post: {
    title: string;
    slug: string;
    category: string;
    type: PostType;
    briefText: string;
    text: string;
    coverImage: string;
    readingTime: number;
    tags: string[];
    author: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    coverImageUrl: string;
  };
}

export interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  category: Pick<Category, "_id" | "slug" | "title">;
  coverImage: string;
  readingTime: number;
  author: Pick<User, "_id" | "name" | "avatar" | "avatarUrl">;
  coverImageUrl: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  category: Pick<Category, "_id" | "slug" | "title">;
  type: PostType;
  briefText: string;
  text: string;
  coverImage: string;
  likesCount: number;
  readingTime: number;
  tags: string[];
  author: Pick<User, "_id" | "name" | "avatar" | "avatarUrl">;
  related: RelatedPost[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  coverImageUrl: string;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}
