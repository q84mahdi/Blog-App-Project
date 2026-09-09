const getFilename = (url: string): string => {
  const pathname = new URL(url).pathname;
  const filename = pathname.split("/").pop();

  return filename || "default-filename";
};

export const imageUrlToFile = async (imgUrl: string): Promise<File> => {
  const response = await fetch(imgUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`,
    );
  }

  const blob = await response.blob();

  if (!blob.type.startsWith("image/")) {
    throw new TypeError(
      `Expected an image response, but received "${blob.type || "unknown"}"`,
    );
  }

  return new File([blob], getFilename(imgUrl), {
    type: blob.type,
  });
};
