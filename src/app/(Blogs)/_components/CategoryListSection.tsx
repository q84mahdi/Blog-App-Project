"use client";

import Button from "@/ui/Button";
import Image from "next/image";
import Link from "next/link";

const categoriesList = [
  {
    title: "تکنولوژی",
    slug: "technology",
    img: "/images/technolagy.png",
  },
  {
    title: "اقتصادی",
    slug: "ecconomic",
    img: "/images/economic.png",
  },
  {
    title: "تاریخی",
    slug: "historical",
    img: "/images/history.png",
  },
  {
    title: "ورزشی",
    slug: "sport",
    img: "/images/sport.png",
  },
];

function CategoryListSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-4 py-12">
      <h3 className="relative text-2xl font-extrabold text-secondary-900">
        دسته‌بندی‌ها
        <span className="absolute -bottom-2 left-1/2 h-[3px] w-12 -translate-x-1/2 rounded-full bg-primary-500"></span>
      </h3>

      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {categoriesList.map((category) => (
          <Link
            key={category.slug}
            href={`/blogs/category/${category.slug}`}
            className="flex items-center justify-center"
          >
            <div className="group relative flex h-[220px] w-[260px] flex-col items-center justify-center gap-8 rounded-xl border border-secondary-200 bg-secondary-0/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
              <div className="bg-gradient-radial absolute top-10 h-24 w-24 rounded-full from-primary-400/60 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="relative h-20 w-20 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={category.img}
                  alt={`${category.slug}-category`}
                  fill
                />
              </div>

              <span className="text-lg font-semibold text-secondary-800 transition-colors duration-300 group-hover:text-primary-600">
                {category.title}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/blogs">
        <Button className="px-6 py-3 font-bold transition-transform duration-300 hover:scale-105">
          همه دسته‌بندی‌ها
        </Button>
      </Link>
    </div>
  );
}
export default CategoryListSection;
