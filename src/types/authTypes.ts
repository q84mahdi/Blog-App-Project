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

export interface UpdateProfileRequest {
  name: string;
  email: string;
}
