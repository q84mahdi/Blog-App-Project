import { Suspense } from "react";
import Fallback from "@/ui/Fallback";
import CardsWrapper from "@/components/CardsWrapper";
import { fetchAdminCardsData } from "@/services/dashboardData";
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import PostTable from "./posts/_components/PostTable";
import CommentTable from "./comments/_components/CommentTable";
import CategoryTable from "./categories/_components/CategoryTable";

async function AdminPanelPage() {
  const { numberOfUsers, numberOfComments, numberOfPosts } =
    await fetchAdminCardsData();

  const cards = [
    {
      title: "کاربران",
      value: numberOfUsers,
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      title: "نظرات",
      value: numberOfComments,
      icon: <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />,
    },
    {
      title: "پست ها",
      value: numberOfPosts,
      icon: <DocumentIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-secondary-800">
        داشبورد پنل ادمین
      </h1>

      <Suspense fallback={<Fallback />}>
        <CardsWrapper cards={cards} />
      </Suspense>

      <div className="mb-12">
        <h2 className="mb-4 text-lg font-medium text-secondary-800">
          لیست آخرین پست ها
        </h2>

        <Suspense fallback={<Fallback />}>
          <PostTable queries="limit=4" />
        </Suspense>
      </div>

      <div className="mb-12">
        <h2 className="mb-4 text-lg font-medium text-secondary-800">
          لیست آخرین نظرات
        </h2>

        <Suspense fallback={<Fallback />}>
          <CommentTable queries="limit=4" />
        </Suspense>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium text-secondary-800">
          لیست آخرین دسته‌بندی ها
        </h2>

        <Suspense fallback={<Fallback />}>
          <CategoryTable queries="limit=4" />
        </Suspense>
      </div>
    </div>
  );
}
export default AdminPanelPage;
