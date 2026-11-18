import { createDecipheriv } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";

/**
 * Integration settings the admin panel can change without a redeploy.
 * Stored in the `integration_settings` collection (doc _id "main").
 * Secrets are AES-256-GCM encrypted by the admin panel; the key (SETTINGS_ENCRYPTION_KEY)
 * lives only in the server .env, never in the database. A value missing in the database
 * falls back to the matching environment variable, so existing .env setups keep working.
 */
export interface IntegrationSettings {
  metaPixelId: string;
  metaCapiToken: string;
  metaCapiTestCode: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpFrom: string;
  leadNotifyTo: string;
  reminderAfterMinutes: number;
  remindersEnabled: boolean;
  followUpsEnabled: boolean;
  /** Public booking link for the "Book a Strategy Call" buttons. Empty = buttons go to /contact. */
  strategyCallUrl: string;
}

const CACHE_MS = 60_000;
let cache: { at: number; value: IntegrationSettings } | null = null;

function getKey(): Buffer | null {
  const raw = process.env.SETTINGS_ENCRYPTION_KEY?.trim();
  if (!raw) return null;
  const key = /^[0-9a-fA-F]{64}$/.test(raw) ? Buffer.from(raw, "hex") : Buffer.from(raw, "base64");
  return key.length === 32 ? key : null;
}

/** Format: v1:<iv b64>:<tag b64>:<ciphertext b64>. Returns "" if it cannot be decrypted. */
export function decryptSecret(payload: unknown): string {
  if (typeof payload !== "string" || !payload.startsWith("v1:")) return "";
  const key = getKey();
  if (!key) return "";
  try {
    const [, iv, tag, data] = payload.split(":");
    const d = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "base64"));
    d.setAuthTag(Buffer.from(tag, "base64"));
    return Buffer.concat([d.update(Buffer.from(data, "base64")), d.final()]).toString("utf8");
  } catch {
    console.error("[integration-settings] could not decrypt a stored secret (wrong SETTINGS_ENCRYPTION_KEY?)");
    return "";
  }
}

const pick = (db: unknown, env: string | undefined) => {
  const v = typeof db === "string" ? db.trim() : "";
  return v || (env || "").trim();
};

function num(db: unknown, env: string | undefined, fallback: number): number {
  const n = Number(db ?? env);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function flag(db: unknown, fallback = true): boolean {
  return typeof db === "boolean" ? db : fallback;
}

export async function getIntegrationSettings(opts: { fresh?: boolean } = {}): Promise<IntegrationSettings> {
  if (!opts.fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.value;

  let values: Record<string, unknown> = {};
  let secrets: Record<string, unknown> = {};
  try {
    const { db } = await connectToDatabase();
    const doc = await db.collection("integration_settings").findOne({ _id: "main" as never });
    values = (doc?.values as Record<string, unknown>) || {};
    secrets = (doc?.secrets as Record<string, unknown>) || {};
  } catch (err) {
    console.error("[integration-settings] could not read settings, using environment values", err);
  }

  const e = process.env;
  const value: IntegrationSettings = {
    metaPixelId: pick(values.metaPixelId, e.NEXT_PUBLIC_FB_PIXEL_ID),
    metaCapiToken: decryptSecret(secrets.metaCapiToken) || (e.META_CAPI_ACCESS_TOKEN || "").trim(),
    metaCapiTestCode: pick(values.metaCapiTestCode, e.META_CAPI_TEST_CODE),
    smtpHost: pick(values.smtpHost, e.SMTP_HOST),
    smtpPort: num(values.smtpPort, e.SMTP_PORT, 465),
    smtpUser: pick(values.smtpUser, e.SMTP_USER),
    smtpPass: decryptSecret(secrets.smtpPass) || e.SMTP_PASS || "",
    smtpFrom: pick(values.smtpFrom, e.SMTP_FROM),
    leadNotifyTo: pick(values.leadNotifyTo, e.LEAD_NOTIFY_TO) || "info@stitchbyte.in",
    reminderAfterMinutes: num(values.reminderAfterMinutes, e.REMINDER_AFTER_MINUTES, 5),
    remindersEnabled: flag(values.remindersEnabled),
    followUpsEnabled: flag(values.followUpsEnabled),
    strategyCallUrl: pick(values.strategyCallUrl, undefined),
  };
  cache = { at: Date.now(), value };
  return value;
}
