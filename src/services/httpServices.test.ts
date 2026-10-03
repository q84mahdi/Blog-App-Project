import { http as mswHttp, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";

import { server } from "@/mocks/server";
import http from "./httpServices";

describe("http service", () => {
  test("refreshes an expired session and retries the original request once", async () => {
    let requestCount = 0;
    let refreshCount = 0;

    server.use(
      mswHttp.get("*/user/refresh-token", () => {
        refreshCount += 1;
        return HttpResponse.json({
          statusCode: 200,
          data: { message: "Token refreshed" },
        });
      }),
      mswHttp.get("*/test/retry", () => {
        requestCount += 1;

        if (requestCount === 1)
          return HttpResponse.json(
            { statusCode: 401, message: "Expired session" },
            { status: 401 },
          );

        return HttpResponse.json({ statusCode: 200, data: { value: "ready" } });
      }),
    );

    const response = await http.get<{ data: { value: string } }>("/test/retry");

    expect(response.data.data.value).toBe("ready");
    expect(requestCount).toBe(2);
    expect(refreshCount).toBe(1);
  });

  test("rejects with the API message when a request fails", async () => {
    const message = "Service temporarily unavailable";

    server.use(
      mswHttp.get("*/test/failure", () =>
        HttpResponse.json({ statusCode: 503, message }, { status: 503 }),
      ),
    );

    await expect(http.get("/test/failure")).rejects.toEqual(new Error(message));
  });

  test("uses a fallback message when the server does not provide one", async () => {
    server.use(
      mswHttp.get("*/test/failure-without-message", () =>
        HttpResponse.json({ statusCode: 500 }, { status: 500 }),
      ),
    );

    await expect(http.get("/test/failure-without-message")).rejects.toEqual(
      new Error("خطای ارتباط با سرور"),
    );
  });
});
