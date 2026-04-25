import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "../_components/CreatePostForm";

function CreatePostPage() {
  return (
    <div className="mb-12">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ایجاد پست",
            href: "/profile/posts/create",
            active: true,
          },
        ]}
      />

      <h1 className="mb-4 text-xl font-bold text-secondary-800">
        ایجاد پست جدید
      </h1>

      <CreatePostForm />
    </div>
  );
}
export default CreatePostPage;
