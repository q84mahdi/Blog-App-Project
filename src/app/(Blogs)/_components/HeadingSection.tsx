"use client";

import { useAuth } from "@/contexts/AuthContext";
import Button from "@/ui/Button";
import Image from "next/image";
import Link from "next/link";

function HeadingSection() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-between gap-10 px-4 py-12 lg:flex-row lg:gap-16 lg:px-12">
      <div className="bg-gradient-radial absolute inset-0 -z-10 from-primary-500/30 via-transparent to-transparent"></div>

      <div className="max-w-xl text-center lg:text-right">
        <h1 className="mb-4 text-xl font-extrabold leading-10 text-secondary-900 md:text-2xl xl:text-4xl">
          به سایت{" "}
          <strong className="relative text-primary-900 dark:text-primary-400">
            بلاگ نست
            <span className="absolute bottom-0 left-0 h-[3px] w-full bg-primary-500/70"></span>
          </strong>{" "}
          خوش آمدید! 🚀
        </h1>

        <h2 className="mb-6 font-medium text-secondary-700 xl:text-xl">
          ایده‌هات رو به دنیا نشون بده،
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            {" "}
            همین امروز بلاگ خودتو بساز!
          </span>{" "}
          ✍️
        </h2>

        <Link href={isAuthenticated ? "/profile" : "/signin"}>
          <Button
            variant="primary"
            className="px-6 py-3 text-lg font-bold transition-transform duration-300 hover:scale-105"
          >
            از اینجا شروع کن
          </Button>
        </Link>
      </div>

      <div className="relative h-[300px] w-[350px] md:h-[350px] md:w-[400px] xl:h-[400px] xl:w-[450px]">
        <div className="bg-gradient-radial absolute inset-0 rounded-full from-primary-500/30 to-transparent blur-3xl"></div>

        <Image
          className="relative z-10 transition-transform duration-500 hover:scale-105 dark:invert"
          src="/images/heading.png"
          fill
          priority
          alt="heading-image"
        />
      </div>
    </div>
  );
}
export default HeadingSection;
