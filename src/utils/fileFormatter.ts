const getFilename = (url: string): string => {
  return url.split("/").pop() || "default-filename";
};

export const imageUrlToFile = async (imgUrl: string): Promise<File> => {
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], getFilename(imgUrl), {
    type: blob.type,
  });

  return file;
};
