"use client";

import { usePathname } from "next/navigation";
import Chatbot from "@/components/Chatbot";

export default function ChatbotVisibility() {
    const pathname = usePathname();

    if (pathname?.startsWith("/restaurant")) {
        return null;
    }

    return <Chatbot />;
}
