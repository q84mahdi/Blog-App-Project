import { NextRequest, NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    const user = await middlewareAuth(req);

    if (user) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);

    if (!user) {
      return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
