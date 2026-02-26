import {
  Cog6ToothIcon,
  CubeIcon,
  GlobeAltIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function Footer() {
  return (
    <div className="mt-10 w-full border-t border-secondary-300 bg-gradient-to-t from-secondary-300/50 via-secondary-200/50 to-secondary-100">
      {/* Footer Body Section */}
      <div className="container flex flex-col gap-y-10 px-6 py-12 lg:flex-row lg:justify-between xl:max-w-screen-xl">
        {/* Logo and About */}
        <div className="flex flex-col gap-4 lg:w-1/3">
          <Link href="/" className="group flex items-center gap-2">
            <HomeIcon className="h-6 w-6 text-primary-800 transition-colors duration-300 group-hover:text-primary-600" />

            <span className="text-lg font-bold text-secondary-900">
              بلاگ‌ نست
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-secondary-700">
            بلاگ‌ نست جاییه برای به اشتراک‌گذاری ایده‌ها و یادگیری از تجربه
            دیگران. اینجا بلاگ خودتو بساز و ایده‌هات رو به دنیا نشون بده! ✍️
          </p>
        </div>

        {/* Main Links */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-secondary-900">
            <CubeIcon className="h-5 w-5 text-primary-700" />
            صفحات اصلی
          </h3>

          <ul className="mr-6 space-y-2 text-sm text-secondary-900">
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-primary-900"
              >
                صفحه اصلی
              </Link>
            </li>

            <li>
              <Link
                href="/blogs"
                className="transition-all duration-200 hover:text-primary-900"
              >
                بلاگ‌ها
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-secondary-900">
            <Squares2X2Icon className="h-5 w-5 text-primary-700" />
            دسته‌بندی‌ها
          </h3>

          <ul className="mr-6 space-y-2 text-sm text-secondary-900">
            <li>
              <Link
                href="/blogs/category/technolagy"
                className="transition-all duration-200 hover:text-primary-900"
              >
                تکنولوژی
              </Link>
            </li>

            <li>
              <Link
                href="/blogs/category/economic"
                className="transition-all duration-200 hover:text-primary-900"
              >
                اقتصادی
              </Link>
            </li>

            <li>
              <Link
                href="/blogs/category/historical"
                className="transition-all duration-200 hover:text-primary-900"
              >
                تاریخی
              </Link>
            </li>

            <li>
              <Link
                href="/blogs/category/sport"
                className="transition-all duration-200 hover:text-primary-900"
              >
                ورزشی
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Panels */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-secondary-900">
            <Cog6ToothIcon className="h-5 w-5 text-primary-700" />
            پنل‌ها
          </h3>

          <ul className="mr-6 space-y-2 text-sm text-secondary-900">
            <li>
              <Link
                href="/profile"
                className="transition-all duration-200 hover:text-primary-900"
              >
                پنل کاربر
              </Link>
            </li>

            <li>
              <Link
                href="/admin"
                className="transition-all duration-200 hover:text-primary-900"
              >
                پنل ادمین
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-secondary-900">
            <GlobeAltIcon className="h-5 w-5 text-primary-700" />
            شبکه‌های اجتماعی
          </h3>

          <ul className="mr-6 space-y-2 text-sm text-secondary-900">
            <li>
              <Link
                href="https://www.linkedin.com/in/q84mahdi"
                target="_blank"
                className="transition-all duration-200 hover:text-primary-900"
              >
                لینکدین
              </Link>
            </li>

            <li>
              <Link
                href="https://github.com/q84mahdi"
                target="_blank"
                className="transition-all duration-200 hover:text-primary-900"
              >
                گیت‌هاب
              </Link>
            </li>

            <li>
              <Link
                href="https://instagram.com/q84mahdi"
                target="_blank"
                className="transition-all duration-200 hover:text-primary-900"
              >
                اینستاگرام
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-secondary-300">
        <div className="container flex flex-col items-center justify-between gap-4 px-6 py-6 text-center text-sm text-secondary-700 md:flex-row xl:max-w-screen-xl">
          <p>© {new Date().getFullYear()} بلاگ‌ نست - تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
