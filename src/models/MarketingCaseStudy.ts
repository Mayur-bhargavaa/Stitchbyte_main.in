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
