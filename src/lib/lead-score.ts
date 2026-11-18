export interface ScoreInput {
  budget?: string | null;
  timeline?: string | null;
  isDecisionMaker?: boolean | null;
  website?: string | null;
  businessType?: string | null;
  brand?: string | null;
  email?: string | null;
  phone: string;
  message?: string | null;
  productName?: string | null;
  utmSource?: string | null;
}

export type LeadGrade = "hot" | "warm" | "cold";

/**
 * Transparent 0-100 lead score. Weights are a starting point: once enough leads are
 * marked won/lost, compare scores against outcomes and re-weight.
 */
export function scoreLead(l: ScoreInput): { score: number; grade: LeadGrade; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const add = (pts: number, why: string) => {
    score += pts;
    reasons.push(`+${pts} ${why}`);
  };

  // Budget: the strongest signal of a real project
  switch (l.budget) {
    case "₹3L+": add(35, "budget ₹3L+"); break;
    case "₹1L–₹3L": add(30, "budget ₹1L–₹3L"); break;
    case "₹50k–₹1L": add(22, "budget ₹50k–₹1L"); break;
    case "₹25k–₹50k": add(12, "budget ₹25k–₹50k"); break;
    case "Under ₹25k": add(4, "budget under ₹25k"); break;
  }

  // Urgency
  switch (l.timeline) {
    case "As soon as possible": add(20, "wants to start ASAP"); break;
    case "Within 1 month": add(15, "starting within a month"); break;
    case "1–3 months": add(8, "starting in 1–3 months"); break;
    case "Just exploring": add(2, "just exploring"); break;
  }

  if (l.isDecisionMaker === true) add(15, "decision maker");

  // Existing business signals
  if (l.website && l.website.trim().length > 3) add(8, "has a website");
  if (l.brand && l.brand.trim().length > 1) add(5, "gave business name");
  if (l.businessType) add(3, "gave business type");
  if (l.email) add(4, "gave email");
  if (l.message && l.message.trim().length >= 30) add(6, "described the need");

  // Phone sanity: 10-digit Indian mobile or an international number
  const digits = l.phone.replace(/\D/g, "");
  if (digits.length >= 10 && digits.length <= 13) add(4, "valid-looking phone");
  else {
    score -= 15;
    reasons.push("-15 phone looks invalid");
  }

  // Audit-funnel leads asked for something specific
  if (l.productName && /audit/i.test(l.productName)) add(5, "requested an audit");

  score = Math.max(0, Math.min(100, score));
  const grade: LeadGrade = score >= 60 ? "hot" : score >= 35 ? "warm" : "cold";
  return { score, grade, reasons };
}
