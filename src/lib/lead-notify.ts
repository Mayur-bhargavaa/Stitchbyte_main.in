import nodemailer from "nodemailer";
import { getIntegrationSettings } from "@/lib/integration-settings";

export interface LeadForNotify {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  brand?: string | null;
  message?: string | null;
  productName?: string | null;
  budget?: string | null;
  timeline?: string | null;
  businessType?: string | null;
  website?: string | null;
  location?: string | null;
  isDecisionMaker?: boolean | null;
  utmSource?: string | null;
  utmCampaign?: string | null;
  landingPage?: string | null;
  priority: "high" | "normal";
  score?: number;
  grade?: string;
}

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

let transporter: nodemailer.Transporter | null = null;
let transporterKey = "";

/** Mail transport and addresses from the admin-managed settings (falls back to .env). */
async function getMail(): Promise<{ t: nodemailer.Transporter; from: string; to: string } | null> {
  const c = await getIntegrationSettings();
  if (!c.smtpHost || !c.smtpUser || !c.smtpPass) return null;
  const key = JSON.stringify([c.smtpHost, c.smtpPort, c.smtpUser, c.smtpPass]);
  if (!transporter || transporterKey !== key) {
    transporter = nodemailer.createTransport({
      host: c.smtpHost,
      port: c.smtpPort,
      secure: c.smtpPort === 465,
      auth: { user: c.smtpUser, pass: c.smtpPass },
    });
    transporterKey = key;
  }
  return { t: transporter, from: c.smtpFrom || `Stitchbyte <${c.smtpUser}>`, to: c.leadNotifyTo };
}

/** Sends a test message with the live settings. Returns an error message or null on success. */
export async function sendTestEmail(to: string): Promise<string | null> {
  const m = await getMail();
  if (!m) return "SMTP host, user or password is not set.";
  try {
    await m.t.sendMail({
      from: m.from,
      to,
      subject: "Stitchbyte test email",
      html: "<p>This is a test email from the Stitchbyte admin panel. Your mail settings work.</p>",
    });
    return null;
  } catch (err) {
    return err instanceof Error ? err.message : "Sending failed.";
  }
}

/** Digits only, with India country code defaulted for 10-digit numbers. */
export function toWaNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

/**
 * Sends the internal sales alert and the lead confirmation.
 * Never throws: a mail failure must not lose the lead (already saved).
 * Returns what was sent so the caller can record it.
 */
