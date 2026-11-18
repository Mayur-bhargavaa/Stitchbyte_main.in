import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Sign In",
  description:
    "Sign in to your StitchByte QR Restaurant account to manage menus, orders and your restaurant dashboard.",
  alternates: {
    canonical: "https://stitchbyte.in/restaurant/signin",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RestaurantSignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
