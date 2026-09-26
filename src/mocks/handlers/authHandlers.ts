import { http } from "msw";
import {
  db,
  ok,
  error,
  empty,
  clone,
  paginate,
  filterPosts,
  requestData,
  formData,
} from "../mockData";

export const authHandlers = [
  http.post("*/user/signup", async ({ request }) => {
    const data = await requestData(request);

    const email = String(data.email ?? "")
      .trim()
      .toLowerCase();

    if (!email || !String(data.password ?? ""))
      return error("ایمیل و رمز عبور الزامی است", 400);

    if (db.users.some((user) => user.email === email))
      return error("این ایمیل قبلا ثبت شده است", 409);

    const now = new Date().toISOString();

    db.currentUser = {
      _id: `user-${crypto.randomUUID()}`,
      name: String(data.name ?? "کاربر"),
      email,
      avatar: null,
      avatarUrl: null,
      bookmarkedPosts: [],
      likedPosts: [],
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(db.currentUser);

    return ok(
      { user: clone(db.currentUser), message: "ثبت‌نام با موفقیت انجام شد" },
      201,
    );
  }),

  http.post("*/user/signin", async ({ request }) => {
    const data = await requestData(request);

    const user = db.users.find(
      (item) =>
        item.email.toLowerCase() === String(data.email ?? "").toLowerCase(),
    );

    if (!user || !data.password)
      return error("ایمیل یا رمز عبور اشتباه است", 401);

    db.currentUser = user;

    return ok({ user: clone(user), message: "با موفقیت وارد شدید" });
  }),

  http.post("*/user/logout", () =>
    ok({ auth: false, message: "با موفقیت خارج شدید" }),
  ),

  http.get("*/user/refresh-token", () => ok(empty("توکن تازه شد"))),

  http.get("*/user/profile", () => ok({ user: clone(db.currentUser) })),

  http.get("*/user/list", ({ request }) =>
    ok(paginate(db.users, new URL(request.url))),
  ),

  http.get("*/user/user-posts", ({ request }) => {
    const url = new URL(request.url);

    return ok(
      paginate(
        filterPosts(
          db.posts.filter((post) => post.author._id === db.currentUser._id),
          url,
        ),
        url,
      ),
    );
  }),

  http.get("*/user/user-comments", ({ request }) => {
    const url = new URL(request.url);

    return ok(
      paginate(
        db.comments.filter(
          (comment) => comment.user._id === db.currentUser._id,
        ),
        url,
      ),
    );
  }),

  http.patch("*/user/update", async ({ request }) => {
    const data = await requestData(request);

    const email = String(data.email ?? db.currentUser.email).toLowerCase();

    if (
      db.users.some(
        (user) =>
          user._id !== db.currentUser._id && user.email.toLowerCase() === email,
      )
    )
      return error("این ایمیل قبلا ثبت شده است", 409);

    db.currentUser.name = String(data.name ?? db.currentUser.name);
    db.currentUser.email = email;
    db.currentUser.updatedAt = new Date().toISOString();

    return ok(empty("اطلاعات حساب به‌روزرسانی شد"));
  }),

  http.post("*/user/upload-avatar", async ({ request }) => {
    const data = await formData(request);
    const image = data.get("avatar") ?? data.get("file");

    if (!(image instanceof File))
      return error("فایل تصویر ارسال نشده است", 400);

    db.currentUser.avatar = image.name;
    db.currentUser.avatarUrl =
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256";
    db.currentUser.updatedAt = new Date().toISOString();

    return ok(empty("تصویر پروفایل به‌روزرسانی شد"));
  }),
];
