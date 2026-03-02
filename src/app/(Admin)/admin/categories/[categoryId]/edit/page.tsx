import Breadcrumbs from "@/ui/Breadcrumbs";
import { notFound } from "next/navigation";
import { getAllCategoriesApi } from "@/services/categoryServices";
import CreateCategoryForm from "../../_components/CreateCategoryForm";
import { cookies } from "next/headers";
import setCookiesOnReq from "@/utils/setCookiesOnReq";
import { AxiosRequestConfig } from "axios";

interface EditCategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { categoryId } = await params;

  const cookiesStore = await cookies();
  const options = setCookiesOnReq(cookiesStore) as AxiosRequestConfig;
  const { data: categories } = await getAllCategoriesApi("", options);

  const category = categories.find((category) => category._id === categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="mb-12">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "دسته‌بندی ها",
            href: "/admin/categories",
          },
          {
            label: "ویرایش دسته‌بندی",
            href: `/admin/categories/${categoryId}/edit`,
            active: true,
          },
        ]}
      />

      <h1 className="mb-4 text-xl font-bold text-secondary-800">
        ویرایش دسته‌بندی
      </h1>

      <CreateCategoryForm categoryToEdit={category} />
    </div>
  );
}
export default EditCategoryPage;
