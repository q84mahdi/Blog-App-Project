import { http } from "msw";
import type { AnswerComment, Comment, CommentStatus } from "@/types/commentTypes";
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
    const parentId = String(data.parentId ?? "");

    if (!post || !text) return error("پست و متن نظر الزامی است", 400);

    if (parentId) {
      const parent = db.comments.find(
        (item) => item._id === parentId && item.post._id === post._id,
      );
      if (!parent) return error("نظر والد پیدا نشد", 404);

      const answer: AnswerComment = {
        _id: `comment-${crypto.randomUUID()}`,
        content: { text },
        user: author(db.currentUser),
        post: post._id,
        status: 0,
        openToComment: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      parent.answers.push(answer);

      return ok(empty("پاسخ شما پس از بررسی نمایش داده می‌شود"), 201);
    }

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
    const answerParent = db.comments.find((item) =>
      item.answers.some((answer) => answer._id === params.commentId),
    );
    const answer = answerParent?.answers.find(
      (item) => item._id === params.commentId,
    );

    if (!comment && !answer) return error("نظر پیدا نشد", 404);

    const data = await requestData(request);
    const status = Number(data.status) as CommentStatus;

    if (![0, 1, 2].includes(status)) return error("وضعیت نظر معتبر نیست", 400);

    const updatedAt = new Date().toISOString();
    if (comment) {
      comment.status = status;
      comment.updatedAt = updatedAt;
    } else if (answer) {
      answer.status = status;
      answer.updatedAt = updatedAt;
      if (answerParent) answerParent.updatedAt = updatedAt;
    }

    return ok(empty("وضعیت نظر تغییر کرد"));
  }),

  http.delete("*/comment/remove/:commentId", ({ params }) => {
    const before = db.comments.length;

    db.comments = db.comments.filter((item) => item._id !== params.commentId);

    let answerRemoved = false;
    for (const comment of db.comments) {
      const answerCount = comment.answers.length;
      comment.answers = comment.answers.filter(
        (answer) => answer._id !== params.commentId,
      );
      if (comment.answers.length !== answerCount) {
        answerRemoved = true;
        comment.updatedAt = new Date().toISOString();
      }
    }

    if (before === db.comments.length && !answerRemoved)
      return error("نظر پیدا نشد", 404);

    return ok(empty("نظر حذف شد"));
  }),
];
