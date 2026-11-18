# Stitchbyte growth and lead-generation strategy

Written 2026-11-18. Read this first: what it is based on, and what it is not.

**Based on:** the live website and the code I have worked on in this project, the six-competitor homepage snapshot in `competitor-analysis-2026-11.md`, and your answers during this project.

**Not based on (I have none of this data):** Google Analytics, Meta Ads Manager, Search Console, CRM history, revenue, close rates, or ad spend. So every number below marked *benchmark* or *target* is a planning assumption, not a result. Nothing here is a client result.

Labels used: **Fact** (seen or verified), **Assumption** (needs your confirmation), **Recommendation** (my judgment).

---

## 0. Decisions made on 2026-11-18

| Item | Decision | Status |
|---|---|---|
| Base city | **Alwar.** Local SEO, the Google Business Profile and keywords centre on Alwar. | Settled |
| Unverified results (3.2x and 3.5x ROAS, 45% more booking enquiries, 4.1x organic traffic, page-1 rankings, 2,800+ followers) | **Removed** from the four marketing case studies and from the site. A backup of the original case-study records is in `backups/marketing_case_studies-2026-11-18.json` (outside the repos). They can come back only with proof. | Done |
| "50+ projects" vs "hundreds of deployments" | **Removed.** No project-count claim is used. | Done (see note below) |
| ₹39,999 package in 7 days | **Achievable, per the owner.** What it includes is still to be written down. | Open: deliverables |
| Strategy Call link | **Set from the admin Integrations page.** The homepage button uses it, and goes to the contact page until one is saved. | Built, link to be added |

Remaining claims to review in the future: the automation pages still show capability figures such as "92% automated query resolution", "15x faster" and "98% open rate". They describe the software, not client results, but nobody has verified them. The testimonials on the four case studies also need client confirmation.

---

## 1. Executive diagnosis: why qualified leads are probably not coming

I cannot rank these by measured impact because there is no funnel data. This is my ranking by likely impact, from what I can see. Reason 1 and 2 are the ones I would bet on.

1. **No proven single offer.** The site sells a menu: websites, apps, SEO, ads, AI, automation. Visitors cannot tell what to buy first. *(Fact: the service list is broad. Impact is a judgment.)*
2. **Tracking was not reliable until recently.** The Pixel was not installed correctly and server events did not exist. Any past ad optimisation ran blind. *(Fact: fixed in code, live pixel now fires after consent. Lead and stage events still need a test.)*
3. **Most paid clicks likely landed on generic pages.** Dedicated audit and SEO pages exist now; they have not run ad traffic yet. *(Assumption about past campaigns.)*
4. **Proof is claimed but not verifiable on the page.** Case studies exist; the headline numbers are unverified (section 0). Competitors' proof is equally weak, so a *verifiable* case study is a real advantage.
5. **Speed to respond.** Before this project there were no instant alerts, 5-minute reminders or follow-up emails. Leads probably waited. *(Fact: now built, not yet deployed everywhere.)*
6. **No qualification before a human spends time.** The form captures budget, timeline and business type now. Lead scores exist. Nothing has been measured yet.
7. **Cookie banner reduces trackable traffic.** Declined visitors send no events. Real, and a deliberate privacy choice; it caps ad-optimisation data.
8. **Positioning is crowded.** Four of six competitors lead with AI. A generic "web agency" headline is not distinctive.
9. **WhatsApp is a link, not a funnel.** There is no automated first reply, qualification or booking flow yet.
10. **No follow-up system for lost or cold leads** beyond two emails. No reactivation.

## 2. Biggest bottleneck

**Offer plus measurement**, in that order.

- Without one clear offer, better traffic only sends more people to a menu.
- Without measurement, you cannot tell whether the offer is failing or the ads are.

So the first 30 days fix those two, then spend. I would not call traffic, design or pricing the bottleneck, because I have no data showing any of them is.

---

## 3. Priority matrix

