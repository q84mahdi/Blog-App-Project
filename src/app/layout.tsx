import "@/styles/globals.css";
import vazirFont from "@/constants/localFont";
import AppProviders from "@/providers/AppProviders";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    template: "%s | بلاگ نست",
    default: "بلاگ نست",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning
        className={`${vazirFont.variable} font-sans`}
      >
        <AppProviders>
          <Toaster />

          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
