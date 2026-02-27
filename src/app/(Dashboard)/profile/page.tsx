import { Suspense } from "react";
import PostTable from "./posts/_components/PostTable";
import Fallback from "@/ui/Fallback";
import CardsWrapper from "@/components/CardsWrapper";
import { fetchUserCardsData } from "@/services/dashboardData";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import CommentTable from "./comments/_components/CommentTable";

async function ProfilePage() {
  const { numberOfBookmarks, numberOfComments, numberOfPosts } =
    await fetchUserCardsData();

  const cards = [
    {
      title: "ذخیره شده‌ ها",
      value: numberOfBookmarks,
      icon: <BookmarkIcon className="h-5 w-5" />,
    },
    {
      title: "نظرات",
      value: numberOfComments,
      icon: <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />,
    },
    {
      title: "پست‌ها",
      value: numberOfPosts,
      icon: <DocumentIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-secondary-800">
        داشبورد پنل کاربر
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

      <div>
        <h2 className="mb-4 text-lg font-medium text-secondary-800">
          لیست آخرین نظرات
        </h2>

        <Suspense fallback={<Fallback />}>
          <CommentTable queries="limit=4" />
        </Suspense>
      </div>
    </div>
  );
}
export default ProfilePage;
