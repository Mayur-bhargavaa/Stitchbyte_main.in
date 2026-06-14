import mongoose, { Document, Schema } from "mongoose";

export interface IMarketingCaseStudy extends Document {
  id: string;
  slug: string;
  brand: string;
  industry: string;
  category: "performance" | "seo";
  summary: string;
  highlights: string[];
  goal: string;
  approach: string;
  result: string;
  outcomeMetrics: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  // High-Converting Overhaul Fields
  companySize?: string;
  businessModel?: string;
  targetAudience?: string;
  problem?: string;
  objectives?: string[];
  solutionDetails?: string;
  challenges?: string;
  implementationProcess?: string;
  resultsMetrics?: string[];
  visualProof?: string[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialDesignation?: string;
  businessImpact?: string;
}

const MarketingCaseStudySchema = new Schema<IMarketingCaseStudy>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    industry: { type: String, required: true },
    category: { type: String, enum: ["performance", "seo"], required: true },
    summary: { type: String, required: true },
    highlights: { type: [String], default: [] },
    goal: { type: String, required: true },
    approach: { type: String, required: true },
    result: { type: String, required: true },
    outcomeMetrics: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    // High-Converting Overhaul Fields
    companySize: { type: String, default: "" },
    businessModel: { type: String, default: "" },
    targetAudience: { type: String, default: "" },
    problem: { type: String, default: "" },
    objectives: { type: [String], default: [] },
    solutionDetails: { type: String, default: "" },
    challenges: { type: String, default: "" },
    implementationProcess: { type: String, default: "" },
    resultsMetrics: { type: [String], default: [] },
    visualProof: { type: [String], default: [] },
    testimonialQuote: { type: String, default: "" },
    testimonialAuthor: { type: String, default: "" },
    testimonialDesignation: { type: String, default: "" },
    businessImpact: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "marketing_case_studies",
  }
);

MarketingCaseStudySchema.index({ category: 1, isActive: 1, order: 1 });
MarketingCaseStudySchema.index({ slug: 1, isActive: 1 });

export default
  mongoose.models.MarketingCaseStudy ||
  mongoose.model<IMarketingCaseStudy>("MarketingCaseStudy", MarketingCaseStudySchema);
