import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as any;

  // Protect admin routes
  if (pathname.startsWith("/restaurant/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/restaurant/signin", req.url));
    }
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/restaurant", req.url));
    }
  }

  // Protect merchant routes
  if (pathname.startsWith("/restaurant/merchant")) {
    if (!user) {
      return NextResponse.redirect(new URL("/restaurant/signin", req.url));
    }
    if (!["ADMIN", "MERCHANT"].includes(user.role)) {
      return NextResponse.redirect(new URL("/restaurant", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/restaurant/admin/:path*", "/restaurant/merchant/:path*"],
};
