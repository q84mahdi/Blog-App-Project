export default function dateFormatter(date: string | number | Date): string {
  return new Date(date).toLocaleDateString("fa-IR");
}
