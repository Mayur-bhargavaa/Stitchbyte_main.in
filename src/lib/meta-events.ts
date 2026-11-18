"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Unique id shared by the browser Pixel event and the server CAPI event for deduplication. */
export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export function hasMarketingConsent(): boolean {
  try {
    return localStorage.getItem("stitchbyte_cookie_consent") === "accepted";
  } catch {
    return false;
  }
}

/** Fires a standard Meta Pixel event (consent is enforced by fbq('consent') in layout). */
export function trackMeta(event: "Lead" | "Contact" | "Schedule", eventId: string, params: Record<string, unknown> = {}) {
  try {
    window.fbq?.("track", event, params, { eventID: eventId });
  } catch {
    /* never break the page for analytics */
  }
}
