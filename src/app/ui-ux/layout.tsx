import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "UI & UX Design Services | StitchByte",
  description:
    "Design user-first digital experiences with StitchByte UI & UX services, from research and flows to modern interface systems.",
  keywords: ["UI design", "UX design", "user experience", "interface design", "product design"],
};

export default function UiUxLayout({ children }: { children: ReactNode }) {
  return children;
}
