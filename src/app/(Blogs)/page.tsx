import HeadingSection from "./_components/HeadingSection";
import CategoryListSection from "./_components/CategoryListSection";
import BlogsListSection from "./_components/BlogsListSection";

export const metadata = {
  title: "خانه - اپلیکیشن مدیریت بلاگ ها",
};

export default function Home() {
  return (
    <div>
      {/* Heading Section */}
      <HeadingSection />

      {/* Categories Section */}
      <CategoryListSection />

      {/* Popular Blogs Section */}
      <BlogsListSection
        link="/blogs?order=popular"
        queryParams="limit=4&order=popular"
        text="بلاگ‌های پرطرفدار"
      />

      {/* Latest Blogs Section */}
      <BlogsListSection
        link="/blogs?order=desc"
        queryParams="limit=4&order=desc"
        text="جدیدترین بلاگ‌ها"
      />
    </div>
  );
}