| Priority | Problem | Impact | Effort | Action |
|---|---|---|---|---|
| P0 | Tracking not trustworthy | High | Low (mostly done) | Finish: save CAPI token on Integrations, confirm Lead and PageView dedupe in Test Events, add the GitHub pixel secret |
| P0 | No one-line first offer | High | Low | Adopt the primary offer in section 10 and put it on the homepage hero and audit page |
| P0 | Unverified claims | High (legal and trust) | Low | Done for the main ones (section 0). Re-add only with proof |
| P0 | Admin API routes lack login checks | High (data exposure) | Low | Add auth checks to older `/api` routes before the admin is public |
| P1 | Leads wait for a reply | High | Medium | Deploy reminders and follow-ups; add WhatsApp first-reply flow (needs a provider) |
| P1 | Weak proof presentation | Medium-High | Medium | Rebuild the 3 strongest case studies with results only once the client confirms the numbers |
| P1 | Audit pages need to be the ad destination | Medium-High | Low | Point Meta campaigns at `/audit/*`, not the homepage |
| P2 | No industry pages | Medium | Medium | Build 3 pages only where real proof exists (see the ICP table in section 4) |
| P2 | Local SEO | Medium | Low | Google Business Profile, review requests |
| P2 | Pipeline stages | Medium | Low | Add `meeting_completed` and `reactivation` stages |
| P3 | Google Ads | Medium, unproven | Medium | Start only after Meta funnel converts |
| P3 | UAE and USA pages | Low until the home market works | Medium | Later |
| P3 | Directory and guest-content authority | Slow | Ongoing | After P0 to P2 |

---

## 4. Positioning, ICP and offers (Tasks 1 to 5, 9, 10)

### Positioning (Recommendation)
Keep **BUILD. GROW. AUTOMATE.** as the umbrella, but lead each *campaign* with one verb only. One line for the homepage: *"We build your digital business, bring you customers, and automate the follow-up."* AI and automation is a **second wedge**, not the first message, because competitors are loud there and you need a proof asset first.

### ICP ranking
Scores are my judgment (1 to 5; higher is better; Competition and Ease are scored so that higher means *easier*). They are **not** measured. Validate with the test in section 6.

| Vertical | Pain | Budget | Urgency | Proof you hold* | Competition | Ease | Total /30 |
|---|---|---|---|---|---|---|---|
| Local service businesses (clinics, salons, coaching, contractors) | 4 | 2 | 4 | 2 | 3 | 5 | 20 |
| Hospitality (hotels, resorts, restaurants) | 5 | 3 | 4 | 3 | 3 | 3 | 21 |
| E-commerce / D2C | 4 | 4 | 4 | 3 | 2 | 3 | 20 |
| Real estate | 4 | 4 | 4 | 1 | 2 | 3 | 18 |
| Startups | 3 | 2 | 3 | 3 | 2 | 4 | 17 |
| Healthcare | 4 | 3 | 3 | 1 | 3 | 3 | 17 |

*"Proof you hold" counts claimed case studies. Cut to 1 if you cannot verify them. Hospitality and e-commerce lead only if their numbers check out.

**Recommendation:** test **local service businesses and hospitality owners** first (low price point fits the ₹39,999 offer and the Alwar / Rajasthan base). E-commerce second.

### Offers (Task 4)
Productise into four, each with a named outcome. Price, timeline and deliverables below are **proposals** for you to confirm.

| Offer | Outcome | Entry |
|---|---|---|
| **Business Launch System** | A working, lead-capturing website | ₹39,999 |
| **Organic Growth System** | Local and search visibility | Monthly retainer, price TBD |
| **Lead Follow-up Automation** | Every enquiry gets a fast reply and a next step | Setup fee plus monthly, price TBD |
| **Free audits** (website, automation, Meta Ads) | The lead magnet that feeds the other three | Free |

### ₹39,999 package (Task 5)
- **Target:** owners of local or service businesses with no site or an outdated one.
- **Deliverables (to confirm with you):** pages, mobile layout, contact and WhatsApp capture, basic SEO setup, tracking installed, handover.
- **Timeline:** state what you can keep. If 7 days is not safe, say "live in 10 working days" instead. *Do not promise impossible dates.*
- **Risk reversal:** use only what you will honour (for example, a clear revision limit). I would not offer a money-back guarantee without your approval.
- **Qualification questions:** business type, existing site, number of pages needed, who decides, launch date.

---

## 5. 30-day plan

Assumes the build work already done is deployed. Mark days off as your team can.

