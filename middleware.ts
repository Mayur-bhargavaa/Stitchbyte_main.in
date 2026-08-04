import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as any;

  // Redirect old pSEO paths to new flat URLs
  if (pathname.startsWith("/services/")) {
    const slug = pathname.substring(10); // get everything after /services/
    if (slug.includes("-in-")) {
      const flatSlug = slug.replace("-in-", "-");
      let finalSlug = flatSlug;
      if (flatSlug.startsWith("digital-marketing-")) {
        finalSlug = flatSlug.replace("digital-marketing-", "digital-marketing-agency-");
      } else if (flatSlug.startsWith("website-development-")) {
        finalSlug = flatSlug.replace("website-development-", "website-development-company-");
      } else if (flatSlug.startsWith("ui-ux-design-") || flatSlug.startsWith("ui-ux-")) {
        finalSlug = flatSlug.replace(/ui-ux(-design)?-/, "ui-ux-design-company-");
      } else if (flatSlug.startsWith("shopify-development-")) {
        finalSlug = flatSlug.replace("shopify-development-", "shopify-development-company-");
      } else if (flatSlug.startsWith("wordpress-development-")) {
        finalSlug = flatSlug.replace("wordpress-development-", "wordpress-development-company-");
      } else if (flatSlug.startsWith("mobile-app-development-")) {
        finalSlug = flatSlug.replace("mobile-app-development-", "mobile-app-development-company-");
      } else if (flatSlug.startsWith("ecommerce-development-")) {
        finalSlug = flatSlug.replace("ecommerce-development-", "ecommerce-development-company-");
      }
      return NextResponse.redirect(new URL(`/${finalSlug}`, req.url), 301);
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Protect merchant API routes
  if (pathname.startsWith("/api/merchant")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!["ADMIN", "MERCHANT"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

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
  matcher: [
    "/restaurant/admin/:path*",
    "/restaurant/merchant/:path*",
    "/api/admin/:path*",
    "/api/merchant/:path*",
    "/services/:path*"
  ],
};
