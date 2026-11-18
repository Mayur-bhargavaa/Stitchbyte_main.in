"use client";

import { useEffect } from "react";
import { newEventId, trackMeta } from "@/lib/meta-events";

/** Fires a Meta `Contact` event when a visitor clicks any WhatsApp, phone or mailto link. */
export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      if (!href) return;
      let channel: string | null = null;
      if (/^https:\/\/wa\.me\/\d/.test(href)) channel = "whatsapp";
      else if (href.startsWith("tel:")) channel = "phone";
      else if (href.startsWith("mailto:")) channel = "email";
      if (!channel) return;
      trackMeta("Contact", newEventId(), { channel, page: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
