# Stitchbyte: keys, settings and to-do checklist

Nothing below is deployed yet. All the work is on your laptop and not committed.

## 1. Keys and values you need

### Public site (`Stitchbyte_main.in`)

| Variable | What it is | Where to get it | Needed for |
|---|---|---|---|
| `NEXT_PUBLIC_FB_PIXEL_ID` | Real 15–16 digit Meta Pixel ID | Meta Events Manager > your pixel | Pixel and server events. Also add as a GitHub secret (read at build time). |
| `META_CAPI_ACCESS_TOKEN` | Conversions API token | Events Manager > Settings > Conversions API > Generate access token | Server-side Lead and stage events |
| `META_CAPI_TEST_CODE` | Test events code (optional) | Events Manager > Test events | Testing only. Remove after testing. |
| `SMTP_HOST`, `SMTP_PORT` (465), `SMTP_USER`, `SMTP_PASS` | Mailbox login | Your hosting mailbox, e.g. info@stitchbyte.in | New-lead alerts, confirmations, reminders, follow-ups |
| `SMTP_FROM` | Sender name and address | You choose | Same as above |
| `LEAD_NOTIFY_TO` | Who gets "new lead" alerts (comma-separate) | You choose | Internal alerts |
| `CRON_SECRET` | Long random string | Generate one, e.g. `openssl rand -hex 32` | Protects the reminder cron. **Must be identical in the admin `.env`.** |
| `REMINDER_AFTER_MINUTES` | Minutes before a "no response" reminder (default 5) | You choose | Reminders |
| `DATABASE_URL`, `BLOG_DATABASE_URL` | MongoDB connection strings | Already in use | Existing |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AUTH_TRUST_HOST`, `APP_URL`, `ADMIN_API_URL` | App URLs and secrets | Already in use | Existing |
| `CLOUDINARY_*`, `GEMINI_API_KEY`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Existing keys | Already in use | Existing |

### Admin panel (`Stitchbyte_Admin_pannel`)

| Variable | What it is | Notes |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | Same database as the public site |
| `AUTH_SECRET` | Random secret for login sessions | Generate one. Replaces the old SSO setup. |
| `AUTH_URL`, `NEXTAUTH_URL` | Public URL of the admin panel | Use the real admin URL in production, not localhost |
| `AUTH_TRUST_HOST` | `true` | Needed behind a proxy |
| `MAIN_SITE_URL` | `https://stitchbyte.in` | Where the admin sends lead stage changes |
| `CRON_SECRET` | Same value as the public site | Without it, stage events to Meta fail |
| `CLOUDINARY_*`, `EMAIL_USER`, `EMAIL_PASS`, `OPENAI_API_KEY`, `GEMINI_API_KEY` | Existing keys | Already in use |

### Integrations page (new)
After one deploy, Meta and email settings can be changed in the admin under **Integrations** with no redeploy. They override the `.env` values above, which stay as the fallback.
- Add `SETTINGS_ENCRYPTION_KEY` to **both** servers' `.env`, the same value. Generate it once: `openssl rand -hex 32`. Keep a copy somewhere safe: if it is lost, saved secrets cannot be read and must be typed again.
- `CRON_SECRET`, the database strings and the auth secrets still stay in `.env`.

## 2. Steps to do

### Before deploying
1. Unstage or delete the stray `Screenshot 2026-11-17 at 10.05.56 PM.png` in the main repo.
2. Review the changes and commit them to the branch.
3. In GitHub > Settings > Secrets, add `NEXT_PUBLIC_FB_PIXEL_ID`.

### On the VM
4. Add the new variables above to the public site `.env`.
5. Push to `main`. CI builds and deploys the public site.
6. Add the reminder cron on the VM (every 5 minutes):
   `*/5 * * * * curl -s -H "x-cron-secret: YOUR_SECRET" https://stitchbyte.in/api/leads/reminders`
7. Deploy the admin panel (method still to be decided, see section 3). Set its `.env`, then `npm ci`, build and start it under pm2.
8. Create the first admin login from the admin folder:
   `node scripts/create-admin.js you@stitchbyte.in "Your Name"` (password minimum 10 characters).

### After deploying
9. Submit a test enquiry. Check that the alert email, the customer confirmation and the lead in the admin all appear.
10. In Meta Events Manager > Test events, confirm the Pixel and server Lead events arrive and are deduplicated. Check the click ID on a lead from an ad link.
11. Move a lead to Qualified in the admin and confirm the stage event reaches Meta.
12. Remove `META_CAPI_TEST_CODE` once testing is done.

## 3. Decisions I still need from you

- How is the admin panel deployed today (manual `git pull` on the VM, or another way)?
- Screenshots of the restyled admin (login, dashboard, /enquiries, /products/new) so I can fix visual problems. I only type-checked the redesign and have not seen it render.
- Strategy Call booking link.
- Business Launch System (₹39,999): what is included, and is the 7-day delivery feasible?
- How audits are delivered (PDF, call, or something else).

## 4. Not started (needs your go-ahead)

- AI sales assistant.
- WhatsApp Business API automation (needs a provider, such as the official Cloud API).
- UAE and USA pages.
- Industry and service landing pages.
- Meta retargeting and creative tests, Google Ads, LinkedIn content.

## 5. Things to know

- Leads that decline cookies are not matched to ad clicks, and leads saved before the click-ID change have no click ID.
- I tested the Tailwind login fix in isolation only, not on your running admin server. Tell me if the login page does not load.
- I have made no result claims. Conversion numbers come from your Meta and admin data after launch.
