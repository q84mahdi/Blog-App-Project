export default function truncateText(str: string, length: number): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError("Length must be a non-negative integer");
  }

  if (str.length <= length) return str;

  return str.slice(0, length) + "...";
}
