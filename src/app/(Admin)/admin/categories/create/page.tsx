import Breadcrumbs from "@/ui/Breadcrumbs";
import CreateCategoryForm from "../_components/CreateCategoryForm";

function CreateCategoryPage() {
  return (
    <div className="mb-12">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "دسته‌بندی ها",
            href: "/admin/categories",
          },
          {
            label: "ایجاد دسته‌بندی",
            href: "/admin/categories/create",
            active: true,
          },
        ]}
      />

      <h1 className="mb-4 text-xl font-bold text-secondary-800">
        ایجاد دسته‌بندی جدید
      </h1>

      <CreateCategoryForm />
    </div>
  );
}
export default CreateCategoryPage;
