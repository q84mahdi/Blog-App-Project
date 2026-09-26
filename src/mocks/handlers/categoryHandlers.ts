import { http } from "msw";
import type { Category } from "@/types/categoryTypes";
import { db, ok, error, empty, paginate, requestData } from "../mockData";

export const categoryHandlers = [
  http.get("*/category/list", ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search")?.toLocaleLowerCase();

    const filtered = search
      ? db.categories.filter((item) =>
          `${item.title} ${item.englishTitle} ${item.description}`
            .toLocaleLowerCase()
            .includes(search),
        )
      : db.categories;

    return ok(paginate(filtered, url));
  }),

  http.post("*/category/add", async ({ request }) => {
    const data = await requestData(request);

    const title = String(data.title ?? "").trim();
    const englishTitle = String(data.englishTitle ?? "").trim();

    if (!title || !englishTitle)
      return error("عنوان دسته‌بندی الزامی است", 400);

    if (
      db.categories.some(
        (item) =>
          item.englishTitle.toLowerCase() === englishTitle.toLowerCase(),
      )
    )
      return error("این دسته‌بندی قبلا ثبت شده است", 409);

    const now = new Date().toISOString();
    const item: Category = {
      _id: `category-${crypto.randomUUID()}`,
      title,
      englishTitle,
      description: String(data.description ?? ""),
      slug: englishTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      createdAt: now,
      updatedAt: now,
    };

    db.categories = [item, ...db.categories];

    return ok(empty("دسته‌بندی ایجاد شد"), 201);
  }),

  http.patch("*/category/update/:categoryId", async ({ request, params }) => {
    const item = db.categories.find((value) => value._id === params.categoryId);

    if (!item) return error("دسته‌بندی پیدا نشد", 404);

    const data = await requestData(request);

    Object.assign(item, {
      title: String(data.title ?? item.title),
      englishTitle: String(data.englishTitle ?? item.englishTitle),
      description: String(data.description ?? item.description),
      slug: String(data.englishTitle ?? item.englishTitle)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      updatedAt: new Date().toISOString(),
    });

    return ok(empty("دسته‌بندی ویرایش شد"));
  }),

  http.delete("*/category/remove/:categoryId", ({ params }) => {
    const before = db.categories.length;

    db.categories = db.categories.filter(
      (item) => item._id !== params.categoryId,
    );

    if (before === db.categories.length)
      return error("دسته‌بندی پیدا نشد", 404);

    return ok(empty("دسته‌بندی حذف شد"));
  }),
];
