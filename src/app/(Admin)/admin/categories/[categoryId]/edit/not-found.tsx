import Button from "@/ui/Button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-screen">
      <div className="container xl:max-w-screen-xl">
        <div className="flex flex-col items-center justify-center pt-10">
          <h1 className="mb-8 text-xl font-bold text-secondary-800">
            دسته‌بندی ای با این مشخصات یافت نشد.
          </h1>

          <Button variant="outline">
            <Link href="/admin/categories">بازگشت به صفحه دسته‌بندی ها</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
