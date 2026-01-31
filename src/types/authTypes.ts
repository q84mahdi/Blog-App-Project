/* ---------- Auth ---------- */

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

export interface LogoutResponse {
  auth: boolean;
  message: string;
}

/* ---------- User ---------- */

export interface User {
  name: string;
  email: string;
  bookmarkedPosts: string[];
  likedPosts: string[];
  avatar: string | null;
  _id: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl: string | null;
}

export interface UserPost {
  _id: string;
  title: string;
  slug: string;
  category: {
    _id: string;
    title: string;
    slug: string;
  };
  type: "free" | "premium";
  briefText: string;
  text: string;
  coverImage: string;
  likes: string[];
  likesCount: number;
  bookmarks: string[];
  readingTime: number;
  tags: string[];
  author: {
    _id: string;
    name: string;
    avatar: string;
    avatarUrl: string;
  };
  related: string[];
  comments: UserComment[];
  createdAt: string;
  updatedAt: string;
  coverImageUrl: string;
}

export interface UserComment {
  content: {
    text: string;
  };
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
    avatarUrl: string;
  };
  post: {
    _id: string;
    title: string;
    slug: string;
    coverImageUrl: string;
  };
  status: 0 | 1 | 2;
  openToComment: boolean;
  answers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
}
