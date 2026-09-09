import { afterEach, describe, expect, test, vi } from "vitest";
import { imageUrlToFile } from "./fileFormatter";

describe("imageUrlToFile", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("successful requests", () => {
    test("converts an image response to a File", async () => {
      const imgUrl = "https://example.com/images/photo.jpg";
      const imageContent = "fake image content";

      const response = new Response(imageContent, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      const file = await imageUrlToFile(imgUrl);

      expect(file).toBeInstanceOf(File);
      expect(file.name).toBe("photo.jpg");
      expect(file.type).toBe("image/jpeg");
      expect(await file.text()).toBe(imageContent);
    });

    test.for([
      ["image/jpeg", "photo.jpg"],
      ["image/png", "photo.png"],
      ["image/webp", "photo.webp"],
      ["image/gif", "photo.gif"],
      ["image/svg+xml", "photo.svg"],
      ["image/avif", "photo.avif"],
    ])(
      "accepts valid image MIME type: %s",
      async ([mimeType, expectedFilename]) => {
        const imgUrl = `https://example.com/images/${expectedFilename}`;

        vi.spyOn(global, "fetch").mockResolvedValue(
          new Response("image", {
            status: 200,
            headers: {
              "Content-Type": mimeType,
            },
          }),
        );

        const file = await imageUrlToFile(imgUrl);

        expect(file).toBeInstanceOf(File);
        expect(file.name).toBe(expectedFilename);
        expect(file.type).toBe(mimeType);
      },
    );

    test("uses the filename from the URL", async () => {
      const imgUrl = "https://example.com/uploads/profile.webp";

      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response("image", {
          status: 200,
          headers: {
            "Content-Type": "image/webp",
          },
        }),
      );

      const file = await imageUrlToFile(imgUrl);

      expect(file.name).toBe("profile.webp");
    });

    test("ignores query parameters when generating the filename", async () => {
      const imgUrl =
        "https://example.com/images/photo.jpg?width=500&quality=80";

      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response("image", {
          status: 200,
          headers: {
            "Content-Type": "image/jpeg",
          },
        }),
      );

      const file = await imageUrlToFile(imgUrl);

      expect(file.name).toBe("photo.jpg");
    });

    test("ignores URL hash when generating the filename", async () => {
      const imgUrl = "https://example.com/images/photo.png#preview";

      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response("image", {
          status: 200,
          headers: {
            "Content-Type": "image/png",
          },
        }),
      );

      const file = await imageUrlToFile(imgUrl);

      expect(file.name).toBe("photo.png");
    });

    test("uses default filename when URL ends with a slash", async () => {
      const imgUrl = "https://example.com/images/";

      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response("image", {
          status: 200,
          headers: {
            "Content-Type": "image/jpeg",
          },
        }),
      );

      const file = await imageUrlToFile(imgUrl);

      expect(file.name).toBe("default-filename");
    });

    test("preserves the blob MIME type", async () => {
      const imgUrl = "https://example.com/image.svg";

      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response("<svg></svg>", {
          status: 200,
          headers: {
            "Content-Type": "image/svg+xml",
          },
        }),
      );

      const file = await imageUrlToFile(imgUrl);

      expect(file.type).toBe("image/svg+xml");
    });

    test("preserves the image content", async () => {
      const imgUrl = "https://example.com/image.png";
      const content = "image content";

      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(content, {
          status: 200,
          headers: {
            "Content-Type": "image/png",
          },
        }),
      );

      const file = await imageUrlToFile(imgUrl);

      expect(await file.text()).toBe(content);
    });
  });

  describe("image validation", () => {
    test.for([
      "application/pdf",
      "application/json",
      "text/plain",
      "application/octet-stream",
    ])(
      "throws TypeError when response is not an image: %s",
      async (mimeType) => {
        vi.spyOn(global, "fetch").mockResolvedValue(
          new Response("not an image", {
            status: 200,
            headers: {
              "Content-Type": mimeType,
            },
          }),
        );

        await expect(
          imageUrlToFile("https://example.com/file"),
        ).rejects.toThrow(
          `Expected an image response, but received "${mimeType}"`,
        );
      },
    );

    test("throws TypeError when blob has no MIME type", async () => {
      const response = new Response(null, { status: 200 });

      vi.spyOn(response, "blob").mockResolvedValue(
        new Blob(["image"], { type: "" }),
      );

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      await expect(imageUrlToFile("https://example.com/image")).rejects.toThrow(
        'Expected an image response, but received "unknown"',
      );
    });
  });

  describe("fetch behavior", () => {
    test("calls fetch with the provided URL", async () => {
      const imgUrl = "https://example.com/image.jpg";

      const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response("image", {
          status: 200,
          headers: {
            "Content-Type": "image/jpeg",
          },
        }),
      );

      await imageUrlToFile(imgUrl);

      expect(fetchMock).toHaveBeenCalledOnce();
      expect(fetchMock).toHaveBeenCalledWith(imgUrl);
    });

    test.for([400, 401, 403, 404, 500, 502, 503])(
      "throws an error when response status is %i",
      async (status) => {
        vi.spyOn(global, "fetch").mockResolvedValue(
          new Response(null, {
            status,
            statusText: "Request failed",
          }),
        );

        await expect(
          imageUrlToFile("https://example.com/image.jpg"),
        ).rejects.toThrow(`Failed to fetch image: ${status} Request failed`);
      },
    );

    test("propagates fetch errors", async () => {
      const error = new Error("Network error");

      vi.spyOn(global, "fetch").mockRejectedValue(error);

      await expect(
        imageUrlToFile("https://example.com/image.jpg"),
      ).rejects.toThrow("Network error");
    });
  });
});
