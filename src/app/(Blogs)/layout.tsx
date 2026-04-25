import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

interface BlogsLayoutProps {
  children: ReactNode;
}

function BlogsLayout({ children }: BlogsLayoutProps) {
  return (
    <div>
      <Header />

      <div className="container xl:max-w-screen-xl">{children}</div>

      <Footer />
    </div>
  );
}
export default BlogsLayout;
