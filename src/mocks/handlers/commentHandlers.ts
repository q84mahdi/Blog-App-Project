import { http } from "msw";
import type { CommentStatus } from "@/types/commentTypes";
import type { Comment } from "@/types/commentTypes";
import {
  db,
  author,
  ok,
  error,
  empty,
  paginate,
  findPost,
  requestData,
} from "../mockData";

export const commentHandlers = [
  http.get("*/comment/list", ({ request }) => {
    const url = new URL(request.url);
    const visible = db.comments.filter((comment) => comment.status !== 0);
    const result = paginate(visible, url);

    return ok({ ...result, commentsCount: visible.length });
  }),

  http.post("*/comment/add", async ({ request }) => {
    const data = await requestData(request);
    const post = findPost(String(data.postId ?? ""));
    const text = String(data.text ?? "").trim();

    if (!post || !text) return error("پست و متن نظر الزامی است", 400);

    const now = new Date().toISOString();
    const comment: Comment = {
      _id: `comment-${crypto.randomUUID()}`,
      content: { text },
      user: author(db.currentUser),
      post: {
        _id: post._id,
        title: post.title,
        slug: post.slug,
        coverImageUrl: post.coverImageUrl,
      },
      status: 0,
      openToComment: true,
      answers: [],
      createdAt: now,
      updatedAt: now,
    };

    db.comments = [comment, ...db.comments];

    return ok(empty("نظر شما پس از بررسی نمایش داده می‌شود"), 201);
  }),

  http.patch("*/comment/update/:commentId", async ({ request, params }) => {
    const comment = db.comments.find((item) => item._id === params.commentId);

    if (!comment) return error("نظر پیدا نشد", 404);

    const data = await requestData(request);
    const status = Number(data.status) as CommentStatus;

    if (![0, 1, 2].includes(status)) return error("وضعیت نظر معتبر نیست", 400);

    comment.status = status;
    comment.updatedAt = new Date().toISOString();

    return ok(empty("وضعیت نظر تغییر کرد"));
  }),

  http.delete("*/comment/remove/:commentId", ({ params }) => {
    const before = db.comments.length;

    db.comments = db.comments.filter((item) => item._id !== params.commentId);

    if (before === db.comments.length) return error("نظر پیدا نشد", 404);

    return ok(empty("نظر حذف شد"));
  }),
];