| Days | Work |
|---|---|
| 1 to 3 | Deploy all pending changes; match `CRON_SECRET` and the encryption key on both servers; add the reminder cron; test email works. Save the CAPI token on Integrations. Test: ad-link visit, accept cookies, submit form, confirm PageView and Lead (no duplicates) in Test Events. |
| 3 to 5 | Add login checks to older admin API routes. Verify or remove every unverified claim. |
| 5 to 8 | Put the single offer on the homepage hero and the audit page. Paste the Strategy Call booking link on the Integrations page. |
| 8 to 12 | Rebuild three case studies in the standard format with verified numbers. Set up Google Business Profile, send review requests to real past clients. |
| 12 to 14 | Create the first ad set: 3 hooks x 2 formats. Decide the WhatsApp provider. |
| 15 to 28 | Run the test in section 6 (₹10,000 to ₹15,000 total). Reply to every lead within 5 minutes, same day. |
| 29 to 30 | Read the funnel (Lead Funnel page): where do people drop? Decide: scale, change offer, or fix landing page. |

---

## 6. Meta Ads testing plan

### Hypotheses (not facts)
- Owners respond more to a **named free audit** than to "we build websites". Competitors PixelCrayons and IndiaNIC do the same.
- A visible **price** (₹39,999) differentiates, since none of the six competitors shows prices.

### Matrix
| Dimension | Variants |
|---|---|
| Hooks (5) | Pain ("Still replying to every enquiry by hand?"), Outcome ("A website that brings enquiries"), Speed ("Live in X days", only if feasible), Price ("Website from ₹39,999"), Curiosity ("What is your website losing?") |
| Creatives (5) | Founder talking video, screen-recorded mini audit, static before/after, carousel of one verified case study, short demo of a prebuilt product |
| Offers (3) | Free website audit, Business Launch System ₹39,999, Free automation audit |
| Audiences (3) | Broad (India, age 25 to 55, no interests); interest-based (small business owners, Shopify, restaurant owners); website-visitor retargeting once there are enough visitors |
| Landing pages (3) | `/audit/website`, `/audit/automation`, `/prebuilt` or the package page |

Run one variable at a time. Start with 2 offers x 3 hooks on a broad audience. Do not test audiences before the creative and offer give any signal.

### Campaigns from your brief (kept, with a caution)
- **Automation, E-commerce, Hospitality, Website.** Fine as separate campaigns. Run **Website audit** and **Automation audit** first; start hospitality and e-commerce only after you can show a verified case study in that industry.
- **Do not name competitors in ads, and do not use claimed results as ad copy** until verified.

---

## 7. Budget plan

I am **not** adopting your suggested split for the ₹30,000 plan, and here is why.

| Channel (brief) | Brief % | My view |
|---|---|---|
| Search | 35 | Raise. It captures people already looking for a provider. |
| Performance Max | 25 | **Not at this budget.** It needs conversion volume to learn; ₹30,000 a month is too thin for it. |
| Video | 15 | Reasonable only as retargeting or cheap awareness, via Meta Reels instead of YouTube. |
| Display | 15 | Low intent for a service business. Skip until you have a retargeting list. |
| Shopping | 10 | **Does not apply.** Shopping needs a product feed; Stitchbyte sells services. 0%. |

This is a judgment from how the channels work, not from your data. If you want to run your original split as a deliberate test, tell me and I will plan it.

### Recommended allocation (Meta-first, Search second)

| Monthly budget | Meta lead campaigns | Google Search | Retargeting | Notes |
|---|---|---|---|---|
| ₹10,000 | ₹8,000 | 0 | ₹2,000 | Meta only. Run the section 6 test. |
| ₹30,000 | ₹16,000 | ₹9,000 | ₹5,000 | Add Google brand-plus-intent Search. |
| ₹50,000 | ₹26,000 | ₹16,000 | ₹8,000 | Add a second offer. |
| ₹1,00,000 | ₹50,000 | ₹32,000 | ₹18,000 | Only after scale conditions below are met. |

**Scale conditions (all must be true for two straight weeks):** tracking verified, at least 20 tracked leads, qualified-lead rate and meeting rate inside target, and a known cost per meeting you can afford. Higher spend on a broken funnel only makes the loss bigger.

---

## 8. KPI targets

These are **planning assumptions for a small India B2B services account**, not guarantees. Replace them with your own numbers after the first 30 days.

