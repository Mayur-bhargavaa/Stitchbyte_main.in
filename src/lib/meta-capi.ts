import { createHash } from "crypto";
import { getIntegrationSettings } from "@/lib/integration-settings";

/**
 * Meta's click id cookie value (_fbc) is "fb.1.<click time in ms>.<fbclid>".
 * Used when the visitor arrived from an ad but the _fbc cookie is not available.
 */
export function buildFbc(fbclid?: string | null, clickedAtMs?: number | null): string | null {
  const id = (fbclid || "").trim();
  if (!id || id.length > 200) return null;
  const at = clickedAtMs && Number.isFinite(clickedAtMs) ? Math.floor(clickedAtMs) : Date.now();
  return `fb.1.${at}.${id}`;
}

const sha256 = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

interface CapiInput {
  eventName: "Lead" | "Contact" | "Schedule" | "QualifiedLead" | "Purchase";
  eventId: string;
  sourceUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  /** "website" for browser-originated events; "system_generated" for CRM stage changes. */
  actionSource?: "website" | "system_generated";
  customData?: Record<string, unknown>;
}

/**
 * Server-side Meta Conversions API. No-op unless both the pixel ID and the access token are set
 * (admin Integrations page, or the NEXT_PUBLIC_FB_PIXEL_ID / META_CAPI_ACCESS_TOKEN env fallback).
 * The caller must only invoke this when the visitor consented to marketing cookies.
 * Never throws.
 */
export async function sendCapiEvent(input: CapiInput): Promise<void> {
  const cfg = await getIntegrationSettings();
  const pixelId = cfg.metaPixelId;
  const token = cfg.metaCapiToken;
  if (!pixelId || !token) return;

  const digits = input.phone?.replace(/\D/g, "") || "";
  const phone = digits.length === 10 ? `91${digits}` : digits;
  const [first, ...rest] = (input.name || "").trim().split(/\s+/);

  const userData: Record<string, unknown> = {};
  if (input.email) userData.em = [sha256(input.email)];
  if (phone.length >= 8) userData.ph = [sha256(phone)];
  if (first) userData.fn = [sha256(first)];
  if (rest.length) userData.ln = [sha256(rest.join(" "))];
  if (input.ip) userData.client_ip_address = input.ip;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: input.actionSource || "website",
        // Meta requires event_source_url for website events; the referer header can be missing,
        // so fall back to the site root rather than send an event Meta would reject.
        event_source_url: input.sourceUrl || ((input.actionSource || "website") === "website" ? "https://stitchbyte.in/" : undefined),
        user_data: userData,
        custom_data: input.customData,
      },
    ],
  };
  if (cfg.metaCapiTestCode) body.test_event_code = cfg.metaCapiTestCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    if (!res.ok) console.error("[meta-capi] non-OK response", res.status, await res.text());
  } catch (err) {
    console.error("[meta-capi] request failed", err);
  }
}