export async function notifyNewLead(
  lead: LeadForNotify
): Promise<{ internal: boolean; confirmation: boolean }> {
  const result = { internal: false, confirmation: false };
  const mail = await getMail();
  if (!mail) {
    console.error("[lead-notify] SMTP settings not set; no email sent for lead", lead.id);
    return result;
  }
  const { t, from, to } = mail;
  const waLink = `https://wa.me/${toWaNumber(lead.phone)}?text=${encodeURIComponent(
    `Hi ${lead.name}, this is Stitchbyte. Thanks for your enquiry - when is a good time to talk?`
  )}`;

  const rows: Array<[string, unknown]> = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Brand / business", lead.brand],
    ["Interested in", lead.productName],
    ["Business type", lead.businessType],
    ["Website", lead.website],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Location", lead.location],
    ["Decision maker", lead.isDecisionMaker == null ? null : lead.isDecisionMaker ? "Yes" : "No"],
    ["Message", lead.message],
    ["Lead score", lead.score != null ? `${lead.score}/100 (${lead.grade})` : null],
    ["Source", [lead.utmSource, lead.utmCampaign].filter(Boolean).join(" / ")],
    ["Landing page", lead.landingPage],
  ];
  const table = rows
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`
    )
    .join("");

  const internalHtml = `
    <div style="font-family:Arial,sans-serif;font-size:14px">
      <p>${lead.priority === "high" ? "🔥 <b>High-priority lead</b> – respond within 5 minutes." : "New lead – respond within 5 minutes."}</p>
      <table>${table}</table>
      <p><a href="${esc(waLink)}">Reply on WhatsApp</a> &nbsp;|&nbsp; <a href="tel:${esc(lead.phone)}">Call</a></p>
      <p style="color:#999;font-size:12px">Lead ID: ${esc(lead.id)}</p>
    </div>`;

  try {
    await t.sendMail({
      from,
      to,
      replyTo: lead.email || undefined,
      subject: `${lead.priority === "high" ? "[HIGH] " : ""}New lead: ${lead.name}${lead.brand ? ` (${lead.brand})` : ""}`,
      html: internalHtml,
    });
    result.internal = true;
  } catch (err) {
    console.error("[lead-notify] internal email failed", lead.id, err);
  }

  if (lead.email) {
    try {
      await t.sendMail({
        from,
        to: lead.email,
        replyTo: to,
        subject: "We received your enquiry – Stitchbyte",
        html: `
          <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5">
            <p>Hi ${esc(lead.name)},</p>
            <p>Thanks for reaching out to Stitchbyte. We have your details and a member of our team will contact you shortly.</p>
            <p>For a faster reply, message us on WhatsApp:
              <a href="https://wa.me/919461330819">+91 94613 30819</a></p>
            <p>– Team Stitchbyte</p>
          </div>`,
      });
      result.confirmation = true;
    } catch (err) {
      console.error("[lead-notify] confirmation email failed", lead.id, err);
    }
  }

  return result;
}

/** Internal reminder: a lead has had no status change since it arrived. Never throws. */
export async function sendNoResponseReminder(leads: Array<{ id: string; name: string; phone: string; productName?: string | null; minutes: number; grade?: string | null }>): Promise<boolean> {
  const mail = await getMail();
  if (!mail || leads.length === 0) return false;
  const { t, from, to } = mail;
  const rows = leads
    .map(
      (l) =>
        `<li><b>${esc(l.name)}</b> (${esc(l.phone)})${l.productName ? ` – ${esc(l.productName)}` : ""}${l.grade ? ` [${esc(l.grade)}]` : ""} – waiting ${l.minutes} min – <a href="https://wa.me/${toWaNumber(l.phone)}">WhatsApp</a></li>`
    )
    .join("");
  try {
    await t.sendMail({
      from,
      to,
      subject: `Reminder: ${leads.length} lead${leads.length > 1 ? "s" : ""} not contacted yet`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px"><p>These leads have had no response. Please contact them now and update the lead status.</p><ul>${rows}</ul></div>`,
    });
    return true;
  } catch (err) {
    console.error("[lead-notify] reminder email failed", err);
    return false;
  }
}

/**
 * Follow-up emails to the lead (step 1 = about a day after the enquiry, step 2 = about three days).
 * Short and plain on purpose: no claims, an easy way to reply or opt out. Never throws.
 */
export async function sendLeadFollowUp(
  lead: { name: string; email: string; productName?: string | null },
  step: 1 | 2
): Promise<boolean> {
  const mail = await getMail();
  if (!mail) return false;
  const { t, from, to: replyTo } = mail;
  const about = lead.productName && !/newsletter/i.test(lead.productName) ? lead.productName : "your enquiry";
  const wa = "https://wa.me/919461330819";

  const subject =
    step === 1 ? `Following up on ${about} – Stitchbyte` : `Still interested in ${about}? – Stitchbyte`;
  const body =
    step === 1
      ? `<p>Hi ${esc(lead.name)},</p>
         <p>You contacted Stitchbyte about <b>${esc(about)}</b>. We wanted to check whether you still need help and whether we can answer any questions.</p>
         <p>The quickest way to reach us is WhatsApp: <a href="${wa}">+91 94613 30819</a>. You can also reply to this email.</p>`
      : `<p>Hi ${esc(lead.name)},</p>
         <p>A quick last note about <b>${esc(about)}</b>. If it is still on your list, reply here or message us on <a href="${wa}">WhatsApp</a> and we will pick it up from there.</p>
         <p>If the timing is not right, no problem.</p>`;

  try {
    await t.sendMail({
      from,
      to: lead.email,
      replyTo,
      subject,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5">${body}
        <p>– Team Stitchbyte</p>
        <p style="color:#999;font-size:12px">Not interested? Reply "no thanks" and we will not email you again.</p></div>`,
    });
    return true;
  } catch (err) {
    console.error("[lead-notify] follow-up email failed", step, err);
    return false;
  }
}