| Metric | Benchmark (typical range) | Target to aim for | Kill threshold |
|---|---|---|---|
| CTR (Meta) | 0.8 to 1.5% | 1.2%+ | under 0.6% after 1,000 impressions |
| CPC | ₹10 to ₹30 | under ₹20 | over ₹40 |
| Landing conversion | 5 to 12% | 8%+ | under 3% after 150 visits |
| CPL | ₹150 to ₹600 | under ₹400 | over ₹800 |
| Qualified lead rate | 20 to 40% | 30%+ | under 15% after 20 leads |
| Meeting rate (of qualified) | 30 to 50% | 40%+ | under 20% |
| Proposal rate (of meetings) | 40 to 60% | 50%+ | under 25% |
| Close rate (of proposals) | 15 to 30% | 20%+ | under 10% after 10 proposals |
| CAC | depends on deal size | under 20% of first-year gross margin | over 40% |
| ROAS | n/a until revenue data | 3x or higher | under 1.5x after a full sales cycle |

## 9. Scale and kill rules

Use only after the minimum data is met. Do not decide on small samples.

- **Kill an ad:** spent 2 times your target CPL with 0 leads, or CTR under 0.6% after 1,000 impressions.
- **Kill an audience:** after 3 ads at least 50% below target CTR, with 1,500+ impressions each.
- **Kill a landing page:** conversion under 3% after 150 visits while another page converts at 2 times or more.
- **Change the offer:** leads arrive but qualified rate is under 15% after 20 leads, or meeting rate under 20% after 10 qualified leads.
- **Increase budget:** by 20% at most every 3 to 4 days, only if CPL is at or under target and qualified rate is held.
- **Decrease budget:** by 30% when CPL is 1.5 times target for 5 days, or qualified rate falls under 15%.
- **Launch new creative:** frequency over 2.5 on a cold audience, or CTR dropping 30% from its first-week level.

---

## 10. Competitive advantage and the one recommendation

### Advantages, ranked by how defensible they are
1. **Visible prices and ready-to-buy products with live demos.** *Fact: none of the six competitors show prices.* Use in ads, homepage and proposals.
2. **WhatsApp-first response.** Rare among competitors. Use in ads, landing pages and sales calls.
3. **Source-code ownership and custom technology.** Use in sales calls and proposals; only if the contract says so.
4. **Web, marketing and automation under one team.** Use on the website and in proposals.
5. **Verified case studies.** Strongest of all, but only after verification.
6. **AI and automation.** Real, but crowded; keep as the upsell until you hold a proof asset.
7. **Global capability (UAE, USA).** Keep off the front line until the home market works.

### Final strategic decision (Recommendation, one answer)

> **Sell first:** the **Business Launch System at ₹39,999**, entered through a **free website and lead-flow audit**.
> **To whom:** owners of **local service and hospitality businesses** in Rajasthan (Alwar first) with no site or a weak one.
> **Channel:** **Meta lead ads and traffic campaigns** to the audit pages, with **WhatsApp** as the reply channel. Add Google Search for people already searching, once Meta shows leads.
> **Funnel:** ad, audit page, form (scored automatically), instant alert and reply within 5 minutes, WhatsApp qualification, 20-minute call, ₹39,999 proposal, follow-up emails.
> **Price:** ₹39,999, with the delivery date you can honour.

This is a **hypothesis to test**, not a proven plan. Test it with ₹10,000 to ₹15,000 over 14 days. If qualified-lead rate and meeting rate land under the kill thresholds, change the offer or audience before spending more.

**Secondary opportunities:** E-commerce growth audit; Lead Follow-up Automation sold to past clients and warm leads; local SEO retainers.

---

## Appendix: status of the 25 tasks

| Done in the product (not all deployed) | Not started, needs your decision |
|---|---|
| Pixel, Conversions API, ad-click ID capture, event dedupe (T22) | Industry landing pages (T9) |
| Three audit pages, SEO landing pages (T19, T11) | Service landing pages for each service (T10) |
| Lead capture, scoring, alerts, reminders, follow-ups (T20, T21) | WhatsApp Business automation (T20; needs a provider) |
| Pipeline stages and offline conversion events (T21) | Google Ads build, GBP, off-page authority (T12, T13, T17) |
| Lead funnel dashboard (T24, partial: no spend or revenue) | Creative production, experiments log (T15, T23) |
| Competitor snapshot, six sites (T3, partial) | Meta Ad Library and keyword research (needs tools) |

Pipeline note: the brief's stages differ slightly from what is built. I can add `meeting_completed` and `reactivation`.
