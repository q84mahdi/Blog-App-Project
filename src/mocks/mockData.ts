import { HttpResponse } from "msw";
import type { ApiResponse, PaginatedResponse } from "@/types/globalTypes";
import type { User } from "@/types/authTypes";
import type { Category } from "@/types/categoryTypes";
import type { Comment } from "@/types/commentTypes";
import type { Post } from "@/types/postTypes";

export const author = (user: User) => ({
  _id: user._id,
  name: user.name,
  avatar: user.avatar,
  avatarUrl: user.avatarUrl,
});
export const category = (value: Category) => ({
  _id: value._id,
  slug: value.slug,
  title: value.title,
});

const timestamp = "2025-01-15T12:00:00.000Z";

const seedUsers: User[] = [
  {
    _id: "user-admin",
    name: "مدیر وبلاگ",
    email: "admin@example.com",
    avatar: null,
    avatarUrl: null,
    bookmarkedPosts: ["post-react"],
    likedPosts: ["post-react"],
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    _id: "user-author",
    name: "نویسنده وبلاگ",
    email: "author@example.com",
    avatar: null,
    avatarUrl: null,
    bookmarkedPosts: [],
    likedPosts: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];
const categoryFixtures: Category[] = [
  {
    _id: "category-react",
    title: "ری‌اکت",
    englishTitle: "React",
    description: "آموزش و تجربه‌های توسعه با React",
    slug: "react",
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    _id: "category-next",
    title: "نکست جی‌اس",
    englishTitle: "Next.js",
    description: "ساخت برنامه‌های وب با Next.js",
    slug: "nextjs",
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    _id: "category-design",
    title: "طراحی",
    englishTitle: "Design",
    description: "اصول طراحی محصول دیجیتال",
    slug: "design",
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];
const postFixtures: Post[] = [
  {
    _id: "post-react",
    title: "شروع کار با ری‌اکت",
    slug: "getting-started-react",
    category: category(categoryFixtures[0]),
    type: "free",
    briefText: "مفاهیم پایه برای ساخت رابط کاربری با ری‌اکت.",
    text: "ری‌اکت کتابخانه‌ای برای ساخت رابط‌های کاربری است.",
    coverImage: "react-cover.jpg",
    coverImageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    likesCount: 12,
    readingTime: 5,
    tags: ["react", "frontend"],
    author: author(seedUsers[1]),
    related: [],
    comments: [],
    createdAt: timestamp,
    updatedAt: timestamp,
    commentsCount: 1,
    isLiked: true,
    isBookmarked: true,
  },
  {
    _id: "post-next",
    title: "مسیر رندر در نکست جی‌اس",
    slug: "nextjs-rendering",
    category: category(categoryFixtures[1]),
    type: "free",
    briefText: "نگاهی کاربردی به روش‌های رندر در نکست جی‌اس.",
    text: "برنامه‌های نکست می‌توانند رابط را روی سرور یا مرورگر رندر کنند.",
    coverImage: "next-cover.jpg",
    coverImageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    likesCount: 8,
    readingTime: 7,
    tags: ["nextjs", "web"],
    author: author(seedUsers[0]),
    related: [],
    comments: [],
    createdAt: "2025-01-10T12:00:00.000Z",
    updatedAt: timestamp,
    commentsCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    _id: "post-design",
    title: "اصول طراحی خوانا",
    slug: "readable-design",
    category: category(categoryFixtures[2]),
    type: "premium",
    briefText: "چطور محتوای دیجیتال را خواناتر طراحی کنیم.",
    text: "خوانایی از انتخاب تایپوگرافی و فاصله‌گذاری مناسب شروع می‌شود.",
    coverImage: "design-cover.jpg",
    coverImageUrl:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200",
    likesCount: 4,
    readingTime: 4,
    tags: ["design", "typography"],
    author: author(seedUsers[1]),
    related: [],
    comments: [],
    createdAt: "2025-01-05T12:00:00.000Z",
    updatedAt: timestamp,
    commentsCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
];
const commentFixtures: Comment[] = [
  {
    _id: "comment-react",
    content: { text: "توضیحات خیلی مفید بود، ممنون." },
    user: author(seedUsers[0]),
    post: {
      _id: postFixtures[0]._id,
      title: postFixtures[0].title,
      slug: postFixtures[0].slug,
      coverImageUrl: postFixtures[0].coverImageUrl,
    },
    status: 1,
    openToComment: true,
    answers: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];

export const db = {
  users: structuredClone(seedUsers),
  currentUser: seedUsers[0],
  posts: structuredClone(postFixtures),
  categories: structuredClone(categoryFixtures),
  comments: structuredClone(commentFixtures),
};
export function resetMockData() {
  db.users = structuredClone(seedUsers);
  db.currentUser = db.users[0];
  db.posts = structuredClone(postFixtures);
  db.categories = structuredClone(categoryFixtures);
  db.comments = structuredClone(commentFixtures);
}

export const ok = <T>(data: T, status = 200) =>
  HttpResponse.json<ApiResponse<T>>({ statusCode: status, data }, { status });
export const error = (message: string, status: number) =>
  HttpResponse.json({ statusCode: status, message }, { status });

export const empty = (message = "عملیات با موفقیت انجام شد") => ({ message });
export const clone = <T>(value: T): T => structuredClone(value);

export function paginate<T>(items: T[], url: URL): PaginatedResponse<T> {
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const requestedLimit = Number(url.searchParams.get("limit")) || 10;
  const limit = Math.min(100, Math.max(1, requestedLimit));
  const start = (page - 1) * limit;

  return {
    data: clone(items.slice(start, start + limit)),
    dataCount: items.length,
    total: items.length,
    page,
    limit,
  };
}

export function filterPosts(items: Post[], url: URL) {
  let result = [...items];

  const search = url.searchParams.get("search")?.trim().toLocaleLowerCase();
  const categoryId = url.searchParams.get("category");

  if (search)
    result = result.filter((post) =>
      `${post.title} ${post.briefText} ${post.text} ${post.tags.join(" ")}`
        .toLocaleLowerCase()
        .includes(search),
    );

  if (categoryId)
    result = result.filter(
      (post) =>
        post.category._id === categoryId || post.category.slug === categoryId,
    );

  if (url.searchParams.get("order") === "popular")
    result.sort((a, b) => b.likesCount - a.likesCount);
  else
    result.sort((a, b) =>
      url.searchParams.get("order") === "asc"
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt),
    );

  return result;
}

export function findPost(id: string) {
  return db.posts.find((post) => post._id === id || post.slug === id);
}

export function postResponse(post: Post) {
  const related = db.posts
    .filter(
      (item) =>
        item._id !== post._id && item.category._id === post.category._id,
    )
    .slice(0, 3);

  return {
    ...clone(post),

    related: clone(related),

    comments: clone(
      db.comments.filter(
        (comment) => comment.post._id === post._id && comment.status === 1,
      ),
    ),

    commentsCount: db.comments.filter(
      (comment) => comment.post._id === post._id && comment.status === 1,
    ).length,
  };
}

export const requestData = async (
  request: Request,
): Promise<Record<string, unknown>> => {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
};

export const formData = async (request: Request) => {
  try {
    return await request.formData();
  } catch {
    return new FormData();
  }
};
