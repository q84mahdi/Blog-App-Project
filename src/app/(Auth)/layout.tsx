import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="my-20 flex items-center justify-center">
      <div className="mx-5 w-full max-w-md">{children}</div>
    </div>
  );
}
export default AuthLayout;
